const redisConfig = {
  url: "redis://default:contentFULL@redis-10196.c284.us-east1-2.gce.cloud.redislabs.com:10196",
};

const redisKeys = {
  homePage: "home_page_data",
  aboutContentFul: "about_contentful_data",
  pdpData: "pdp_data",
};

const contentfulCreds = {
  spaceID: "567staco9tan",
  accessToken: "V3yFmFYDBI-quCX14fGMgN4aYCZvmHMFghPAzbIwheM",
};

const commercetoolsConfig = {
  commercetoolsMethod: "POST",
  commercetoolsUrl:
    "https://auth.europe-west1.gcp.commercetools.com/oauth/token?grant_type=client_credentials",
  commercetoolsHeaders: {
    Authorization:
      "Basic " +
      // Using clientid:clientSecret for generating basic auth token
      Buffer.from(
        "JnZ34p_xQVbHtKf2waF1amoz:RhSi3l2vPr2fq6cPcf7m_uZLOh-JfNwP"
      ).toString("base64"),
  },
};

const commercetoolsProductAPI = {
  method: "GET",
  url: "https://api.europe-west1.gcp.commercetools.com/b2b_assets/product-projections/search?",
};

const commercetoolsGQLEndpoint =
  "https://api.europe-west1.gcp.commercetools.com/b2b_assets/graphql";

const contentfulHomeConfig = {
  ...contentfulCreds,
  body: { include: 10, "fields.slug": "home", content_type: "page" },
};

const contentfulPDPConfig = {
  ...contentfulCreds,
  body: { include: 10, "fields.slug": "product", content_type: "page" },
  productDescriptionBody: { include: 10, content_type: "commerceToools" },
};

const contentfulAboutUsConfig = {
  ...contentfulCreds,
  body: { include: 10, "fields.slug": "about", content_type: "page" },
};

const contentfulPLPConfig = {
  ...contentfulCreds,
  body: { include: 10, "fields.slug": "product-landing", content_type: "page" },
};

const contentStackCreds = {
  api_key: "blt0609903950ffb3fc",
  access_token: "cs429d4dcff03b1f76bb22d9c9",
};

const contentStackAboutUsConfig = {
  method: "get",
  url: "https://eu-cdn.contentstack.com/v3/content_types/about/entries/blt2793b21fd1f1182e?environment=production",
  headers: {
    ...contentStackCreds,
  },
};

module.exports = {
  redisConfig,
  commercetoolsConfig,
  contentfulHomeConfig,
  contentfulAboutUsConfig,
  contentStackAboutUsConfig,
  commercetoolsGQLEndpoint,
  redisKeys,
  commercetoolsProductAPI,
  contentfulPDPConfig,
  contentfulPLPConfig,
};
