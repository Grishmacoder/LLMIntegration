import PropTypes from "prop-types";
import "./Description.css"; 

const Description = ({ isLoading, weatherDescription }) => {
  if(!weatherDescription) {
    return <p className="description-text">No description available yet.</p>; 
  }
  return (
    <div className="description">
      <h2>Description</h2>
      <div className="description-content">
        {isLoading ? "Loading..." : weatherDescription}
        <p className="description-text">{weatherDescription}</p>
      </div>
    </div>
  );
};

Description.defaultProps = {
  isLoading: false,
  weatherDescription: "No description available.",
};

Description.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  weatherDescription: PropTypes.string.isRequired,
};

export default Description;
