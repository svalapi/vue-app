<script src="./comp-paragraph.js"></script>

<template> 
  <div class="container" v-if="data">
    <div class="slider-area text-center mb-4 pb-2 mt-4">
    <h2 class="text" v-if="data.fields">{{data.fields.title}}</h2>
     <RichTextRenderer  v-if="data.fields" :document="data.fields.text" />
  </div>
  </div>
</template>
