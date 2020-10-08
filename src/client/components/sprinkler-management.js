/* Copyright G. Hemingway, @2020 - All rights reserved */
"use strict";

import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SprinklerMap from "./sprinkler-map";
import { FormButton } from "./shared";

const SprinklerHub = ({ username, device, onWaterClick }) => {
  return (
    <tr>
      <td>{device.name}</td>
      <td>{device.city}</td>
      <td>{device.owner_name}</td>
      <td>
        {device.status === "" ? "" : device.status === "ONLINE" ? "🌐" : "👎"}
      </td>
      <td onClick={() => onWaterClick(device)}>
        {device.is_watering === "" ? "" : device.is_watering ? "💦" : "❌"}
      </td>
    </tr>
  );
};

SprinklerHub.propTypes = {
  username: PropTypes.string.isRequired,
  device: PropTypes.object.isRequired,
  onWaterClick: PropTypes.func.isRequired,
};

const SprinklerHeaderBase = styled.div`
  display: flex;
  margin: 1em;
  & > a {
    margin-right: 1em;
  }
  & > h4 {
    margin: 0;
    flex-grow: 1;
  }
`;

const SprinklerHeader = ({ count, username, toggleMap, isMapOpen }) => {
  return (
    <SprinklerHeaderBase>
      <h4>
        Sprinkler Hubs ({count}
        ):
      </h4>
      <FormButton
        id="submitBtn"
        style={{ marginBottom: "1em" }}
        onClick={toggleMap}
      >
        {isMapOpen ? "View Table" : "View Map"}
      </FormButton>
    </SprinklerHeaderBase>
  );
};

SprinklerHeader.propTypes = {
  count: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
};

/*************************************************************************/

const SprinklerTable = styled.table`
  width: 100%;
  text-align: center;
  @media (max-width: 499px) {
    & > tbody > tr > td:nth-of-type(2),
    & > thead > tr > th:nth-of-type(2) {
      display: none;
    }
  }
`;

const DeviceList = (props) => {
  let [isLoaded, setIsLoaded] = useState(false);
  let [state, setState] = useState({
    devices: [
      {
        city: "",
        id: "",
        latitude: 0,
        longitue: 0,
        name: "",
        owner: "",
        owner_email: "",
        owner_id: "",
        owner_name: "",
        zones: [],
      },
    ],
  });
  const [isMapOpen, setIsMapOpen] = useState(false);
  const onWaterClick = async (device) => {
    await fetch(`/v1/devices/start/${device.id}`, {
      method: "PUT",
      body: JSON.stringify({ device: device }),
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
  };

  const fetchDevices = async () => {
    fetch(`/v1/devices`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.devices);
        setState({ devices: data.devices });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchDevices().then(() => {
      setIsLoaded(true);
    });
  }, [props]);

  if (isLoaded) {
    const deviceList = state.devices.map((device, index) => {
      return (
        <SprinklerHub
          key={index}
          username={props.username}
          device={device}
          onWaterClick={onWaterClick}
        />
      );
    });
    return (
      <Fragment>
        <SprinklerHeader
          count={state.devices.length}
          username={props.username}
          toggleMap={() => {
            setIsMapOpen(!isMapOpen);
          }}
          isMapOpen={isMapOpen}
        />
        {isMapOpen ? (
          <SprinklerMap devices={state.devices} />
        ) : (
          <SprinklerTable>
            <thead>
              <tr>
                <th>Name</th>
                <th>City</th>
                <th>Home Owner</th>
                <th>Online</th>
                <th>Watering</th>
              </tr>
            </thead>
            <tbody>{deviceList}</tbody>
          </SprinklerTable>
        )}
      </Fragment>
    );
  } else {
    return <p>Have community members register sprinkler hubs to get started</p>;
  }
};

export default DeviceList;

DeviceList.propTypes = {
  devices: PropTypes.array,
  username: PropTypes.string.isRequired,
};
