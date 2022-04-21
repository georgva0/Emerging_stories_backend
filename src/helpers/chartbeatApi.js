import fetch from "cross-fetch";
//import chartbeatApiKey from "../cert/chartbeatApiKey";

const getChartbeatApiData = async (service) => {
  try {
    const response = await fetch(
      `https://api.chartbeat.com/live/toppages/v3/?apikey=${process.env.CHARTBEAT_API_KEY}&host=${service}.bbc.co.uk&limit=10&types=2`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw "An error has occurred";
  }
};

export default getChartbeatApiData;
