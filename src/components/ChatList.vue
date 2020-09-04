<template>
  <v-card tile>
    <v-toolbar color="amber darken-4" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Vue Chat</v-toolbar-title>
    </v-toolbar>
    <v-list two-line>
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
        <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
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
