<i18n src="./LocationSelector.txt"></i18n>
<script src="./LocationSelector.js"></script>

<template>
  <li>
    <a href="javascript:;">{{ $t(title) }}</a>
    <ul>
      <li v-for="value in listValues" v-bind:key="value.fields.text">
        <a
          @click.prevent="() => setValue(value.fields.text)"
          href="javascript:;"
          >{{ value.fields.text }}</a
        >
      </li>
    </ul>
  </li>
</template>
