<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="!currentUser" link to="/reg">
          <v-list-item-action>
            <v-icon>mdi-account-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Sign Up</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="!currentUser" link to="/auth">
          <v-list-item-action>
            <v-icon>mdi-login</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Sign In</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="amber darken-4" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Vue Chat</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="currentUser" @click="logOut" icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer color="amber darken-4" app>
      <span class="white--text">&copy; Andrew Karpenko 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import logout from "../mixins/logout";

export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  }),
  computed: {
    ...mapGetters(["currentUser"])
  },
  mixins: [logout]
};
</script>
