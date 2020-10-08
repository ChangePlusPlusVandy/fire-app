/* Copyright G. Hemingway, @2020 - All rights reserved */
"use strict";

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import md5 from "md5";

/**
 * @return {string}
 */
export function GravHash(email, size) {
  let hash = email && email.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
  hash = hash && hash.toLowerCase();
  hash = hash && md5(hash);
  return `https://www.gravatar.com/avatar/${hash}?size=${size}`;
}

const fontColor = "white";
const backgroundColor = "#800000";

const HeaderLeftBase = styled.div`
  flex-grow: 1;
  font-style: italic;
  & > h2 {
    color: ${fontColor};
    margin: 0.75em 0 0.75em 0.5em;
  }
  & > a {
    text-decoration: none;
    & > h2 {
      color: ${fontColor};
      margin: 0.75em 0 0.75em 0.5em;
    }
  }
`;

const HeaderLeft = ({ user }) => {
  return (
    <HeaderLeftBase>
      {user !== "" ? (
        <Link to={`/profile/${user}`}>
          <h2>Fire Prevention App</h2>
        </Link>
      ) : (
        <h2>Fire Prevention App</h2>
      )}
    </HeaderLeftBase>
  );
};

HeaderLeft.propTypes = {
  user: PropTypes.string,
};

/*************************************************************************/

const HeaderRightBase = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.vertical ? "row" : "column")};
  justify-content: center;
  align-items: ${(props) => (props.vertical ? "center" : "flex-end")};
  padding-right: 0.5em;
  & > a {
    color: ${fontColor};
    padding-right: ${(props) => (props.vertical ? "0.5em" : "0")};
  }
`;

const HeaderRight = ({ user, email }) => {
  const isLoggedIn = user !== "";
  return (
    <HeaderRightBase vertical={isLoggedIn}>
      {isLoggedIn ? (
        <Fragment>
          <Link to="/logout">Log Out</Link>
          <Link to={`/profile/${user}`}>
            <img src={GravHash(email, 40)} />
          </Link>
        </Fragment>
      ) : (
        <Fragment>
          <Link id="loginLink" to="/login">
            Log In
          </Link>
          <Link id="regLink" to="/register">
            Register
          </Link>
        </Fragment>
      )}
    </HeaderRightBase>
  );
};

HeaderRight.propTypes = {
  user: PropTypes.string,
  email: PropTypes.string,
};

/*******************************************************************/

const HeaderBase = styled.div`
  grid-area: hd;
  display: flex;
  background: ${backgroundColor};
`;

export const Header = ({ user = "", email = "" }) => (
  <HeaderBase>
    <HeaderLeft user={user} />
    <HeaderRight user={user} email={email} />
  </HeaderBase>
);

Header.propTypes = {
  user: PropTypes.string,
  email: PropTypes.string,
};
