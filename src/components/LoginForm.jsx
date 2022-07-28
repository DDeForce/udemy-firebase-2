import { useState } from "react";
import firebaseAuthService from "../FirebaseAuthService";
import { LoginFormContainer, Row, LogoutButton, LoginButton, ResetPassButton } from './style/LoginForm.styled'

import React from "react";

const LoginForm = ({ existingUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await firebaseAuthService.loginUser(username, password);
      setUsername("");
      setPassword("");
    } catch (error) {
      // console.error();
      alert(error.message);
    }
  };

  const handleSendResetPasswordEmail = async () => {
    if (!username) {
      alert("Missing username!");
      return;
    }

    try {
      await firebaseAuthService.sendPasswordResetEmail(username);
      alert("Sent the password reset email");
    } catch (error) {
      alert(error.message);
    }
  };

  // const handleLoginWithGoogle = async () => {
  //   try {
  //     await firebaseAuthService.loginWithGoogle();
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  const handleLogout = () => {
    firebaseAuthService.logoutUser();
  };

  return (
    <LoginFormContainer>
      {existingUser ? (
        <Row>
          <h3>Welcome, {existingUser.email}</h3>
          <LogoutButton
            type="button"
            className="primary-button"
            onClick={handleLogout}
          >
            Logout
          </LogoutButton>
        </Row>
      ) : (
        <form onSubmit={handleSubmit} className="login-form">
          <label className="input-label login-label">
            Username (email):
            <input
              type="email"
              required
              value={username}
              className="input-text"
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label className="input-label login-label">
            Password:
            <input
              type="password"
              required
              value={password}
              className="input-text"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div className="button-box">
            <LoginButton className="primary-button">Login</LoginButton>
            <ResetPassButton
              type="button"
              className="primary-button"
              onClick={handleSendResetPasswordEmail}
            >
              Reset Password
            </ResetPassButton>
            {/* <button
              type="button"
              className="primary-button"
              onClick={handleLoginWithGoogle}
            >
              Signin with Google
            </button> */}
          </div>
        </form>
      )}
    </LoginFormContainer>
  );
};

export default LoginForm;
