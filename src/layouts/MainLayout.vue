<template>
  <div style="height: 100%">
    <TheNav v-model="isNavVisible" />
    <TheHeader @navButtonClick="toggleNav" />
    <v-content>
      <v-container class="fill-height">
        <slot></slot>
      </v-container>
    </v-content>
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
