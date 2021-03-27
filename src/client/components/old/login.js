// /* Copyright G. Hemingway, @2020 - All rights reserved */
// "use strict";
//
// import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import {
//   ErrorMessage,
//   FormBase,
//   FormLabel,
//   FormInput,
//   FormButton,
// } from "../shared";
//
// export const Login = (props) => {
//   let [username, setUser] = useState("");
//   let [password, setPass] = useState("");
//   let [error, setError] = useState("");
//
//   const onSubmit = async (ev) => {
//     ev.preventDefault();
//     let res = await fetch("/v1/session", {
//       body: JSON.stringify({
//         username,
//         password,
//       }),
//       method: "POST",
//       credentials: "include",
//       headers: {
//         "content-type": "application/json",
//       },
//     });
//     let data = await res.json();
//     if (res.ok) {
//       props.logIn(data.username);
//     } else {
//       setError(`Error: ${data.error}`);
//     }
//   };
//
//   useEffect(() => {
//     document.getElementById("username").focus();
//   }, []);
//
//   return (
//     /*<FormContainer>
//       This is test text.
//     </FormContainer>*/
//     <div style={{ gridArea: "main" }}>
//       <ErrorMessage msg={error} />
//       <FormBase>
//         <FormLabel htmlFor="username">Username:</FormLabel>
//         <FormInput
//           id="username"
//           name="username"
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(ev) => setUser(ev.target.value.toLowerCase())}
//         />
//
//         <FormLabel htmlFor="password">Password:</FormLabel>
//         <FormInput
//           id="password"
//           name="password"
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(ev) => setPass(ev.target.value)}
//         />
//         <div />
//         <button>Login with Google</button>
//         <div />
//         <FormButton id="submitBtn" onClick={onSubmit}>
//           Login
//         </FormButton>
//       </FormBase>
//     </div>
//   );
// };
//
// Login.propTypes = {
//   logIn: PropTypes.func.isRequired,
// };
