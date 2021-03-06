/* Copyright G. Hemingway, 2020 - All rights reserved */
"use strict";

const Joi = require("@hapi/joi");
const fetch = require("node-fetch");
const {
    getPersonId,
    getPersonInfo,
    getDeviceDataStatus,
    getCurrentScheduleDuration,
    concurrentGetDeviceDataAndSchedule,
    startAllZones,
    closestFirezone,
    startAllDevices,
    stopAllDevices,
} = require("../rachio");

const firezones = [
    {
        name: "moraga",
        number: 1,
        latitude: 37.8349,
        longitude: -122.1297,
    },
    {
        name: "orinda",
        number: 2,
        latitude: 37.8771,
        longitude: -122.1797,
    }
]
// devices are assigned firezone 0 if not within maxDistance km of any firezone
const maxDistance = 15;


module.exports = (app) => {
    /**
     * Creates a new sprinkler
     *
     * @param {req.body.ownwer} Owner of the sprinkler system
     * @param {req.body.city} City of the sprinkler system
     * @param {req.body.lat} Latitude of the sprinkler sytem
     * @param {req.body.lng} Longitude of the sprinkler system
     * @param {req.body.api_key} Api key used to access and control sprinkler
     * @return {201, {username,primary_email}} Returns username and api_key
     */
    app.post("/v1/device", async (req, res) => {
        // Schema for user info validation
        let data;
        let devices = [];
        try {
            // Validate user input
            let schema = Joi.object().keys({
                api_key: Joi.string().required(),
            });
            data = await schema.validateAsync(req.body);
        } catch (err) {
            const message = err.details[0].message;
            console.log(`Sprinkler.create failed: ${message}`);
            return res.status(400).send({error: message});
        }

        // get the person id
        try {
            const person_id = await getPersonId(data.api_key);
            data["person_id"] = person_id.id;
        } catch (err) {
            console.log(err);
            return res.status(400).send({error: "Invalid API Key entered"});
        }

        // get the person info
        try {
            const person_info = await getPersonInfo(data.api_key, data.person_id);
            await Promise.all(person_info.devices.map(async (item, i) => {
                let device = {
                    owner: person_info.username,
                    owner_id: person_info.id,
                    owner_name: person_info.fullName,
                    owner_email: person_info.email,
                    api_key: data.api_key,
                    id: item.id,
                    latitude: item.latitude,
                    longitude: item.longitude,
                    create_date: item.createDate,
                    firezone: 0,
                    name: item.name,
                    zones: [],
                };
                item.zones.forEach((item, i) => {
                    device["zones"].push({
                        id: item.id,
                        number: item.zoneNumber,
                    });
                });

                device["firezone"] = closestFirezone(item, firezones, maxDistance).number;

                // obsolete - kept for syntax
                // let matchedChiefs = await app.models.Firechief
                //     .find( { controllable_firezones: device.firezone } );
                // await Promise.all(matchedChiefs.map(async chief => {
                //     chief.controllable_devices.push(device.id);
                //     await chief.save();
                // }));

                devices.push(device);
            }));
        } catch (err) {
            console.log(err);
            return res.status(400).send({error: "Failed getting sprinkler data"});
        }

        // Try to create the sprinklers
        devices.forEach(async (data, id) => {
            try {
                let device = new app.models.Device(data);
                await device.save();

                // Send the happy response back
                res.status(201).send({
                    owner: data.owner,
                    id: data.id,
                    name: data.name,
                });
            } catch (err) {
                console.log(err.message);
                res.status(400).send({error: err.message});
            }
        });
    });

    /**
     * Returns all registered device hubs with schedule and data
     *
     * @param {req.body.api_key} Key to unlock rachio api
     * @return {201, {devices}} Returns array of sprinkler devices
     */
    app.get("/v1/devices", async (req, res) => {
        let devices;

        try {
            devices = await app.models.Device.find({});

            const ids = Array.from(devices, (device) => {
                return {api_key: device.api_key, id: device.id};
            });
            const devices_schedule_data = await concurrentGetDeviceDataAndSchedule(
                devices
            );

            res.status(201).send({devices: devices_schedule_data});
        } catch (err) {
            console.log(err.message);
            res.status(400).send({error: err.message});
        }
    });

    /**
     * Returns all registered device hubs in the firezone with schedule and data
     *
     * @param {req.params.firezone} firezone to look up
     * @return {201, {devices}} Returns array of sprinkler devices
     */
    app.get("/v1/devices/:firezone", async (req, res) => {
        let devices;

        try {
            devices = await app.models.Device.find({firezone: req.params.firezone});

            const devices_schedule_data = await concurrentGetDeviceDataAndSchedule(
                devices
            );

            res.status(201).send({devices: devices_schedule_data});
        } catch (err) {
            console.log(err.message);
            res.status(400).send({error: err.message});
        }
    });


    /**
     * Starts a 24 hour sprinkler cycle for a device
     * @param {req.params.id} ID for the device to get info about
     * @param {req.body.device} Device values
     * @return {201, {devices}} Returns updated device
     */
    app.put("/v1/devices/start/:id", async (req, res) => {
        console.log("start");
        // get if device is online
        try {
            await startAllZones(
                req.body.device.api_key,
                req.params.id,
                req.body.device
            );
        } catch (err) {
            console.log(err.message);
            res
                .status(400)
                .send({error: `Error starting all zone: ${err.message}`});
        }
    });
    // get current schedule for device

    /**
     * Starts a 24 hour sprinkler cycle for a device
     * @param {req.params.firezone} firezone of the devices to activate
     * @param {req.body.devices} array of device objects
     * @return {201, {devices}} Returns updated device
     */
    app.put("/v1/devices/startzone/:firezone", async (req, res) => {
        console.log("Starting Firezone " + req.params.firezone);
        try {
            await startAllDevices(req.body.devices, req.params.firezone);
            res.status(200).send("Firezone 1 activated!");
        } catch (err) {
            console.log(err.message);
            res
                .status(400)
                .send({error: `Error starting Firezone ${req.params.firezone}: ${err.message}`});
        }
    });

    /**
     * Stops all the devices in a firezone
     * @param {req.params.firezone} firezone of the devices to activate
     * @param {req.body.devices} array of device objects
     * @return {201, {devices}} Returns updated device
     */
    app.put("/v1/devices/stopzone/:firezone", async (req, res) => {
        console.log("Stopping Firezone " + req.params.firezone);
        try {
            await stopAllDevices(req.body.devices, req.params.firezone);
            res.status(200).send("Firezone 1 stopped!");
        } catch (err) {
            console.log(err.message);
            res
                .status(400)
                .send({error: `Error stopping Firezone ${req.params.firezone}: ${err.message}`});
        }
    });

    /**
     * Deletes the device with the given id from the db
     * @param {req.params.id} id of the device to be deleted
     * @return {200}
     */
    app.delete("/v1/devices/:id", async (req, res) => {
        console.log("Deleting device with id: " + req.params.id );
        try {
            await app.models.Device.deleteOne({ id: req.params.id });
            res.status(200).send("Deleted device with id: " + req.params.id);
        } catch (err) {
            console.log(err.message);
            res.status(400).send({ error: `Error deleting device ${req.params.id}: ${err.message}`});
        }
    });
};
