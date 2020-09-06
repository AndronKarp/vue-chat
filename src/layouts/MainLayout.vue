<template>
  <div class="d-flex fill-height">
    <TheNav v-model="isNavVisible" />
    <v-main>
      <v-row class="fill-height" no-gutters>
        <v-col> </v-col>
        <v-col cols="12" sm="8" md="9" lg="10">
          <ChatRoom />
        </v-col>
      </v-row>
    </v-main>
  </div>
</template>

<script>
import TheNav from "../components/TheNav";
import ChatRoom from "../components/ChatRoom";

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
    ChatRoom
  }
};
</script>

<style></style>
