import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import timer from './modules/timer'

const store = () => {
    return new Vuex.Store({
        namespaced: true,
        strict: false,
        modules: {
            timer
        },

        state: {

        },

        mutations: {

        },

        actions: {

        },

        getters: {
            
        }
    })
}

export default store
