<template>
  <v-card class="fill-height" tile style="position: relative">
    <v-toolbar
      color="amber darken-4"
      flat
      dark
      absolute
      height="56px"
      width="100%"
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </v-toolbar>
    <v-list class="pt-14" two-line max-height="100vh" style="overflow-y: auto">
      <template v-for="(item, index) in items">
        <v-list-item :key="item.title">
          <v-list-item-avatar color="amber darken-4">
            <v-icon color="white">mdi-account</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ item.subtitle }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="index"></v-divider>
      </template>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "John Doe", subtitle: "Lorem Ipsum Dolor Sit Amet" },
        { title: "John Doe", subtitle: "Lorem Ipsum Dolor Sit Amet" },
        { title: "John Doe", subtitle: "Lorem Ipsum Dolor Sit Amet" },
        { title: "John Doe", subtitle: "Lorem Ipsum Dolor Sit Amet" }
      ]
    };
  }
};
</script>

<style></style>
