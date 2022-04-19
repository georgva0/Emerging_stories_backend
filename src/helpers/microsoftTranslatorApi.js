import fetch from "cross-fetch";
import microsoftTranslatorApiKey from "../cert/microsoftTranslatorApiKey";

const translateString = async (text, language) => {
  const unRecognised = {
    amharic: "am",
    azeri: "az",
    bengali: "bn",
    kyrgyz: "ky",
    marathi: "mr",
    nepali: "ne",
    punjabi: "pa",
    telugu: "te",
    tigrinya: "ti",
    tamil: "ta",
  };

  if (Object.keys(unRecognised).indexOf(language) === -1) {
    try {
      const response = await fetch(
        `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=en`,
        {
          method: "POST",
          headers: {
            "Ocp-Apim-Subscription-Key":
              process.env.MICROSOFT_TRANSLATOR_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(text),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw "An error has occurred when translating from automatically recognised language.";
    }
  } else {
    try {
      const response = await fetch(
        `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=en`,
        // saving this parameter in case if ever needed &from=${unRecognised.language}
        {
          method: "POST",
          headers: {
            "Ocp-Apim-Subscription-Key":
              process.env.MICROSOFT_TRANSLATOR_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(text),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw "An error has occurred when translating from language that was not automatically detected.";
    }
  }
};

export default translateString;
