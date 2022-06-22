/**
 * contentStackService
 * This Service connects with Content Stack server to get the desired data.
 * The data is mapped to desired format and returned.
 */

const axios = require("axios");

module.exports = {
  contentStackConnection: async (cmsReqBody) => {
    const cmsData = {};
    axios(cmsReqBody)
      .then(function (response) {
        const aboutUsContentStack = response.data.entry;
        cmsData.name = aboutUsContentStack.title;
        const image_with_text_slider = [];
        for (const key in aboutUsContentStack?.image_with_text_slider) {
          image_with_text_slider.push({
            fields: {
              imageText:
                aboutUsContentStack.image_with_text_slider[key].single_line,
              sliderImage: {
                fields: {
                  title:
                    aboutUsContentStack.image_with_text_slider[key].file.title,
                  file: {
                    contentType:
                      aboutUsContentStack.image_with_text_slider[key].file
                        .content_type,
                    fileName:
                      aboutUsContentStack.image_with_text_slider[key].file
                        .filename,
                    url: aboutUsContentStack.image_with_text_slider[key].file
                      .url,
                  },
                },
              },
            },
          });
        }
        const paragraph = {
          fields: {
            title: aboutUsContentStack.comp_para?.title,
            text: {
              nodeType: "document",
              content: [
                {
                  nodeType: "paragraph",
                  content: [
                    {
                      value: aboutUsContentStack.comp_para?.text,
                      nodeType: "text",
                      marks: [],
                    },
                  ],
                },
              ],
            },
          },
        };
        cmsData.name = aboutUsContentStack.title;
        cmsData.image_with_text_slider =
          aboutUsContentStack.image_with_text_slider
            ? image_with_text_slider
            : null;
        cmsData.paragraph = aboutUsContentStack.comp_para ? paragraph : null;
      })
      .catch(function (err) {
        console.log("*** contentStackService|contentStackCall ***", err);
      });
    return cmsData;
  },
};
