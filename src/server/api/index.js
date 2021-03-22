/* Copyright G. Hemingway, 2020 - All rights reserved */
"use strict";

module.exports = (app) => {
  require("./v1/firechief")(app);
  require("./v1/session")(app);
  require("./v1/device")(app);
  require("./v1/homeuser")(app);
};
