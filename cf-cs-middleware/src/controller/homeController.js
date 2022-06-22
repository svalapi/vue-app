/**
 * homeController
 * This Controller is used to fetch data related to Home page
 * We send the Connection Options for Contentful, ContentStack and Commercetools from this controller
 * Controller will interact with the CMS Connector Service only
 */

const cmsConnector = require("../services/cmsConnectorService");
const config = require("../config/config");
const redisserve = require("../services/redisService");

exports.home = async function () {
  const options = {
    ...config.contentfulHomeConfig,
    ...config.commercetoolsConfig,
  };
  var finalData = await redisserve
    .redisConnection(config.redisKeys.homePage)
    .then((redisData) => {
      if (redisData == null) {
        var homeData = cmsConnector
          .getHomePageData(options)
          .then(async (res) => {
            await redisserve.redisSetData(config.redisKeys.homePage, res);
            console.log("Redis Data Set");
            return res;
          })
          .catch((e) => {
            console.log("*** homeController ***", e);
            throw Error("Failed to get home data", e);
          });
        return homeData;
      } else {
        console.log("Redis Data Used");
        return redisData;
      }
    })
    .catch((err) => {
      console.log("*** homeController|Redis connection ***", err);
      throw Error(err);
    });
  return {...finalData,componentOrder:Object.keys(finalData)};
};
