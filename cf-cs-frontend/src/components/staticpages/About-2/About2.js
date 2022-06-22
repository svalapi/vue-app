import gql from "graphql-tag";

export default {
  components: {
    "comp-dynamic-link": () =>
      import("../../common/comp-dynamic-link/comp-dynamic-link.vue"),
  },
  methods: {
    async getData() {
      if (this.getAboutUsContentStackData) {
        this.isGraphQLREqDone = true;
        this.component = this.getAboutUsContentStackData;
        this.componentList = Object.keys(this.getAboutUsContentStackData).filter(
          (key) => key !== "name"
        );
        // eslint-disable-next-line no-console
        console.log(this.getAboutUsContentStackData, this.component, this.componentList);
      }
    },
  },
  data() {
    return {
      about: {},
      component: {},
      componentList: [],
      document,
      getAboutUsContentStackData: null,
      isGraphQLREqDone: false,
    };
  },
  mounted() {
    this.getData();
  },
  updated() {
    if (!this.isGraphQLREqDone) {
      this.getData();
      //console.log(this.getAboutUsData)
    }
  },
  apollo: {
    getAboutUsContentStackData: {
      query: gql`
        {
          getAboutUsContentStackData {
            name
            header {
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
                      contentType
                      fileName
                      url
                    }
                  }
                }
              }
            }
            banner {
              fields {
                text
                image {
                  fields {
                    title
                    file {
                      contentType
                      url
                      fileName
                      contentType
                    }
                  }
                }
              }
            }
            paragraph {
              fields {
                title
                text {
                  nodeType
                  content {
                    nodeType
                    content {
                      value
                      nodeType
                      marks {
                        type
                      }
                    }
                  }
                }
              }
            }
            banner2 {
              fields {
                text
                image {
                  fields {
                    title
                    file {
                      contentType
                      url
                      fileName
                      contentType
                    }
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
    },
  },
};
