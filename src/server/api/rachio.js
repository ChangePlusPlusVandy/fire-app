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

    return { status: device.status };
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

    return { duration: duration };
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

// starts all devices for a firechief -- intiser
const startAllDevices = async ( devices ) => {
  devices.forEach( device => {
    try {
      startAllZones(device.api_key, device.id, device)
    } catch (err) {
      console.log(err);
    }
  });
  return {};
}



module.exports = {
  getPersonId: getPersonId,
  getPersonInfo: getPersonInfo,
  getDeviceDataStatus: getDeviceDataStatus,
  getCurrentScheduleDuration: getCurrentScheduleDuration,
  concurrentGetDeviceDataAndSchedule: concurrentGetDeviceDataAndSchedule,
  startAllZones: startAllZones,
};
