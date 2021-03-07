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
import { Link } from "react-router-dom";

const IndependentInput = styled.input`
    width: 64%;
    height: 40px;
    padding-left: 16px;
    border: solid 1px #707070;
    border-radius: 15px;
    margin-bottom: 12px;
    font-family: Helvetica;
`;

export const OwnerUpdate = ({ history }) => {

    let [state, setState] = useState({
        update_form: ""
    })
    
    
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

    const onChange = (ev) => {
        setState({
            update_form: ev.target.value
        });
    };

    const renderUpdateForm = () => {
        console.log(state.update_form);
        switch (state.update_form) {
            case "" :
                return (
                    <div style={{display:"none"}}></div>
                );
            case "permission":
                return (
                    <div>
                        <div>To be completed.</div>
                        <FreeButton onClick={onSubmit} style={{backgroundColor:"#CB0000", marginTop: "18px"}}>Submit</FreeButton>
                    </div>
                );
            case "location":
                return (
                    <div>
                        <div style={{color:"#CB0000"}}>Just press Submit. We'll do the rest!</div>
                        <FreeButton onClick={onSubmit} style={{backgroundColor:"#CB0000", marginTop: "18px"}}>Submit</FreeButton>
                    </div>
                );
            case "name":
                return (
                    <div>
                        <NameRegisterContainer>
                            <input placeholder="First"/>
                            <input placeholder="Last"/>
                        </NameRegisterContainer>
                        <FreeButton onClick={onSubmit} style={{backgroundColor:"#CB0000", marginTop: "18px"}}>Submit</FreeButton>
                    </div>
                );
            case "email":
                return (
                    <div>
                        <IndependentInput placeholder="Email"></IndependentInput>
                        <FreeButton onClick={onSubmit} style={{backgroundColor:"#CB0000", marginTop: "18px"}}>Submit</FreeButton>
                    </div>
                );
        }
    };
  
    return (
      <OwnerRegisterContainer>
          <TitleLine>Fire Mitigation App</TitleLine>
          <input placeholder="Rachio API Key"/>
          <select onChange={onChange} id="update-select">
              <option value="">What information are you updating today?</option>
              <option value="permission">Sprinkler Permission</option>
              <option value="location">Sprinkler Location</option>
              <option value="name">User Name</option>
              <option value="email">User Email</option>
          </select>
          {renderUpdateForm()}
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
  
  OwnerUpdate.propTypes = {
    history: PropTypes.object.isRequired,
  };