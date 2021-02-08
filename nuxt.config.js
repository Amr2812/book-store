export default {
  target: "server",

  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  css: [],

  plugins: [],

  components: true,

  buildModules: ["@nuxtjs/dotenv", "@nuxtjs/vuetify"],

  modules: ["@nuxtjs/axios"],

  vuetify: {
    theme: {
      themes: {
        light: {
          primary: "#35495e",
          secondary: "#526488",
        },
      },
    },
  },

  router: {
    middleware: ["ssr-cookie"],
  },

  serverMiddleware: {
    "/api": "~/api",
  },

  /*
   ** For deployment you might want to edit host and port
   */
  // server: {
  //  port: 8000, // default: 3000
  //  host: '0.0.0.0' // default: localhost
  // },

  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
};
