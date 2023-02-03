import React from 'react'
import './Profile.css'
import {useAppDispatch, useAppSelector} from '../app/hooks'
import {setTokenValue} from '../features/flowrSlice'
  
interface ProfileProps {
  userData: any;
  setUserData: Function;
  setProfileClicked: Function
}

const Profile: React.FC<ProfileProps> = (props) => {

  const dispatch = useAppDispatch();


  return (
    <div id="login-modal-wrapper">
      <div id="profile-modal-box">
        <div id="profile-wrapper">
          <img
            id="avatar"
            src="https://www.materiell.com/wp-content/uploads/2015/03/bill-small.png"
            alt="corak"
          />
          <h2>{`${props.userData.first_name} ${props.userData.last_name}`}</h2>
        </div>
        <h1 className="profile-headers">First Name</h1>
        <h1>{props.userData.first_name}</h1>
        <h1 className="profile-headers">Last Name</h1>
        <h1>{props.userData.last_name}</h1>
        <h1 className="profile-headers">USER ID</h1>
        <h1>{props.userData.id}</h1>
        <button id='logout-button' onClick={()=> {dispatch(setTokenValue('')); props.setUserData(null); props.setProfileClicked(false)}}>Logout</button>
      </div>
    </div>
  )
}

export default Profile
