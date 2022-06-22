import Breadcrumb from "../../common/Breadcrumb/Breadcrumb.vue";
// import ProductInfo from "../ProductInfo/ProductInfo.vue";
import AddToShoppingList from "../../productoverview/AddToShoppingList/AddToShoppingList.vue";
import gql from "graphql-tag";

export default {
  props: {
    productSlug: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    showAddToShoppingList: false,
    productSku: null,
    component: {},
    componentList: [],
    document,
    getPDPData: null,
    isGraphQlReqDone: false,
  }),
  mounted() {
    this.getData();
    // eslint-disable-next-line no-console
    console.log(this.sku);
  },
  updated() {
    if (!this.isGraphQlReqDone) {
      this.getData();
    }
    // eslint-disable-next-line no-console
    // console.log("homw page updated", this.getHomePageData);
  },
  methods: {
    async getData() {
      if (this.getPDPData) {
        this.isGraphQlReqDone = true;
        if (
          typeof this.getPDPData.product_info === "string" ||
          this.getPDPData.product_info instanceof String
        ) {
          this.getPDPData.product_info = JSON.parse(
            this.getPDPData.product_info
          );
        }
        this.component = this.getPDPData;
        this.componentList = Object.keys(this.getPDPData || {});
      }
    },
    openAddToShoppingList() {
      this.showAddToShoppingList = true;
    },
    closeAddToShoppingList() {
      this.showAddToShoppingList = false;
    },
  },
  components: {
    "comp-dynamic-link": () =>
      import("../../common/comp-dynamic-link/comp-dynamic-link.vue"),
    Breadcrumb,
    // ProductInfo,
    AddToShoppingList,
  },
  apollo: {
    getPDPData: {
      query: gql`
        query getPDPData($productId: String) {
          getPDPData(
            priceCurrency: "EUR"
            productId: $productId
            priceCountry: "DE"
          ) {
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
            product_info
            footer {
              sys {
                id
                contentType {
                  sys {
                    id
                    linkType
                  }
                }
              }
              fields {
                text
                link {
                  sys {
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
                logo {
                  sys {
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
                          contentType
                          fileName
                          url
                        }
                      }
                    }
                  }
                }
                navLink {
                  sys {
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
                title
                submiText
                inputPlaceholder
              }
            }
          }
        }
      `,
      client: "transformClient",
      variables() {
        return {
          productId: `%22${this.sku}%22`,
        };
      },
    },
  },
};
