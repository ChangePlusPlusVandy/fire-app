"use strict";

const crypto = require("crypto");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Device = require("./device");

/***************** Admin Model *******************/

const makeSalt = () => Math.round(new Date().valueOf() * Math.random()) + "";

const encryptPassword = (salt, password) =>
    crypto.createHmac("sha512", salt).update(password).digest("hex");

let Firechief = new Schema({
    first_name: { type: String, default: "" },
    last_name: { type: String, default: "" },
    email: { type: String, required: true, index: { unique: true }, unique: true },
    phone: { type: Number },
    username: { type: String, required: true, index: { unique: true }, unique: true },
    create_date: { type: Date },
    hash: { type: String },
    salt: { type: String },
});

Firechief.path("username").validate(function (value) {
    if (!value) return false;
    return (
        value.length > 5 && value.length <= 16 && /^[a-zA-Z0-9]+$/i.test(value)
    );
}, "invalid username");

Firechief.path("email").validate(function (value) {
    if (!value) return false;
    return (
        /^[^@\s]+@[^@\s]+\.[^@\s]+$/i.test(value)
        && acceptedDomains.indexOf(value.split('@').pop()) !== -1
    );
}, "invalid email");

Firechief.virtual("password").set(function (password) {
    this.salt = makeSalt();
    this.hash = encryptPassword(this.salt, password);
});

Firechief.method("authenticate", function (plainText) {
    return encryptPassword(this.salt, plainText) === this.hash;
});

Firechief.pre("save", function (next) {
    // Sanitize strings
    this.username = this.username.toLowerCase();
    this.email = this.email.toLowerCase();
    this.email = this.email
        ? this.email.replace(/<(?:.|\n)*?>/gm, "")
        : "";
    this.first_name = this.first_name
        ? this.first_name.replace(/<(?:.|\n)*?>/gm, "")
        : "";
    this.last_name = this.last_name
        ? this.last_name.replace(/<(?:.|\n)*?>/gm, "")
        : "";
    this.create_date = Date.now();
    next();
});

module.exports = mongoose.model("Admin", Admin);
