/**
 * commercetoolsService
 * This Service connects with commercetools server to get the desired data.
 */

const { request } = require("graphql-request");
const axios = require("axios");
const queries = require("../graphql/commercetoolQueries");
const config = require("../config/config");

module.exports = {
  getHeaderCategories: async (options) => {
    return await axios(options)
      .then(async (res) => {
        var commercetoolsAuth = res.data.access_token;
        const categories = await request({
          url: config.commercetoolsGQLEndpoint,
          document: queries.getCategoriesQuery,
          variables: { locale: "en" },
          requestHeaders: { Authorization: `Bearer ${commercetoolsAuth}` },
        })
          .then((data) => {
            return data;
          })
          .catch((err) => {
            console.log("*** commercetoolsService|GrqphQL call ***", err);
          });
        return categories;
      })
      .catch((err) => {
        console.log("*** commercetoolsService|tokenCall ***", err);
      });
  },
  fetchProductData: async (options, productArgs) => {
    return await axios(options)
      .then(async (res) => {
        var commercetoolsAuth = res.data.access_token;
        let pdpOptions = { ...config.commercetoolsProductAPI };
        (pdpOptions.url +=
          "priceCurrency=" +
          productArgs.priceCurrency +
          "&filter.query=variants.sku:" +
          productArgs.productId +
          "&priceCountry=" +
          productArgs.priceCountry),
          (pdpOptions.headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${commercetoolsAuth}`,
          });
        const pdp = await axios(pdpOptions)
          .then((data) => {
            return data.data;
          })
          .catch(function (error) {
            console.log(error);
          });
        return pdp;
      })
      .catch((err) => {
        console.log(
          "*** commercetoolsService|fetchProductData|tokenCall ***",
          err
        );
      });
  },
  fetchProducts: async (options, productArgs) => {
    return await axios(options)
      .then(async (res) => {
        var commercetoolsAuth = res.data.access_token;
        let plpOptions = { ...config.commercetoolsProductAPI };
        plpOptions.url += productArgs.url;
        plpOptions.headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${commercetoolsAuth}`,
        };
        const plp = await axios(plpOptions)
          .then((data) => {
            return data.data;
          })
          .catch(function (error) {
            console.log(error);
          });
        return plp;
      })
      .catch((err) => {
        console.log(
          "*** commercetoolsService|fetchProducts|tokenCall ***",
          err
        );
      });
  },
};
