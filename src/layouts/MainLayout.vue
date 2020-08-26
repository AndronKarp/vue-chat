<template>
  <div class="d-flex fill-height">
    <TheNav v-model="isNavVisible" />
    <TheHeader @navButtonClick="toggleNav" />
    <v-main>
      <v-container class="fill-height">
        <slot></slot>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import TheNav from "../components/TheNav";
import TheHeader from "../components/TheHeader";

export default {
  data() {
    return {
      isNavVisible: null
    };
  },
  methods: {
    toggleNav() {
      this.isNavVisible = !this.isNavVisible;
    }
  },
  components: {
    TheNav,
    TheHeader
  }
};
</script>

<style></style>
