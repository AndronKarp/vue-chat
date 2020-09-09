<template>
  <div class="d-flex fill-height">
    <TheNav v-model="isNavVisible" />
    <v-main>
      <v-row class="fill-height" no-gutters>
        <v-col cols="3">
          <ChatList @navButtonClick="toggleNav" @chatSelect="setSelectedChat" />
        </v-col>
        <v-col :class="{ 'd-flex justify-center': !selectedChat }">
          <ChatRoom v-if="selectedChat" :selectedChat="selectedChat" />
          <p v-else class="text--secondary align-self-center">
            Please select a chat to start messaging
          </p>
        </v-col>
      </v-row>
    </v-main>
  </div>
</template>

<script>
import TheNav from "../components/TheNav";
import ChatList from "../components/ChatList";
import ChatRoom from "../components/ChatRoom";

export default {
  data() {
    return {
      isNavVisible: null,
      selectedChat: null
    };
  },
  methods: {
    toggleNav() {
      this.isNavVisible = !this.isNavVisible;
    },
    setSelectedChat(value) {
      this.selectedChat = value;
    }
  },
  components: {
    TheNav,
    ChatRoom,
    ChatList
  }
};
</script>

<style></style>
