<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="true"
      fixed
      app
      dark
      color="primary"
    >
      <v-list>
        <v-list-item v-for="(link, i) in links" :key="i" :to="link.to" router>
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="link.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="true" fixed app color="primary" dark dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <Snackbar></Snackbar>
  </v-app>
</template>

<script>
import Snackbar from "~/components/Snackbar";

export default {
  data() {
    return {
      drawer: false,
      links: [
        {
          icon: "mdi-home",
          title: "Welcome",
          to: "/"
        },
        {
          icon: "mdi-information",
          title: "About Us",
          to: "/about"
        },
        {
          icon: "mdi-phone",
          title: "Contact Us",
          to: "/contact"
        }
      ]
    };
  },
  components: {
    Snackbar
  }
};
</script>
