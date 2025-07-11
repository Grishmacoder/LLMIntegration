import React from "react";
import Loader from "./Loader";
import "./WeatherCard.css";

function WeatherCard({ data, units, setUnits, isLoading, USstate }) {
  if (isLoading) {
    return (
      <div className="weathercard">
        <div className="weathercard__container">
          <div className="weathercard__loading">
            <Loader />
          </div>
        </div>
      </div>
    );
  }
  const defaultData = {
    data: {
      name: "--",
      sys: {
        country: "--",
      },
      main: {
        temp: 273,
      },
      wind: {
        speed: 0,
        deg: 0,
      },
      weather: [{ description: "No data available" }],
    },
    units: "metric",
  };
  const displaData = data || defaultData.data;

  const tempTranslator = (temp, units) => {
    if (units === "metric") {
      return Math.round(temp - 273.15);
    } else {
      return Math.round(1.8 * (temp - 273) + 32);
    }
  };
  const speedTranslator = (speed, units) => {
    if (units === "metric") {
      return Math.round(speed);
    } else {
      return Math.round(speed * 3.281);
    }
  };
  const stateDisplay = () => {
    if (displaData.sys.country === "US") {
      // If the country is US, return the state from the location data
      return `${USstate}`;
    } else {
      return "";
    }
  };
  const windDirection = (deg) => {
    if (deg >= 0 && deg <= 22.5) return "N";
    if (deg > 22.5 && deg <= 67.5) return "NE";
    if (deg > 67.5 && deg <= 112.5) return "E";
    if (deg > 112.5 && deg <= 157.5) return "SE";
    if (deg > 157.5 && deg <= 202.5) return "S";
    if (deg > 202.5 && deg <= 247.5) return "SW";
    if (deg > 247.5 && deg <= 292.5) return "W";
    if (deg > 292.5 && deg <= 337.5) return "NW";
    if (deg > 337.5 && deg <= 360) return "N";
  };
  return (
    <article className="weathercard">
      <div className="weathercard__container">
        <div className="weathercard__meta"></div>
        <div className="weathercard__details">
          <span className="weathercard__location">
            {displaData.name} {stateDisplay()},{displaData.sys.country}
          </span>
        </div>
        <div className="weathercard__temp">
          <span className="weathercard__temperature">
            {tempTranslator(displaData.main.temp, units)}°
            {units === "metric" ? "C" : "F"}
          </span>
        </div>

        <div className="weathercard__wind">
          <div className="weathercard__wind-direction">
            <span
              className="weathercard__wind-direction-arrow"
              style={{ transform: `rotate(${displaData.wind.deg + 90}deg)` }}
            >
              &#8599; {displaData.wind.deg}°
            </span>
            {windDirection(displaData.wind.deg) ? (
              <span className="weathercard__wind-direction-text">
                {windDirection(displaData.wind.deg)}
              </span>
            ) : null}
          </div>
          <div className="weathercard__wind-speed-container">
            <span className="weathercard__wind-speed">
              Wind: {speedTranslator(displaData.wind.speed, units)}{" "}
              {units === "metric" ? "m/s" : "ft/s"}
            </span>
          </div>
        </div>
        <div className="weathercard__humidity">
          Humidity: {displaData.main.humidity}%
        </div>
        <div className="weathercard_description">
          <span className="weathercard__description-text">
            {displaData.weather[0].description}
          </span>
        </div>
        <div className="weathercard__units-toggle">
          <button onClick={() => setUnits("metric")}>°C</button>
          <button onClick={() => setUnits("imperial")}>°F</button>
        </div>
      </div>
    </article>
  );
}

export default WeatherCard;
