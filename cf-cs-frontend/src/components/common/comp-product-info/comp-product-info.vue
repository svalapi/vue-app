<style src="./ProductGallery.scss" lang="scss" scoped></style>
<style src="./style.css" scoped></style>
<style src="./DetailsSection.scss" lang="scss" scoped></style>
<i18n src="./DetailsSection.txt"></i18n>
<script src="./comp-product-info.js"></script>

<template>
  <div class="row" v-if="product">
    <div class="col-lg-5">
      <div class="product-details-tab">
        <div
          v-if="product"
          class="pro-dec-big-img-slider product-big-img-style"
        >
          <div class="easyzoom easyzoom--overlay" ref="easyzoom">
            <a :href="productImage">
              <img
                :class="'product-image'"
                :src="productImage"
                alt=""
                data-test="product-image"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-7">
      <div
        class="product-details-content product-details-ptb"
        data-test="product-data"
      >
        <h2 data-test="product-name">
          {{ product.name }}
        </h2>
        <h3>
          <span>
            <span v-if="!hasDiscount">
              <BaseMoney :money="originalPrice" />
            </span>
            <span v-else>
              <span data-test="price-old-value" class="old-price">
                <BaseMoney :money="originalPrice" />
              </span>
              <span data-test="price-new-value" class="new-price">
                <BaseMoney :money="discountedPrice" />
              </span>
            </span>
          </span>
        </h3>

        <!-- <div v-if="product">
          <ul class="list-inline" data-test="variant-selector-list">
            <li v-for="[name, id, values] in attributes" :key="name">
              <AttributeSelect
                :product="product"
                :values="values"
                :sku="sku"
                :name="name"
                :id="id"
                :selected="selected"
                :variantCombinations="variantCombinations"
              />
            </li>
          </ul>
        </div> -->
        <!-- <div v-if="availableQ">
          {{ $t("available") }}: {{ availableQuantity }}
        </div> -->
        <AddToCartForm
          :sku="product.sku"
          :isOnStock="isOnStock"
          :addCaption="product.addCartLabel"
        />
        <!-- <a href @click.prevent="openAddToShoppingList">
          <i class="dl-icon-heart"></i><span>Shopping list</span>
        </a> -->

        <!-- Details Section -->
        <div class="description-review-wrapper" v-if="product">
          <div class="panel-group" id="accordion1">
            <div class="panel pro-dec-accordion">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a
                    href="#"
                    @click.prevent="toggle(0)"
                    :class="{ collapsed: !expanded[0] }"
                    data-test="product-attributes-accordion"
                  >
                    {{ product.productDetailsLabel }}
                  </a>
                </h4>
              </div>
              <div
                data-parent="#accordion1"
                id="pro-dec-accordion1"
                class="product-description-wrapper panel-collapse collapse"
                :class="{ show: expanded[0] }"
              >
                <div class="panel-body">
                  <ul class="product-features-list">
                    <li
                      v-for="attribute in productAttributes"
                      data-test="product-attributes-list"
                      :key="attribute.name"
                    >
                      <span class="attribute-name">
                        {{ attribute.name }}:
                      </span>
                      <span>
                        {{ attribute.label || attribute.value }}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="panel pro-dec-accordion">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a
                    href="#"
                    @click.prevent="toggle(1)"
                    :class="{ collapsed: !expanded[1] }"
                  >
                    {{ product.shippingLabel }}
                  </a>
                </h4>
              </div>
              <div
                data-parent="#accordion1"
                id="pro-dec-accordion2"
                class="product-description-wrapper panel-collapse collapse"
                :class="{ show: expanded[1] }"
              >
                <div class="panel-body">
                  <ul class="product-delivery-list">
                    <li
                      v-for="desc in product.shippingDescriptionLabel.split(
                        '. '
                      )"
                      :key="desc"
                    >
                      {{ desc }}
                    </li>
                    <!-- <li>{{ $t("moreDeliveryInfo") }}</li> -->
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
