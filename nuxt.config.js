export default {
  target: "server",

  head: {
    title: "Azbakeya Delivery" || process.env.npm_package_name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "twitter:title",
        name: "twitter:title",
        content: "Azbakeya Delivery"
      },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content:
          "Azbakeya Delivery is an online book store that sells books online"
      },
      {
        hid: "twitter:image",
        name: "twitter:image",
        content: "/meta-image.jpg"
      },
      {
        hid: "twitter:image:alt",
        name: "twitter:image:alt",
        content: "Azbakeya Delivery"
      },
      {
        hid: "og:title",
        property: "og:title",
        content: "Azbakeya Delivery"
      },
      {
        hid: "og:description",
        property: "og:description",
        content:
          "Azbakeya Delivery is an online book store that sells books online"
      },
      {
        hid: "og:image",
        property: "og:image",
        content: "/meta-image.jpg"
      },
      {
        hid: "og:image:secure_url",
        property: "og:image:secure_url",
        content: "/meta-image.jpg"
      },
      {
        hid: "og:image:alt",
        property: "og:image:alt",
        content: "Azbakeya Delivery"
      }
    ],
    link: [
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png"
      },
      {
        rel: "manifest",
        href: "/site.webmanifest"
      }
    ]
  },

  css: [],

  loading: {
    height: "3px",
    color: "#032A2A"
  },

  plugins: [
    { src: "~/plugins/vue-wysiwyg", mode: "client" },
    { src: "~/plugins/vuex-persist", mode: "client" },
    "~/plugins/notifier",
  ],

  buildModules: ["@nuxtjs/dotenv", "@nuxtjs/vuetify"],

  modules: ["@nuxtjs/axios", "@nuxtjs/cloudinary"],

  vuetify: {
    theme: {
      themes: {
        light: {
          primary: "#DD2026",
          secondary: "#00C58E"
        }
      }
    }
  },

  cloudinary: {
    cloudName: process.env.CLOUD_NAME,
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET
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
