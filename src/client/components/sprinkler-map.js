/* Copyright G. Hemingway, @2020 - All rights reserved */
"use strict";

import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import PropTypes from "prop-types";
import L from "leaflet";

const styles = {
  width: "90vw",
  height: "calc(100vh - 80px)",
  position: "absolute",
};

const Map = ({ devices }) => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiamFtZXNyYXViIiwiYSI6ImNrZngyM3MyaTF4Mm8yem84MmRweHdmaWcifQ.6tYiepkJTQUw46u1tIdUVw";
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: [-86.7816, 36.1627],
        zoom: 2,
      });

      map.on("load", () => {
        setMap(map);
        map.resize();
      });
    };

    if (!map) {
      initializeMap({ setMap, mapContainer });
    } else {
      let bounds = new mapboxgl.LngLatBounds();
      devices.forEach((device, index) => {
        const coords = [device.longitude, device.latitude];
        const markerIcon = (
          <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
            <image
              href="https://mdn.mozillademos.org/files/6457/mdn_logo_only_color.png"
              height="200"
              width="200"
            />
          </svg>
        );
        const color = device.is_watering ? "blue" : "red";
        new mapboxgl.Marker({ color }).setLngLat(coords).addTo(map);

        bounds.extend(coords);
        bounds.extend([coords[0] + 0.1, coords[1] + 1]);
        bounds.extend([coords[0] - 0.1, coords[1] - 1]);
      });
      map.fitBounds(bounds, { padding: 20 });
    }
  }, [map]);

  return (
    <div>
      <div ref={(el) => (mapContainer.current = el)} style={styles} />
    </div>
  );
};

export default Map;

Map.propTypes = {
  devices: PropTypes.array.isRequired,
};
