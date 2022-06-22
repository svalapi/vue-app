/**
 * contentfulService
 * This Service connects with Contentfull server to get the desired data and sends the data back.
 * We also use commercetools service when required to fetch data from commercetools
 */

const contentful = require("contentful");
const commerceToolsService = require("./comercetoolsService");

module.exports = {
  contentfulConnection: async (cmsReqBody) => {
    const client = contentful.createClient({
      space: cmsReqBody.spaceID,
      accessToken: cmsReqBody.accessToken,
    });
    const cmsData = await client
      .getEntries(cmsReqBody.body)
      .then(function (entry) {
        return entry.items[0].fields.content.fields;
      })
      .catch((err) => {
        console.log("*** contentfulService|getContentfulEntries ***", err);
      });
    const categories = await commerceToolsService
      .getHeaderCategories({
        method: cmsReqBody.commercetoolsMethod,
        url: cmsReqBody.commercetoolsUrl,
        headers: cmsReqBody.commercetoolsHeaders,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("*** contentfulService|getHeaderCategories ***", err);
      });
    cmsData.header.fields.categories = categories;
    return cmsData;
  },

  getPDPData: async (cmsReqBody, productArgs) => {
    const client = contentful.createClient({
      space: cmsReqBody.spaceID,
      accessToken: cmsReqBody.accessToken,
    });
    const pdpData = await client
      .getEntries(cmsReqBody.body)
      .then(function (entry) {
        return entry.items[0].fields.content.fields;
      })
      .catch((err) => {
        console.log("*** contentfulService|getContentfulEntries ***", err);
      });

    const productDescription = await client
      .getEntries({
        ...cmsReqBody.productDescriptionBody,
        "fields.commercetoolsProduct": productArgs.productId
          .replace(/%22/i, "")
          .replace(/%22/i, ""),
      })
      .then(function (entry) {
        return entry;
      });

    console.log(productArgs.productId.replace(/%22/i, "").replace(/%22/i, ""));

    const productDetails = await commerceToolsService
      .fetchProductData(
        {
          method: cmsReqBody.commercetoolsMethod,
          url: cmsReqBody.commercetoolsUrl,
          headers: cmsReqBody.commercetoolsHeaders,
        },
        productArgs
      )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(
          "*** contentfulService|getPDPData|fetchProductData ***",
          err
        );
      });

    const categories = await commerceToolsService
      .getHeaderCategories({
        method: cmsReqBody.commercetoolsMethod,
        url: cmsReqBody.commercetoolsUrl,
        headers: cmsReqBody.commercetoolsHeaders,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("*** contentfulService|getHeaderCategories ***", err);
      });
    pdpData.header.fields.categories = categories;
    productDetails.addCartLabel = pdpData.productPageLabels.fields.addCartLabel;
    productDetails.shippingLabel =
      pdpData.productPageLabels.fields.shippingLabel;
    productDetails.productDetailsLabel =
      pdpData.productPageLabels.fields.productDetailsLabel;
    productDetails.shippingDescriptionLabel =
      pdpData.productPageLabels.fields.shippingDescriptionLabel;
    if (productDescription.items.length > 0) {
      productDetails.shippingDescriptionLabel +=
        ". " +
        productDescription.items[0].fields.description.replace(/\r?\n|\r/, "");
    }
    pdpData.product_info = JSON.stringify(productDetails);
    return pdpData;
  },

  getPLPData: async (cmsReqBody, productArgs) => {
    const client = contentful.createClient({
      space: cmsReqBody.spaceID,
      accessToken: cmsReqBody.accessToken,
    });
    const plpData = await client
      .getEntries(cmsReqBody.body)
      .then(function (entry) {
        return entry.items[0].fields.content.fields;
      })
      .catch((err) => {
        console.log("*** contentfulService|getContentfulEntries ***", err);
      });

    const productsList = await commerceToolsService
      .fetchProducts(
        {
          method: cmsReqBody.commercetoolsMethod,
          url: cmsReqBody.commercetoolsUrl,
          headers: cmsReqBody.commercetoolsHeaders,
        },
        productArgs
      )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(
          "*** contentfulService|getPDPData|fetchProductData ***",
          err
        );
      });

    const categories = await commerceToolsService
      .getHeaderCategories({
        method: cmsReqBody.commercetoolsMethod,
        url: cmsReqBody.commercetoolsUrl,
        headers: cmsReqBody.commercetoolsHeaders,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("*** contentfulService|getHeaderCategories ***", err);
      });
    plpData.header.fields.categories = categories;
    productsList.categoryId = productArgs.categoryId;
    plpData.product_list = JSON.stringify(productsList);
    // plpData.breadcrumb = JSON.stringify({ name: "breadcrumb" });
    // plpData.product_info = JSON.stringify(productDetails);
    return plpData;
  },

  getOnlyPLPData: async (cmsReqBody, productArgs) => {
    const productsList = await commerceToolsService
      .fetchProducts(
        {
          method: cmsReqBody.commercetoolsMethod,
          url: cmsReqBody.commercetoolsUrl,
          headers: cmsReqBody.commercetoolsHeaders,
        },
        productArgs
      )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("*** contentfulService|getOnlyPLPData ***", err);
      });

    productsList.categoryId = productArgs.categoryId;
    return JSON.stringify(productsList);
  },
};
