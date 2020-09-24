<template>
  <v-alert
    :class="{ 'align-self-end': isCurrentUserSender }"
    elevation="2"
    dense
  >
    <v-row no-gutters>
      <v-col class="grow">
        <div>{{ message.text }}</div>
        <div class="text--secondary text-body-2">{{ message.sender.name }}</div>
      </v-col>

      <v-col class="shrink pl-4" v-if="isCurrentUserSender">
        <v-menu bottom>
          <template #activator="{ on, attrs }">
            <v-btn x-small icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click="deleteMessage">
              <v-list-item-content>
                <v-list-item-title>Delete</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
  </v-alert>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MessageListItem",

  props: {
    message: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapGetters(["currentUser"]),
    isCurrentUserSender() {
      return this.currentUser.uid === this.message.sender.id;
    }
  },

  methods: {
    deleteMessage() {
      this.$emit("delete-button-click");
    }
  }
};
</script>

<style></style>
