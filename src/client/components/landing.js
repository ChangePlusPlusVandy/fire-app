/* Copyright G. Hemingway, @2020 - All rights reserved */
"use strict";

import React from "react";
import styled from "styled-components";

const LandingBase = styled.div`
  justify-content: center;
  grid-area: main;
`;

export const Landing = () => (
  <LandingBase>
    <h1>Welcome</h1>
    <p>Login or register to get started</p>
    <div style={{ gridArea: "ft" }}>Built by Change++</div>
  </LandingBase>
);
