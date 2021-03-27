/* Copyright G. Hemingway, @2020 - All rights reserved */
"use strict";
import React, {useState} from "react";
import {render} from "react-dom";
import styled from "styled-components";
import {BrowserRouter, Route, Redirect} from "react-router-dom";
import {Landing} from "./components/landing";
import {Logout} from "./components/logout";
import {HomeuserRegister} from "./components/homeuser-register";
import {OwnerUpdate} from "./components/owner-update";
import {ChiefLogin} from "./components/chief-login";
import {ChiefRegister} from "./components/chief-register";
import {DevicesTable} from "./components/devices-table";

const defaultUser = {
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    city: "",
    department: "",
    is_authorized: "",
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-family: Helvetica;
`;

const MyApp = () => {
    // If the user has logged in, grab info from sessionStorage
    const data = localStorage.getItem("user");
    let [state, setState] = useState(data ? JSON.parse(data) : defaultUser);
    console.log(`Starting as user: ${state.username}`);

    const loggedIn = () => {
        return state.username;
    };

    const isAuthorized = () => {
        return state.is_authorized;
    }

    const logIn = async (username) => {
        try {
            const res = await fetch(`/v1/firechief/${username}`);
            const user = await res.json();
            localStorage.setItem("user", JSON.stringify(user));
            setState(user);
        } catch (err) {
            alert("An unexpected error occurred.");
            logOut();
        }
    };

    const logOut = () => {
        // Wipe localStorage
        localStorage.removeItem("user");
        // Reset user state
        setState(defaultUser);
    };

    return (
        <BrowserRouter>
            <MainContainer>
                {/*Shared access pages*/}
                <Route exact path="/" component={Landing}/>

                <Route
                    path="/logout"
                    render={(p) => <Logout {...p} logOut={logOut}/>}
                />

                <Route
                    path="/homeuser-register"
                    component={HomeuserRegister}
                />

                <Route
                    path="/owner-update"
                    component={OwnerUpdate}
                />

                <Route
                    path="/chief-login"
                    render={(p) =>
                        loggedIn() && isAuthorized() ? (
                            <Redirect to={`/devices-table`}/>
                        ) : (
                            <ChiefLogin {...p} logIn={logIn}/>
                        )
                    }
                />

                <Route
                    path="/chief-register"
                    component={ChiefRegister}
                />

                <Route
                    path="/devices-table"
                    render={(p) => {
                        return loggedIn() && isAuthorized() ? (
                            <DevicesTable/>
                        ) : (
                            <ChiefLogin {...p} logIn={logIn}/>
                        );
                    }}
                />

                {/*<Route*/}
                {/*    path="/profile/:username"*/}
                {/*    render={(p) => (*/}
                {/*        <Profile {...p} currentUser={state.username} logIn={logIn}/>*/}
                {/*    )}*/}
                {/*/>*/}
                {/*Homeowner access pages*/}
                {/*<Route*/}
                {/*    path="/sprinkler-register"*/}
                {/*    render={(p) => {*/}
                {/*        return loggedIn() ? (*/}
                {/*            isFireChief() ? (*/}
                {/*                <Redirect to={`/profile/${state.username}`}/>*/}
                {/*            ) : (*/}
                {/*                <SprinklerRegister*/}
                {/*                    {...p}*/}
                {/*                    owner={state.username}*/}
                {/*                    city={state.city}*/}
                {/*                    lat={state.lat}*/}
                {/*                    lng={state.lng}*/}
                {/*                />*/}
                {/*            )*/}
                {/*        ) : (*/}
                {/*            <Login {...p} logIn={logIn}/>*/}
                {/*        );*/}
                {/*    }}*/}
                {/*/>*/}

                {/*Fire chief access pages*/}
                {/*<Route*/}
                {/*    path="/sprinkler-map"*/}
                {/*    render={(p) => {*/}
                {/*        return loggedIn() ? (*/}
                {/*            !isFireChief() ? (*/}
                {/*                <Redirect to={`/profile/${state.username}`}/>*/}
                {/*            ) : (*/}
                {/*                <SprinklerMap {...p} />*/}
                {/*            )*/}
                {/*        ) : (*/}
                {/*            <Login {...p} logIn={logIn}/>*/}
                {/*        );*/}
                {/*    }}*/}
                {/*/>*/}
                {/*<Route*/}
                {/*    path="/device/:id"*/}
                {/*    render={(p) => {*/}
                {/*        return loggedIn() ? (*/}
                {/*            !isFireChief() ? (*/}
                {/*                <Redirect to={`/profile/${state.username}`}/>*/}
                {/*            ) : (*/}
                {/*                <Device {...p} />*/}
                {/*            )*/}
                {/*        ) : (*/}
                {/*            <Login {...p} logIn={logIn}/>*/}
                {/*        );*/}
                {/*    }}*/}
                {/*/>*/}
                {/*<Route path="/edit" render={(p) => <EditProfile {...p} />}/>*/}
            </MainContainer>
        </BrowserRouter>
    );
};

render(<MyApp/>, document.getElementById("mainDiv"));
