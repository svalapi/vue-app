/**
 * cmsConnectorService
 * This Service acts as bridge between controller and Contentfull, ContentStack or Commercetools Services.
 * We send the Connection Options for Contentful, ContentStack and Commercetools which we received from controllers to the required CMS services
 */

const contentfulService = require("./contentfulService");
const contentStackService = require("./contentStackService");

module.exports = {
  getHomePageData: async function (options) {
    return await contentfulService
      .contentfulConnection(options)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("*** cmsConnectorService|getHomePageData ***", err);
      });
  },
  getAboutPageData: async function (options) {
    return await contentfulService
      .contentfulConnection(options)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("*** cmsConnectorService|getAboutPageData ***", err);
      });
  },
  getAboutPageContactStack: async function (options) {
    return await contentStackService
      .contentStackConnection(options)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(
          "*** cmsConnectorService|getAboutPageContactStack ***",
          err
        );
      });
  },
  getPDPData: async function (options, productArgs) {
    return await contentfulService
      .getPDPData(options, productArgs)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("*** cmsConnectorService|getPDPData ***", err);
      });
  },
  getPLPData: async function (options, productArgs) {
    return await contentfulService
      .getPLPData(options, productArgs)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("*** cmsConnectorService|getPLPData ***", err);
      });
  },
  getOnlyPLPData: async function (options, productArgs) {
    return await contentfulService
      .getOnlyPLPData(options, productArgs)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("*** cmsConnectorService|getOnlyPLPData ***", err);
      });
  },
};
