<template>
  <v-form
    @submit.prevent="editMessage(message)"
    style="position: sticky; bottom: 0; width: 100%"
  >
    <v-alert class="pa-3 mb-0" icon="mdi-pencil" elevation="2" tile>
      <v-row no-gutters align="center">
        <v-col class="grow">Editing message</v-col>
        <v-col class="shrink">
          <v-btn icon small @click="cancelEditing">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-alert>
    <v-text-field
      v-model="text"
      class="rounded-0"
      type="text"
      placeholder="New message..."
      hide-details
      solo
    >
      <template #append>
        <v-btn icon small :disabled="isMessageEmpty" type="submit">
          <v-icon>mdi-check</v-icon>
        </v-btn>
      </template>
    </v-text-field>
  </v-form>
</template>

<script>
import isMessageEmpty from "../mixins/is-message-empty";

export default {
  name: "FormEditMessage",

  mixins: [isMessageEmpty],

  props: {
    message: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      text: this.message.text
    };
  },

  methods: {
    editMessage({ id }) {
      this.$emit("editing-confirm", { messageId: id, text: this.text });
    },
    cancelEditing() {
      this.$emit("editing-cancel");
    }
  }
};
</script>

<style></style>
