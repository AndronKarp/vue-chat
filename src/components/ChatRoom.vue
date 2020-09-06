<template>
  <v-card class="fill-height" tile style="position: relative">
    <v-toolbar color="amber darken-4" dark absolute height="56px" width="100%">
      <v-toolbar-title>chatName</v-toolbar-title>
    </v-toolbar>
    <MessageList />
    <SendMessageForm />
  </v-card>
</template>

<script>
import SendMessageForm from "../components/SendMessageForm";
import MessageList from "../components/MessageList";

export default {
  components: {
    SendMessageForm,
    MessageList
  }
};
</script>

<style></style>
