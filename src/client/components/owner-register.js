/* Copyright G. Hemingway, @2020 - All rights reserved */
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
  Checkbox,
} from "./shared";
import styled from "styled-components";
import { validPassword, validUsername } from "../../shared";
import { TitleLine, FreeButton, OwnerRegisterContainer, NameRegisterContainer } from "./shared"
import { Link} from "react-router-dom";

/*
*/

export const OwnerRegister = ({ history }) => {
  /*let [state, setState] = useState({
    username: "",
    first_name: "",
    last_name: "",
    city: "Nashville",
    primary_email: "",
    password: "",
    fire_district_code: 123,
    is_fire_chief: false,
    lat: 0,
    lng: 0,
  });
  let [error, setError] = useState("");
  let [notify, setNotify] = useState("");

  const getCoordinates = () => {};

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setState({
        ...state,
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setIsLoading(false);
    });
    document.getElementById("username").focus();
  }, []);

  const toggleCheck = (ev) => {
    setState({
      ...state,
      is_fire_chief: !state.is_fire_chief,
    });
  };

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
*/
  const onSubmit = async (ev) => {
    ev.preventDefault();
    console.log("Registering...");
    /*// Only proceed if there are no errors
    if (error !== "") return;
    const res = await fetch("/v1/user", {
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
    }*/
  };
  /*
  const onAcceptRegister = () => {
    history.push("/login");
  };*/

  return (
    <OwnerRegisterContainer>
        <TitleLine>Fire Prevention App</TitleLine>
        <NameRegisterContainer>
            <input placeholder="First"/>
            <input placeholder="Last"/>
        </NameRegisterContainer>
        <input placeholder="Phone"/>
        <input placeholder="Rachio API Key"/>
        <div style={{marginTop: "10px"}}>
            <input className="consent-checkbox" type="checkbox" id="consent-agree"/>
            <label style={{marginLeft: "6px"}} htmlFor="consent-agree">I agree to the <span style={{color:"389BFF", textDecoration:"none", cursor:"pointer"}}>terms and conditions</span></label>
        </div>
        <FreeButton onClick={onSubmit} style={{backgroundColor:"#CB0000", marginTop: "18px"}}>Sign Up</FreeButton>
        <Link to="owner-update" style={{backgroundColor:"#AFAFAF", marginTop: "80px"}}>Already Registered? Update Rachio Info</Link>
    </OwnerRegisterContainer>
  );
      {/*
    <div style={{ gridArea: "main" }}>
      <div>
        {notify !== "" ? (
          <ModalNotify
            id="notification"
            msg={notify}
            onAccept={onAcceptRegister}
          />
        ) : null}
        <ErrorMessage msg={error} />
        <FormBase>
          <FormLabel htmlFor="username">Username:</FormLabel>
          <FormInput
            id="username"
            name="username"
            placeholder="Username"
            onChange={onChange}
            value={state.username}
          />
          <FormLabel htmlFor="first_name">First Name:</FormLabel>
          <FormInput
            id="first_name"
            name="first_name"
            placeholder="First Name"
            onChange={onChange}
            value={state.first_name}
          />
          <FormLabel htmlFor="last_name">Last Name:</FormLabel>
          <FormInput
            id="last_name"
            name="last_name"
            placeholder="Last Name"
            onChange={onChange}
            value={state.last_name}
          />

          <FormLabel htmlFor="city">City:</FormLabel>
          <FormSelect id="city" name="city" onChange={onChange}>
            <option>Nashville</option>
            <option>Berkley</option>
            <option>Moraga</option>
            <option>West Chester</option>
            <option>NYC</option>
          </FormSelect>

          <FormLabel htmlFor="primary_email">Email:</FormLabel>
          <FormInput
            id="primary_email"
            name="primary_email"
            type="email"
            placeholder="Email Address"
            onChange={onChange}
            value={state.primary_email}
          />
          <FormLabel htmlFor="fire_district_code">
            Fire District Code:
          </FormLabel>
          <FormInput
            id="fire_district_code"
            name="fire_district_code"
            placeholder="Fire District Code"
            onChange={onChange}
            value={state.fire_district_code}
          />
          <FormLabel htmlFor="is_fire_chief">Fire Chief:</FormLabel>
          <Checkbox
            onChange={toggleCheck}
            checked={state.is_fire_chief}
            id="is_fire_chief"
            name="is_fire_chief"
          />
          {/*<FormInput
            id="is_fire_chief"
            type="checkbox"
            name="is_fire_chief"
            onChange={toggleCheck}
            value={state.is_fire_chief}
          /> }
          {!state.is_fire_chief && (
            <FormLabel htmlFor="coordinates">Home Coordinates</FormLabel>
          )}
          {!state.is_fire_chief && (
            <FormInput
              id="coordinates"
              name="coordinates"
              type="coordinates"
              placeholder="coordinates"
              value={`${state.lat} ${state.lng}`}
              onChange={() => {}}
            />
          )}
          <FormLabel htmlFor="password">Password:</FormLabel>
          <FormInput
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={onChange}
            value={state.password}
          />
          <div />
          <FormButton id="submitBtn" onClick={onSubmit}>
            Register
          </FormButton>
        </FormBase>
      </div>
          </div>*/}
  
};

OwnerRegister.propTypes = {
  history: PropTypes.object.isRequired,
};
