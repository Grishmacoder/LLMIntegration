
const WeatherData = async (locationData) => {
  try {
    
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${
        locationData.lat
      }&lon=${locationData.lon}&appid=${import.meta.env.VITE_OWM}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

export default WeatherData;
