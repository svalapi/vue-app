<script src="./About2.js"></script>

<template>
<span v-if="getAboutUsContentStackData">
  <div v-for="(currentItem,key) in componentList" :key="key">
     <comp-dynamic-link 
     v-if="component[currentItem]" 
     :data="component[currentItem]" 
     :type="currentItem"></comp-dynamic-link>
  </div>
</span>
</template>
