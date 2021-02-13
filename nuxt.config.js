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
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  css: [],

  loading: {
    height: "3px"
  },

  plugins: ["~/plugins/vue-wysiwyg.js", "~/plugins/notifier.js"],

  components: true,

  buildModules: ["@nuxtjs/dotenv", "@nuxtjs/vuetify"],

  modules: ["@nuxtjs/axios", "@nuxtjs/cloudinary"],

  vuetify: {
    theme: {
      themes: {
        light: {
          primary: "#35495e",
          secondary: "#526488"
        }
      }
    }
  },

  cloudinary: {
    cloudName: process.env.CLOUD_NAME,
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET
  },

  router: {
    middleware: ["ssr-cookie"]
  },

  serverMiddleware: {
    "/api": "~/api"
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
  build: {}
};
