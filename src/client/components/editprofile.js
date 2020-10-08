/* Copyright G. Hemingway, @2020 - All rights reserved */
"use strict";

import React, { useState } from "react";
import {
  ErrorMessage,
  FormBase,
  FormInput,
  FormLabel,
  FormButton,
  ModalNotify,
} from "./shared";
import PropTypes from "prop-types";
import { Register } from "./register";

export const EditProfile = ({ history }) => {
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [city, setCity] = useState("");
  let [error, setError] = useState("");
  let [notify, setNotify] = useState("");

  const onSubmit = async (ev) => {
    ev.preventDefault();
    let state = {};
    if (firstName) {
      state["first_name"] = firstName;
    }
    if (lastName) {
      state["last_name"] = lastName;
    }
    if (city) {
      state["city"] = city;
    }

    const res = await fetch("/v1/user", {
      method: "PUT",
      body: JSON.stringify(state),
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    if (res.ok) {
      // Notify users
      setNotify(`Values updated`);
    } else {
      const err = await res.json();
      setError(err.error);
    }
  };

  const onAccept = () => {
    history.push("/login");
  };

  return (
    <div style={{ gridArea: "main" }}>
      {notify !== "" ? (
        <ModalNotify id="notification" msg={notify} onAccept={onAccept} />
      ) : null}
      <ErrorMessage msg={error} />
      <FormBase>
        <FormLabel htmlFor="first_name">First Name:</FormLabel>
        <FormInput
          id="first_name"
          name="first_name"
          placeholder="First Name"
          onChange={(ev) => setFirstName(ev.target.value)}
        />

        <FormLabel htmlFor="last_name">Last Name:</FormLabel>
        <FormInput
          id="last_name"
          name="last_name"
          placeholder="Last Name"
          onChange={(ev) => setLastName(ev.target.value)}
        />

        <FormLabel htmlFor="city">City:</FormLabel>
        <FormInput
          id="city"
          name="city"
          placeholder="City"
          onChange={(ev) => setCity(ev.target.value)}
        />

        <div />
        <FormButton id="submitBtn" onClick={onSubmit}>
          Submit
        </FormButton>
      </FormBase>
    </div>
  );
};

Register.propTypes = {
  history: PropTypes.object.isRequired,
};
