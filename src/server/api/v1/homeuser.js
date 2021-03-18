"use strict";

const {
    getPersonId,
    getPersonInfo,
    getDeviceDataStatus,
    getCurrentScheduleDuration,
    concurrentGetDeviceDataAndSchedule,
    startAllZones,
    closestFirezone
} = require("../rachio");

const Joi = require("@hapi/joi");

module.exports = (app) => {
    /**
     * Create a new homeuser
     *
     * @param {req.body.first_name} First name of the homeuser -- optional
     * @param {req.body.last_name} Last name of the homeuser -- optional
     * @param {req.body.phone} Phone number of the homeuser
     */
    app.post("/v1/homeuser", async (req, res) => {
        // Schema for user info validation
        let data;
        try {
            // Validate user input
            let schema = Joi.object().keys({
                first_name: Joi.string().allow(""),
                last_name: Joi.string().allow(""),
                phone: Joi.number().min(10).required(),
                api_key: Joi.string().required(),
            });
            data = await schema.validateAsync(req.body);
        } catch (err) {
            const message = err.details[0].message;
            console.log(`Homeuser.create validation failure: ${message}`);
            return res.status(400).send({ error: message });
        }

        // try to get person id
        try {
            const person_id = await getPersonId(data.api_key);
            data["person_id"] = person_id.id;
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: "Invalid API Key entered"});
        }

        // try to get other information
        try {
            const person_info = await getPersonInfo(data.api_key, data.person_id);
            data["email"] = person_info.email;
            data["create_date"] = person_info.createDate;
            const device_ID = person_info.devices.map(device => device.id);
            data["device_ID"] = device_ID;
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: "Failed getting homeuser data from API"});
        }

        // Try to create the user
        try {
            let homeuser = new app.models.Homeuser(data);
            await homeuser.save();
            // Send the happy response back
            res.status(201).send({
                first_name: data.first_name,
            });
        } catch (err) {
            console.log(err.message);
        }
    });

    /**
     * See if homeuser exists
     *
     * @param {req.params.phone} Phone of the user to query for
     * @return {200 || 404}
     */
    app.head("/v1/homeuser/:phone", async (req, res) => {
        let homeuser = await app.models.Homeuser.findOne({
            phone: req.params.phone(),
        });
        if (!homeuser)
            res.status(404).send({ error: `unknown homeuser: ${req.params.phone}` });
        else res.status(200).end();
    });

    /**
     * Fetch homeuser information
     *
     * @param {req.params.phone} Phone of the user to query for
     * @return {200, {first_name, last_name, phone}}
     */
    app.get("/v1/user/:phone", async (req, res) => {
        let homeuser = await app.models.Homeuser.findOne({
            phone: req.params.phone(),
        }).exec();

        if (!homeuser)
            res.status(404).send({ error: `unknown homeuser: ${req.params.phone}` });
        else {
            console.log(homeuser.first_name);
            res.status(200).send({
                first_name: req.params.first_name,
                last_name: req.params.last_name,
                phone: req.params.phone,
            });
        }
    });

    /**
     * Update a homeuser's profile information
     *
     * @param {req.body.first_name} First name of the user - optional
     * @param {req.body.last_name} Last name of the user - optional
     * @param {req.body.phone} Phone of the user - optional
     * @return {204, no body content} Return status only
     */
    app.put("/v1/homeuser", async (req, res) => {
        // Ensure the user is logged in
        if (!req.session.user)
            return res.status(401).send({ error: "unauthorized" });

        let data;
        // Validate passed in data
        try {
            let schema = Joi.object().keys({
                first_name: Joi.string().allow(""),
                last_name: Joi.string().allow(""),
                phone: Joi.number().min(10),
            });
            data = schema.validateAsync(req.body);
        } catch (err) {
            const message = err.details[0].message;
            console.log(`Homeuser.update validation failure: ${message}`);
            return res.status(400).send({ error: message });
        }

        // Update the homeuser
        try {
            const query = { first_name: req.session.user.first_name };
            req.session.user = await app.models.Homeuser.findOneAndUpdate(
                query,
                { $set: req.body },
                { new: true }
            );
            res.status(204).end();
        } catch (err) {
            console.log(
                `Homeuser.update logged-in homeuser not found: ${req.session.user.first_name}`
            );
            res.status(500).end();
        }
    });
}
