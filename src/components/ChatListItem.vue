<template>
  <div>
    <v-list-item :to="{ name: 'PageChatRoom', params: { id: chat.id } }">
      <v-list-item-avatar color="amber darken-4">
        <slot name="avatar" :avatar="chat.avatar">
          <v-icon color="white">mdi-chat</v-icon>
        </slot>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{ chat.title }}</v-list-item-title>
        <v-list-item-subtitle>{{ chat.lastMessage }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
  </div>
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

<style></style>
