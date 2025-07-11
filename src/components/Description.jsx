import PropTypes from "prop-types";
const Description = ({ isLoading, weatherDescription }) => {
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
