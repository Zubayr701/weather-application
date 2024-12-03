import React from "react";
import "./TodayAtItem.css"
function TodayAtItem({ currentTime, currentTemp, currentIcon }) {
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    let currentDate = new Date(currentTime * 1000).getDate();
    let currentMonth = monthNames[new Date(currentTime * 1000).getMonth()].slice(0, 3)
    let currentHour = new Date(currentTime * 1000).getHours();
    let currentHourReal = currentHour > 12 ? currentHour - 12 + "PM" : currentHour + "PM"
    return (
        <li>
            <span className="bro" >{currentDate} {currentMonth}</span>
            <h3> {currentHourReal} </h3>
            <img
                src={`https://openweathermap.org/img/wn/${currentIcon}@2x.png`}
                alt="Hourly Weather"
            />
            <h3>{currentTemp}°C</h3>
        </li>
    );
}

export default TodayAtItem;
