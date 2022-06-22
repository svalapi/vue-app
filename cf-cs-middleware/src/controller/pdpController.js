/**
 * homeController
 * This Controller is used to fetch data related to Home page
 * We send the Connection Options for Contentful, ContentStack and Commercetools from this controller
 * Controller will interact with the CMS Connector Service only
 */

const cmsConnector = require("../services/cmsConnectorService");
const config = require("../config/config");
const redisserve = require("../services/redisService");

exports.pdpData = async function (productArgs) {
  const options = {
    ...config.contentfulPDPConfig,
    ...config.commercetoolsConfig,
  };
  var finalData = await redisserve
    .redisConnection(config.redisKeys.homePage + "_" + productArgs.productId)
    .then((redisData) => {
      if (redisData == null) {
        var pdpData = cmsConnector
          .getPDPData(options, productArgs)
          .then(async (res) => {
            await redisserve.redisSetData(
              config.redisKeys.homePage + "_" + productArgs.productId,
              res
            );
            console.log("Redis Data Set");
            return res;
          })
          .catch((e) => {
            console.log("*** pdpController|pdpData ***", e);
            throw Error("Failed to get pdp data", e);
          });
        return pdpData;
      } else {
        console.log("Redis Data Used");
        return redisData;
      }
    })
    .catch((err) => {
      console.log("*** homeController|Redis connection ***", err);
      throw Error(err);
    });

  return finalData;
};

exports.plpData = async function (productArgs) {
  const options = {
    ...config.contentfulPLPConfig,
    ...config.commercetoolsConfig,
  };
  var plpData = cmsConnector
    .getPLPData(options, productArgs)
    .then(async (res) => {
      return res;
    })
    .catch((e) => {
      console.log("*** pdpController|plpData ***", e);
      throw Error("Failed to get plp data", e);
    });
  return plpData;
};

exports.onlyPLPData = async function (productArgs) {
  const options = {
    ...config.commercetoolsConfig,
  };
  var plpData = cmsConnector
    .getOnlyPLPData(options, productArgs)
    .then(async (res) => {
      return res;
    })
    .catch((e) => {
      console.log("*** pdpController|onlyPLPData ***", e);
      throw Error("Failed to get plp data", e);
    });
  return plpData;
};
