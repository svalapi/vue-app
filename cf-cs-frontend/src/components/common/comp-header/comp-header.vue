<style src="./comp-header.scss" lang="scss"></style>
<i18n src="./comp-header.txt"></i18n>
<script src="./comp-header.js"></script>

<template>
  <header class="header-area">
    <div class="main-header-wrap bg-gray">
      <div class="custom-container" v-if="data2.fields.topHeader">
        <div class="header-top pt-10 pb-10">
          <div class="row align-items-center">
            <div class="col-sm-6">
              <div class="header-info header-info-inc">
                <router-link
                  :to="{
                    name: data2.fields.topHeader.fields.storeLink.fields.url,
                  }"
                  data-test="stores-link"
                  v-if="
                    showLocationChange &&
                    data2.fields.topHeader.fields.storeLink
                  "
                >
                  {{ data2.fields.topHeader.fields.storeLink.fields.text }}
                </router-link>
                <a href="#">{{
                  data2.fields.topHeader.fields.helpLink.fields.text
                }}</a>
              </div>
            </div>
            <div class="col-sm-6 d-flex justify-content-end">
              <div class="curr-lang-wrap curr-lang-inc">
                <ul>
                  <LocationSelector
                    v-bind:values="
                      data2.fields.topHeader.fields.location.fields.listItem
                    "
                    :title="
                      data2.fields.topHeader.fields.location.fields.title.toLowerCase()
                    "
                    data-test="country-selector-dropdown"
                    v-if="showLocationChange"
                  />
                  <LocationSelector
                    v-bind:values="
                      data2.fields.topHeader.fields.language.fields.listItem
                    "
                    :title="
                      data2.fields.topHeader.fields.language.fields.title.toLowerCase()
                    "
                    data-test="language-selector-dropdown"
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="site-header-outer">
        <div class="intelligent-header bg-white">
          <div class="header-middle">
            <div class="custom-container">
              <div class="row align-items-center">
                <div class="col-xl-2 col-lg-3">
                  <div class="logo" v-if="data2.fields.websiteLogo">
                    <router-link to="/">
                      <img
                        :src="
                          data2.fields.websiteLogo.fields.image.fields.file.url
                        "
                        alt="SUNRISE"
                        class="img-responsive sunrise-logo"
                      />
                    </router-link>
                  </div>
                </div>
                <div class="col-xl-8 col-lg-6 position-static">
                  <div
                    class="main-menu menu-lh-3 main-menu-blod main-menu-center"
                    v-if="data2.fields.categories"
                  >
                    <CategoriesMenu :data2="data2.fields.categories" />
                  </div>
                </div>
                <div class="col-xl-2 col-lg-3">
                  <div class="header-component-wrap">
                    <div
                      class="header-search-2 component-same"
                      v-if="data2.fields.searchLink"
                    >
                      <a
                        href
                        @click.prevent="toggleSearch"
                        class="search-active"
                      >
                        <i :class="data2.fields.searchLink.fields.text"></i>
                      </a>
                    </div>
                    <LoginButton
                      v-if="data2.fields.signInLink"
                      :icon="data2.fields.signInLink.fields.iconClass"
                      :signInText="data2.fields.signInLink.fields.text"
                    />
                    <div
                      class="cart-wrap component-same ml-10"
                      v-if="data2.fields.cartLink"
                    >
                      <a
                        href
                        @click.prevent="openMiniCart"
                        data-test="mini-cart-open-button"
                        class="cart-active"
                      >
                        <i :class="data2.fields.cartLink.fields.text"></i>
                        <span class="count-style">{{ totalCartItems }} </span>
                      </a>
                    </div>
                    <div
                      class="cart-wrap component-same ml-10"
                      v-if="data2.fields.shoppingListLink"
                    >
                      <router-link :to="{ name: 'shopping list' }">
                        <i
                          :class="data2.fields.shoppingListLink.fields.text"
                        ></i>
                        <span class="count-style"
                          >{{ totalShoppingCartItems }}
                        </span>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="header-small-mobile">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-6">
            <div class="mobile-logo logo-width" v-if="data2.fields.websiteLogo">
              <a href="index.html">
                <img
                  alt=""
                  :src="data2.fields.websiteLogo.fields.image.fields.file.url"
                />
              </a>
            </div>
          </div>
          <div class="col-6">
            <div class="mobile-header-right-wrap">
              <div class="same-style cart-wrap">
                <a href="#" class="cart-active">
                  <i :class="data2.fields.cartLink.fields.text"></i>
                  <span class="count-style">{{ totalCartItems }}</span>
                </a>
              </div>
              <div class="same-style cart-wrap">
                <a href="#" class="cart-active">
                  <i :class="data2.fields.cartLink.fields.text"></i>
                  <span class="count-style">{{ totalShoppingCartItems }}</span>
                </a>
              </div>
              <div class="mobile-off-canvas">
                <a class="mobile-aside-button" href="#"
                  ><i class="dl-icon-menu2"></i
                ></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="search-content-wrap main-search-active"
      :class="{ 'search-visible': searchOpen }"
    >
      <a @click="toggleSearch" class="search-close"
        ><i class="dl-icon-close"></i
      ></a>
      <div class="search-content">
        <form class="search-form">
          <input
            name="q"
            type="text"
            v-model="searchText"
            placeholder="Search entire store…"
          />
          <button @click="search" class="button-search">
            <i class="dl-icon-search10"></i>
          </button>
        </form>
      </div>
    </div>
  </header>
</template>
