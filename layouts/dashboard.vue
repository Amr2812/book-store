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
        <v-list-item
          v-for="(link, i) in links"
          :key="i"
          :to="link.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="link.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="logout()">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="text-uppercase">logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="true" fixed app color="primary" dark dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Admin</v-toolbar-title>
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
          icon: "mdi-library",
          title: "Books",
          to: "/admin/books"
        },
        {
          icon: "mdi-plus",
          title: "Add Book",
          to: "/admin/books/add"
        },
        {
          icon: "mdi-cash",
          title: "Orders",
          to: "/admin/orders/"
        },
        {
          icon: "mdi-shield-check",
          title: "Admins",
          to: "/admin/admins/"
        },
        {
          icon: "mdi-plus",
          title: "New Admin",
          to: "/admin/admins/new"
        }
      ]
    };
  },
  methods: {
    async logout() {
      try {
        await this.$axios.$delete("/api/admins");
        this.$store.commit("auth/isAuthenticated", false);
        this.$router.push("/admin");
      } catch (err) {
        console.log(err);
      }
    }
  },
  components: {
    Snackbar
  }
};
</script>
