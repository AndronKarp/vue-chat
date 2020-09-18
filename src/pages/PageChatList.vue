<template>
  <v-card class="fill-height" tile>
    <v-list two-line class="pa-0">
      <template v-for="([id, chat], index) in Object.entries(chats)">
        <v-list-item
          :to="{
            name: 'PageChatRoom',
            params: {
              chatId: id
            }
          }"
          :key="id"
        >
          <v-list-item-avatar color="amber darken-4">
            <v-icon color="white">mdi-chat</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ chat.title }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ chat.lastMessage }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="index"></v-divider>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PageChatList",

  computed: {
    ...mapGetters(["chats"])
  }
};
</script>

<style></style>
