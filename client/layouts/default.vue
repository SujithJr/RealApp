<template>
    <v-app>
        <navbar/>
        <nuxt/>
    </v-app>
</template>

<script>
import navbar from '@/components/navbar'
export default {
    components: {
        navbar
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
</style>
