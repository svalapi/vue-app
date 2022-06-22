<script src="./comp-product-list.js"></script>

<template>
  <div class="shop-area pb-100">
    <div class="custom-container" v-if="products">
      <TopBar
        v-on:toggle-filter="toggleFilter"
        v-bind:sort="sort"
        v-bind:show="show"
        v-bind:count="products.count"
        v-bind:offset="products.offset"
        v-bind:total="products.total"
      />
      <!-- @channel-change="channelChange" -->
      <ProductFilter
        :facets="facets"
        :facetFilter="facetFilter"
        :allChannels="allChannels"
        v-bind:show="show"
        @filter-change="facetFilterChange"
      />
      <!-- @open-quick-view="openQuickView"
            @open-add-shopping-list="openAddToShoppingList" -->
      <div class="shop-wrapper">
        <div class="row">
          <ProductThumbnail
            v-for="product in products.results"
            data-test="product-list"
            :key="product.id"
            :product="product"
          />
        </div>

        <Pagination
          :pageSize="products.limit"
          :total="products.total"
          :page="page"
          @pagechanged="changePage"
        />
      </div>

      <!-- <div v-else>
        <div class="empty-results-container">
          <span class="empty-results" data-test="empty-results">
            {{ $t("notFound") }}
          </span>
        </div>
      </div> -->
    </div>
    <div v-else>
      <div class="empty-results-container">
        <span class="empty-results" data-test="category-not-found">
          {{ $t("categoryNotFound") }}
        </span>
      </div>
    </div>
  </div>
</template>
