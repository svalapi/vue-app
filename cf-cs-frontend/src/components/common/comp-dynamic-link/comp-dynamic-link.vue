<script src="./comp-dynamic-link.js"></script>

<template>
  <!-- eslint-disable-next-line max-len -->
  <component :is="component" :data="data" :data2="data" v-if="component" />
  <!-- eslint-enable max-len -->
</template>
