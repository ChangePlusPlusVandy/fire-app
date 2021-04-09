"use strict";

import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {
    PageContainer,
    Header,
    TitleLine,
    FreeButton,
    SprinklerTable,
    LogoutButton,
    ChiefButtonsContainer,
    ActivateOptionsContainer, FireZoneButtonsContainer
} from "./shared";
import SprinklerMap from "./sprinkler-map";
import {Link} from "react-router-dom";

/****************************************************************************************/
const SprinklerHub = ({device}) => {
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

const onSubmit = ({history, logOut}) => {
    useEffect(() => {
        fetch("/v1/session", {method: "DELETE"}).then(() => {
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

export const DevicesTable = (props) => {
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
    let [firechief, setFirechief] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        username: "",
        department: "",
        is_authorized: "",
        controllable_firezones: [],
    })

    const [isMapOpen, setIsMapOpen] = useState(false);
    const [isFirezone1Active, setIsFirezone1Active] = useState(false);
    const [isFirezone2Active, setIsFirezone2Active] = useState(false);
    const [error, setError] = useState("");

    const fetchFirechief = async (username) => {
        await fetch(`/v1/firechief/${username}`)
            .then((res) => res.json())
            .then((data) => setFirechief(data))
            .catch((err) => console.log(err));
        setIsLoaded(true);
    }

    useEffect(() => {
        fetchFirechief(props.match.params.username)
            .then(() => {
            });
    }, []);

    // fetch devices from the passed in firezones
    const fetchDevices = async () => {
        let devices = [];
        await Promise.all(firechief.controllable_firezones.map(async firezone => {
            await fetch(`/v1/devices/${firezone}`)
                .then((res) => res.json())
                .then((data) => {
                    devices.push(...data.devices);
                })
                .catch((err) => console.log(err));
        }));
        setState({devices: devices});
    };

    // useEffect(() => {
    //     fetchDevices().then(() => {
    //     });
    // }, [props]);

    const refreshDevices = () => {
        fetchDevices().then(() => {
        });
    }

    const toggleMap = () => {
        setIsMapOpen(!isMapOpen);
    }

    const activateFirezone1 = async (ev) => {
        ev.preventDefault();

        if (isFirezone1Active) {
            return;
        }

        const zone1Devices = state.devices.filter(device => device.firezone === 1);
        const firezone = 1;

        const res = await fetch(`/v1/devices/startzone/${firezone}`, {
            method: "PUT",
            body: JSON.stringify({ devices: zone1Devices } ),
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
        });

        if (res.ok) {
            window.alert("Successfully activated firezone 1");
        } else {
            const err = await res.json();
            setError(err.error);
            window.alert("Something went wrong");
        }
        setIsFirezone1Active(true);
    }

    const activateFirezone2 = async (ev) => {
        ev.preventDefault();

        if (isFirezone2Active) {
            return;
        }

        const zone2Devices = state.devices.filter(device => device.firezone === 2);
        const firezone = 2

        const res = await fetch(`/v1/devices/startzone/${firezone}`, {
            method: "PUT",
            body: JSON.stringify({ devices: zone2Devices } ),
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
        });

        if (res.ok) {
            window.alert("Successfully activated firezone 1");
        } else {
            const err = await res.json();
            setError(err.error);
            window.alert("Something went wrong");
        }
        setIsFirezone2Active(true);
    }

    const deactivateFirezone1 = async (ev) => {
        ev.preventDefault();

        if (!isFirezone1Active) {
            return;
        }

        const zone1Devices = state.devices.filter(device => device.firezone === 1);
        const firezone = 1;

        const res = await fetch(`/v1/devices/stopzone/${firezone}`, {
            method: "PUT",
            body: JSON.stringify({ devices: zone1Devices } ),
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
        });

        if (res.ok) {
            window.alert("Successfully deactivated firezone 1");
        } else {
            const err = await res.json();
            setError(err.error);
            window.alert("Something went wrong");
        }
        setIsFirezone1Active(false);
    }

    const deactivateFirezone2 = async (ev) => {
        ev.preventDefault();

        if (!isFirezone2Active) {
            return;
        }

        const zone2Devices = state.devices.filter(device => device.firezone === 2);
        const firezone = 2;

        const res = await fetch(`/v1/devices/stopzone/${firezone}`, {
            method: "PUT",
            body: JSON.stringify({ devices: zone2Devices } ),
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
        });

        if (res.ok) {
            window.alert("Successfully deactivated firezone 1");
        } else {
            const err = await res.json();
            setError(err.error);
            window.alert("Something went wrong");
        }
        setIsFirezone2Active(false);
    }

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
                    <Link to="" style={{textDecoration: 'none'}}><TitleLine>Fire Mitigation App</TitleLine></Link>
                    <Link to="/logout" style={{textDecoration: 'none'}}>
                        <LogoutButton>Logout</LogoutButton>
                    </Link>
                </Header>
                    <ActivateOptionsContainer>
                        <p>Welcome, {firechief.first_name}</p>
                        <FireZoneButtonsContainer>
                            <FreeButton
                                onClick={activateFirezone1} style={{backgroundColor: "#CB0000", width: "150px", marginTop: "18px"}}>
                                Activate Firezone 1
                            </FreeButton>
                            <FreeButton
                                onClick={deactivateFirezone1} style={{backgroundColor: "#CB0000", marginTop: "18px"}}>
                                Deactivate Firezone 1
                            </FreeButton>
                        </FireZoneButtonsContainer>
                        <FireZoneButtonsContainer>
                            <FreeButton onClick={activateFirezone2} style={{backgroundColor: "#CB0000", marginTop: "18px"}}>
                                Activate Firezone 2
                            </FreeButton>
                            <FreeButton
                                onClick={deactivateFirezone2} style={{backgroundColor: "#CB0000", marginTop: "18px"}}>
                                Deactivate Firezone 2
                            </FreeButton>
                        </FireZoneButtonsContainer>
                    </ActivateOptionsContainer>
                    <p style={{width: "100%", marginLeft: "50px"}}>Number of Devices={state.devices.length}</p>
                    <ChiefButtonsContainer>
                        <FreeButton onClick={refreshDevices} style={{backgroundColor: "#CB0000", marginTop: "18px"}}>
                            Refresh Devices
                        </FreeButton>
                        <FreeButton onClick={toggleMap} style={{backgroundColor: "#CB0000", marginTop: "18px"}}>
                            {isMapOpen ? "View Table" : "View Map"}
                        </FreeButton>
                    </ChiefButtonsContainer>
                    {isMapOpen ? (
                        <SprinklerMap devices={state.devices}/>
                    ) : (
                        <SprinklerTable>
                            <thead>
                            <tr>
                                <td style={{width: "20%"}}>Name</td>
                                <td>Firezone</td>
                                <td>Contact</td>
                                <td>Status</td>
                            </tr>
                            </thead>
                            <tbody>{deviceList}</tbody>
                        </SprinklerTable>
                    )}
            </PageContainer>
        );
    } else {
        return <p>Loading...</p>
    }
};

DevicesTable.propTypes = {
    match: PropTypes.object,
    history: PropTypes.object,
    currentUser: PropTypes.string,
}
