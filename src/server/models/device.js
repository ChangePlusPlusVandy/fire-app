/* Copyright G. Hemingway, 2020 - All rights reserved */
"use strict";

const crypto = require("crypto");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Zone = require("./zone");

/***************** Device Model *******************/

let Device = new Schema({
  owner: { type: String, required: true },
  api_key: { type: String, required: true },
  owner_id: { type: String },
  owner_name: { type: String, default: "" },
  owner_email: { type: String },
  id: { type: String },
  // city: { type: String, default: "" },
  latitude: { type: Number, default: 0 },
  longitude: { type: Number, default: 0 },
  name: { type: String, default: "" },
  create_date: { type: Date },
  zones: [Zone],
  firezone: { type: Number, required: 0},
});

Device.pre("save", function (next) {
  // Sanitize strings
  this.owner = this.owner ? this.owner.toLowerCase() : "";
  this.owner = this.owner ? this.owner.replace(/<(?:.|\n)*?>/gm, "") : "";
  this.city = this.city ? this.city.replace(/<(?:.|\n)*?>/gm, "") : "";
  this.added_date = Date.now();

  next();
});

module.exports = mongoose.model("Device", Device);
