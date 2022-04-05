import { useLocation } from "react-router-dom";
import { get } from "axios";
import { useEffect, useState } from "react";

import "./weatherPage.css";

function handleClass(setNavClass, setBodyClass, navClass, bodyClass) {
  if (navClass === "" && bodyClass === "") {
    setNavClass("show-navBar");
    setBodyClass("move-bodyPart");
  } else {
    setNavClass("");
    setBodyClass("");
  }
}

function forFirstRender({ resp, setData }) {
  const { temp, feels_like: feelsLike } = resp.data.hourly[0];
  const newState = {
    temp,
    feelsLike,
  };

  setData(newState);
}

function comparisonHandlerCB({ resp, setData, data: { city } }) {
  const { temp, feels_like: feelsLike } = resp.data.hourly[0];
  const compData = {
    temp,
    feelsLike,
    city,
  };

  setData(compData);
}

function handleGetThenCatch({ data, callback, setData, setError }) {
  const { lat, lon } = data;
  get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily&units=metric&appid=396b7a7f0b4c24e721bb411af8dad436`
  )
    .then((resp) => {
      callback({ resp, setData, data });
    })
    .catch((err) => {
      setError(err);
    });
}

export default function H1andleWeatherdata() {
  const [apiData, setData] = useState({});
  const [compData, setCompData] = useState({});
  const [navClass, setNavClass] = useState("");
  const [bodyClass, setBodyClass] = useState("");
  const [error, setError] = useState("");

  const { val } = useLocation().state;

  const lat = val.citydata.latitude;
  const lon = val.citydata.longitude;
  const masterData = val.masterData;

  useEffect(() => {
    handleGetThenCatch({
      data: {
        lat,
        lon,
      },
      callback: forFirstRender,
      setData,
      setError,
    });
  }, []);

  const filteredCities = masterData.filter(
    ({ cityName: city }) => city !== val.citydata.cityName
  );

  const { temp, feelsLike } = apiData;

  const classes = error !== "" ? "" : "hidden";
  const comparisonClass = compData !== {} ? "" : "hidden";

  console.log(compData);

  return (
    <div>
      <div className={`error-screen ${classes}`}>
        this error occurred: {error}
      </div>
      <header className="head-part">
        <p
          className="menu-button"
          onClick={() =>
            handleClass(setNavClass, setBodyClass, navClass, bodyClass)
          }
        >
          &#9776;
        </p>
        <h1 className="page-heading">Weather-Detail-Page</h1>
      </header>
      <div className="flex">
        <nav className={`nav-bar ${navClass}`}>
          <ul>
            <small className="center-t">
              (NOTE: Click on the city name to compare weather)
            </small>
            {filteredCities.map(
              ({ cityName: city, longitude: lon, latitude: lat }) => (
                <li key={city}>
                  <p
                    onClick={() =>
                      handleGetThenCatch({
                        data: {
                          city,
                          lat,
                          lon,
                        },
                        callback: comparisonHandlerCB,
                        setData: setCompData,
                        setError,
                      })
                    }
                  >
                    {city}
                  </p>
                </li>
              )
            )}
            <button
              className="close-comparison-button"
              onClick={() => setCompData({})}
            >
              Close Comparison
            </button>
          </ul>
        </nav>
        <div className="flex">
          <div className={`body-part ${bodyClass}`}>
            <div className="temp-report-style">
              <p>
                At this hour of the Day the temperature of{" "}
                {val.citydata.cityName} is : {temp} &deg;C{" "}
              </p>
              <p>At this hour temperature feels like : {feelsLike} &deg;C</p>
            </div>
            <div className={`temp-report-style ${comparisonClass}`}>
              <p>
                At this hour of the Day the temperature {compData.city} of is :{" "}
                {compData.temp}&deg;C{" "}
              </p>
              <p>
                At this hour temperature feels like : {compData.feelsLike}&deg;C
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
