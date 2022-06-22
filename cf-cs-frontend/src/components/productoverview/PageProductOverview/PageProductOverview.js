import ProductList from "../ProductList/ProductList.vue";
import Breadcrumb from "../../common/Breadcrumb/Breadcrumb.vue";
import ProductQuickView from "../ProductQuickView/ProductQuickView.vue";
import AddToShoppingList from "../AddToShoppingList/AddToShoppingList.vue";
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
  components: {
    ProductList,
    Breadcrumb,
    ProductQuickView,
    AddToShoppingList,
    "comp-dynamic-link": () =>
      import("../../common/comp-dynamic-link/comp-dynamic-link.vue"),
  },
  props: {
    categorySlug: String,
    page: {
      type: Number,
      default: 1,
    },
  },
  data: () => ({
    showProductQuickView: false,
    showAddToShoppingList: false,
    productSku: null,
    component: {},
    componentList: [],
    document,
    getPLPData: null,
    categories: null,
    isGraphQlReqDone: false,
  }),
  mounted() {
    this.getCategories();
  },
  updated() {
    if (!this.isGraphQlReqDone) {
      this.getData();
    }
  },
  methods: {
    async getCategories() {
      this.$apollo
        .query({
          query: gql`
            query categories($where: String) {
              categories(where: $where, limit: 1) {
                results {
                  id
                }
              }
            }
          `,
          variables: {
            where: `slug(en="${this.categorySlug}")`,
          },
          skip: !this.categorySlug,
        })
        .then((data) => {
          this.categories = data;
          this.$apollo
            .query({
              query: gql`
                query getPLPData($url: String, $categoryId: String) {
                  getPLPData(url: $url, categoryId: $categoryId) {
                    header {
                      sys {
                        id
                        contentType {
                          sys {
                            id
                          }
                        }
                      }
                      fields {
                        categories {
                          categories {
                            results {
                              name
                              id
                              externalId
                              slug
                              orderHint
                              children {
                                id
                                name
                                externalId
                                slug
                                orderHint
                                children {
                                  id
                                  externalId
                                  name
                                  slug
                                  orderHint
                                }
                              }
                            }
                          }
                        }
                        isCategoryDataEnabled
                        websiteLogo {
                          sys {
                            id
                            contentType {
                              sys {
                                id
                              }
                            }
                          }
                          fields {
                            url
                            image {
                              fields {
                                title
                                file {
                                  fileName
                                  url
                                  contentType
                                }
                              }
                            }
                          }
                        }
                        topHeader {
                          sys {
                            id
                            contentType {
                              sys {
                                id
                              }
                            }
                          }
                          fields {
                            helpLink {
                              sys {
                                id
                                contentType {
                                  sys {
                                    id
                                  }
                                }
                              }
                              fields {
                                text
                                url
                              }
                            }
                            storeLink {
                              sys {
                                id
                                contentType {
                                  sys {
                                    id
                                  }
                                }
                              }
                              fields {
                                text
                                url
                              }
                            }
                            language {
                              sys {
                                id
                                contentType {
                                  sys {
                                    id
                                  }
                                }
                              }
                              fields {
                                title
                                listItem {
                                  fields {
                                    text
                                  }
                                }
                              }
                            }
                            location {
                              sys {
                                id
                                contentType {
                                  sys {
                                    id
                                  }
                                }
                              }
                              fields {
                                title
                                listItem {
                                  fields {
                                    text
                                    url
                                  }
                                }
                              }
                            }
                          }
                        }
                        searchLink {
                          sys {
                            id
                            contentType {
                              sys {
                                id
                              }
                            }
                          }
                          fields {
                            text
                          }
                        }
                        signInLink {
                          sys {
                            id
                            contentType {
                              sys {
                                id
                              }
                            }
                          }
                          fields {
                            iconClass
                            text
                            url
                          }
                        }
                        cartLink {
                          sys {
                            id
                            contentType {
                              sys {
                                id
                              }
                            }
                          }
                          fields {
                            text
                          }
                        }
                        shoppingListLink {
                          sys {
                            id
                            contentType {
                              sys {
                                id
                              }
                            }
                          }
                          fields {
                            text
                            url
                          }
                        }
                      }
                    }
                    product_list
                  }
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
                      this.categories.data.categories.results[0].id +
                      "%22%29") +
                  (Object.keys(this.$route.query).length > 0 &&
                  (Object.keys(this.$route.query).length > 1 ||
                    !this.$route.query.q)
                    ? Object.entries(facets(this.$route.query, "en"))[0][1]
                        .map((item) => "&filter.query=" + item)
                        .join("")
                    : "") +
                  // eslint-disable-next-line max-len
                  "&facet=variants.attributes.size+counting+products&facet=variants.attributes.color.label.en+counting+products&facet=variants.attributes.designer.key+counting+products&limit=" +
                  Number(process.env.VUE_APP_PAGE_SIZE || 12) +
                  "&offset=0",
                categoryId: this.categories.data.categories.results[0]?.id,
              },
              skip: this.categories,
            })
            .then((plpData) => {
              this.getPLPData = plpData;
              this.getData();
            });
        });
    },

    async getData() {
      if (this.getPLPData) {
        this.isGraphQlReqDone = true;
        // eslint-disable-next-line no-console
        console.log("PLP Data is here", this.getPLPData);
        this.component = this.getPLPData.data.getPLPData;
        this.componentList = Object.keys(this.getPLPData.data.getPLPData || {});
      }
    },
    openProductQuickView(productInfo) {
      this.showProductQuickView = true;
      this.productSku = productInfo.sku;
    },
    closeProductQuickView() {
      this.showProductQuickView = false;
      this.productSku = null;
    },
    openAddToShoppingList(productInfo) {
      this.showAddToShoppingList = true;
      this.productSku = productInfo.sku;
    },
    closeAddToShoppingList() {
      this.showAddToShoppingList = false;
    },
  },
  /*
   */
  apollo: {
    /*  */
  },
  watch: {
    $route() {
      // eslint-disable-next-line no-console
      // console.log("Reloaded", this);
      window.location.reload();
    },
  },
};
