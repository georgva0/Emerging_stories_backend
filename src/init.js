import getChartbeatApiData from "./helpers/chartbeatApi";
import getContentApiData from "./helpers/contentApi";
import translateString from "./helpers/microsoftTranslatorApi";
import convertTime from "./helpers/convertTime";

const allData = [];

const init = () => {
  Promise.all([
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
    //getChartbeatApiData("kyrgyz"),
    //getChartbeatApiData("uzbek"),
    getChartbeatApiData("burmese"),
    getChartbeatApiData("zhongwen"),
    getChartbeatApiData("indonesian"),
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
  ])
    // .then((responses) => {
    //   return Promise.all(
    //     responses.map((response) => {
    //       return response;
    //     })
    //   );
    // })
    .then((data) => {
      //push all pages arrays into an empty array

      const collectPages = [];
      data.forEach((item) => {
        collectPages.push(item.pages);
      });
      //flatten array and remove pages that are out of scope

      const collectPagesFlat = collectPages.flat();
      const collectPagesFiltered = collectPagesFlat.filter(
        (item) =>
          clearitem.stats.type !== "LandingPage" &&
          !item.path.includes(`topics`) &&
          !item.path.includes(`live`) &&
          !item.path.includes(`programmes`) &&
          !item.path.includes(`extra`) &&
          !item.path.includes(`_radio`) &&
          item.stats.people > 19
      );

      //create new array with objects containing just relevant properties, plus a score property to identify the stories that perform best

      const collectPagesReduced = collectPagesFiltered.map((item) => {
        return {
          url: item.path,
          service: item.host,
          title: item.title,
          section: item.sections[0],
          score: item.stats.new / item.stats.visits,
        };
      });

      //sort array to bring the best performing stories, based on their score, at the top of the list
      collectPagesReduced.sort((b, a) =>
        a.score > b.score ? 1 : b.score > a.score ? -1 : 0
      );

      //select the top eight articles across all services
      const allTopEight = collectPagesReduced.slice(0, 8);

      //enhance the articles object with additional properties from Content API (image, alt) or from the relevant json file and translate article title with Microsoft Translator API
      const allTopEight_enhanced = allTopEight.map((item) => {
        const url = item.url.slice(8);
        getContentApiData(url).then((data) => {
          // item.imageHref = Object.values(
          //   data.results[0].media.images.index
          // )[0].href;
          // item.imageAlt = Object.values(
          //   data.results[0].media.images.index
          // )[0].altText;
          // item.lastPublished = convertTime(data.results[0].lastPublished);

          Object.values(data.results[0].media.images.index)[0].href
            ? (item.imageHref = Object.values(
                data.results[0].media.images.index
              )[0].href)
            : (item.imageHref = `https://ichef.bbci.co.uk/news/800/cpsprodpb/${data.promo.images.defaultPromoImage.blocks[2].model.locator}`);

          Object.values(data.results[0].media.images.index)[0].altText
            ? (item.imageAlt = Object.values(
                data.results[0].media.images.index
              )[0].altText)
            : (item.imageAlt =
                data.promo.images.defaultPromoImage.blocks[1].model.blocks[0].model.blocks[0].model.text);

          convertTime(data.results[0].lastPublished)
            ? (item.lastPublished = convertTime(data.results[0].lastPublished))
            : (item.lastPublished = convertTime(
                new Date(data.metadata.timestamp)
              ));
        });
        translateString([{ text: item.title }], item.section).then((data) => {
          if (data) {
            item.translatedTitle = data[0].translations[0].text;
          } else {
            item.translatedTitle = item.title;
          }
        });
      });

      //create arrays of top eight articles for various WS regions, following the same logic as for general top eight

      const africaTopEight = collectPagesReduced
        .filter((item) => {
          if (
            item.service === "amharic.bbc.co.uk" ||
            item.service === "afrique.bbc.co.uk" ||
            item.service === "amharic.bbc.co.uk" ||
            item.service === "afaanoromoo.bbc.co.uk" ||
            item.service === "hausa.bbc.co.uk" ||
            item.service === "igbo.bbc.co.uk" ||
            item.service === "gahuza.bbc.co.uk" ||
            item.service === "pidgin.bbc.co.uk" ||
            item.service === "somali.bbc.co.uk" ||
            item.service === "swahili.bbc.co.uk" ||
            item.service === "tigrinya.bbc.co.uk" ||
            item.service === "yoruba.bbc.co.uk"
          )
            return item;
        })
        .slice(0, 8);

      const africaTopEight_enhanced = africaTopEight.map((item) => {
        const url = item.url.slice(8);
        getContentApiData(url).then((data) => {
          // item.imageHref = Object.values(
          //   data.results[0].media.images.index
          // )[0].href;
          // item.imageAlt = Object.values(
          //   data.results[0].media.images.index
          // )[0].altText;
          // item.lastPublished = convertTime(data.results[0].lastPublished);

          Object.values(data.results[0].media.images.index)[0].href
            ? (item.imageHref = Object.values(
                data.results[0].media.images.index
              )[0].href)
            : (item.imageHref = `https://ichef.bbci.co.uk/news/800/cpsprodpb/${data.promo.images.defaultPromoImage.blocks[2].model.locator}`);

          Object.values(data.results[0].media.images.index)[0].altText
            ? (item.imageAlt = Object.values(
                data.results[0].media.images.index
              )[0].altText)
            : (item.imageAlt =
                data.promo.images.defaultPromoImage.blocks[1].model.blocks[0].model.blocks[0].model.text);

          convertTime(data.results[0].lastPublished)
            ? (item.lastPublished = convertTime(data.results[0].lastPublished))
            : (item.lastPublished = convertTime(
                new Date(data.metadata.timestamp)
              ));
        });
        try {
          translateString([{ text: item.title }]).then((data) => {
            data !== undefined
              ? (item.translatedTitle = data[0].translations[0].text)
              : (item.translatedTitle = item.title);
          });
        } catch (error) {
          console.log(
            `An error has occurred when trying to translate string: ${error}`
          );
        }
      });

      // const asiaCentralTopEight = collectPagesReduced
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

      const asiaPacificTopEight = collectPagesReduced
        .filter((item) => {
          if (
            item.service === "burmese.bbc.co.uk" ||
            item.service === "zhongwen.bbc.co.uk" ||
            item.service === "indonesia.bbc.co.uk" ||
            item.service === "japanese.bbc.co.uk" ||
            item.service === "korean.bbc.co.uk" ||
            item.service === "thai.bbc.co.uk" ||
            item.service === "vietnamese.bbc.co.uk"
          )
            return item;
        })
        .slice(0, 8);

      const asiaPacificTopEight_enhanced = asiaPacificTopEight.map((item) => {
        const url = item.url.slice(8);
        getContentApiData(url).then((data) => {
          // item.imageHref = Object.values(
          //   data.results[0].media.images.index
          // )[0].href;
          // item.imageAlt = Object.values(
          //   data.results[0].media.images.index
          // )[0].altText;
          // item.lastPublished = convertTime(data.results[0].lastPublished);

          Object.values(data.results[0].media.images.index)[0].href
            ? (item.imageHref = Object.values(
                data.results[0].media.images.index
              )[0].href)
            : (item.imageHref = `https://ichef.bbci.co.uk/news/800/cpsprodpb/${data.promo.images.defaultPromoImage.blocks[2].model.locator}`);

          Object.values(data.results[0].media.images.index)[0].altText
            ? (item.imageAlt = Object.values(
                data.results[0].media.images.index
              )[0].altText)
            : (item.imageAlt =
                data.promo.images.defaultPromoImage.blocks[1].model.blocks[0].model.blocks[0].model.text);

          convertTime(data.results[0].lastPublished)
            ? (item.lastPublished = convertTime(data.results[0].lastPublished))
            : (item.lastPublished = convertTime(
                new Date(data.metadata.timestamp)
              ));
        });
        translateString([{ text: item.title }]).then((data) => {
          data !== undefined
            ? (item.translatedTitle = data[0].translations[0].text)
            : (item.translatedTitle = item.title);
        });
      });

      const asiaSouthTopEight = collectPagesReduced
        .filter((item) => {
          if (
            item.service === "bengali.bbc.co.uk" ||
            item.service === "bengali.bbc.co.uk" ||
            item.service === "gujarati.bbc.co.uk" ||
            item.service === "hindi.bbc.co.uk" ||
            item.service === "marathi.bbc.co.uk" ||
            item.service === "nepali.bbc.co.uk" ||
            item.service === "pashto.bbc.co.uk" ||
            item.service === "punjabi.bbc.co.uk" ||
            item.service === "sinhala.bbc.co.uk" ||
            item.service === "tamil.bbc.co.uk" ||
            item.service === "telugu.bbc.co.uk" ||
            item.service === "urdu.bbc.co.uk"
          )
            return item;
        })
        .slice(0, 8);

      const asiaSouthTopEight_enhanced = asiaSouthTopEight.map((item) => {
        const url = item.url.slice(8);
        getContentApiData(url).then((data) => {
          // item.imageHref = Object.values(
          //   data.results[0].media.images.index
          // )[0].href;
          // item.imageAlt = Object.values(
          //   data.results[0].media.images.index
          // )[0].altText;
          // item.lastPublished = convertTime(data.results[0].lastPublished);

          Object.values(data.results[0].media.images.index)[0].href
            ? (item.imageHref = Object.values(
                data.results[0].media.images.index
              )[0].href)
            : (item.imageHref = `https://ichef.bbci.co.uk/news/800/cpsprodpb/${data.promo.images.defaultPromoImage.blocks[2].model.locator}`);

          Object.values(data.results[0].media.images.index)[0].altText
            ? (item.imageAlt = Object.values(
                data.results[0].media.images.index
              )[0].altText)
            : (item.imageAlt =
                data.promo.images.defaultPromoImage.blocks[1].model.blocks[0].model.blocks[0].model.text);

          convertTime(data.results[0].lastPublished)
            ? (item.lastPublished = convertTime(data.results[0].lastPublished))
            : (item.lastPublished = convertTime(
                new Date(data.metadata.timestamp)
              ));
        });
        translateString([{ text: item.title }]).then((data) => {
          data[0].translations !== undefined
            ? (item.translatedTitle = data[0].translations[0].text)
            : (item.translatedTitle = item.title);
        });
      });

      const europeTopEight = collectPagesReduced
        .filter((item) => {
          if (
            item.service === "azeri.bbc.co.uk" ||
            item.service === "russian.bbc.co.uk" ||
            item.service === "serbian.bbc.co.uk" ||
            item.service === "turkish.bbc.co.uk" ||
            item.service === "ukrainian.bbc.co.uk"
          )
            return item;
        })
        .slice(0, 8);

      const europeTopEight_enhanced = europeTopEight.map((item) => {
        const url = item.url.slice(8);
        getContentApiData(url).then((data) => {
          // item.imageHref = Object.values(
          //   data.results[0].media.images.index
          // )[0].href;
          // item.imageAlt = Object.values(
          //   data.results[0].media.images.index
          // )[0].altText;
          // item.lastPublished = convertTime(data.results[0].lastPublished);

          Object.values(data.results[0].media.images.index)[0].href
            ? (item.imageHref = Object.values(
                data.results[0].media.images.index
              )[0].href)
            : (item.imageHref = `https://ichef.bbci.co.uk/news/800/cpsprodpb/${data.promo.images.defaultPromoImage.blocks[2].model.locator}`);

          Object.values(data.results[0].media.images.index)[0].altText
            ? (item.imageAlt = Object.values(
                data.results[0].media.images.index
              )[0].altText)
            : (item.imageAlt =
                data.promo.images.defaultPromoImage.blocks[1].model.blocks[0].model.blocks[0].model.text);

          convertTime(data.results[0].lastPublished)
            ? (item.lastPublished = convertTime(data.results[0].lastPublished))
            : (item.lastPublished = convertTime(
                new Date(data.metadata.timestamp)
              ));
        });
        translateString([{ text: item.title }]).then((data) => {
          data !== undefined
            ? (item.translatedTitle = data[0].translations[0].text)
            : (item.translatedTitle = item.title);
        });
      });

      const americasTopEight = collectPagesReduced
        .filter((item) => {
          if (
            item.service === "mundo.bbc.co.uk" ||
            item.service === "brasil.bbc.co.uk"
          )
            return item;
        })
        .slice(0, 8);

      const americasTopEight_enhanced = americasTopEight.map((item) => {
        const url = item.url.slice(8);
        getContentApiData(url).then((data) => {
          // item.imageHref = Object.values(
          //   data.results[0].media.images.index
          // )[0].href;
          // item.imageAlt = Object.values(
          //   data.results[0].media.images.index
          // )[0].altText;
          // item.lastPublished = convertTime(data.results[0].lastPublished);

          Object.values(data.results[0].media.images.index)[0].href
            ? (item.imageHref = Object.values(
                data.results[0].media.images.index
              )[0].href)
            : (item.imageHref = `https://ichef.bbci.co.uk/news/800/cpsprodpb/${data.promo.images.defaultPromoImage.blocks[2].model.locator}`);

          Object.values(data.results[0].media.images.index)[0].altText
            ? (item.imageAlt = Object.values(
                data.results[0].media.images.index
              )[0].altText)
            : (item.imageAlt =
                data.promo.images.defaultPromoImage.blocks[1].model.blocks[0].model.blocks[0].model.text);

          convertTime(data.results[0].lastPublished)
            ? (item.lastPublished = convertTime(data.results[0].lastPublished))
            : (item.lastPublished = convertTime(
                new Date(data.metadata.timestamp)
              ));
        });
        translateString([{ text: item.title }]).then((data) => {
          data !== undefined
            ? (item.translatedTitle = data[0].translations[0].text)
            : (item.translatedTitle = item.title);
        });
      });

      const middleEastTopEight = collectPagesReduced
        .filter((item) => {
          if (
            item.service === "arabic.bbc.co.uk" ||
            item.service === "persian.bbc.co.uk"
          )
            return item;
        })
        .slice(0, 8);

      const middleEastTopEight_enhanced = middleEastTopEight.map((item) => {
        const url = item.url.slice(8);
        getContentApiData(url).then((data) => {
          // item.imageHref = Object.values(
          //   data.results[0].media.images.index
          // )[0].href;
          // item.imageAlt = Object.values(
          //   data.results[0].media.images.index
          // )[0].altText;
          // item.lastPublished = convertTime(data.results[0].lastPublished);

          Object.values(data.results[0].media.images.index)[0].href
            ? (item.imageHref = Object.values(
                data.results[0].media.images.index
              )[0].href)
            : (item.imageHref = `https://ichef.bbci.co.uk/news/800/cpsprodpb/${data.promo.images.defaultPromoImage.blocks[2].model.locator}`);

          Object.values(data.results[0].media.images.index)[0].altText
            ? (item.imageAlt = Object.values(
                data.results[0].media.images.index
              )[0].altText)
            : (item.imageAlt =
                data.promo.images.defaultPromoImage.blocks[1].model.blocks[0].model.blocks[0].model.text);

          convertTime(data.results[0].lastPublished)
            ? (item.lastPublished = convertTime(data.results[0].lastPublished))
            : (item.lastPublished = convertTime(
                new Date(data.metadata.timestamp)
              ));
        });
        translateString([{ text: item.title }]).then((data) => {
          data !== undefined
            ? (item.translatedTitle = data[0].translations[0].text)
            : (item.translatedTitle = item.title);
        });
      });

      allData.length = 0;

      allData.push(
        allTopEight,
        africaTopEight,
        //asiaCentralTopEight,
        asiaPacificTopEight,
        asiaSouthTopEight,
        europeTopEight,
        americasTopEight,
        middleEastTopEight
      );
    })
    .catch(function (error) {
      // if there's an error, log it
      console.log(error);
    });
};

export { init, allData };
