import React from "react";
import { FiSunrise, FiSunset } from "react-icons/fi";
import { FaWind } from "react-icons/fa";
import { FaRegCompass } from "react-icons/fa";
import { FaTemperatureHigh } from "react-icons/fa6";
import { MdOutlineRemoveRedEye, MdOutlineWaterDrop } from "react-icons/md";
import { IoNavigateOutline } from "react-icons/io5";

import "./Right.css";
import AirItem from "../airItem/airItem";
import TodayAtItem from "../TodayAtItem/TodayAtItem";
const Right = ({ air, currentWeather, forecast }) => {
  console.log(forecast);
  let todayAt = forecast?.list.slice(0, 8);

  const status = ["Good", "Moderate", "Fair", "Poor", "Very Poor"];
  const sunData = {
    sunriseHour: new Date(currentWeather?.sys?.sunrise * 1000).getHours(),
    sunriseMinute: new Date(currentWeather?.sys?.sunrise * 1000).getMinutes(),
    sunsetHour: new Date(currentWeather?.sys?.sunset * 1000).getHours(),
    sunsetMinute: new Date(currentWeather?.sys?.sunset * 1000).getMinutes(),
  };
  const airQuality = {
    humidity: currentWeather?.main.humidity,
    pressure: currentWeather?.main.pressure,
    visibility: currentWeather?.visibility / 1000,
    windSpeed: currentWeather?.wind.speed,
    feelsLike: currentWeather?.main.feels_like,
  };

  let sunsetHour = new Date(currentWeather?.sys?.sunset * 1000).getHours();
  let sunsetHourReal = sunsetHour > 12 ? sunsetHour - 12 : sunsetHour;
  let sunsetMinutes = new Date(currentWeather?.sys?.sunset * 1000).getMinutes();
  let isAMorPM = sunsetHour > 12 ? "PM" : "AM";
  let sunriseTime = `${new Date(
    currentWeather?.sys.sunrise * 1000
  ).getHours()} :
      ${new Date(currentWeather?.sys?.sunrise * 1000).getMinutes()} AM`;
  let sunsetTime = `${sunsetHourReal} :
      ${sunsetMinutes} ${isAMorPM}`;

  return (
    <div className="sidebar__highlights">
      <p style={{ fontSize: 24 }} className="sidebar__highlights-title">
        Todays Highlights
      </p>
      <div className="highlights-box">
        <div className="sidebar__highlight-item">
          <div className="box">
            <h3 className="title air">Air Quality Index</h3>
            <span
              className={`${"sidebar__highlight-status"}  ${status[
                air?.list[0].main.aqi - 1
              ]
                ?.slice(0, 4)
                .toLowerCase()}`}
            >
              {status[air?.list[0].main.aqi - 1]}
            </span>
          </div>
          <ul className="sidebar__highlight-details">
            <FaWind className="wind" />
            <AirItem
              airData={air?.list[0].components.pm2_5}
              airType={"PM2.5"}
            />
            <AirItem airData={air?.list[0].components.pm10} airType={"PM10"} />
            <AirItem airData={air?.list[0].components.so2} airType={"SO2"} />
            <AirItem airData={air?.list[0].components.co} airType={"CO"} />
            <AirItem airData={air?.list[0].components.no} airType={"NO"} />
            <AirItem airData={air?.list[0].components.no2} airType={"NO2"} />
            <AirItem airData={air?.list[0].components.nh3} airType={"NH3"} />
            <AirItem airData={air?.list[0].components.o3} airType={"O3"} />
          </ul>
        </div>

        <div className="sidebar__sun-info">
          <h2 className="title sunrise">Sunrise & Sunset</h2>
          <ul className="list">
            <li>
              <FiSunrise className="wind" />
              <div>
                <p className="title sun-text">Sunrise</p>
                <h1 className="sun-title">{sunriseTime}</h1>
              </div>
            </li>
            <li className="sunset">
              <FiSunset className="wind" />
              <div>
                <p className="title sun-text">Sunset</p>
                <h1 className="sun-title">{sunsetTime}</h1>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="sidebar__extra">
        <ul className="sidebar__extra-list">
          <li className="item">
            <h3 className="title">Humidity</h3>
            <div className="drop-box">
              <MdOutlineWaterDrop className="drop" />
              <h1 className="drop-title">{airQuality.humidity}%</h1>
            </div>
          </li>
          <li className="item">
            <h3 className="title">Pressure</h3>
            <div className="drop-box">
              <FaRegCompass className="drop" />
              <h1 className="drop-title">{airQuality.pressure}hPa</h1>
            </div>
          </li>
          <li className="item">
            <h3 className="title">Visibility</h3>
            <div className="drop-box">
              <MdOutlineRemoveRedEye className="drop" />
              <h1 className="drop-title">{airQuality.visibility} km</h1>
            </div>
          </li>
          <li className="item">
            <h3 className="title">Wind Speed</h3>
            <div className="drop-box">
              <IoNavigateOutline className="drop" />
              <h1 className="drop-title">{airQuality.windSpeed} m/s</h1>
            </div>
          </li>
          <li className="item">
            <h3 className="title">Feels Like</h3>
            <div className="drop-box">
              <FaTemperatureHigh className="drop" />
              <h1 className="drop-title">{airQuality.feelsLike} &deg;C</h1>
            </div>
          </li>
        </ul>
      </div>

      <div className="sidebar__hourly">
        <h2>Today at</h2>
        <ul style={{ width: 1000 }}>
          {todayAt?.map((el) => (
            <TodayAtItem
              key={`${el.dt}-${el.main.temp}`}
              currentTime={el.dt}
              currentIcon={el.weather[0].icon}
              currentTemp={el.main.temp}
            />

          ))}
        </ul>
      </div>
    </div>
  );
};

export default Right;