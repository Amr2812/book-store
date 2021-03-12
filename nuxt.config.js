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

  css: ["@mdi/font/css/materialdesignicons.min.css"],

  loading: {
    height: "3px",
    color: "#032A2A"
  },

  plugins: [
    { src: "~/plugins/vue-wysiwyg", mode: "client" },
    { src: "~/plugins/vuex-persist", mode: "client" },
    "~/plugins/notifier"
  ],

  buildModules: ["@nuxtjs/dotenv", ["@nuxtjs/vuetify", { iconfont: "@mdi" }]],

  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/cloudinary",
    "@luxdamore/nuxt-prune-html"
  ],

  pruneHtml: {
    enabled: true, // `true` in production
    hideGenericMessagesInConsole: false, // `false` in production
    hideErrorsInConsole: false, // deactivate the `console.error` method
    hookRenderRoute: true, // activate `hook:render:route`
    hookGeneratePage: true, // activate `hook:generate:page`
    selectors: [
      // CSS selectors to prune
      'link[rel="preload"][as="script"]',
      'script:not([type="application/ld+json"])'
    ],
    classesSelectorsToKeep: [], // disallow pruning of scripts with this classes, n.b.: each `classesSelectorsToKeep` is appended to every `selectors`, ex.: `link[rel="preload"][as="script"]:not(__classesSelectorsToKeep__)`
    link: [], // inject custom links, only if pruned
    script: [], // inject custom scripts, only if pruned
    htmlElementClass: null, // a string added as a class to the <html> element if pruned
    cheerio: {
      // the config passed to the `cheerio.load(__config__)` method
      xmlMode: false
    },
    types: [
      // it's possibile to add different rules for pruning
      "default-detect"
    ],

    // 👇🏻 Type: `default-detect`
    headerNameForDefaultDetection: "user-agent", // The `header-key` base for `MobileDetection`, usage `request.headers[ headerNameForDefaultDetection ]`
    auditUserAgent: "lighthouse", // prune if `request.header[ headerNameForDefaultDetection ]` match, could be a string or an array of strings
    isAudit: true, // remove selectors if match with `auditUserAgent`
    isBot: true, // remove selectors if is a bot
    ignoreBotOrAudit: false, // remove selectors in any case, not depending on Bot or Audit
    matchUserAgent: null, // prune if `request.header[ headerNameForDefaultDetection ]` match, could be a string or an array of strings

    // 👇🏻 Type: 'query-parameters'
    queryParametersToPrune: [
      // array of objects (key-value)
      // trigger the pruning if 'query-parameters' is present in `types` and at least one value is matched, ex. `/?prune=true`
      {
        key: "prune",
        value: "true"
      }
    ],
    queryParametersToExcludePrune: [], // same as `queryParametersToPrune`, exclude the pruning if 'query-parameters' is present in `types` and at least one value is matched, this priority is over than `queryParametersToPrune`

    // 👇🏻 Type: 'headers-exist'
    headersToPrune: [], // same as `queryParametersToPrune`, but it checks `request.headers`
    headersToExcludePrune: [], // same as `queryParamToExcludePrune`, but it checks `request.headers`, this priority is over than `headersToPrune`

    // Emitted events for callbacks methods
    onBeforePrune: null, // ({ result, [ req, res ] }) => {}, `req` and `res` are not available on `nuxt generate`
    onAfterPrune: null // ({ result, [ req, res ] }) => {}, `req` and `res` are not available on `nuxt generate`
  },

  vuetify: {
    theme: {
      themes: {
        light: {
          primary: "#DD2026",
          secondary: "#6C63FF"
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
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {}
};
