<template>
  <v-list two-line class="pa-0">
    <chat-list-item v-for="chat in chats" :chat="chat" :key="chat.id">
      <template #avatar="{ avatar }">
        <img v-if="avatar" :src="avatar" alt="Chat avatar" />
      </template>
    </chat-list-item>
  </v-list>
</template>

<script>
import ChatListItem from "./ChatListItem";

export default {
  name: "ChatList",

  components: {
    ChatListItem
  },

  props: {
    chats: {
      type: Array,
      required: true
    }
  }
};
</script>

<style></style>
