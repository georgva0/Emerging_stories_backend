import fetch from "cross-fetch";
import microsoftTranslatorApiKey from "../cert/microsoftTranslatorApiKey";

const translation = async (text) => {
  try {
    const response = await fetch(
      `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=en`,
      {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": microsoftTranslatorApiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(text),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw "An error has occurred";
  }
};

export default translation;
