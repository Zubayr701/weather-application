import React from "react";
import { GoSearch } from "react-icons/go";
import { BiCurrentLocation } from "react-icons/bi";
import "./Header.css";
export default function Header({ fetchData, inputRef, setLocation, setError }) {
  const handleInput = () => {
    console.log(inputRef.current.value);
  };

  const handleChange = () => {
    console.log(inputRef.current.value);
  }




  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { longitude, latitude } = position.coords
      console.log(longitude, latitude);
      setLocation({
        lon: longitude,
        lat: latitude
      })
    }, (err) => { setError("not allowed to current location!") }
    )
  }




  return (
    <div className="header">
      <div className="container">
        <div className="header__inner">
          <h2 className="header__inner-logo">Weather</h2>
          <div className="header__inner-box">
            <input ref={inputRef} onChange={handleInput}
              className="header__inner-box-input"
              type="search"
              placeholder="Enter city name"
            />
            <button onClick={fetchData} className="header__inner-box-button-search">
              <GoSearch />  <p>Search</p>
            </button>
            <button onClick={getCurrentLocation} className="header__inner-box-button-location">
              <BiCurrentLocation /> <p>Current Location</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
