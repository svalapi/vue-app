import gql from "graphql-tag";
// import contentfulData from "../../../assets/data/getContentfulData.json";

export default {
  components: {
    "comp-dynamic-link": () =>
      import("../../common/comp-dynamic-link/comp-dynamic-link.vue"),
  },
  methods: {
    async getData() {
      // eslint-disable-next-line no-console
      if (this.getHomePageData) {
        this.isGraphQlReqDone = true;
        this.component = this.getHomePageData;
        this.componentList = Object.keys(this.getHomePageData || {});
      }
    },
  },
  data() {
    return {
      component: {},
      componentList: [],
      document,
      getHomePageData: null,
      isGraphQlReqDone: false,
    };
  },
  mounted() {
    this.getData();
    // this.fetchData();
  },
  updated() {
    if (!this.isGraphQlReqDone) {
      this.getData();
      // this.fetchData();
    }
    // eslint-disable-next-line no-console
    console.log("homw page updated", this.getHomePageData);
    //this.getData();
  },
  apollo: {
    getHomePageData: {
      query: gql`
        {
          getHomePageData {
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
            image_with_text_slider {
              fields {
                imageText
                sliderImage {
                  fields {
                    title
                    file {
                      fileName
                      url
                    }
                  }
                }
              }
              sys {
                id
              }
            }
            home_service_gallery_view {
              fields {
                title
                box {
                  fields {
                    text
                    image {
                      fields {
                        title
                        file {
                          url
                          fileName
                        }
                      }
                    }
                  }
                  sys {
                    id
                    contentType {
                      sys {
                        id
                      }
                    }
                  }
                }
              }
              sys {
                id
                contentType {
                  sys {
                    id
                  }
                }
              }
            }
            home_service_gallery_view2 {
              fields {
                title
                box {
                  fields {
                    text
                    image {
                      fields {
                        title
                        file {
                          url
                          fileName
                        }
                      }
                    }
                  }
                  sys {
                    id
                    contentType {
                      sys {
                        id
                      }
                    }
                  }
                }
              }
              sys {
                id
                contentType {
                  sys {
                    id
                  }
                }
              }
            }
            service_card {
              fields {
                description
                iconClass
                title
              }
              sys {
                id
                contentType {
                  sys {
                    id
                  }
                }
              }
            }
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
        return {};
      },
    },
  },
};
