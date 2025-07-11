import "./App.css";
import { useEffect, useState } from "react";
import WeatherForm from "./components/WeatherForm";
import WeatherCard from "./components/WeatherCard";
import useApiRequest from "./components/useApiRequest";
import Description from "./components/Description";

function App() {
  const [prompt, setPrompt] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [weatherDataLoading, setWeatherDataLoading] = useState(false);

  const [units, setUnits] = useState("metric");

  const { weatherData, promptData, location, error } = useApiRequest(prompt);

  const handleFormSubmit = (newPrompt) => {
    setPrompt(newPrompt);
    setErrorMsg(null);
    setWeatherDataLoading(true);
  };
  useEffect(() => {
    if (error) {
      setErrorMsg(error);
      setWeatherDataLoading(false);
    }
  }, [error]);
  useEffect(() => {
    if (weatherData) {
      setWeatherDataLoading(false);
    }
  }, [weatherData]);
  // useEffect(() => {
  //   if (weatherDescription) {
  //     setWeatherDescriptionLoading(false);
  //   }
  // }, [weatherDescription]);
  // useEffect(() => {
  //   if (promptData && promptData.units) {
  //     setUnits(promptData.units);
  //   }
  // }, [promptData]);

  return (
    <>
      <div className="container">
        <header className="header">
          <h1 className="page-title">Current Weather</h1>
          <WeatherForm onSubmit={handleFormSubmit} />
          {error && <p className="error">{errorMsg.message}</p>}
          {console.log("promptData:", promptData)}
          {console.log("weatherDataLoading:", weatherDataLoading)}
          {console.log("error:", error)}
          {/* {weatherDescription ? (
            <Description
              isLoading={weatherDescriptionLoading}
              description={weatherDescription}
            />
          ) : (
            <Description
              isLoading={weatherDescriptionLoading}
              description="No description available."
            />
          )} */}
        </header>
        <main className="main-content">
          <WeatherCard
            data={weatherData}
            units={units}
            isLoading={weatherDataLoading}
            country={promptData.country}
            USstate={location && location[0] ? location[0].state : ""}
            setUnits={setUnits}
          />
        </main>
      </div>
    </>
  );
}

export default App;
