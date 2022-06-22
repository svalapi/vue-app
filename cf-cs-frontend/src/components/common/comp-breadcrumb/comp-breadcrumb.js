export default {
  props: ["data"],
  mounted() {
    // eslint-disable-next-line no-console
    console.log("Breadcrumb", JSON.parse(this.data));
  },
};
