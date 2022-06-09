import React from 'react'
import { useRef } from 'react'
import './NewAccountModalOne.css'

interface NewAccountModalOneProps {
  closeModal: Function
  registrationSuccess: Function
}

const NewAccountModalOne: React.FC<NewAccountModalOneProps> = (props) => {
  const registerFirstNameInput = useRef<HTMLInputElement>(null)
  const registerLastNameInput = useRef<HTMLInputElement>(null)
  const registerBirthInput = useRef<HTMLInputElement>(null)
  const registerEmailInput = useRef<HTMLInputElement>(null)
  const registerPasswordInput = useRef<HTMLInputElement>(null)

  function menageUserRegistration() {
    let enteredFirstName = registerFirstNameInput.current!.value
    let enteredLastName = registerLastNameInput.current!.value
    let enteredBirth = registerBirthInput.current!.value
    let enteredEmail = registerEmailInput.current!.value
    let enteredPassword = registerPasswordInput.current!.value

    if (
      enteredFirstName &&
      enteredLastName &&
      enteredBirth &&
      enteredEmail &&
      enteredPassword
    ) {
      fetch('https://flowrspot-api.herokuapp.com/api/v1/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          first_name: enteredFirstName,
          last_name: enteredLastName,
          date_of_birth: enteredBirth,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.auth_token) {
            props.closeModal(false)
            props.registrationSuccess(true)
            console.log(data)
          } else {
            enteredFirstName = ''
            enteredLastName = ''
            enteredPassword = ''
            enteredEmail = ''
            alert(`${data.error}`)
          }
        })
    } else {
      alert('Please fill all the input boxes')
    }
  }

  return (
    <div id="login-modal-wrapper">
      <div id="new-account-modal-box">
        <h1>Create an Account</h1>
        <div id="new-account-input-wrapper">
          <div id="name-wrapper">
            <input
              type="text"
              placeholder="First name"
              ref={registerFirstNameInput}
            />
            <input
              type="text"
              placeholder="Last name"
              ref={registerLastNameInput}
            />
          </div>
          <input type="date" ref={registerBirthInput} />
          <input type="email" placeholder="Email" ref={registerEmailInput} />
          <input
            type="password"
            placeholder="Password"
            ref={registerPasswordInput}
          />
          <button id="create-account-button" onClick={menageUserRegistration}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewAccountModalOne
