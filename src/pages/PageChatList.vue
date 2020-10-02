<template>
  <v-card class="fill-height" tile>
    <ChatList :chats="chats" />
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import ChatList from "../components/ChatList";

export default {
  name: "PageChatList",

  components: {
    ChatList
  },

  computed: {
    ...mapGetters(["chats"])
  }
};
</script>

<style></style>
