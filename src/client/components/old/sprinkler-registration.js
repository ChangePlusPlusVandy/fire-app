// /* Copyright G. Hemingway, @2020 - All rights reserved */
// "use strict";
//
// import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import {
//   FormBase,
//   FormInput,
//   FormLabel,
//   FormButton,
//   ModalNotify,
//   ErrorMessage,
// } from "../shared";
// import { validPassword, validUsername } from "../../../shared";
//
// const SprinklerRegister = ({ history, owner, city, lat, lng }) => {
//   let [state, setState] = useState({
//     owner,
//     city,
//     lat,
//     lng,
//     api_key: "",
//     userAuthorized: false,
//   });
//   let [error, setError] = useState("");
//   let [notify, setNotify] = useState("");
//
//   const getCoordinates = () => {};
//
//   useEffect(() => {}, []);
//
//   const onChange = (ev) => {
//     setError("");
//     // Update from form and clear errors
//     setState({
//       ...state,
//       [ev.target.name]: ev.target.value,
//     });
//   };
//
//   const onUpdateAuthorization = (ev) => {
//
//     if(ev.target.checked) {
//       setState({
//         ...state,
//         userAuthorized: true
//       });
//       setError("");
//     } else {
//       setState({
//         ...state,
//         userAuthorized: false
//       });
//       setError("Please agree to condition statement.");
//     }
//   }
//
//   const onSubmit = async (ev) => {
//     ev.preventDefault();
//     // Only proceed if there are no errors
//     if (error !== "" || !state.userAuthorized) return;
//     const res = await fetch("/v1/device", {
//       method: "POST",
//       body: JSON.stringify({
//         owner: state.owner,
//         city: state.city,
//         lat: state.lat,
//         lng: state.lng,
//         api_key: state.api_key
//       }),
//       credentials: "include",
//       headers: {
//         "content-type": "application/json",
//       },
//     });
//     if (res.ok) {
//       // Notify users
//       setNotify(
//         `Device registered.  Thank you for helping to prevent wildfires.`
//       );
//     } else {
//       const err = await res.json();
//       console.log(err.error);
//       setError(err.error);
//     }
//   };
//
//   const onAccept = () => {
//     history.push(`/profile/${state.owner}`);
//   };
//
//   return (
//     <div style={{ gridArea: "main" }}>
//       {notify !== "" ? (
//         <ModalNotify id="notification" msg={notify} onAccept={onAccept} />
//       ) : null}
//
//       <FormBase>
//         <ErrorMessage msg={error} />
//         <FormLabel htmlFor="api_key">Rachio API Key:</FormLabel>
//         <FormInput
//           id="api_key"
//           name="api_key"
//           placeholder="000000000000"
//           onChange={onChange}
//           value={state.api_key}
//         />
//         <FormLabel>Consent Agreement:</FormLabel>
//         <div id="authorizationContainer">
//           <p id="authorizationAgreement">
//             Do you agree to relinquish sprinkler control to firefighters in your area?
//             This access is limited to your fire chief.
//           </p>
//           <input onChange={onUpdateAuthorization} type="checkbox" id="authorizationSelection"></input>
//             <label for="authorizationSelection">I agree to these terms.</label>
//         </div>
//         <div />
//         <FormButton id="submitBtn" onClick={onSubmit}>
//           Register
//         </FormButton>
//       </FormBase>
//     </div>
//   );
// };
//
// export default SprinklerRegister;
//
// SprinklerRegister.propTypes = {
//   history: PropTypes.object.isRequired,
// };
