export default {
  target: "server",

  head: {
    title: "Book Store" || process.env.npm_package_name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "twitter:title",
        name: "twitter:title",
        content: "Book Store"
      },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content: "Book Store is an online book store that sells books online"
      },
      {
        hid: "twitter:image",
        name: "twitter:image",
        content: "/meta-image.jpg"
      },
      {
        hid: "twitter:image:alt",
        name: "twitter:image:alt",
        content: "Book Store"
      },
      {
        hid: "og:title",
        property: "og:title",
        content: "Book Store"
      },
      {
        hid: "og:description",
        property: "og:description",
        content: "Book Store is an online book store that sells books online"
      }
    ],
    link: [
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

  router: {
    middleware: ["ssr-cookie"]
  },

  buildModules: ["@nuxtjs/dotenv", ["@nuxtjs/vuetify", { iconfont: "@mdi" }]],

  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/cloudinary",
    "@luxdamore/nuxt-prune-html"
  ],

  axios: {
    baseURL:
      process.env.NODE_ENV === "production"
        ? process.env.baseURL
        : "http://localhost:3000"
  },

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
          primary: "#108775",
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
