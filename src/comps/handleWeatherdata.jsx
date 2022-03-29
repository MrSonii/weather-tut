import { useLocation } from "react-router-dom";
import { get } from "axios";
import { useState } from "react";

import "./weatherPage.css";

export default function H1andleWeatherdata() {
  const [temp, setTemp] = useState("");
  const [feelsLike, setFeelsLike] = useState("");
  const [navClass, setNavClass] = useState("");
  const [bodyClass, setBodyClass] = useState("");

  const { val } = useLocation().state;
  const lat = val.latitude;
  const lon = val.longitude;

  function handleClass() {
    if (navClass === "" && bodyClass === "") {
      setNavClass("show-navBar");
      setBodyClass("move-bodyPart");
    } else {
      setNavClass("");
      setBodyClass("");
    }
  }

  get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily&units=metric&appid=396b7a7f0b4c24e721bb411af8dad436`
  ).then((resp) => {
    const hourlyTemp = resp.data.hourly[0].temp;
    const hourlyFeel = resp.data.hourly[0].feels_like;

    setTemp(hourlyTemp);
    setFeelsLike(hourlyFeel);
  });

  const cityNames = [
    "Fatehabad",
    "Hisar",
    "Sirsa",
    "Chandigarh",
    "Mohali",
    "Delhi",
    "Hamirpur",
    "Ghaziabad",
    "Sonipat",
  ];
  return (
    <div>
      <header className="head-part">
        <p className="menu-button" onClick={handleClass}>
          &#9776;
        </p>
        <h1 className="page-heading">Weather-Detail-Page</h1>
      </header>
      <div className="main">
        <nav className={`nav-bar ${navClass}`}>
          <ul>
            <small className="center-t">
              (NOTE: Click on the city name to compare weather)
            </small>
            {cityNames.map((city) => (
              <li key={city}>
                <a href="#">{city}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={`body-part ${bodyClass}`}>
          <h2 className="heading-part">Hourly-Temperature-Report</h2>
          <div className="temp-report-style">
            <p>At this hour of the Day the temperature is : {temp} &deg;C </p>
            <p>At this hour temperature feels like : {feelsLike} &deg;C</p>
          </div>
        </div>
      </div>
    </div>
  );
}
