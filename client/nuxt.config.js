module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Real App',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'The Real App' }
    ],
    link: [
        {   rel: 'icon', type: 'image/x-icon', href: '/favicon.ico',
            rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons',
        }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#FFFFFF' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/main.css',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['~/plugins/vuetify'],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    // '@nuxtjs/axios',
    ['vue-warehouse/nuxt',
        {
            vuex: true,
            plugins: [
                'store/plugins/expire',
                'store/plugins/defaults'
            ],
            storages: [
                'store/storages/localStorage',
                'store/storages/cookieStorage'
            ]
        }
    ],
],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    //   vendor: ['axios', 'vuetify', 'vue-warehouse/nuxt'],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  }
}
