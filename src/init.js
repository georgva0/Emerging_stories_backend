// import regionsUrl from "./listings/regions";
// import servicesURL from "./listings/services";
import servicesURL_test from "./listings/services_test";
import getChartbeatApiData from "./helpers/chartbeatApi";
import getContentApiData from "./helpers/contentApi";

const allData = [];

const init = () => {
  Promise.all([getChartbeatApiData("mundo"), getChartbeatApiData("russian")])
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

        //flatten array and remove pages that are out of scope

        const collectPagesFlat = collectPages[0].flat();
        const collectPagesFiltered = collectPagesFlat.filter(
          (item) => item.stats.type !== "LandingPage"
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

        //sort array to bring the best performing stories at the top
        collectPagesReduced.sort((b, a) =>
          a.score > b.score ? 1 : b.score > a.score ? -1 : 0
        );

        //select the top eight articles across all services
        const allTopEight = collectPagesReduced.slice(0, 8);
        const allTopEight_enhanced = allTopEight.map((item) => {
          const url = item.url.slice(8);
          getContentApiData(url).then((data) => {
            item.imageHref = Object.values(
              data.results[0].media.images.index
            )[0].href;
            item.imageAlt = Object.values(
              data.results[0].media.images.index
            )[0].altText;
            item.lastPublished = data.results[0].lastPublished;
          });
        });

        //create arrays of top eight articles for various regions

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
            item.imageHref = Object.values(
              data.results[0].media.images.index
            )[0].href;
            item.imageAlt = Object.values(
              data.results[0].media.images.index
            )[0].altText;
            item.lastPublished = data.results[0].lastPublished;
          });
        });

        const asiaCentralTopEight = collectPagesReduced
          .filter((item) => {
            if (
              item.service === "uzbek.bbc.co.uk" ||
              item.service === "kyrgyz.bbc.co.uk"
            )
              return item;
          })
          .slice(0, 8);

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

        const americasTopEight = collectPagesReduced
          .filter((item) => {
            if (
              item.service === "mundo.bbc.co.uk" ||
              item.service === "brasil.bbc.co.uk"
            )
              return item;
          })
          .slice(0, 8);

        const middleEastTopEight = collectPagesReduced
          .filter((item) => {
            if (
              item.service === "arabic.bbc.co.uk" ||
              item.service === "persian.bbc.co.uk"
            )
              return item;
          })
          .slice(0, 8);

        allData.length = 0;

        allData.push(
          allTopEight,
          africaTopEight
          // asiaCentralTopEight,
          // asiaPacificTopEight,
          // asiaSouthTopEight,
          // europeTopEight,
          // americasTopEight,
          //middleEastTopEight
        );
      });
    })
    .catch(function (error) {
      // if there's an error, log it
      console.log(error);
    });
};

// const collectDataRaw = () => {
//   console.log("raw data collection started");
//   servicesURL_test.forEach((item) => {
//     getChartbeatApiData(item.serviceUrl).then((data) => {
//       allDataRaw.push(data);
//     });
//   });
//   console.log("raw data collection finished");
// };

// const collectPages = [];
// const collectAllPages = () => {
//   console.log(allDataRaw);
//   allDataRaw.forEach((item) => {
//     collectPages.push(item.pages);
//   });
//   console.log("pages collection finished");
// };

export { init, allData };
