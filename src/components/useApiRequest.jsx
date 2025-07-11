import React, { useState, useEffect } from 'react'
import LocationToCoordinates from './LocationToCoordinates';    
import PromptToLocation from './PromptToLocation';
import PropTypes from 'prop-types';
import WeatherData from './WeatherData';
import WeatherDescript from './WeatherDescript';


const  useApiRequest =(prompt)=>{
    const [weatherData, setWeatherData] = useState(null);
    const [promptData, setpromptData] = useState({});
    const [location, setlocation] = useState([]);
    const [weatherDescription, setweatherDescription] = useState(null);
    const [error, seterror] = useState(null);

   
  useEffect(() => {
    const fetchWeatherData = async () => {
    if(!prompt)  return;
      try {
        // const response = await PromptToLocation(prompt);
        // setpromptData(response);
        console.log("what is prompt",prompt);
        const coordinates = await LocationToCoordinates(prompt);
        setpromptData(coordinates);
        setlocation(coordinates);
        console.log("what are my coordinates",coordinates);
        const weatherDataRes = await WeatherData(coordinates[0]);
        setWeatherData(weatherDataRes);
        console.log("what is my weather data",weatherDataRes);

        // const description = await WeatherDescript(prompt, weatherDataRes);
        // setweatherDescription(description);
    
      } catch (error) {
        seterror(error.message);
        console.error(error);
      }
    };

    fetchWeatherData();
  }, [prompt]);
    return { weatherData, promptData, location, weatherDescription, error };
};

useApiRequest.propTypes = {
  prompt: PropTypes.string.isRequired,
};

export default useApiRequest