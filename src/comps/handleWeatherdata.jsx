import { useLocation } from "react-router-dom";
import { get } from "axios";

export default function H1andleWeatherdata() {
  const { val } = useLocation().state;
  const lat = val.latitude;
  const lon = val.longitude;
  const weatherReport = get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=396b7a7f0b4c24e721bb411af8dad436`
  );

  console.log(weatherReport);
  return <p>i came here</p>;
}
