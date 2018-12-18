const API_URL = 'http://localhost:4000'

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import socket from 'socket.io-client'

Vue.use(Vuex)

import clients from './modules/clients'
import projects from './modules/projects'
import tracker from './modules/tracker'

const store = () => {
    return new Vuex.Store({
        namespaced: true,
        strict: false,
        modules: {
            clients,
            projects,
            tracker
        },

        state: {

        },

        mutations: {

        },

        actions: {
            nuxtServerInit ({ commit }, { req }) {
                // if (req.session.user) {
                //     commit('user', req.session.user)
                // }
                socket(API_URL)
            }
        },

        getters: {

        }
    })
}

export default store
