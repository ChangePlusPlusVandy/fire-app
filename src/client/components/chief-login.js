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
  Checkbox, FireRegisterContainer, NameRegisterContainer, TitleLine, FreeButton, OwnerRegisterContainer,
} from "./shared";
import styled from "styled-components";
import { validPassword, validUsername } from "../../shared";
import {Link} from "react-router-dom";

export const ChiefLogin = ({ history }) => {


  return (
      <FireRegisterContainer>
        <TitleLine>Fire Mitigation App</TitleLine>
          <input placeholder="Username"/>
          <input placeholder="Password"/>
          <FreeButton style={{backgroundColor:"#cb0000", marginTop: "18px"}}>Log In</FreeButton>
          <p style={{marginTop: "1px"}}>or</p>
          <Link to="chief-register"><FreeButton style={{backgroundColor:"#b2b2b2", marginTop: "1px"}}>Sign Up As Fire Chief</FreeButton></Link>
          <p style={{color: "#CB0000", fontWeight: "bold"}}>Forgot Password</p>
      </FireRegisterContainer>
  );
    // <div style={{ gridArea: "main" }}>
    //   <div>
    //     {notify !== "" ? (
    //       <ModalNotify
    //         id="notification"
    //         msg={notify}
    //         onAccept={onAcceptRegister}
    //       />
    //     ) : null}
    //     <ErrorMessage msg={error} />
    //     <FormBase>
    //       <FormLabel htmlFor="username">Username:</FormLabel>
    //       <FormInput
    //         id="username"
    //         name="username"
    //         placeholder="Username"
    //         onChange={onChange}
    //         value={state.username}
    //       />
    //       <FormLabel htmlFor="first_name">First Name:</FormLabel>
    //       <FormInput
    //         id="first_name"
    //         name="first_name"
    //         placeholder="First Name"
    //         onChange={onChange}
    //         value={state.first_name}
    //       />
    //       <FormLabel htmlFor="last_name">Last Name:</FormLabel>
    //       <FormInput
    //         id="last_name"
    //         name="last_name"
    //         placeholder="Last Name"
    //         onChange={onChange}
    //         value={state.last_name}
    //       />
    //
    //       <FormLabel htmlFor="city">City:</FormLabel>
    //       <FormSelect id="city" name="city" onChange={onChange}>
    //         <option>Nashville</option>
    //         <option>Berkley</option>
    //         <option>Moraga</option>
    //         <option>West Chester</option>
    //         <option>NYC</option>
    //       </FormSelect>
    //
    //       <FormLabel htmlFor="primary_email">Email:</FormLabel>
    //       <FormInput
    //         id="primary_email"
    //         name="primary_email"
    //         type="email"
    //         placeholder="Email Address"
    //         onChange={onChange}
    //         value={state.primary_email}
    //       />
    //       <FormLabel htmlFor="fire_district_code">
    //         Fire District Code:
    //       </FormLabel>
    //       <FormInput
    //         id="fire_district_code"
    //         name="fire_district_code"
    //         placeholder="Fire District Code"
    //         onChange={onChange}
    //         value={state.fire_district_code}
    //       />
    //       <FormLabel htmlFor="is_fire_chief">Fire Chief:</FormLabel>
    //       <Checkbox
    //         onChange={toggleCheck}
    //         checked={state.is_fire_chief}
    //         id="is_fire_chief"
    //         name="is_fire_chief"
    //       />
    //       {/*<FormInput
    //         id="is_fire_chief"
    //         type="checkbox"
    //         name="is_fire_chief"
    //         onChange={toggleCheck}
    //         value={state.is_fire_chief}
    //       /> */}
    //       {!state.is_fire_chief && (
    //         <FormLabel htmlFor="coordinates">Home Coordinates</FormLabel>
    //       )}
    //       {!state.is_fire_chief && (
    //         <FormInput
    //           id="coordinates"
    //           name="coordinates"
    //           type="coordinates"
    //           placeholder="coordinates"
    //           value={`${state.lat} ${state.lng}`}
    //           onChange={() => {}}
    //         />
    //       )}
    //       <FormLabel htmlFor="password">Password:</FormLabel>
    //       <FormInput
    //         id="password"
    //         name="password"
    //         type="password"
    //         placeholder="Password"
    //         onChange={onChange}
    //         value={state.password}
    //       />
    //       <div />
    //       <FormButton id="submitBtn" onClick={onSubmit}>
    //         ChiefLogin
    //       </FormButton>
    //     </FormBase>
    //   </div>
    // </div>
};


ChiefLogin.propTypes = {
  history: PropTypes.object.isRequired,
};
