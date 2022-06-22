<script src="./comp-banner.js"></script>

<template>
  <div class="slider-area" v-if="data">
    <img :src="data.fields.image.fields.file.url"/>
  <p class="text" v-if="data.fields">{{data.fields.text}}</p>
  </div>
</template>
