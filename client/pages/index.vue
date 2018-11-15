<template>
    <div data-app="true">
        <v-layout>
            <v-flex xs12>
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
import axios from 'axios'
// import axios from '~/plugins/axios'

export default {
    data() {
        return {
        }
    },
    components: { navbar },
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
</style>
