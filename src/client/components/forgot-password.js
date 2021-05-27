"use strict";

import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import { FireRegisterContainer, OwnerRegisterContainer, PageContainer, Header, } from "./shared";
import {TitleLine, FreeButton, NameRegisterContainer} from "./shared"
import {validPassword, validUsername, validFCEmail} from "../../shared/index";
import {Link} from "react-router-dom";

export const ForgotPassword = ({history}) => {
    const [state, setState] = useState({
        code: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [codeSent, setCodeSent] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [isSendingCode, setIsSendingCode] = useState(false);
    let [error, setError] = useState("");
    let [FCEmailError, setFCEmailError] = useState();

    // When user makes changes, update the state
    const onChange = (ev) => {
        setError("");
        // Update from form and clear errors
        setState({[ev.target.name]: ev.target.value});
        // Make sure the username is valid
        if (ev.target.name === "username") setUsernameError(validUsername(ev.target.value))
        // Make sure password is valid
        else if (ev.target.name === "password") setPasswordError(validPassword(ev.target.value))
        // Make sure email is valid
        else if (ev.target.name === "email") setFCEmailError(validFCEmail(ev.target.value))
    }

    return (
        <PageContainer>
            <Header>
                <Link to="" style={{ textDecoration: 'none' }}><TitleLine>Fire Mitigation App</TitleLine></Link>
            </Header>
            <OwnerRegisterContainer>
                <p>Please enter your email to receive a temporary new password.</p>
                <input
                    id="email"
                    name="email"
                    placeholder="Email"
                    onChange={onChange}
                    value={state.email}/>
            </OwnerRegisterContainer>
        </PageContainer>
    );
};

ForgotPassword.propTypes = {
    history: PropTypes.object.isRequired,
};
