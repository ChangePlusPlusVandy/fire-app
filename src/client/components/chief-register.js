"use strict";

import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import { FireRegisterContainer, OwnerRegisterContainer, PageContainer, Header, } from "./shared";
import {TitleLine, FreeButton, NameRegisterContainer} from "./shared"
import {validPassword, validUsername, validFCEmail} from "../../shared/index";
import {Link} from "react-router-dom";

export const ChiefRegister = ({history}) => {
    let [state, setState] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        username: "",
        password: "",
        department: "",
    });
    let [consent, setConsent] = useState(false);
    let [usernameError, setUsernameError] = useState();
    let [passwordError, setPasswordError] = useState();
    let [FCEmailError, setFCEmailError] = useState();
    let [allValid, setAllValid] = useState(false);
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
        if (ev.target.name === "username") setUsernameError(validUsername(ev.target.value))
        // Make sure password is valid
        else if (ev.target.name === "password") setPasswordError(validPassword(ev.target.value))
        // Make sure email is valid
        else if (ev.target.name === "email") setFCEmailError(validFCEmail(ev.target.value))

        // check if all is valid
        // if (state.first_name && state.last_name  && state.phone
        //     && !usernameError && !passwordError && !FCEmailError) {
        //     setAllValid(true);
        // }
    };

    // change checkbox value
    const toggleCheck = (ev) => {
        setConsent(!consent);
    };

    // On form submit, push information to database
    const onSubmit = async (ev) => {
        ev.preventDefault();
        // Only proceed if consent is checked
        if (!consent) {
            window.alert("You to have agree to the terms and conditions.");
            return;
        }

        if (usernameError) {
            window.alert(usernameError.error);
            return;
        }

        if (passwordError) {
            window.alert(passwordError.error);
            return;
        }

        if (FCEmailError) {
            window.alert(FCEmailError.error);
            return;
        }

        // proceed only if there are no errors
        if (error !== "") {
            window.alert(error);
            return;
        }
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
            window.alert(`${state.username} successfully registered.  You will now need to log in.`);
            history.push("/chief-login");
        } else {
            const err = await res.json();
            setError(err.error);
        }
    };

    return (
        <PageContainer>
            <Header>
                <Link to="" style={{ textDecoration: 'none' }}><TitleLine>Fire Mitigation App</TitleLine></Link>
            </Header>
        <OwnerRegisterContainer>
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
                id="email"
                name="email"
                placeholder="Email"
                onChange={onChange}
                value={state.email}/>
            <input
                id="phone"
                name="phone"
                placeholder="Phone"
                onChange={onChange}
                value={state.phone}/>
            <input
                id="username"
                name="username"
                placeholder="Username"
                onChange={onChange}
                value={state.username}/>
            <input
                id="password"
                name="password"
                placeholder="Password"
                type="password"
                onChange={onChange}
                value={state.password}/>
            <select
                id="department"
                name="department"
                onChange={onChange}
                value={state.department}>
                <option default value="default" disabled>Select Department</option>
                <option value="Unlisted">Unlisted</option>
                <option value="moraga">Moraga</option>
                <option value="orinda">Orinda</option>
            </select>
            <div style={{marginTop: "10px"}}>
                <input
                    className="consent-checkbox"
                    type="checkbox"
                    id="consent"
                    name="consent"
                    onChange={toggleCheck}
                    value={consent}/>
                <label style={{marginLeft: "6px"}} htmlFor="consent-agree">I agree to the <span style={{
                    color: "389BFF",
                    textDecoration: "none",
                    cursor: "pointer"
                }}>terms and conditions</span></label>
            </div>
            <FreeButton onClick={onSubmit} style={{backgroundColor: "#CB0000", marginTop: "18px"}}>Sign Up</FreeButton>
        </OwnerRegisterContainer>
        </PageContainer>
    );
};

ChiefRegister.propTypes = {
    history: PropTypes.object.isRequired,
};
