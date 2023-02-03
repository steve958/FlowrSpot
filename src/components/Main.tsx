import React from "react";
import "./Main.css";
import {useRef} from 'react'

interface MainProps {
  setSearch: Function
}


const Main: React.FC<MainProps> = (props) => {
  const searchInputs = useRef<HTMLInputElement>(null);


  function handleInput() {
    const enteredText = searchInputs.current!.value
    props.setSearch(enteredText)
  }

  return (
    <div id="main-wrapper">
      <div id='main-input-wrapper'>
        <h1 id='main-text-large'>Discover flowers around you</h1>
        <h2 id='main-text-small'>Explore between more than 8.427 sightings</h2>
        <input type="text" id='search-input' placeholder='search flowers' onChange={handleInput} ref={searchInputs}/>
      </div>
    </div>
  );
};

export default Main;
