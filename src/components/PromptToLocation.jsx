import PropTypes from "prop-types";

const PromptToLocation = async (prompt) => {
  const url = "https://api.openai.com/v1/chat/completions";
  const data = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    functions: [
      {
        name: "displayData",
        description: "Get the current weather in a given location.",
        parameters: {
          type: "object",
          properties: {
            country: {
              type: "string",
              description: "Country name.",
            },
            countryCode: {
              type: "string",
              description: "Country code. Use ISO-3166",
            },
            USstate: {
              type: "string",
              description: "Full state name.",
            },
            state: {
              type: "string",
              description: "Two-letter state code.",
            },
            city: {
              type: "string",
              description: "City name.",
            },
            unit: {
              type: "string",
              description: "location unit: metric or imperial.",
            },
          },
          required: [
            "countryCode",
            "country",
            "USstate",
            "state",
            "city",
            "unit",
          ],
        },
      },
    ],
    function_call: "auto",
  };
  const params = {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    method: "POST",
  };

  return fetch(url, params)
    .then((response) => response.json())
    .then((data) => {
      const promptResponse = JSON.parse(
        data.choices[0].message.function_call.arguments
      );
      console.log("chat gpt reponse: ",promptResponse);

      const locationString = () => {
        if (promptResponse.countryCode === "US") {
          return `${promptResponse.city}, ${promptResponse.state}, ${promptResponse.country}`;
        } else {
          return `${promptResponse.city}, ${promptResponse.country}`;
        }
      };
      console.log(locationString());
      const promptData = {
        locationString: locationString(),
        units: promptResponse.unit,
        country: promptResponse.country,
        USstate: promptResponse.USstate,
      };
      return promptData;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      return Promise.reject("Unable to fetch data. Please try again later.");
    });
};

PromptToLocation.propTypes = {
  prompt: PropTypes.string.isRequired,
};

export default PromptToLocation;
