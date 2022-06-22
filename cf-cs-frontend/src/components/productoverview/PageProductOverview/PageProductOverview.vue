<style src="./PageProductOverview.scss" lang="scss"></style>
<i18n src="./PageProductOverview.txt"></i18n>
<script src="./PageProductOverview.js"></script>

<template>
  <!-- eslint-disable-next-line max-len -->
  <div>
    <span v-if="getPLPData">
      <div v-for="(currentItem, key) in componentList" :key="key">
        <!-- eslint-disable-next-line max-len -->
        <comp-dynamic-link
          :data="component[currentItem]"
          :type="currentItem"
        ></comp-dynamic-link>
        <!-- eslint-enable max-len -->
      </div>
    </span>
    <!-- <Breadcrumb :categorySlug="categorySlug" />
    <ProductList
      @open-quick-view="openProductQuickView"
      @open-add-shopping-list="openAddToShoppingList"
      :categorySlug="categorySlug"
      :page="page"
    /> -->
    <ProductQuickView
      :showModal="showProductQuickView"
      :productSku="productSku"
      @close-modal="closeProductQuickView"
    />
    <AddToShoppingList
      :showModal="showAddToShoppingList"
      :productSku="productSku"
      @close-modal="closeAddToShoppingList"
    />
  </div>
</template>
