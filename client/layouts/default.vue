<template>
    <v-app class="main">
        <navbar/>
        <inNavbar v-if="currentRoute"/>
        <nuxt/>
    </v-app>
</template>

<script>
import navbar from '@/components/navbar'
import inNavbar from '@/components/commonNav'

export default {
    components: {
        navbar,
        inNavbar
    },
    data: () => {
        return {
            // show: true
        }
    },
    computed: {
        currentRoute () {
            const route = this.$route.path
            if (route === '/') {
                return false
            } else {
                return true
            }
        }
    },
    mounted() {
        // console.log(this.$route.name)
    },
    // mounted() {
    //     this.$store.dispatch('tryAutoLogin')
    //     this.$store.dispatch('fetchData')
    //     // this.$store.dispatch('setLoading', false)
    // },
}
</script>


<style>
/* * i{ font-family: 'Material Icons'; } */
.main {
    margin-left: 5.5rem;
    overflow: hidden;
}
a {
    outline: 0;
    text-decoration: none;
}
input:focus {
    outline: 0;
}
ul {
    padding-left: 0 !important;
    list-style-type: none;
}
p {
    margin-bottom: 0 !important;
}
</style>
