/* Copyright G. Hemingway, @2020 - All rights reserved */
"use strict";

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ErrorBase = styled.div`
  grid-column: 1 / 3;
  color: red;
  display: flex;
  justify-content: center;
  padding: 1em;
  min-height: 1.2em;
`;

export const ErrorMessage = ({ msg = "", hide = false }) => {
    return (
        <ErrorBase style={{ display: hide ? "none" : "inherit" }}>{msg}</ErrorBase>
    );
};

ErrorMessage.propTypes = {
    msg: PropTypes.string,
    hide: PropTypes.bool,
};

const NotifyBase = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NotifyBox = styled.div`
  padding: 2em;
  border: 1px solid #000;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
`;

export const ModalNotify = ({ msg = "", onAccept, ...props }) => {
    return (
        <NotifyBase {...props}>
            <NotifyBox>
                <p>{msg}</p>
                {onAccept ? <FormButton onClick={onAccept}>Ok</FormButton> : null}
            </NotifyBox>
        </NotifyBase>
    );
};

export const FormBase = styled.form`
  display: grid;
  grid-template-columns: 30% 70%;
  grid-auto-rows: minmax(10px, auto);
  padding: 0.1em;
  @media (min-width: 500px) {
    padding: 1em;
  }
`;

export const FormLabel = styled.label`
  padding: 0.5em 0.5em;
  text-align: right;
  font-weight: bold;
`;

export const FormInput = styled.input`
  margin: 0.5em 0;
  width: 75%;
  padding-left: 5px;
`;

export const FormButton = styled.button`
  max-width: 200px;
  min-width: 150px;
  max-height: 2em;
  background: #6495ed;
  border: none;
  border-radius: 5px;
  line-height: 2em;
  font-size: 0.8em;
`;

export const TableButton = styled.button`
  background: #6495ed;
  border: none;
  border-radius: 5px;
  line-height: 2em;
  font-size: 0.8em;
`;

export const Header = styled.header`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #CB0000;
  color: #ffffff;
`;

export const TitleLine = styled.h1`
  color: #ffffff;
  font-size: 30px;
  display: flex;
  justify-content: space-between;
  text-align: left;
  padding-left: 20px;
`;

export const LogoutButton = styled.p`
  color: #ffffff;
  cursor: pointer;
  font-weight: bold;
  font-family: Helvetica;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  text-align: right;
  padding-right: 20px;
`;

export const AdminBtn = styled.button`
  color: black;
  background-color: transparent;
  border: none;
  width: 100px;
  height: 30px;
  text-align: left;
`;

export const FreeButton = styled.p`
  padding: 14px 18px 14px 18px;
  cursor: pointer;
  border-radius: 15px;
  text-align: center;
  color: white;
  font-weight: 600;
  box-shadow: 0px 3px 6px #00000029;
  text-decoration: none;
  margin-left: 10px;
  margin-right: 10px;

  &:hover {
    box-shadow:none;
  }
`;

export const AdminButtons = styled.div`
  display: flex;
  margin-top: 20px;
  margin-left: 4%;
  margin-bottom: 0px;
  justify-content: left;
  width: 100%;
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const ActivateOptionsContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
  width: 50%;
`;

export const FireZoneButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ChiefButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin-right: 50px;
`;

export const Table = styled.table`
  margin-top: 20px;
  margin-left: 2%;
  margin-bottom: 100px;
  margin-right: 2%;
  text-align: left;
  width: 96%;
  border: solid darkgrey;
`;

export const OwnerRegisterContainer = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 32%;

  & > input {
    width: 100%;
    height: 40px;
    padding-left: 16px;
    border: solid 1px #707070;
    border-radius: 15px;
    margin-bottom: 12px;
    font-family: Helvetica;
  }

  & > select {
    padding-left: 12px;
    height: 30px;
    border-radius: 12px;
    margin-bottom: 12px;
  }

  & > a {
    padding: 14px 18px 14px 18px;
    cursor: pointer;
    border-radius: 15px;
    color: white;
    font-weight: 600;
    box-shadow: 0px 3px 6px #00000029;
    text-decoration: none;
  }

  & > a:hover {
    box-shadow:none;
  }
`;

export const NameRegisterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  & > input {
    width: 50%;
    height: 40px;
    padding-left: 16px;
    border: solid 1px #707070;
    border-radius: 15px;
    margin-bottom: 12px;
    font-family: Helvetica;
  }
`;

// chief-register.js
export const FireRegisterContainer = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;

  & > input {
    width: 100%;
    height: 40px;
    padding-left: 16px;
    border: solid 1px #707070;
    border-radius: 15px;
    margin-bottom: 12px;
    font-family: Helvetica;
  }
`;

export const ApiRegisterButton = styled.button`
  padding-left: 40px;
  max-width: 200px;
  min-width: 150px;
  max-height: 2em;
  background: #6495ed;
  border: none;
  border-radius: 5px;
  line-height: 2em;
  font-size: 0.8em;
`;

export const FormSelect = styled.select`
  margin: 0.5em 0;
  width: 75%;
  padding-left: 5px;
`;
export const FormHeader = styled.h2`
  grid-column: 1 / 3;
`;

export const InfoBlock = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto;
  grid-template-areas: "labels info";
`;

export const InfoData = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  & > p {
    margin: 0.5em 0.25em;
  }
`;

export const InfoLabels = styled(InfoData)`
  align-items: flex-end;
  font-weight: bold;
`;

export const ShortP = styled.p`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${(props) => (props.checked ? "salmon" : "papayawhip")};
  border-radius: 3px;
  transition: all 150ms;
`;

const CheckboxContainer = styled.div`
  padding-top: 10px;
  display: inline-block;
  vertical-align: middle;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

export const Checkbox = ({ className, checked, onChange, ...props }) => (
    <CheckboxContainer className={className} onClick={onChange}>
        <HiddenCheckbox checked={checked} {...props} />
        <StyledCheckbox checked={checked}>
            <Icon viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
            </Icon>
        </StyledCheckbox>
    </CheckboxContainer>
);
