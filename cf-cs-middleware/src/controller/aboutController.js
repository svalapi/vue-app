/**
 * aboutController
 * This Controller is used to fetch data related to About Us page
 * We send the Connection Options for Contentful, ContentStack and Commercetools from this controller
 * Controller will interact with the CMS Connector Service only
 */

const cmsConnector = require("../services/cmsConnectorService");
const config = require("../config/config");
const redisserve = require("../services/redisService");

exports.aboutContentful = async function () {
  const options = {
    ...config.contentfulAboutUsConfig,
    ...config.commercetoolsConfig,
  };

  var finalData = await redisserve
    .redisConnection(config.redisKeys.aboutContentFul)
    .then((redisData) => {
      if (redisData == null) {
        var aboutUsData = cmsConnector
          .getAboutPageData(options)
          .then(async (res) => {
            await redisserve.redisSetData(
              config.redisKeys.aboutContentFul,
              res
            );
            console.log("Redis Data Set");
            return res;
          })
          .catch((e) => {
            console.log("*** aboutController|aboutContentful ***", e);
            throw Error("Failed to get about data", e);
          });
        return aboutUsData;
      } else {
        console.log("Redis Data Used");
        return redisData;
      }
    })
    .catch((err) => {
      console.log("*** aboutController|Redis connection ***", err);
      throw Error(err);
    });
  return finalData;
};

exports.aboutContentStack = async function () {
  const contentStackConfig = {
    ...config.contentStackAboutUsConfig,
  };

  const options = {
    ...config.contentfulAboutUsConfig,
    ...config.commercetoolsConfig,
  };

  var aboutUsContentStackData = await cmsConnector
    .getAboutPageContactStack(contentStackConfig)
    .then((res) => res)
    .catch((err) => {
      console.log(
        "*** aboutController|aboutContentStack|aboutUsContentStackData ***",
        err
      );
    });

  var aboutUsData = await cmsConnector
    .getAboutPageData(options)
    .then((res) => res)
    .catch((err) => {
      console.log("*** aboutController|aboutContentStack|aboutUsData ***", err);
    });

  aboutUsContentStackData.header = aboutUsData.header;
  aboutUsContentStackData.footer = aboutUsData.footer;
  return aboutUsContentStackData;
};
