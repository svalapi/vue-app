<script src="./comp-home-service-gallery-view.js"></script>

<template>
  <div class="banner-area pt-30">
    <div class="custom-container">
      <div class="row" v-if="data">
        <div class="col-lg-4 col-md-4 col-xs-12" v-for="(currentItem,key) in data" :key="key">
          <div
            class="banner-wrap mb-30 wow fadeIn"
            data-wow-duration="1s"
            data-wow-delay="0.2s"
            v-for="(item,itemInd) in currentItem.fields.box"
            :key="itemInd"
          >
            <div class="banner-img banner-hover banner-zoom">
              <router-link
                :to="{ name: 'products', params: { categorySlug: 'women-clothing-jeans' } }"
              >
                <img :src="item.fields.image.fields.file.url" alt="banner" />
                <div class="banner-content">
                  <h3>{{item.fields.text}}</h3>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
