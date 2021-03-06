"use strict";

const Joi = require("@hapi/joi");
const {validPassword} = require("../../../shared");

module.exports = (app) => {
    /**
     * Create a new firechief
     *
     * @param {req.body.first_name} First name of the firechief
     * @param {req.body.last_name} Last name of the firechief
     * @param {req.body.email} Email address of the user
     * @param {req.body.phone} Phone of the new firechief
     * @param {req.body.username} Display name of the new user
     * @param {req.body.password} Password for the user
     * @return {201, {username,email}} Return username and others
     */
    app.post("/v1/firechief", async (req, res) => {
        // Schema for firechief info validation
        let data;
        try {
            let schema = Joi.object().keys({
                first_name: Joi.string(),
                last_name: Joi.string(),
                email: Joi.string().lowercase().email().required(),
                phone: Joi.number().integer(),
                username: Joi.string().lowercase().alphanum().min(3).max(32).required(),
                password: Joi.string().min(8).required(),
                department: Joi.string(),
            });
            data = await schema.validateAsync(req.body);
            data["controllable_firezones"] = [1, 2];
        } catch (err) {
            console.log(err);
            const message = err.details[0].message;
            console.log(`Firechief.create validation failure: ${message}`);
            return res.status(400).send({error: message});
        }

        // Deeper password validation
        const pwdErr = validPassword(data.password);
        if (pwdErr) {
            console.log(`Firechief.create password validation failure: ${pwdErr.error}`);
            return res.status(400).send(pwdErr);
        }

        // try to create the firechief
        try {
            let firechief = new app.models.Firechief(data);
            await firechief.save();
            res.status(201).send({
                username: data.username,
                email: data.email,
            });
        } catch (err) {
            console.log(err.message);
            // Error if username is already in use
            if (err.code === 11000) {
                if (err.message.indexOf("username_1") !== -1)
                    res.status(400).send({error: "username already in use"});
                if (err.message.indexOf("email_1") !== -1)
                    res.status(400).send({error: "email already in use"});
            }
            // Something else in the username failed
            else res.status(400).send({error: "invalid username"});
        }
    });

    /**
     * See if firechief exists
     *
     * @param {req.params.username} Username of the user to query for
     * @return {200 || 404}
     */
    app.head("/v1/firechief/:username", async (req, res) => {
        let firechief = await app.models.Firechief.findOne({
            username: req.params.username.toLowerCase(),
        });
        if (!firechief)
            res.status(404).send({error: `unknown firechief: ${req.params.username}`});
        else res.status(200).end();
    });

    /**
     * Fetch firechief information
     *
     * @param {req.params.username} Username of the firechief to query for
     * @return {200, {username, email, first_name, last_name, city, fire_district_code, longitude, latitue, is_fire_chief}}
     */
    app.get("/v1/firechief/:username", async (req, res) => {
        let firechief = await app.models.Firechief.findOne({
            username: req.params.username.toLowerCase(),
        }).exec();
        if (!firechief)
            res.status(404).send({error: `unknown firechief: ${req.params.username}`});
        else {
            console.log(firechief.first_name);
            res.status(200).send({
                first_name: firechief.first_name,
                last_name: firechief.last_name,
                email: firechief.email,
                phone: firechief.phone,
                username: firechief.username,
                department: firechief.department,
                is_authorized: firechief.is_authorized,
                controllable_firezones: firechief.controllable_firezones,
            });
        }
    });


    /**
     * Update a firechief's profile information
     *
     * @param {req.body.first_name} First name of the firechief - optional
     * @param {req.body.last_name} Last name of the firechief - optional
     * @param {req.body.email} Email address of the user - optional
     * @param {req.body.phone} Phone of the new firechief - optional
     * @param {req.body.controllable_firezones} Updated controllable firezones - optional
     * @return {204, no body content} Return status only
     */
    app.put("/v1/firechief", async (req, res) => {
        // Ensure the user is logged in
        if (!req.session.user)
            return res.status(401).send({error: "unauthorized"});

        let data;
        // Validate passed in data
        try {
            let schema = Joi.object().keys({
                first_name: Joi.string().allow(""),
                last_name: Joi.string().allow(""),
                email: Joi.string().allow(""),
            });
            data = schema.validateAsync(req.body);
        } catch (err) {
            const message = err.details[0].message;
            console.log(`Firechief.update validation failure: ${message}`);
            return res.status(400).send({error: message});
        }

        // Update the user
        try {
            const query = {username: req.session.user.username};
            req.session.user = await app.models.Firechief.findOneAndUpdate(
                query,
                {$set: req.body},
                {new: true}
            );
            res.status(204).end();
        } catch (err) {
            console.log(
                `Firechief.update logged-in user not found: ${req.session.user.id}`
            );
            res.status(500).end();
        }
    });

    /**
     * Deletes the firechief with the given username from the db
     * @param {req.params.username} username of the firechief to be deleted
     * @return {200}
     */
    app.delete("/v1/firechief/:username", async (req, res) => {
        console.log("Deleting firechief: " + req.params.username);
        try {
            app.models.Firechief.deleteOne({username: req.params.username});
            res.status(200).send("Deleted firechief: " + req.params.username);
        } catch (err) {
            console.log(err.message);
            res.status(400).send({error: `Error deleting firechief ${req.params.username}: ${err.message}`});
        }
    });

    /**
     * Sets authorization of firechief
     * @param {req.params.username} username of the firechief to be deleted
     * @return {200}
     */
    app.put("/v1/firechief/authorize/:username", async (req, res) => {
        console.log("Updating authorization of firechief: " + req.params.username);
        try {
            const chief = await app.Models.Firechief.findOne({username: req.params.username});
            let update = !chief.is_authorized;
            chief.is_authorized = update;
            await chief.save();
            res.status(200).send("Firechief authorized: " + update);
        } catch (err) {
            console.log(err.message);
            res.status(400).send({error: `Error changing authorization for firechief ${req.params.username}: ${err.message}`});
        }
    });
};
