<template>
  <v-main>
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="5" xl="4">
          <v-card class="elevation-12">
            <v-toolbar dark flat color="amber darken-4">
              <v-toolbar-title>{{ $route.meta.title }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <slot></slot>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: "FormLayout"
};
</script>

<style></style>
