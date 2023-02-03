import React from 'react'
import './Header.css'
interface HeaderProps {
  login: Function
  token: string
  userData: {
    first_name: string
    id: number
    last_name: string
  }
  setProfileClicked: Function
  setNewAccountClicked: Function
  setFlowersClicked: Function
  setFavoritesClicked: Function
  flowersClicked: boolean
  favoritesClicked: boolean
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <div id="header-wrapper">
      <div id="header-wrapper-left">
        <img
          id="logo"
          src="https://st3.depositphotos.com/1768926/12613/v/950/depositphotos_126130138-stock-illustration-beauty-vector-flowers-logo.jpg"
          alt=""
        />
        <h1 id="logo-name">FlowrSpot</h1>
      </div>
      <div id="header-wrapper-right">
        <h1
          className="header-items"
          onClick={() => {
            props.setFlowersClicked(!props.flowersClicked)
          }}
        >
          Random Flowers
        </h1>
        {props.token && (
          <h1
            className="header-items"
            id={props.token && props.favoritesClicked ? 'favorites' : undefined}
            onClick={() => {
              props.setFavoritesClicked(!props.favoritesClicked)
            }}
          >
            Show Favorites
          </h1>
        )}
        {!props.token && (
          <h1 className="header-items" onClick={() => props.login(true)}>
            Login
          </h1>
        )}
        {props.token && props.userData ? (
          <div id='header-avatar-wrapper'>
            <h1
              className="user-items"
              onClick={() => props.setProfileClicked(true)}
            >
              {props.userData.first_name} {props.userData.last_name}
            </h1>
            <img
              id="avatar-header"
              src="https://www.materiell.com/wp-content/uploads/2015/03/bill-small.png"
              alt="corak"
            />
          </div>
        ) : (
          <h1
            className="header-items"
            onClick={() => props.setNewAccountClicked(true)}
          >
            New Account
          </h1>
        )}
      </div>
    </div>
  )
}

export default Header
