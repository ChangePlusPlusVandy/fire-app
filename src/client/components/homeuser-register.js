/* Copyright G. Hemingway, @2020 - All rights reserved */
"use strict";

import React, {useState, useEffect} from "react";
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
import {validPassword, validUsername} from "../../shared";
import {TitleLine, FreeButton, OwnerRegisterContainer, NameRegisterContainer} from "./shared"
import {Link} from "react-router-dom";

export const HomeuserRegister = ({history}) => {
    let [state, setState] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        api_key: "",
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
    };

    // On form submit, push information to database
    const onSubmit = async (ev) => {
        ev.preventDefault();
        // Only proceed if there are no errors
        if (error !== "") return;
        const res1 = await fetch("/v1/homeuser", {
            method: "POST",
            body: JSON.stringify(state),
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
        });
        // const res2 = await fetch("/v1/device", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         api_key: state.api_key
        //     }),
        //     credentials: "include",
        //     headers: {
        //         "content-type": "application/json",
        //     },
        // });
        if (res1.ok) {
            // Notify users
            setNotify(`${state.first_name} registered.`);
        } else {
            const err1 = await res1.json();
            // const err2 = await res2.json();
            setError(err1.error);
        }
    };

    return (
        <OwnerRegisterContainer>
            <TitleLine>Fire Mitigation App</TitleLine>
            <NameRegisterContainer>
                <input
                    id="first_name"
                    name="first_name"
                    placeholder="First Name"
                    onChange={onChange}
                    value={state.first_name}/>
                <input
                    id="last_name"
                    name="last_name"
                    placeholder="Last Name"
                    onChange={onChange}
                    value={state.last_name}/>
            </NameRegisterContainer>
            <input
                id="phone"
                name="phone"
                placeholder="Phone"
                onChange={onChange}
                value={state.phone}/>
            <input
                id="api_key"
                name="api_key"
                placeholder="Rachio API Key"
                onChange={onChange}
                value={state.api_key}/>
            <div style={{marginTop: "10px"}}>
                <input
                    id="consent-agree"
                    className="consent-checkbox"
                    name="consent_agree"
                    type="checkbox"
                />
                <label style={{marginLeft: "6px"}} htmlFor="consent-agree">I agree to the <span style={{
                    color: "389BFF",
                    textDecoration: "none",
                    cursor: "pointer"
                }}>terms and conditions</span></label>
            </div>
            <FreeButton onClick={onSubmit} style={{backgroundColor: "#CB0000", marginTop: "18px"}}>Sign Up</FreeButton>
            <Link to="owner-update" style={{backgroundColor: "#AFAFAF", marginTop: "80px"}}>Already Registered? Update
                Rachio Info</Link>
        </OwnerRegisterContainer>
    );
}

HomeuserRegister.propTypes = {
    history: PropTypes.object.isRequired,
};
