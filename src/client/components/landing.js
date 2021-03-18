/* Copyright G. Hemingway, @2020 - All rights reserved */
"use strict";

import React from "react";
import styled from "styled-components";
import { TitleLine } from "./shared"
import { Link } from "react-router-dom";

const LandingContainer = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LandingButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  & > a {
    width: 120px;
    height: 120px;
    background-color: #CB0000;
    margin: 32px;
    margin-top: 12px;
    color: white;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    text-align: center;
    text-decoration: none;
    box-shadow: 0px 3px 6px #00000029;
  }

  & > a:hover {
    box-shadow:none;
  }
`;

const LandingInfoContainer = styled.div`
  width: 55%;
  display: flex;
  flex-direction: column;
`;

export const Landing = () => (
  <LandingContainer>
    <TitleLine>Fire Mitigation App</TitleLine>
    <LandingButtonContainer>
      <Link to="chief-register">Fire Chief</Link>
      <Link to="homeuser-register">Home User</Link>
    </LandingButtonContainer>
    <LandingInfoContainer>
      <h4 style={{marginBottom: "4px"}}>About the Fire Mitigation App</h4>
      <p>This is the Fire Mitigation App. This app was built by Change++ at Vanderbilt University.</p>
    </LandingInfoContainer>
  </LandingContainer>
);
