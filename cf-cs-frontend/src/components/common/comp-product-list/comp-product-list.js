/* const removeHiddenFacetFromQuery(facets, component) {
  const facetObject = facets.reduce(
    (result, { name, terms }) =>
      result.set(
        name,
        terms.map((t) => t.term)
      ),
    new Map()
  );
  const facetKeys = sunriseConfig.facetSearches.map(({ name }) => name);
  // see if facets are in query that are missing in facets
  const missing = Object.entries(component.$route.query)
    .map(([key, value]) => [key, [].concat(value)])
    .reduce(
      (result, [key, values]) => result.concat(values.map((v) => [key, v])),
      []
    )
    .filter(([key]) => facetKeys.includes(key))
    .filter(
      ([key, value]) => !(facetObject.get(key) || []).includes(value)
    );
  if (missing.length) {
    // remove the facets that are missing from query
    const query = missing.reduce(
      (result, [key, value]) => modifyQuery(key, value, result, false),
      component.$route.query
    );
    changeRoute(
      {
        ...component.$route,
        query,
      },
      component,
      false
    );
  }
} */
import ProductFilter from "../../productoverview/ProductFilter/ProductFilter.vue";
import ProductThumbnail from "../../common/ProductThumbnail/ProductThumbnail.vue";
import Pagination from "../../common/Pagination/Pagination.vue";
import TopBar from "../../productoverview/TopBar/TopBar.vue";
import gql from "graphql-tag";
import config from "../../../../sunrise.config";

const asAttribute = (name, type, locale) => {
  if (type === "lnum") {
    return `variants.attributes.${name}.label.${locale}`;
  }
  if (type === "enum") {
    return `variants.attributes.${name}.key`;
  }
  return `variants.attributes.${name}`;
};

const facets = (query = {}, locale) =>
  config.facetSearches.reduce((result, { name, type }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (query.hasOwnProperty(name)) {
      /* eslint no-param-reassign: ["error", { "props": false }] */
      result["filter.query"] = result["filter.query"] || [];
      result["filter.query"].push(
        `${asAttribute(name, type, locale)}:${
          Array.isArray(query[name])
            ? query[name].map((value) => `"${value}"`).join(",")
            : `"${query[name]}"`
        }`
      );
    }
    return result;
  }, {});

export default {
  data: () => ({
    products: null,
    facets: {},
    limit: Number(process.env.VUE_APP_PAGE_SIZE || 12),
    page: 1,
    facetFilter: {},
    allChannels: false,
    show: false,
    sort: null,
  }),
  props: ["data"],
  mounted() {
    // eslint-disable-next-line no-console
    // console.log("Product List", JSON.parse(this.data));
    let { facets, results, ...meta } = JSON.parse(this.data);
    this.products = {
      ...meta,
      results: results.map(
        ({ id, masterVariant: { sku, images, price }, name, slug }) => ({
          id,
          masterData: {
            current: {
              name: name["en"],
              slug: slug["en"],
              masterVariant: {
                sku,
                images,
                price,
              },
            },
          },
        })
      ),
    };
    this.facets = config.facetSearches.map(({ name, type }) => {
      const facet = facets[asAttribute(name, type, "en")];
      return {
        ...facet,
        name,
        label:
          config.facetSearches.reduce((result, item) => {
            // eslint-disable-next-line no-console
            console.log("Facet Search", result, item);
            /* eslint no-param-reassign: ["error", { "props": false }] */
            result[item.name] = item.label;
            return result;
          }, {})[name]?.["en"] || name,
        type,
        terms: [...(facet?.terms || [])].sort((a, b) =>
          a.term.localeCompare(b.term)
        ),
      };
    });
    // eslint-disable-next-line no-console
    console.log(this.facets);
  },
  methods: {
    toggleFilter() {
      this.show = !this.show;
    },
    facetFilterChange({ name, value }) {
      // eslint-disable-next-line no-console
      console.log("Filters", name, value);
      this.facetFilter = { ...this.facetFilter, [name]: value };
    },
    changePage(page) {
      // pushPage(page, this, "products");
      this.page = page;
      this.getProducts();
    },
    getProducts() {
      Promise.all([
        this.$apollo.query({
          query: gql`
            query getOnlyPLPData($url: String, $categoryId: String) {
              getOnlyPLPData(url: $url, categoryId: $categoryId)
            }
          `,
          client: "transformClient",
          variables: {
            // eslint-disable-next-line max-len
            url:
              // eslint-disable-next-line max-len
              "priceCurrency=EUR&priceCountry=DE&filter.query=variants.scopedPrice.value.centAmount%3A+range+%280+to+100000000%29" +
              (this.$route.query.q
                ? "&text.en=" + this.$route.query.q
                : "&filter.query=categories.id%3Asubtree%28%22" +
                  this.products.categoryId +
                  "%22%29") +
              (Object.keys(this.$route.query).length > 0 &&
              (Object.keys(this.$route.query).length > 1 ||
                !this.$route.query.q)
                ? Object.entries(facets(this.$route.query, "en"))[0][1]
                    .map((item) => "&filter.query=" + item)
                    .join("")
                : "") +
              // eslint-disable-next-line max-len
              "&facet=variants.attributes.size+counting+products&facet=variants.attributes.color.label.en+counting+products&facet=variants.attributes.designer.key+counting+products&limit=12&offset=" +
              (this.page - 1) * this.limit,
            categoryId: this.products.categoryId,
          },
        }),
        config.facetSearches.reduce((result, item) => {
          // eslint-disable-next-line no-console
          console.log("Facet Search", result, item);
          /* eslint no-param-reassign: ["error", { "props": false }] */
          result[item.name] = item.label;
          return result;
        }, {}),
      ]).then(([data, translation]) => {
        this.products = JSON.parse(data.data.getOnlyPLPData);
        // eslint-disable-next-line no-console
        this.products.results = this.products.results.map(
          ({ id, masterVariant: { sku, images, price }, name, slug }) => ({
            id,
            masterData: {
              current: {
                name: name["en"],
                slug: slug["en"],
                masterVariant: {
                  sku,
                  images,
                  price,
                },
              },
            },
          })
        );
        (this.facets = config.facetSearches.map(({ name, type }) => {
          const facet = this.products.facets[asAttribute(name, type, "en")];
          return {
            ...facet,
            name,
            label: translation[name]?.["en"] || name,
            type,
            terms: [...(facet?.terms || [])].sort((a, b) =>
              a.term.localeCompare(b.term)
            ),
          };
        })),
          // eslint-disable-next-line no-console
          console.log("Products", this.products);
        // eslint-disable-next-line no-console
        console.log("Facets Final", this.facets);
      });
    },
  },
  components: {
    ProductThumbnail,
    Pagination,
    ProductFilter,
    TopBar,
  },
};
