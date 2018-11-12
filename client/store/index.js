import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import clients from './modules/clients'
import projects from './modules/projects'

const store = () => {
    return new Vuex.Store({
        namespaced: true,
        strict: false,
        modules: {
            clients,
            projects
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
