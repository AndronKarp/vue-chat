<template>
  <VListItem :to="{ name: 'PageChatRoom', params: { id: chat.id } }">
    <VListItemAvatar color="primary">
      <VIcon color="white">mdi-chat</VIcon>
    </VListItemAvatar>
    <VListItemContent>
      <VListItemTitle>{{ chat.title }}</VListItemTitle>
      <VListItemSubtitle>{{ chat.lastMessage }}</VListItemSubtitle>
    </VListItemContent>
  </VListItem>
</template>

<script>
export default {
  name: "ChatListItem",

  props: {
    chat: {
      type: Object,
      required: true
    }
  }
};
</script>
