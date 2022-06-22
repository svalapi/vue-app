<script src="./comp-image-with-text-slider.js"></script>

<template>
  <div class="slider-area">
    <carousel
      animateIn="fadeIn"
      animateOut="fadeOut"
      :autoplayHoverPause="false"
      :nav="false"
      :autoplay="true"
      :items="1"
      class="slider-active-1 nav-style-2"
    >
      <div
        class="single-slider bg-img slider-height-2 align-items-center custom-d-flex"
        v-bind:style="{'background-image':`url(${slideItem.fields.sliderImage.fields.file.url})`}"
        v-for="(slideItem,index) in data"
        :key="index"
      >
        <div class="container">
          <div class="row height-100-percent align-items-center">
            <div class="col-lg-12 col-md-12 col-sm-12 col-12">
              <div class="slider-content-8 slider-animated-1 text-center">
                <h3 class="animated">{{slideItem.fields.imageText}}</h3>
                <!-- <h1 class="animated">{{$t("up50")}}</h1> -->
                <!-- <div class="slider-btn-1">
                  <router-link
                    :to="{ name: 'products', params: { categorySlug: 'sale' } }"
                    class="animated"
                    >{{$t("shopNow")}}</router-link
                  >
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </carousel>
  </div>
</template>
