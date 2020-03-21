<template>
  <v-list
    class="mb-8"
    subheader
    two-line
    disabled
    elevation="4"
    min-width="280px"
    style="width: 60%"
  >
    <v-subheader>Messages</v-subheader>
    <v-list-item v-for="(message, index) in messages" :key="index">
      <v-list-item-content>
        <v-list-item-title>{{ message.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ message.text }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["messages"])
  }
};
</script>

<style></style>
