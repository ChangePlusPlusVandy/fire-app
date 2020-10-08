/* Copyright G. Hemingway, 2020 - All rights reserved */
"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/***************** CardState Model *******************/

/* Schema for individual card state within Klondyke */
let Zone = new Schema(
  {
    id: String,
    number: Number,
  },
  { _id: false }
);

module.exports = Zone;
