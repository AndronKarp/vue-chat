<template>
  <div class="d-flex fill-height">
    <TheHeader @navButtonClick="toggleNav" />
    <TheNav v-model="isNavVisible" />
    <v-main>
      <v-row class="fill-height" no-gutters>
        <v-col>
          <slot></slot>
        </v-col>
      </v-row>
    </v-main>
  </div>
</template>

<script>
import TheHeader from "../components/TheHeader";
import TheNav from "../components/TheNav";

export default {
  name: "MainLayout",

  components: {
    TheHeader,
    TheNav
  },

  data() {
    return {
      isNavVisible: false
    };
  },

  methods: {
    toggleNav() {
      this.isNavVisible = !this.isNavVisible;
    }
  }
};
</script>

<style></style>
