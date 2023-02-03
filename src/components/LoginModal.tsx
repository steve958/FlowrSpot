import React from "react";
import { useState } from "react";
import { useRef } from "react";
import "./LoginModal.css";
import {useAppDispatch, useAppSelector} from '../app/hooks'
import { selectToken, setTokenValue } from "../features/flowrSlice";


interface LoginModalProps {
  login: Function;
  setUserData: Function;
  closeModal: Function
}

const LoginModal: React.FC<LoginModalProps> = (props) => {
  const loginInputMail = useRef<HTMLInputElement>(null);
  const loginInputPass = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken)

  function fetchUserData(token: string) {
    fetch("https://flowrspot-api.herokuapp.com/api/v1/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        props.setUserData(data.user);
      });
  }

  function handleLoginInputs() {
    const enteredMail = loginInputMail.current!.value;
    const enteredPass = loginInputPass.current!.value;

    fetch("https://flowrspot-api.herokuapp.com/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: enteredMail, password: enteredPass }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        props.login(false);
        if (data.auth_token) {
          dispatch(setTokenValue(data.auth_token));
          fetchUserData(data.auth_token);
          props.closeModal(true)
        } else {
          alert(data.error);
        }
      });
  }

  return (
    <div id="login-modal-wrapper">
      <div id="login-modal-box">
        <h1 id="login-modal-text">WELCOME BACK</h1>
        <input placeholder='email' type="text" id="login-mail" ref={loginInputMail} />
        <input placeholder='password' type="password" id="login-password" ref={loginInputPass} />
        <button id="login-button" onClick={handleLoginInputs}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
