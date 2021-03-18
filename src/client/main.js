/* Copyright G. Hemingway, @2020 - All rights reserved */
"use strict";
import React, { useState } from "react";
import { render } from "react-dom";
import styled from "styled-components";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import { Header } from "./components/header";
import { Landing } from "./components/landing";
import { Login } from "./components/login";
import { Logout } from "./components/logout";
import {HomeuserRegister} from "./components/homeuser-register";
import {OwnerUpdate} from "./components/owner-update";
import { Profile } from "./components/profile";
import { EditProfile } from "./components/editprofile";
import SprinklerRegister from "./components/sprinkler-registration";
import SprinklerMap from "./components/sprinkler-map";
import {ChiefLogin} from "./components/chief-login";
import {ChiefRegister} from "./components/chief-register";
import {Hubs} from "./components/hubs";
import SprinklerMangement from "./components/sprinkler-management";
//import SprinklerMap from "./components/sprinkler-map";

const defaultUser = {
  username: "",
  first_name: "",
  last_name: "",
  primary_email: "",
  city: "",
};

/*const GridBase = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "hd"
    "main"
    "ft";

  @media (min-width: 500px) {
    grid-template-columns: 40px 50px 1fr 50px 40px;
    grid-template-rows: auto auto auto;
    grid-template-areas:
      "hd hd hd hd hd"
      "sb sb main main main"
      "ft ft ft ft ft";
  }
`;*/

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

  const isFireChief = () => {
    // Need call to database here
    return state.is_fire_chief;
  };

  const logIn = async (username) => {
    try {
      const response = await fetch(`/v1/user/${username}`);
      const user = await response.json();
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
        {/*<Header user={state.username} email={state.primary_email} />*/}
        {/*Shared access pages*/}
        <Route exact path="/" component={Landing} />
        <Route
          path="/login"
          render={(p) =>
            loggedIn() ? (
              !isFireChief() ? (
                <Redirect to={`/sprinkler-register`} />
              ) : (
                <Redirect to={`/profile/${state.username}`} />
              )
            ) : (
              <Login {...p} logIn={logIn} />
            )
          }
        />
        <Route
          path="/logout"
          render={(p) => <Logout {...p} logOut={logOut} />}
        />
        <Route
          path="/homeuser-register"
          render={(p) => {
            return loggedIn() ? (
              <Redirect to={`/profile/${state.username}`} />
            ) : (
              <HomeuserRegister {...p} />
            );
          }}
        />

        <Route
          path="/owner-update"
          component={OwnerUpdate}
        />
        <Route
            path="/chief-login"
            component={ChiefLogin}
        />
        <Route
            path="/chief-register"
            component={ChiefRegister}
        />
        <Route
            path="/hubs"
            component={Hubs}
        />
        <Route
            path="/sprinkler-management"
            component={SprinklerMangement}
        />
        <Route
          path="/profile/:username"
          render={(p) => (
            <Profile {...p} currentUser={state.username} logIn={logIn} />
          )}
        />
        {/*Homeowner access pages*/}
        <Route
          path="/sprinkler-register"
          render={(p) => {
            return loggedIn() ? (
              isFireChief() ? (
                <Redirect to={`/profile/${state.username}`} />
              ) : (
                <SprinklerRegister
                  {...p}
                  owner={state.username}
                  city={state.city}
                  lat={state.lat}
                  lng={state.lng}
                />
              )
            ) : (
              <Login {...p} logIn={logIn} />
            );
          }}
        />

        {/*Fire chief access pages*/}
        <Route
          path="/sprinkler-map"
          render={(p) => {
            return loggedIn() ? (
              !isFireChief() ? (
                <Redirect to={`/profile/${state.username}`} />
              ) : (
                <SprinklerMap {...p} />
              )
            ) : (
              <Login {...p} logIn={logIn} />
            );
          }}
        />
        <Route
          path="/device/:id"
          render={(p) => {
            return loggedIn() ? (
              !isFireChief() ? (
                <Redirect to={`/profile/${state.username}`} />
              ) : (
                <Device {...p} />
              )
            ) : (
              <Login {...p} logIn={logIn} />
            );
          }}
        />
        <Route path="/edit" render={(p) => <EditProfile {...p} />} />
      </MainContainer>
    </BrowserRouter>
  );
};

render(<MyApp />, document.getElementById("mainDiv"));
