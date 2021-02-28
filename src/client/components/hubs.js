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
import { TitleLine, FreeButton, OwnerRegisterContainer, NameRegisterContainer, SprinklerTable } from "./shared"
import { Link } from "react-router-dom";


export const Hubs = ({ history }) => {
    return (
        <FireRegisterContainer>
            <TitleLine>Fire Prevention App</TitleLine>
            <SprinklerTable>
                <tr>
                    <td>Name</td>
                    <td>Zone</td>
                    <td>Location</td>
                    <td>Contact</td>
                    <td>Status</td>
                </tr>
            </SprinklerTable>
        </FireRegisterContainer>
    );
};

Hubs.propTypes = {
    history: PropTypes.object.isRequired,
};
