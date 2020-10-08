/* Copyright G. Hemingway, @2020 - All rights reserved */
"use strict";

import React, { useEffect } from "react";
import PropTypes from "prop-types";

export const Logout = ({ history, logOut }) => {
  useEffect(() => {
    fetch("/v1/session", { method: "DELETE" }).then(() => {
      logOut();
      // Go to login page
      history.push("/login");
    });
  }, []);
  return <></>;
};

Logout.propTypes = {
  history: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired,
};
