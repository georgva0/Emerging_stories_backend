import fetch from "cross-fetch";
import contentApiKey from "../cert/contentApiKey";

const getContentApiData = async (url) => {
  try {
    const response = await fetch(
      `http://content-api-a127.api.bbci.co.uk/asset/${url}?api_key=${contentApiKey}`,
      {
        method: "GET",
        headers: {
          "x-candy-platform": "EnhancedMobile",
          "x-candy-audience": "Domestic",
          Accept: "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw "An error has occurred";
  }
};

export default getContentApiData;
