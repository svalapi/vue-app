<script src="./PageHome.js"></script>
<style src="./PageHome.scss" lang="scss"></style>

<template>
  <span class="test-class">
    <span v-if="getHomePageData">
      <div v-for="(currentItem, key) in componentList" :key="key">
        <comp-dynamic-link
          :data="component[currentItem]"
          :type="currentItem"
        ></comp-dynamic-link>
      </div>
    </span>
   </span>
</template>
