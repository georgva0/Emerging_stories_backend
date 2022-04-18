import fetch from "cross-fetch";
import contentApiKey from "../cert/contentApiKey";

const getContentApiData = async (url) => {
  try {
    const response = await fetch(
      `http://content-api-a127.api.bbci.co.uk/asset/${url}?api_key=${process.env.CONTENT_API_KEY}`,
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
    // try{

    // } catch(error){
    //   throw "An error has occurred when trying to access json";
    // }

    console.log(`An error has occurred when accessing ContentAPI for ${url}`);
  }
};

export default getContentApiData;
