"use strict";

const Joi = require("@hapi/joi");
const { validPassword } = require("../../../shared");

module.exports = (app) => {
    /**
     * Create a new admin
     *
     */

    app.post("v1/admin", async (req, res) => {
        // Schema for admin info validation
        let data;
        try {
            let schema = Joi.object().keys({
                first_name: Joi.string(),
                last_name: Joi.string(),
                email: Joi.string().lowercase().email().required(),
                phone: Joi.number().integer(),
                username: Joi.string().lowercase().alphanum().min(3).max(32).required(),
                password: Joi.string().min(8).required(),
            });
            data = await schema.validateAsync(req.body);
        } catch (err) {
            console.log(err);
            const message = err.details[0].message;
            console.log(`Admin.create validation failure: ${message}`);
            return res.status(400).send({ error: message });
        }

        // Deeper password validation
        const pwdErr = validPassword(data.password);
        if (pwdErr) {
            console.log(`Admin.create password validation failure: ${pwdErr.error}`);
            return res.status(400).send(pwdErr);
        }

        // try to create the admin
        try {
            let admin = new app.models.Admin(data);
            await admin.save();
            res.status(201).send({
                username: data.username,
                email: data.email,
            });
        } catch (err) {
            console.log(err.message);
            // Error if username is already in use
            if (err.code === 11000) {
                if (err.message.indexOf("username_1") !== -1)
                    res.status(400).send({ error: "username already in use"  });
                if (err.message.indexOf("email_1") !== -1)
                    res.status(400).send({ error: "email already in use" });
            }
            // Something else in the username failed
            else res.status(400).send({ error: "invalid username" });
        }
    });

    /**
     * See if admin exists
     *
     * @param {req.params.username} username of the admin to query for
     * @return {200 || 400}
     */
    app.head("/v1/admin/:username", async (req, res) => {
        let admin = await app.models.Admin.findOne({
            username: req.params.username.toLowerCase(),
        });
        if (!admin)
            res.status(404).send({ error: `unknown admin: ${req.params.username}` })
        else res.status(200).end();
    });

    /**
     * Fetch admin information
     *
     * @param {req.params.username} Username of the admin to query for
     * @return {200, {username, email, first_name, last_name }}
     */
    app.get("/v1/admin/:username", async (req, res) => {
        let admin = await app.models.Admin.findOne({
            username: req.params.username.toLowerCase(),
        }).exec();
        if (!admin)
            res.status(404).send({ error: `unknown admin: ${req.params.username}` });
        else {
            console.log(admin.first_name);
            res.status(200).send({
                first_name: admin.first_name,
                last_name: admin.last_name,
                email: admin.email,
                phone: admin.phone,
                username: admin.username,
            });
        }
    });

    /**
     * Update a admin's profile information
     *
     * @param {req.body.first_name} First name of the user - optional
     * @param {req.body.last_name} Last name of the user - optional
     * @param {req.body.email} Email of the user - optional
     * @param {req.body.phone} Phone number of the user - optional
     * @return {204, no body content} Return status only
     */
    app.put("/v1/admin", async (req, res) => {
        // Ensure the user is logged in
        if (!req.session.user)
            return res.status(401).send({ error: "unauthorized" });
        let data;
        // Validate passed in data
        try {
            let schema = Joi.object().keys({
                first_name: Joi.string().allow(""),
                last_name: Joi.string().allow(""),
                email: Joi.string().allow(""),
                phone: Joi.number().integer(),
            });
            data = schema.validateAsync(req.body);
        } catch (err) {
            const message = err.details[0].message;
            console.log(`Admin.update validation failure: ${message}`);
            return res.status(400).send({ error: message });
        }

        // Update the user
        try {
            const query = { username: req.session.user.username };
            req.session.user = await app.models.Admin.findOneAndUpdate(
                query,
                { $set: req.body },
                { new: true }
            );
            res.status(204).end();
        } catch (err) {
            console.log(
                `Admin.update logged-in user not found: ${req.session.user.id}`
            );
            res.status(500).end();
        }
    });
}
