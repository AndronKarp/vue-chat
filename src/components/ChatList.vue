<template>
  <VList two-line class="pa-0">
    <ChatListItem v-for="chat in chats" :chat="chat" :key="chat.id" />
  </VList>
</template>

<script>
import ChatListItem from "@/components/ChatListItem";

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
