<template>
  <v-card tile class="d-flex">
    <v-card-text>
      <div class="text--primary text-body-1">{{ message.text }}</div>
      <div>{{ message.sender.name }}</div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  }
};
</script>

<style></style>
