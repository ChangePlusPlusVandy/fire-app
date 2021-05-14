/* Copyright G. Hemingway, 2020 - All rights reserved */
"use strict";

const crypto = require("crypto");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Device = require("./device");

/***************** Homeuser Model *******************/

const makeSalt = () => Math.round(new Date().valueOf() * Math.random()) + "";

const encryptAPI = (salt, API_Keys) =>
    crypto.createHmac("sha512", salt).update(API_Keys).digest("hex");

const reservedNames = ["password"];

let Homeuser = new Schema({
    person_id: { type: String, index: { unique: true } },
    email: { type: String, index: { unique: true } },
    first_name: { type: String, default: "" },
    last_name: { type: String, default: "" },
    phone: {type: Number, default: 0},
    api_key: {type: String, required: true},
    create_date: { type: Date },
    device_ID: {type: Array },
});
/*
Homeuser.path("username").validate(function (value) {
    if (!value) return false;
    if (reservedNames.indexOf(value) !== -1) return false;
    return (
        value.length > 5 && value.length <= 16 && /^[a-zA-Z0-9]+$/i.test(value)
    );
}, "invalid username");

Homeuser.virtual("password").set(function (password) {
    this.salt = makeSalt();
    this.hash = encryptPassword(this.salt, password);
});

Homeuser.method("authenticate", function (plainText) {
    return encryptPassword(this.salt, plainText) === this.hash;
});
*/

Homeuser.virtual("API_Keys").set(function (API_Keys) {
    this.salt = makeSalt();
    this.hash = encryptAPI(this.salt, API_Keys);
});

Homeuser.method("authenticate", function (plainText) {
    return encryptAPI(this.salt, plainText) === this.hash;
});

Homeuser.pre("save", function (next) {
    // Sanitize strings
    this.primary_email = this.primary_email
        ? this.primary_email.toLowerCase()
        : "";
    this.first_name = this.first_name
        ? this.first_name.replace(/<(?:.|\n)*?>/gm, "")
        : "";
    this.last_name = this.last_name
        ? this.last_name.replace(/<(?:.|\n)*?>/gm, "")
        : "";
    this.added_date = Date.now();
    next();
});

module.exports = mongoose.model("Homeuser", Homeuser);
