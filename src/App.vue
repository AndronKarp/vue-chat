<template>
  <v-app id="app">
    <component :is="$route.meta.layout">
      <router-view></router-view>
    </component>
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>
