"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = exports.allData = void 0;

var _chartbeatApi = _interopRequireDefault(require("./helpers/chartbeatApi"));

var _contentApi = _interopRequireDefault(require("./helpers/contentApi"));

var _microsoftTranslatorApi = _interopRequireDefault(require("./helpers/microsoftTranslatorApi"));

var _convertTime = _interopRequireDefault(require("./helpers/convertTime"));

var allData = [];
exports.allData = allData;

var init = function init() {
  Promise.all([(0, _chartbeatApi["default"])("afaanoromoo"), (0, _chartbeatApi["default"])("amharic"), (0, _chartbeatApi["default"])("afrique"), (0, _chartbeatApi["default"])("hausa"), (0, _chartbeatApi["default"])("igbo"), (0, _chartbeatApi["default"])("gahuza"), (0, _chartbeatApi["default"])("pidgin"), (0, _chartbeatApi["default"])("somali"), (0, _chartbeatApi["default"])("swahili"), (0, _chartbeatApi["default"])("tigrinya"), (0, _chartbeatApi["default"])("yoruba"), //getChartbeatApiData("kyrgyz"),
  //getChartbeatApiData("uzbek"),
  (0, _chartbeatApi["default"])("burmese"), (0, _chartbeatApi["default"])("zhongwen"), (0, _chartbeatApi["default"])("indonesian"), (0, _chartbeatApi["default"])("japanese"), (0, _chartbeatApi["default"])("korean"), (0, _chartbeatApi["default"])("thai"), (0, _chartbeatApi["default"])("vietnamese"), (0, _chartbeatApi["default"])("bengali"), (0, _chartbeatApi["default"])("gujarati"), (0, _chartbeatApi["default"])("hindi"), (0, _chartbeatApi["default"])("marathi"), (0, _chartbeatApi["default"])("nepali"), (0, _chartbeatApi["default"])("pashto"), (0, _chartbeatApi["default"])("punjabi"), (0, _chartbeatApi["default"])("sinhala"), (0, _chartbeatApi["default"])("tamil"), (0, _chartbeatApi["default"])("telugu"), (0, _chartbeatApi["default"])("urdu"), (0, _chartbeatApi["default"])("azeri"), (0, _chartbeatApi["default"])("russian"), (0, _chartbeatApi["default"])("serbian"), (0, _chartbeatApi["default"])("turkish"), (0, _chartbeatApi["default"])("ukrainian"), (0, _chartbeatApi["default"])("brasil"), (0, _chartbeatApi["default"])("mundo"), (0, _chartbeatApi["default"])("arabic"), (0, _chartbeatApi["default"])("persian")]) // .then((responses) => {
  //   return Promise.all(
  //     responses.map((response) => {
  //       return response;
  //     })
  //   );
  // })
  .then(function (data) {
    //push all pages arrays into an empty array
    var collectPages = [];
    data.forEach(function (item) {
      collectPages.push(item.pages);
    }); //flatten array and remove pages that are out of scope

    console.log(collectPages[0]);
    var collectPagesFlat = collectPages.flat();
    var collectPagesFiltered = collectPagesFlat.filter(function (item) {
      return item.stats.type !== "LandingPage" && !item.path.includes("topics") && !item.path.includes("live") && !item.path.includes("programmes") && !item.path.includes("extra") && !item.path.includes("_radio") && item.stats.people > 19;
    }); //create new array with objects containing just relevant properties, plus a score property to identify the stories that perform best

    var collectPagesReduced = collectPagesFiltered.map(function (item) {
      return {
        url: item.path,
        service: item.host,
        title: item.title,
        section: item.sections[0],
        score: item.stats["new"] / item.stats.visits
      };
    }); //sort array to bring the best performing stories, based on their score, at the top of the list

    collectPagesReduced.sort(function (b, a) {
      return a.score > b.score ? 1 : b.score > a.score ? -1 : 0;
    }); //select the top eight articles across all services

    var allTopEight = collectPagesReduced.slice(0, 8); //enhance the articles object with additional properties from Content API (image, alt) or from the relevant json file and translate article title with Microsoft Translator API

    var allTopEight_enhanced = allTopEight.map(function (item) {
      var url = item.url.slice(8);
      (0, _contentApi["default"])(url).then(function (data) {
        // item.imageHref = Object.values(
        //   data.results[0].media.images.index
        // )[0].href;
        // item.imageAlt = Object.values(
        //   data.results[0].media.images.index
        // )[0].altText;
        // item.lastPublished = convertTime(data.results[0].lastPublished);
        Object.values(data.results[0].media.images.index)[0].href ? item.imageHref = Object.values(data.results[0].media.images.index)[0].href : item.imageHref = "https://ichef.bbci.co.uk/news/800/cpsprodpb/".concat(data.promo.images.defaultPromoImage.blocks[2].model.locator);
        Object.values(data.results[0].media.images.index)[0].altText ? item.imageAlt = Object.values(data.results[0].media.images.index)[0].altText : item.imageAlt = data.promo.images.defaultPromoImage.blocks[1].model.blocks[0].model.blocks[0].model.text;
        (0, _convertTime["default"])(data.results[0].lastPublished) ? item.lastPublished = (0, _convertTime["default"])(data.results[0].lastPublished) : item.lastPublished = (0, _convertTime["default"])(new Date(data.metadata.timestamp));
      });
      (0, _microsoftTranslatorApi["default"])([{
        text: item.title
      }], item.section).then(function (data) {
        if (data) {
          item.translatedTitle = data[0].translations[0].text;
        } else {
          item.translatedTitle = item.title;
        }
      });
    }); //create arrays of top eight articles for various WS regions, following the same logic as for general top eight

    var africaTopEight = collectPagesReduced.filter(function (item) {
      if (item.service === "amharic.bbc.co.uk" || item.service === "afrique.bbc.co.uk" || item.service === "amharic.bbc.co.uk" || item.service === "afaanoromoo.bbc.co.uk" || item.service === "hausa.bbc.co.uk" || item.service === "igbo.bbc.co.uk" || item.service === "gahuza.bbc.co.uk" || item.service === "pidgin.bbc.co.uk" || item.service === "somali.bbc.co.uk" || item.service === "swahili.bbc.co.uk" || item.service === "tigrinya.bbc.co.uk" || item.service === "yoruba.bbc.co.uk") return item;
    }).slice(0, 8);
    var africaTopEight_enhanced = africaTopEight.map(function (item) {
      var url = item.url.slice(8);
      (0, _contentApi["default"])(url).then(function (data) {
        // item.imageHref = Object.values(
        //   data.results[0].media.images.index
        // )[0].href;
        // item.imageAlt = Object.values(
        //   data.results[0].media.images.index
        // )[0].altText;
        // item.lastPublished = convertTime(data.results[0].lastPublished);
        Object.values(data.results[0].media.images.index)[0].href ? item.imageHref = Object.values(data.results[0].media.images.index)[0].href : item.imageHref = "https://ichef.bbci.co.uk/news/800/cpsprodpb/".concat(data.promo.images.defaultPromoImage.blocks[2].model.locator);
        Object.values(data.results[0].media.images.index)[0].altText ? item.imageAlt = Object.values(data.results[0].media.images.index)[0].altText : item.imageAlt = data.promo.images.defaultPromoImage.blocks[1].model.blocks[0].model.blocks[0].model.text;
        (0, _convertTime["default"])(data.results[0].lastPublished) ? item.lastPublished = (0, _convertTime["default"])(data.results[0].lastPublished) : item.lastPublished = (0, _convertTime["default"])(new Date(data.metadata.timestamp));
      });

      try {
        (0, _microsoftTranslatorApi["default"])([{
          text: item.title
        }]).then(function (data) {
          data !== undefined ? item.translatedTitle = data[0].translations[0].text : item.translatedTitle = item.title;
        });
      } catch (error) {
        console.log("An error has occurred when trying to translate string: ".concat(error));
      }
    }); // const asiaCentralTopEight = collectPagesReduced
    //   .filter((item) => {
    //     if (
    //       item.service === "uzbek.bbc.co.uk" ||
    //       item.service === "kyrgyz.bbc.co.uk"
    //     )
    //       return item;
    //   })
    //   .slice(0, 8);
    // const asiaCentralTopEight_enhanced = asiaCentralTopEight.map((item) => {
    //   const url = item.url.slice(8);
    //   getContentApiData(url).then((data) => {
    // item.imageHref = Object.values(
    //   data.results[0].media.images.index
    // )[0].href;
    // item.imageAlt = Object.values(
    //   data.results[0].media.images.index
    // )[0].altText;
    // item.lastPublished = convertTime(data.results[0].lastPublished);
    //     Object.values(data.results[0].media.images.index)[0].href
    //       ? (item.imageHref = Object.values(
    //           data.results[0].media.images.index
    //         )[0].href)
    //       : (item.imageHref = `https://ichef.bbci.co.uk/news/800/cpsprodpb/${data.promo.images.defaultPromoImage.blocks[2].model.locator}`);
    //     Object.values(data.results[0].media.images.index)[0].altText
    //       ? (item.imageAlt = Object.values(
    //           data.results[0].media.images.index
    //         )[0].altText)
    //       : (item.imageAlt =
    //           data.promo.images.defaultPromoImage.blocks[1].model.blocks[0].model.blocks[0].model.text);
    //     convertTime(data.results[0].lastPublished)
    //       ? (item.lastPublished = convertTime(data.results[0].lastPublished))
    //       : (item.lastPublished = convertTime(
    //           new Date(data.metadata.timestamp)
    //         ));
    //   });
    //   translateString([{ text: item.title }]).then((data) => {
    //     item.translatedTitle = data[0].translations[0].text;
    //   });
    // });

    var asiaPacificTopEight = collectPagesReduced.filter(function (item) {
      if (item.service === "burmese.bbc.co.uk" || item.service === "zhongwen.bbc.co.uk" || item.service === "indonesia.bbc.co.uk" || item.service === "japanese.bbc.co.uk" || item.service === "korean.bbc.co.uk" || item.service === "thai.bbc.co.uk" || item.service === "vietnamese.bbc.co.uk") return item;
    }).slice(0, 8);
    var asiaPacificTopEight_enhanced = asiaPacificTopEight.map(function (item) {
      var url = item.url.slice(8);
      (0, _contentApi["default"])(url).then(function (data) {
        // item.imageHref = Object.values(
        //   data.results[0].media.images.index
        // )[0].href;
        // item.imageAlt = Object.values(
        //   data.results[0].media.images.index
        // )[0].altText;
        // item.lastPublished = convertTime(data.results[0].lastPublished);
        Object.values(data.results[0].media.images.index)[0].href ? item.imageHref = Object.values(data.results[0].media.images.index)[0].href : item.imageHref = "https://ichef.bbci.co.uk/news/800/cpsprodpb/".concat(data.promo.images.defaultPromoImage.blocks[2].model.locator);
        Object.values(data.results[0].media.images.index)[0].altText ? item.imageAlt = Object.values(data.results[0].media.images.index)[0].altText : item.imageAlt = data.promo.images.defaultPromoImage.blocks[1].model.blocks[0].model.blocks[0].model.text;
        (0, _convertTime["default"])(data.results[0].lastPublished) ? item.lastPublished = (0, _convertTime["default"])(data.results[0].lastPublished) : item.lastPublished = (0, _convertTime["default"])(new Date(data.metadata.timestamp));
      });
      (0, _microsoftTranslatorApi["default"])([{
        text: item.title
      }]).then(function (data) {
        data !== undefined ? item.translatedTitle = data[0].translations[0].text : item.translatedTitle = item.title;
      });
    });
    var asiaSouthTopEight = collectPagesReduced.filter(function (item) {
      if (item.service === "bengali.bbc.co.uk" || item.service === "bengali.bbc.co.uk" || item.service === "gujarati.bbc.co.uk" || item.service === "hindi.bbc.co.uk" || item.service === "marathi.bbc.co.uk" || item.service === "nepali.bbc.co.uk" || item.service === "pashto.bbc.co.uk" || item.service === "punjabi.bbc.co.uk" || item.service === "sinhala.bbc.co.uk" || item.service === "tamil.bbc.co.uk" || item.service === "telugu.bbc.co.uk" || item.service === "urdu.bbc.co.uk") return item;
    }).slice(0, 8);
    var asiaSouthTopEight_enhanced = asiaSouthTopEight.map(function (item) {
      var url = item.url.slice(8);
      (0, _contentApi["default"])(url).then(function (data) {
        // item.imageHref = Object.values(
        //   data.results[0].media.images.index
        // )[0].href;
        // item.imageAlt = Object.values(
        //   data.results[0].media.images.index
        // )[0].altText;
        // item.lastPublished = convertTime(data.results[0].lastPublished);
        Object.values(data.results[0].media.images.index)[0].href ? item.imageHref = Object.values(data.results[0].media.images.index)[0].href : item.imageHref = "https://ichef.bbci.co.uk/news/800/cpsprodpb/".concat(data.promo.images.defaultPromoImage.blocks[2].model.locator);
        Object.values(data.results[0].media.images.index)[0].altText ? item.imageAlt = Object.values(data.results[0].media.images.index)[0].altText : item.imageAlt = data.promo.images.defaultPromoImage.blocks[1].model.blocks[0].model.blocks[0].model.text;
        (0, _convertTime["default"])(data.results[0].lastPublished) ? item.lastPublished = (0, _convertTime["default"])(data.results[0].lastPublished) : item.lastPublished = (0, _convertTime["default"])(new Date(data.metadata.timestamp));
      });
      (0, _microsoftTranslatorApi["default"])([{
        text: item.title
      }]).then(function (data) {
        data[0].translations !== undefined ? item.translatedTitle = data[0].translations[0].text : item.translatedTitle = item.title;
      });
    });
    var europeTopEight = collectPagesReduced.filter(function (item) {
      if (item.service === "azeri.bbc.co.uk" || item.service === "russian.bbc.co.uk" || item.service === "serbian.bbc.co.uk" || item.service === "turkish.bbc.co.uk" || item.service === "ukrainian.bbc.co.uk") return item;
    }).slice(0, 8);
    var europeTopEight_enhanced = europeTopEight.map(function (item) {
      var url = item.url.slice(8);
      (0, _contentApi["default"])(url).then(function (data) {
        // item.imageHref = Object.values(
        //   data.results[0].media.images.index
        // )[0].href;
        // item.imageAlt = Object.values(
        //   data.results[0].media.images.index
        // )[0].altText;
        // item.lastPublished = convertTime(data.results[0].lastPublished);
        Object.values(data.results[0].media.images.index)[0].href ? item.imageHref = Object.values(data.results[0].media.images.index)[0].href : item.imageHref = "https://ichef.bbci.co.uk/news/800/cpsprodpb/".concat(data.promo.images.defaultPromoImage.blocks[2].model.locator);
        Object.values(data.results[0].media.images.index)[0].altText ? item.imageAlt = Object.values(data.results[0].media.images.index)[0].altText : item.imageAlt = data.promo.images.defaultPromoImage.blocks[1].model.blocks[0].model.blocks[0].model.text;
        (0, _convertTime["default"])(data.results[0].lastPublished) ? item.lastPublished = (0, _convertTime["default"])(data.results[0].lastPublished) : item.lastPublished = (0, _convertTime["default"])(new Date(data.metadata.timestamp));
      });
      (0, _microsoftTranslatorApi["default"])([{
        text: item.title
      }]).then(function (data) {
        data !== undefined ? item.translatedTitle = data[0].translations[0].text : item.translatedTitle = item.title;
      });
    });
    var americasTopEight = collectPagesReduced.filter(function (item) {
      if (item.service === "mundo.bbc.co.uk" || item.service === "brasil.bbc.co.uk") return item;
    }).slice(0, 8);
    var americasTopEight_enhanced = americasTopEight.map(function (item) {
      var url = item.url.slice(8);
      (0, _contentApi["default"])(url).then(function (data) {
        // item.imageHref = Object.values(
        //   data.results[0].media.images.index
        // )[0].href;
        // item.imageAlt = Object.values(
        //   data.results[0].media.images.index
        // )[0].altText;
        // item.lastPublished = convertTime(data.results[0].lastPublished);
        Object.values(data.results[0].media.images.index)[0].href ? item.imageHref = Object.values(data.results[0].media.images.index)[0].href : item.imageHref = "https://ichef.bbci.co.uk/news/800/cpsprodpb/".concat(data.promo.images.defaultPromoImage.blocks[2].model.locator);
        Object.values(data.results[0].media.images.index)[0].altText ? item.imageAlt = Object.values(data.results[0].media.images.index)[0].altText : item.imageAlt = data.promo.images.defaultPromoImage.blocks[1].model.blocks[0].model.blocks[0].model.text;
        (0, _convertTime["default"])(data.results[0].lastPublished) ? item.lastPublished = (0, _convertTime["default"])(data.results[0].lastPublished) : item.lastPublished = (0, _convertTime["default"])(new Date(data.metadata.timestamp));
      });
      (0, _microsoftTranslatorApi["default"])([{
        text: item.title
      }]).then(function (data) {
        data !== undefined ? item.translatedTitle = data[0].translations[0].text : item.translatedTitle = item.title;
      });
    });
    var middleEastTopEight = collectPagesReduced.filter(function (item) {
      if (item.service === "arabic.bbc.co.uk" || item.service === "persian.bbc.co.uk") return item;
    }).slice(0, 8);
    var middleEastTopEight_enhanced = middleEastTopEight.map(function (item) {
      var url = item.url.slice(8);
      (0, _contentApi["default"])(url).then(function (data) {
        // item.imageHref = Object.values(
        //   data.results[0].media.images.index
        // )[0].href;
        // item.imageAlt = Object.values(
        //   data.results[0].media.images.index
        // )[0].altText;
        // item.lastPublished = convertTime(data.results[0].lastPublished);
        Object.values(data.results[0].media.images.index)[0].href ? item.imageHref = Object.values(data.results[0].media.images.index)[0].href : item.imageHref = "https://ichef.bbci.co.uk/news/800/cpsprodpb/".concat(data.promo.images.defaultPromoImage.blocks[2].model.locator);
        Object.values(data.results[0].media.images.index)[0].altText ? item.imageAlt = Object.values(data.results[0].media.images.index)[0].altText : item.imageAlt = data.promo.images.defaultPromoImage.blocks[1].model.blocks[0].model.blocks[0].model.text;
        (0, _convertTime["default"])(data.results[0].lastPublished) ? item.lastPublished = (0, _convertTime["default"])(data.results[0].lastPublished) : item.lastPublished = (0, _convertTime["default"])(new Date(data.metadata.timestamp));
      });
      (0, _microsoftTranslatorApi["default"])([{
        text: item.title
      }]).then(function (data) {
        data !== undefined ? item.translatedTitle = data[0].translations[0].text : item.translatedTitle = item.title;
      });
    });
    allData.length = 0;
    allData.push(allTopEight, africaTopEight, //asiaCentralTopEight,
    asiaPacificTopEight, asiaSouthTopEight, europeTopEight, americasTopEight, middleEastTopEight);
  })["catch"](function (error) {
    // if there's an error, log it
    console.log(error);
  });
};

exports.init = init;
//# sourceMappingURL=init.js.map