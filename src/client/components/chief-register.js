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

    const onChange = (ev) => {
        setState({
            update_form: ev.target.value
        });
    };

    const onSubmit = async (ev) => {
        ev.preventDefault();
        console.log("Registering...");
    }

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
