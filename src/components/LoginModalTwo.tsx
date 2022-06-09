import React from 'react'
import './LoginModalTwo.css'

interface LoginModalTwoProps {
  closeModal: Function;
  setProfileClicked: Function
}

const LoginModalTwo: React.FC<LoginModalTwoProps> = (props) => {


  return (
    <div id="login-modal-wrapper">
      <div id="login-modal-box">
        <h1 id="login-modal-text-congrats">
          Congratulations! You have successfully logged into FlowrSpot!
        </h1>
        <div id="modal-button-wrapper">
          <button id="profile-button" onClick={()=> {props.setProfileClicked(true);props.closeModal(false) }}>PROFILE</button>
          <button id="ok-button" onClick={()=> props.closeModal(false)}>
            OK
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginModalTwo
