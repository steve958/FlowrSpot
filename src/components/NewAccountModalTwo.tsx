import React from 'react'
import './NewAccountModalTwo.css'

interface NewAccountModalTwoProps {
    closeModal: Function
}

const NewAccountModalTwo: React.FC<NewAccountModalTwoProps> = (props) => {
  return (
    <div id="login-modal-wrapper">
      <div id="login-modal-box">
        <h1 id="login-modal-text-congrats">
          Congratulations! You have successfully signed up for FlowrSpot!
        </h1>
        <button id="modal-ok-button" onClick={()=> props.closeModal(false)}>OK</button>
      </div>
    </div>
  )
}

export default NewAccountModalTwo
