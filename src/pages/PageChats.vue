<template>
  <VCard class="fill-height" tile>
    <ChatList :chats="chats" />
    <FormCreateChat />
  </VCard>
</template>

<script>
import ChatList from "../components/ChatList";
import FormCreateChat from "../components/FormCreateChat";

export default {
  name: "PageChats",

  components: {
    ChatList,
    FormCreateChat
  },

  data() {
    return {
      chats: []
    };
  }
};
</script>
