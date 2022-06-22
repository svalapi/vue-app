// import useLocale from "../../../composition/useLocale";
import BaseMoney from "../BaseMoney/BaseMoney.vue";
import AddToCartForm from "./AddToCartForm/AddToCartForm.vue";
import { locale, getValue, productAttributes } from "../../common/shared";

export default {
  props: ["data2"],
  setup() {
    // this.locale = useLocale();
  },
  data() {
    return {
      product: {},
      locale: null,
      availability: null,
      availableQuantity: true,
      isOnStock: true,
      expanded: [true, false],
    };
  },
  created() {
    // eslint-disable-next-line no-console
    // console.log("product-info", this.data2);
    const p = this.data2.results[0];
    const name = p?.name["en"];
    const slug = p?.slug["en"];
    const allVariants = p.variants
      .concat(p.masterVariant)
      .map((p) => ({ ...p, name, slug }));
    this.product = {
      ...allVariants[0],
      addCartLabel: this.data2.addCartLabel,
      shippingLabel: this.data2.shippingLabel,
      productDetailsLabel: this.data2.productDetailsLabel,
      shippingDescriptionLabel: this.data2.shippingDescriptionLabel,
    };
    // this.availability = this.product.availability;
    // this.availableQuantity = this.availability.availableQuantity;
    /* this.isOnStock =
      typeof inStock !== "boolean" ? true : availability.isOnStock; */
    // eslint-disable-next-line no-console
    console.log("Product", this.product);
  },
  computed: {
    productImages() {
      return this.product.images;
    },
    productImage() {
      const img = this.product?.images?.[0]?.url;
      if (img) {
        return img.replace(/_medium.jpg$/, "_large.jpg");
      }
      // eslint-disable-next-line no-console
      return undefined;
    },
    zoomerImages() {
      const imageInfos = this.productImages.map((image, index) => ({
        id: index,
        url: image.url,
      }));
      return {
        thumbs: imageInfos,
        normal_size: imageInfos,
        // large_size: imageInfos,
      };
    },
    zoomerOptions() {
      return {
        zoomFactor: 3,
        pane: "container",
        hoverDelay: 300,
        namespace: "product-gallery",
        move_by_click: true,
        scroll_items: this.galleryThumbnailsCount,
        choosed_thumb_border_color: "#FEC14E",
        scroller_position: "bottom",
      };
    },
    galleryThumbnailsCount() {
      return Math.min(this.productImages.length, 3);
    },
    hasDiscount() {
      return this.product.price?.discounted;
    },
    discountedPrice() {
      return this.product.price?.discounted?.value;
    },
    originalPrice() {
      return this.product.price?.value;
    },
    productAttributes() {
      const attributes = this.product.attributes.map(({ name, value }) => [
        name,
        getValue(value, locale(this)),
      ]);
      return productAttributes(attributes, locale(this));
    },
  },
  methods: {
    openAddToShoppingList() {
      this.$emit("open-add-shopping-list", {
        slug: this.product.slug,
        sku: this.product.sku,
      });
    },
    openAccordion(e) {
      const contextPanelGroup =
        $(".pdp-accord-toggle").parents(".panel-group-pdp");
      const contextPanel = $(e.target).parents(".panel-default");
      const contextButton = $(".accordion-plus", contextPanel);
      contextButton.toggleClass("accordion-minus");
      // Remove minus class on all other buttons
      contextPanelGroup
        .find(".accordion-plus")
        .not(contextButton)
        .removeClass("accordion-minus");
    },
    toggle(index) {
      const copy = [...this.expanded];
      copy[index] = !copy[index];
      this.expanded = copy;
    },
  },
  components: {
    BaseMoney,
    AddToCartForm,
  },
};
