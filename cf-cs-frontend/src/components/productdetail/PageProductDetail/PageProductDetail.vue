<i18n src="./PageProductDetail.txt"></i18n>
<script src="./PageProductDetail.js"></script>

<template>
  <div class="product-details-area">
    <!-- <ProductInfo 
        :sku="sku" 
        @open-add-shopping-list="openAddToShoppingList"
      /> -->
    <span v-if="getPDPData">
      <div
        v-for="(currentItem, key) in componentList"
        :key="key"
        v-bind:class="[currentItem == 'product_info' ? 'custom-container' : '']"
      >
        <comp-dynamic-link
          :data="component[currentItem]"
          :type="currentItem"
        ></comp-dynamic-link>
      </div>
    </span>
    <div class="custom-container"></div>
    <AddToShoppingList
      :showModal="showAddToShoppingList"
      :productSku="sku"
      @close-modal="closeAddToShoppingList"
    />
  </div>
</template>
