<template>
    <div>
        <v-toolbar
        color="#101535"
      dark
      tabs
    >

      <v-toolbar-title>{{ zone }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn> -->

      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>

      <v-tabs
        slot="extension"
        v-model="tab"
        grow
        color="#101535"
      >
      <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tab
          v-for="item in menuItems"
          :key="item.index"
          :to="item.link"
        >
            {{ item.title }}
        </v-tab>
      </v-tabs>
    </v-toolbar>
    </div>    
</template>

<script>

export default {
    components: {
    },
    data: () => ({
        tab: null,
    }),
    computed: {
        zone () {
            // console.log('In Navbar: ', this.$route.meta.zone)
            this.currentNav
            return this.$route.meta.zone
        },
        menuItems () {
            const menu = []
            // console.log('In Navbar: ', this.$router.options.routes)
            const routing = this.$router.options.routes
            routing.forEach(item => {
                if (item.meta.zone === this.zone) {
                    menu.push({
                        title: item.name,
                        link: item.path
                    })
                }
            });
            return menu
        }
    }
  }
</script>

<style scoped>
.nuxt-link-exact-active {
    /* background-color: #ffeb3b !important; */
    border-bottom:2px solid #ffeb3b !important;
}
.v-tabs__item div {
    width: 100%;
    height: 100%;
    padding: 10px 0;
    margin-top: 12px;
}
.v-tabs__slider-wrapper {
    display: none !important;
}
/* .accent {
    background-color: transparent !important;
border-color: transparent !important;
} */
</style>
