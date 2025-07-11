import PropTypes from "prop-types";

const WeatherDescript = async({ prompt, weatherData }) => {
  const url = "https://api.openai.com/v1/chat/completions";

  const sysMsg = `In a conversational professional tone, answer the [Question] based on the [Weather Data]. 

- Provide an opinion about what the weather feels like. 
- Provide temperature in either Celsius or Fahrenheit, whichever is more appropriate. 
- Never display the temperature in Kelvin. 
- Provide a recommendation on how to prepare and what to wear (e.g. bring an umbrella, wear a wind breaker, a warm jacket, etc.)`;

  const newPrompt = `Question: ${prompt}. Weather Data: ${JSON.stringify(
    weatherData
  )}`;

  const body = {
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: sysMsg },
      { role: "user", content: newPrompt },
    ],
  };

  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    },
    body: JSON.stringify(body),
    method: "POST",
  };

  return fetch(url, params)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch weather description");
      }
      return response.json();
    })
    .then((data) => {
      return data.choices[0].message.content;
    })
    .catch((error) => {
      console.error("Error fetching weather description:", error);
      throw error;
    });
};

WeatherDescript.propTypes = {
  prompt: PropTypes.string.isRequired,
  weatherData: PropTypes.object.isRequired,
};

export default WeatherDescript;
