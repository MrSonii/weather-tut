export default function CityElement({ data, onClick }) {
  return (
    <button className="city-button" onClick={() => onClick(data)}>
      {data.cityName}
    </button>
  );
}
