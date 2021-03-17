<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="true"
      fixed
      app
      dark
      temporary
      disable-resize-watcher
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
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon style="position: relative;" @click="$router.push('/cart')">
        <v-icon>mdi-cart</v-icon>
        <span class="cart-number">{{ $store.state.cart.cart.length }}</span>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :padless="true" dark>
      <v-card flat tile width="100%" class="text-center" color="primary">
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          &copy; {{ new Date().getFullYear() }} —
          <strong class="logo" v-text="title"></strong>
          <h3>
            <a href="https://amr-elmohamady.netlify.app" class="white--text"
              >Made by Amr Elmohamady</a
            >
          </h3>
        </v-card-text>
      </v-card>
    </v-footer>
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
          icon: "mdi-magnify",
          title: "Search",
          to: "/search"
        },
        {
          icon: "mdi-cart",
          title: "Cart",
          to: "/cart"
        },
        {
          icon: "mdi-information",
          title: "About Us",
          to: "/about"
        },
      ],
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
      title: "Book Store"
    };
  },
  components: {
    Snackbar
  }
};
</script>

<style scoped>
.cart-number {
  width: 21px;
  position: absolute;
  top: -8px;
  right: 6px;
  background-color: #5aada1;
  padding: 2px;
  border-radius: 50%;
}
</style>
