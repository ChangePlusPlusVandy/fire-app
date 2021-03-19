"use strict";

import React, {useState, useEffect} from "react";
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
    Checkbox, FireRegisterContainer, TableButton,
} from "./shared";
import styled from "styled-components";
import {validPassword, validUsername} from "../../shared";
import {TitleLine, FreeButton, OwnerRegisterContainer, NameRegisterContainer, SprinklerTable} from "./shared"
import {Link} from "react-router-dom";
import SprinklerMap from "./sprinkler-map";

/****************************************************************************************/
const SprinklerHub = ({device}) => {
    console.log(device.status);
    return (
        <tr>
            <td>{device.owner}</td>
            <td>{device.firezone}</td>
            <td>
                {device.status === "" ? "" : device.status === "ONLINE" ? "🌐" : "👎"}
            </td>
        </tr>
    );
};

SprinklerHub.propTypes = {
    device: PropTypes.object.isRequired,
};

const SprinklerHeader = ({count, toggleMap, isMapOpen}) => {
    return (
        <SprinklerHeaderBase>
            <h4>
                Sprinkler Hubs ({count}
                ):
            </h4>
            <FormButton
                id="submitBtn"
                style={{marginBottom: "1em"}}
                onClick={toggleMap}
            >
                {isMapOpen ? "View Table" : "View Map"}
            </FormButton>
        </SprinklerHeaderBase>
    );
};

SprinklerHeader.propTypes = {
    count: PropTypes.number.isRequired,
};
/****************************************************************************************/

export const DevicesTable = ({history}) => {
    let [isLoaded, setIsLoaded] = useState(false);
    let [state, setState] = useState({
        devices: [
            {
                owner: "",
                id: "",
                latitude: 0,
                longitue: 0,
                name: "",
                owner_email: "",
                owner_id: "",
                owner_name: "",
                zones: [],
                firezone: "",
            },
        ],
    });
    const [isMapOpen, setIsMapOpen] = useState(false);

    const fetchDevices = async () => {
        fetch(`/v1/devices`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.devices);
                setState({devices: data.devices});
                setIsLoaded(true);
            })
            .catch((err) => console.log(err));
    };

    // useEffect(() => {
    //     fetchDevices().then(() => {
    //     });
    // }, [props]);

    if (isLoaded) {
        const deviceList = state.devices.map((device, index) => {
            return (
                <SprinklerHub
                    key={index}
                    device={device}
                />
            );
        });

        return (
            <FireRegisterContainer>
                <TitleLine>Fire Mitigation App</TitleLine>
                <SprinklerHeader
                    count={state.devices.length}
                    toggleMap={() => {
                        setIsMapOpen(!isMapOpen);
                    }}
                    isMapOpen={isMapOpen}
                />
                {isMapOpen ? (
                    <SprinklerMap devices={state.devices}/>
                ) : (
                    <SprinklerTable>
                        <thead>
                        <tr>
                            <td>Name</td>
                            <td>Firezone</td>
                            <td>Contact</td>
                            <td>Status</td>
                        </tr>
                        </thead>
                        <tbody>{deviceList}</tbody>
                    </SprinklerTable>
                )}
            </FireRegisterContainer>
        );
    } else {
        return <p>Hello</p>
    }
};

DevicesTable.propTypes =
    {
        history: PropTypes.object.isRequired,
    }


