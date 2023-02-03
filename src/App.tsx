import React from 'react'
import './App.css'
import { useEffect } from 'react'
import { useState } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import SearchResults from './components/SearchResults'
import LoginModal from './components/LoginModal'
import LoginModalTwo from './components/LoginModalTwo'
import Profile from './components/Profile'
import NewAccountModalOne from './components/NewAccountModalOne'
import NewAccountModalTwo from './components/NewAccountModalTwo'
import { useAppDispatch, useAppSelector } from './app/hooks'
import {
  selectAllFlowers,
  setAllFlowersList,
  selectToken,
} from './features/flowrSlice'

function App() {
  const [searchInput, setSearchInput] = useState<string>('')
  const [loginClicked, setLoginClicked] = useState<boolean>(false)
  const [userData, setUserData] = useState<any>(null)
  const [profileClicked, setProfileClicked] = useState<boolean>(false)
  const [closeModal, setCloseModal] = useState<boolean>(false)
  const [newAccountClicked, setNewAccountClicked] = useState<boolean>(false)
  const [registrationModalOpen, setRegistrationModalOpen] = useState<boolean>(
    false,
  )
  const [flowersClicked, setFlowersClicked] = useState<boolean>(false)
  const [favoritesClicked, setFavoritesClicked] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const token = useAppSelector(selectToken)
  const flowerList = useAppSelector(selectAllFlowers)

  useEffect(() => {
    fetch('https://flowrspot-api.herokuapp.com/api/v1/flowers/random')
      .then((res) => res.json())
      .then((data) => {
        dispatch(setAllFlowersList(data.flowers))
      })
  }, [flowersClicked])

  return (
    <div id="app-wrapper">
      {registrationModalOpen && (
        <NewAccountModalTwo closeModal={setRegistrationModalOpen} />
      )}
      {newAccountClicked && (
        <NewAccountModalOne
          closeModal={setNewAccountClicked}
          registrationSuccess={setRegistrationModalOpen}
        />
      )}

      {token && closeModal && (
        <LoginModalTwo
          closeModal={setCloseModal}
          setProfileClicked={setProfileClicked}
        />
      )}
      {profileClicked && (
        <Profile
          userData={userData}
          setUserData={setUserData}
          setProfileClicked={setProfileClicked}
        />
      )}
      {loginClicked && (
        <LoginModal
          login={setLoginClicked}
          setUserData={setUserData}
          closeModal={setCloseModal}
        />
      )}
      <Header
        login={setLoginClicked}
        token={token}
        userData={userData}
        setProfileClicked={setProfileClicked}
        setNewAccountClicked={setNewAccountClicked}
        setFlowersClicked={setFlowersClicked}
        setFavoritesClicked={setFavoritesClicked}
        flowersClicked={flowersClicked}
        favoritesClicked={favoritesClicked}
      ></Header>
      <Main setSearch={setSearchInput}></Main>
      <SearchResults
        allFlowers={flowerList}
        search={searchInput}
        favoritesClicked={favoritesClicked}
      ></SearchResults>
    </div>
  )
}

export default App
