import PropTypes from "prop-types";
const LocationToCoordinates = async (location) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&APPID=${
        import.meta.env.VITE_OWM
      }`
    );
    const data = await response.json();
    if (data.length === 0) {
      throw new Error("Location not found");
    }
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching location coordinates:", error);
    return await Promise.reject(error);
  }
};

LocationToCoordinates.propTypes = {
  location: PropTypes.string.isRequired,
};

export default LocationToCoordinates;
