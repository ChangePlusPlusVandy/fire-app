"use strict";

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
    ErrorMessage,
    FormBase,
    FormInput,
    FormLabel,
    FormButton,
    ModalNotify,
    FormSwitch,
    FormSelect,
    Checkbox, FireRegisterContainer,
} from "./shared";
import styled from "styled-components";
import { validPassword, validUsername } from "../../shared";
import { TitleLine, FreeButton, OwnerRegisterContainer, NameRegisterContainer } from "./shared"
import { Link } from "react-router-dom";


export const ChiefRegister = ({ history }) => {
let [state, setState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    department: "",
    });
    let [error, setError] = useState("");
    let [notify, setNotify] = useState("");

    // When user makes changes, update the state
    const onChange = (ev) => {
      setError("");
      // Update from form and clear errors
      setState({
        ...state,
        [ev.target.name]: ev.target.value,
      });
      // Make sure the username is valid
      if (ev.target.name === "username") {
        let usernameInvalid = validUsername(ev.target.value);
        if (usernameInvalid) setError(`Error: ${usernameInvalid.error}`);
      }
      // Make sure password is valid
      else if (ev.target.name === "password") {
        let pwdInvalid = validPassword(ev.target.value);
        if (pwdInvalid) setError(`Error: ${pwdInvalid.error}`);
      }
    };

    // On form submit, push information to database
    const onSubmit = async (ev) => {
      ev.preventDefault();
      // Only proceed if there are no errors
      if (error !== "") return;
      const res = await fetch("/v1/firechief", {
        method: "POST",
        body: JSON.stringify(state),
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      if (res.ok) {
        // Notify users
        setNotify(`${state.username} registered.  You will now need to log in.`);
      } else {
        const err = await res.json();
        setError(err.error);
      }
    };

    //
    // const onAcceptRegister = () => {
    //   history.push("/login");
    // };

    // new onChange
    // const onChange = (ev) => {
    //     setState({
    //         update_form: ev.target.value
    //     });
    // };

    return (
        <FireRegisterContainer>
            <TitleLine>Fire Mitigation App</TitleLine>
            <NameRegisterContainer>
                <input placeholder="First"/>
                <input placeholder="Last"/>
            </NameRegisterContainer>
            <input placeholder="Email"/>
            <input placeholder="Phone"/>
            <input placeholder="Username"/>
            <input placeholder="Password"/>
            <select onChange={onChange} id="update-select">
                <option value="default" disabled>Department</option>
                <option value="unlisted">Unlisted</option>
                <option value="moraga-orinda">Moraga-Orinda</option>
            </select>
            <div style={{marginTop: "10px"}}>
                <input className="consent-checkbox" type="checkbox" id="consent-agree"/>
                <label style={{marginLeft: "6px"}} htmlFor="consent-agree">I agree to the <span style={{color:"389BFF", textDecoration:"none", cursor:"pointer"}}>terms and conditions</span></label>
            </div>
            <Link to="hubs"><FreeButton style={{backgroundColor:"#CB0000", marginTop: "18px"}}>Sign Up</FreeButton></Link>
        </FireRegisterContainer>
    );
};

ChiefRegister.propTypes = {
    history: PropTypes.object.isRequired,
};
