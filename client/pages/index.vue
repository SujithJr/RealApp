<template>
    <div data-app="true" class="main">
        <v-layout>
            <v-flex xs12>
                <navbar></navbar>
                <inNavbar></inNavbar>
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
const API_URL = 'http://localhost:4000/todos'

import prefixZero from '@/filters/prefix-zero'
import moment from 'moment'
import navbar from '@/components/navbar'
import inNavbar from '@/components/timer/inNavbar'
import axios from 'axios'
// import axios from '~/plugins/axios'

export default {
    data() {
        return {
        }
    },
    components: { navbar, inNavbar },
    mounted() {
        
    },
    computed: {
        
    }
}
</script>

<style>
body {
    overflow-y: auto;
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.main {
    margin-left: 5.5rem;
}
</style>
