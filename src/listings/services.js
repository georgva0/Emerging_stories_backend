import getChartbeatApiData from "../helpers/chartbeatApi";

const services = {};

services.servicesURL = [
  {
    serviceUrl: "news",
    serviceName: "News",
  },
  {
    serviceUrl: "afaanoromoo",
    serviceName: "Afaan Oromoo",
  },
  {
    serviceUrl: "amharic",
    serviceName: "Amharic",
  },
  {
    serviceUrl: "afrique",
    serviceName: "Afrique",
  },
  {
    serviceUrl: "hausa",
    serviceName: "Hausa",
  },
  {
    serviceUrl: "igbo",
    serviceName: "Igbo",
  },
  {
    serviceUrl: "gahuza",
    serviceName: "Gahuza",
  },
  {
    serviceUrl: "pidgin",
    serviceName: "Pidgin",
  },

  {
    serviceUrl: "somali",
    serviceName: "Somali",
  },

  {
    serviceUrl: "swahili",
    serviceName: "Swahili",
  },
  {
    serviceUrl: "tigrinya",
    serviceName: "Tigrinya",
  },
  {
    serviceUrl: "yoruba",
    serviceName: "Yoruba",
  },

  {
    serviceUrl: "kyrgyz",
    serviceName: "Kyrgyz",
  },
  {
    serviceUrl: "uzbek",
    serviceName: "Uzbek",
  },
  {
    serviceUrl: "burmese",
    serviceName: "Burmese",
  },
  {
    serviceUrl: "chinese",
    serviceName: "Chinese",
  },
  {
    serviceUrl: "indonesia",
    serviceName: "Indonesia",
  },
  {
    serviceUrl: "japanese",
    serviceName: "Japanese",
  },
  {
    serviceUrl: "korean",
    serviceName: "Korean",
  },
  {
    serviceUrl: "thai",
    serviceName: "Thai",
  },
  {
    serviceUrl: "vietnamese",
    serviceName: "Vietnamese",
  },
  {
    serviceUrl: "bengali",
    serviceName: "Bengali",
  },
  {
    serviceUrl: "gujarati",
    serviceName: "Gujarati",
  },
  {
    serviceUrl: "hindi",
    serviceName: "Hindi",
  },
  {
    serviceUrl: "marathi",
    serviceName: "Marathi",
  },
  {
    serviceUrl: "nepali",
    serviceName: "Nepali",
  },
  {
    serviceUrl: "pashto",
    serviceName: "Pashto",
  },
  {
    serviceUrl: "punjabi",
    serviceName: "Punjabi",
  },
  {
    serviceUrl: "sinhala",
    serviceName: "Sinhala",
  },
  {
    serviceUrl: "tamil",
    serviceName: "Tamil",
  },
  {
    serviceUrl: "telugu",
    serviceName: "Telugu",
  },
  {
    serviceUrl: "urdu",
    serviceName: "Urdu",
  },
  {
    serviceUrl: "azeri",
    serviceName: "Azeri",
  },
  {
    serviceUrl: "russian",
    serviceName: "Russian",
  },
  {
    serviceUrl: "serbian",
    serviceName: "Serbian",
  },
  {
    serviceUrl: "turkish",
    serviceName: "Turkish",
  },
  {
    serviceUrl: "ukrainian",
    serviceName: "Ukrainian",
  },
  {
    serviceUrl: "brasil",
    serviceName: "Brasil",
  },
  {
    serviceUrl: "mundo",
    serviceName: "Mundo",
  },
  {
    serviceUrl: "arabic",
    serviceName: "Arabic",
  },
  {
    serviceUrl: "persian",
    serviceName: "Persian",
  },
];

services.servicesChartbeatCalls = [
  getChartbeatApiData("afaanoromoo"),
  getChartbeatApiData("amharic"),
  getChartbeatApiData("afrique"),
  getChartbeatApiData("hausa"),
  getChartbeatApiData("igbo"),
  getChartbeatApiData("gahuza"),
  getChartbeatApiData("pidgin"),
  getChartbeatApiData("somali"),
  getChartbeatApiData("swahili"),
  getChartbeatApiData("tigrinya"),
  getChartbeatApiData("yoruba"),
  getChartbeatApiData("kyrgyz"),
  getChartbeatApiData("uzbek"),
  getChartbeatApiData("burmese"),
  getChartbeatApiData("chinese"),
  getChartbeatApiData("indonesia"),
  getChartbeatApiData("japanese"),
  getChartbeatApiData("korean"),
  getChartbeatApiData("thai"),
  getChartbeatApiData("vietnamese"),
  getChartbeatApiData("bengali"),
  getChartbeatApiData("gujarati"),
  getChartbeatApiData("hindi"),
  getChartbeatApiData("marathi"),
  getChartbeatApiData("nepali"),
  getChartbeatApiData("pashto"),
  getChartbeatApiData("punjabi"),
  getChartbeatApiData("sinhala"),
  getChartbeatApiData("tamil"),
  getChartbeatApiData("telugu"),
  getChartbeatApiData("urdu"),
  getChartbeatApiData("azeri"),
  getChartbeatApiData("russian"),
  getChartbeatApiData("serbian"),
  getChartbeatApiData("turkish"),
  getChartbeatApiData("ukrainian"),
  getChartbeatApiData("brasil"),
  getChartbeatApiData("mundo"),
  getChartbeatApiData("arabic"),
  getChartbeatApiData("persian"),
];

export default services;
