"use strict";

import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {PageContainer, Header, TitleLine, DevicesPageContainer, FreeButton, SprinklerTable, LogoutButton} from "./shared";
import SprinklerMap from "./sprinkler-map";
import {Logout} from "./logout";

/****************************************************************************************/
const SprinklerHub = ({ device }) => {
    console.log(device.status);
    return (
        <tr>
            <td>{device.owner_name}</td>
            <td>{device.firezone}</td>
            <td>{device.owner_email}</td>
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
            <FreeButton
                id="viewButton"
                style={{marginBottom: "1em"}}
                onClick={toggleMap}
            >
                {isMapOpen ? "View Table" : "View Map"}
            </FreeButton>
        </SprinklerHeaderBase>
    );
};

SprinklerHeader.propTypes = {
    count: PropTypes.number.isRequired,
};
/****************************************************************************************/

const onSubmit = ({ history, logOut }) => {
    useEffect(() => {
        fetch("/v1/session", { method: "DELETE" }).then(() => {
            logOut();
            // Go to login page
            history.push("/chief-login");
        });
    }, []);
    return <></>;
}

onSubmit.propTypes = {
    history: PropTypes.object.isRequired,
    logOut: PropTypes.func.isRequired,
};

export const DevicesTable = ({ props }) => {
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
                firezone: 0,
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

    const toggleMap = () => {
        setIsMapOpen(!isMapOpen);
    }

    useEffect(() => {
        fetchDevices().then(() => {
        });
    }, [props]);

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
            <PageContainer>
                <Header>
                    <TitleLine>Fire Mitigation App</TitleLine>
                    <LogoutButton onClick={onSubmit}>Logout</LogoutButton>
                </Header>
            <DevicesPageContainer>
                <FreeButton onClick={toggleMap} style={{backgroundColor: "#CB0000", marginTop: "18px"}}>
                    {isMapOpen ? "View Table" : "View Map"}
                </FreeButton>
                {/*<SprinklerHeader*/}
                {/*    count={state.devices.length}*/}
                {/*    toggleMap={() => {*/}
                {/*        setIsMapOpen(!isMapOpen);*/}
                {/*    }}*/}
                {/*    isMapOpen={isMapOpen}*/}
                {/*/>*/}
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
            </DevicesPageContainer>
            </PageContainer>
        );
    } else {
        return <p>Loading...</p>
    }
};

DevicesTable.propTypes = {
        history: PropTypes.object.isRequired,
}
