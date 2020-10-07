<template>
  <v-card class="fill-height" tile>
    <ChatList :chats="chats" />
    <FormCreateChat />
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import ChatList from "../components/ChatList";
import FormCreateChat from "../components/FormCreateChat";

export default {
  name: "PageChats",

  components: {
    ChatList,
    FormCreateChat
  },

  computed: {
    ...mapGetters(["chats"])
  }
};
</script>

<style></style>
