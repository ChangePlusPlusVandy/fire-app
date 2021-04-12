const Joi = require("@hapi/joi");
const fetch = require("node-fetch");

const getPersonId = async (api_key) => {
    const res = await fetch("https://api.rach.io/1/public/person/info", {
        method: "get",
        headers: {
            Authorization: `Bearer ${api_key}`,
            "Content-type": "application/json",
            Accept: "application/json",
            "Accept-Charset": "utf-8",
        },
    });
    const data = await res.json();
    return data;
};

const getPersonInfo = async (api_key, person_id) => {
    const res = await fetch(`https://api.rach.io/1/public/person/${person_id}`, {
        method: "get",
        headers: {
            Authorization: `Bearer ${api_key}`,
            "Content-type": "application/json",
            Accept: "application/json",
            "Accept-Charset": "utf-8",
        },
    });
    const data = await res.json();
    return data;
};

const getDeviceDataStatus = async (api_key, id) => {
    try {
        const res = await fetch(`https://api.rach.io/1/public/device/${id}`, {
            method: "get",
            headers: {
                Authorization: `Bearer ${api_key}`,
                "Content-type": "application/json",
                Accept: "application/json",
                "Accept-Charset": "utf-8",
            },
        });
        const device = await res.json();

        return {status: device.status};
    } catch (err) {
        console.log(err);
    }
    return {};
};

const getCurrentScheduleDuration = async (api_key, id) => {
    try {
        const res = await fetch(
            `https://api.rach.io/1/public/device/${id}/current_schedule`,
            {
                method: "get",
                headers: {
                    Authorization: `Bearer ${api_key}`,
                    "Content-type": "application/json",
                    Accept: "application/json",
                    "Accept-Charset": "utf-8",
                },
            }
        );
        const schedule = await res.json();
        console.log("schedule");
        console.log(schedule);
        const duration = schedule.duration;

        return {duration: duration};
    } catch (err) {
        console.log(err);
    }
    return {};
};

const concurrentGetDeviceDataAndSchedule = async (devices) => {
    const promises = devices.map(async (device) => {
        return new Promise((resolve, reject) => {
            (async () => {
                try {
                    const status = await getDeviceDataStatus(device.api_key, device.id);
                    const schedule = await getCurrentScheduleDuration(
                        device.api_key,
                        device.id
                    );

                    resolve(
                        Object.assign(device.toObject(), {
                            status: status.status,
                            duration: schedule.duration,
                        })
                    );
                } catch (err) {
                    reject(err);
                }
            })();
        });
    });
    const data = await Promise.all(promises);
    return data;
};

const startAllZones = async (api_key, id, device) => {
    const zones = {
        zones: device.zones.map((zone) => {
            const z = {
                id: zone.id,
                sortOrder: zone.number,
                duration: 1800,
            };
            return z;
        }),
    };

    try {
        const res = await fetch(
            `https://api.rach.io/1/public/zone/start_multiple`,
            {
                method: "put",
                body: JSON.stringify(zones),
                headers: {
                    Authorization: `Bearer ${api_key}`,
                    "Content-type": "application/json",
                    Accept: "application/json",
                    "Accept-Charset": "utf-8",
                },
            }
        );
    } catch (err) {
        console.log(err);
    }
    return {};
};

const stopDeviceWatering = async (api_key, id) => {
    try {
        const res = await fetch(
            `https://api.rach.io/1/public/device/stop_water`,
            {
                method: "put",
                body: id,
                headers: {
                    Authorization: `Bearer ${api_key}`,
                    "Content-type": "application/json",
                    Accept: "application/json",
                    "Accept-Charset": "utf-8",
                },
            }
        );
    } catch (err) {
        console.log(err);
    }
    return {};
};

const stopAllDevices = async (devices, firezone) => {
    await Promise.all(devices.map(async device => {
        try {
            if (device.firezone == firezone) {
                stopDeviceWatering(device.api_key, device.id);
            }
        } catch (err) {
            console.log(err);
        }
    }))
}

// starts all devices in a firezone -- intiser
const startAllDevices = async (devices, firezone) => {
    await Promise.all(devices.map(async device => {
        try {
            if (device.firezone === firezone) {
                startAllZones(device.api_key, device.id, device)
            }
        } catch (err) {
            console.log(err);
        }
    }));
    return {};
}

// calculates the distance from firezones and returns the closest one
// "firezones" array should objects with name, lat and long
// returns firezone 0 if not within maxDistance km of any firezone
const closestFirezone = (device, firezones, maxDistance) => {
    // calculates the distance between two geo locations
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        function deg2rad(deg) {
            return deg * (Math.PI / 180);
        }

        const R = 6371; // Radius of the earth in km
        let dLat = deg2rad(lat2 - lat1);  // deg2rad below
        let dLon = deg2rad(lon2 - lon1);
        let a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c; // Distance in km
        return d;
    }
    // return shortest distance
    const distances = firezones.map(firezone => calculateDistance(device.latitude, device.longitude,
        firezone.latitude, firezone.longitude));
    const closest = Math.min(...distances);
    if (closest > maxDistance) {
        return { number: 0 };
    }
    return firezones[distances.indexOf(closest)];
}


module.exports = {
    getPersonId: getPersonId,
    getPersonInfo: getPersonInfo,
    getDeviceDataStatus: getDeviceDataStatus,
    getCurrentScheduleDuration: getCurrentScheduleDuration,
    concurrentGetDeviceDataAndSchedule: concurrentGetDeviceDataAndSchedule,
    startAllZones: startAllZones,
    closestFirezone: closestFirezone,
    startAllDevices: startAllDevices,
    stopAllDevices: stopAllDevices,
};
