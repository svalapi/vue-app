export default {
  name: "comp-dynamic-link",
  props: ["data", "type"],
  data() {
    return {
      component: null,
    };
  },
  computed: {
    loader() {
      const str = this.type.replace(/_+/g, "-");
      const str2 = str.replace(/[\d]+/g, "");
      return () =>
        import(`../comp-${str2.toLowerCase()}/comp-${str2.toLowerCase()}.vue`);
    },
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.log("dynamic data", this.data);
    this.loader()
      .then(() => {
        this.component = () => this.loader();
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e);
        this.component = () => import("../comp-paragraph/comp-paragraph.vue");
      });
  },
};
