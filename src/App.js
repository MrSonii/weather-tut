import { Link } from "react-router-dom";

import "./App.css";
import CityButton from "./comps/cityButton";

const cityData = [
  {
    cityName: "Fatehabad",
    longitude: "29.513181",
    latitude: "75.450953",
  },
  {
    cityName: "Hisar",
    longitude: "29.149188",
    latitude: "75.721653",
  },
  {
    cityName: "Sirsa",
    longitude: "29.532073",
    latitude: "75.031773",
  },
  {
    cityName: "Chandigarh",
    longitude: "30.733315",
    latitude: "76.779418",
  },
  {
    cityName: "Mohali",
    longitude: "30.704649",
    latitude: "76.717873",
  },
  {
    cityName: "Delhi",
    longitude: "28.704059",
    latitude: "77.10249",
  },
  {
    cityName: "Hamirpur",
    longitude: "31.686175",
    latitude: "76.521309",
  },
  {
    cityName: "Ghaziabad",
    longitude: "28.669157",
    latitude: "77.453758",
  },
  {
    cityName: "Sonipat",
    longitude: "28.993082",
    latitude: "77.015074",
  },
];

export default function App() {
  return (
    <div className="main-cont">
      <h1 className="header">
        U c4m3 a11 7h3 w4y jus7 t0 ch3ck w34th3r &nbsp;
        <small className="small-text"> (L0s3r)</small>
        <br></br>
        Now as u have arrived ,click on your city to check its weather
      </h1>
      <div className="city-cont">
        {cityData.map((val) => (
          <Link to="/weatherPage" state={{ val }} key={val.cityName}>
            <CityButton data={val} />
          </Link>
        ))}
      </div>
    </div>
  );
}
