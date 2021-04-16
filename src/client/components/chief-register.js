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
    let [lengthText, setLengthText] = useState("✖ ");
    let [numberText, setNumberText] = useState("✖ ");
    let [letterText, setLetterText] = useState("✖ ");
    let [charText, setCharText] = useState("✖ ");
    let [capitalText, setCapitalText] = useState("✖ ");

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
        else if (ev.target.name === "password") {
            const pass = ev.target.value;
            if (pass.length >= 8) {
                document.getElementById("length").style.color = "green";
                document.getElementById("lengthSpan").style.color = "green";
                setLengthText("✔ ");
            } else {
                document.getElementById("length").style.color = "red";
                document.getElementById("lengthSpan").style.color = "red";
                setLengthText("✖ ");
            }
            if (pass.match(/[0-9]/i)) {
                document.getElementById("number").style.color = "green";
                document.getElementById("numberSpan").style.color = "green";
                setNumberText("✔ ");
            } else {
                document.getElementById("number").style.color = "red";
                document.getElementById("numberSpan").style.color = "red";
                setNumberText("✖ ");
            }
            if (pass.match(/[a-z]/)) {
                document.getElementById("letter").style.color = "green";
                document.getElementById("letterSpan").style.color = "green";
                setLetterText("✔ ");
            } else {
                document.getElementById("letter").style.color = "red";
                document.getElementById("letterSpan").style.color = "red";
                setLetterText("✖ ");
            }
            if (pass.match(/\@|\!|\#|\$|\%|\^/i)) {
                document.getElementById("char").style.color = "green";
                document.getElementById("charSpan").style.color = "green";
                setCharText("✔ ");
            } else {
                document.getElementById("char").style.color = "red";
                document.getElementById("charSpan").style.color = "red";
                setCharText("✖ ");
            }
            if (pass.match(/[A-Z]/)) {
                document.getElementById("capital").style.color = "green";
                document.getElementById("capitalSpan").style.color = "green";
                setCapitalText("✔ ");
            } else {
                document.getElementById("capital").style.color = "red";
                document.getElementById("capitalSpan").style.color = "red";
                setCapitalText("✖ ");
            }
            setPasswordError(validPassword(ev.target.value));
        }
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

    const invalid = {
        color: "red",
    };

    const onFocus = () => {
        document.getElementById("message").style.display = "block";
    };

    const onBlur = () => {
        document.getElementById("message").style.display = "none";
    }

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
                onFocus={onFocus}
                onBlur={onBlur}
                value={state.password}/>
                <div id="message" style={{display: "none"}}>
                    <h3>Password must contain the following:</h3>
                    <p id="letter" style={invalid}><span id="letterSpan">{letterText}</span>A <b>lowercase</b> letter</p>
                    <p id="capital" style={invalid}><span id="capitalSpan">{capitalText}</span>A <b>capital (uppercase)</b> letter</p>
                    <p id="number" style={invalid}><span id="numberSpan">{numberText}</span>A <b>number</b></p>
                    <p id="char" style={invalid}><span id="charSpan">{charText}</span>A <b>special character</b></p>
                    <p id="length" style={invalid}><span id="lengthSpan">{lengthText}</span>Minimum <b>8 characters</b></p>
                </div>
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
