import { useLocation } from "react-router-dom";
import { get } from "axios";

import "./handleWeatherData.css";

export default function H1andleWeatherdata() {
  const { val } = useLocation().state;
  const lat = val.latitude;
  const lon = val.longitude;

  //   const weatherReport = get(
  //     `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily&units=metric&appid=396b7a7f0b4c24e721bb411af8dad436`
  //   );

  //   console.log(weatherReport);

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
        <input className="hidden" type="checkbox" id="menu" />
        <h1 className="page-heading">Weather-App</h1>
      </header>
      <label htmlFor="menu" className="menu-button">
        &#9776;
      </label>
      <div className="main">
        <nav className="nav-bar">
          <ul>
            {cityNames.map((city) => (
              <li>
                <a href="#">{city}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="body-part"></div>
      </div>
    </div>
  );
}
