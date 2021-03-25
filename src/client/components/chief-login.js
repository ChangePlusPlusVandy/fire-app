/* Copyright G. Hemingway, @2020 - All rights reserved */
"use strict";

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FireRegisterContainer, PageContainer, Header, TitleLine, FreeButton, } from "./shared";
import { validPassword, validFCEmail } from "../../shared";
import {Link} from "react-router-dom";

export const ChiefLogin = ({ history }) => {
  let [state, setState] = useState({
    email: "",
    password: "",
  });
  let [error, setError] = useState("");
  let [notify, setNotify] = useState("");

  const onChange = (ev) => {
    setError("");
    // Update from form and clear errors
    setState({
      ...state,
      [ev.target.name]: ev.target.value,
    });
    // Make sure the email is valid
    if (ev.target.name === "email") {
      let emailInvalid = validFCEmail(ev.target.value);
      if (emailInvalid) setError(`Error: ${emailInvalid.error}`);
    }
    // Make sure password is valid
    else if (ev.target.name === "password") {
      let pwdInvalid = validPassword(ev.target.value);
      if (pwdInvalid) setError(`Error: ${pwdInvalid.error}`);
    }
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    // window.alert("Button pressed");
    // Only proceed if there are no errors
    if (error !== "") return;
    const res = await fetch("/v1/session", {
      method: "POST",
      body: JSON.stringify(state),
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    if (res.ok) {
      // Credentials match, move on to next page
      history.push("./devices-table")
    } else {
      const err = await res.json();
      setError(err.error);
      setNotify("Incorrect email or password.")
      window.alert("Incorrect email or password.");
    }
  };

  return (
      <PageContainer>
        <Header>
          <TitleLine>Fire Mitigation App</TitleLine>
        </Header>
        <FireRegisterContainer>
          <input
              id="email"
              name="email"
              placeholder="Email"
              onChange={onChange}
              value={state.email}
          />
          <input
              id="password"
              name="password"
              placeholder="Password"
              onChange={onChange}
              value={state.password}
          />
          <FreeButton onClick={onSubmit} style={{backgroundColor:"#cb0000", marginTop: "18px"}}>Log In</FreeButton>
          <p style={{marginTop: "1px"}}>or</p>
          <Link to="chief-register" style={{textDecoration: 'none'}}><FreeButton style={{backgroundColor:"#b2b2b2", marginTop: "1px"}}>Sign Up As Fire Chief</FreeButton></Link>
          <p style={{color: "#CB0000", fontWeight: "bold"}}>Forgot Password</p>
        </FireRegisterContainer>
      </PageContainer>
  );
};


ChiefLogin.propTypes = {
  history: PropTypes.object.isRequired,
};
