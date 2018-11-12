// const API_URL = 'http://localhost:4000/todos'
const API_URL = 'http://localhost:4000/tracker'

import axios from 'axios'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import Cookies from 'js-cookie';


export default {
    state:{
        startedTimer: '0:00:00'
    },

    // plugins: [createPersistedState({
    //     storage: {
    //         getItem: key => Cookies.get(key),
    //         setItem: (key, value) => Cookies.set(key, value, {
    //             expires: 3,
    //             secure: true
    //         }),
    //         removeItem: key => Cookies.remove(key)
    //     }
    // })],

    mutations: {
        RUNNING_TIMER (state, payload) {
            state.startedTimer = payload
        }
        // ADD_PROJECT (state, payload) {
        //     state.projects.push(payload)
        // },
        // GET_PROJECT (state, payload) {
        //     state.projects = payload
        // },
        // EDITED_CLIENT (state, payload) {
        //     const client = state.clients.find(client => { return client._id === payload._id })
        //     if (client === undefined || client === '') {
        //         return
        //     } else {
        //         if (payload.name) {
        //             client.name = payload.name
        //         }
        //     }
        // }
    },

    actions: {
        startedTimer ({commit}, data) {
            commit('RUNNING_TIMER', data)
        }

        // async deleteClient ({commit}, data) {
        //     const clientId = data._id
        //     try {
        //         const res = await axios.delete(`${API_URL}/${clientId}`)
        //         commit('EDITED_CLIENT', data)
        //     } catch(e) {
        //         console.log(e)
        //     }
        // },

        // async editClient ({commit}, data) {
        //     const clientId = data._id
        //     try {
        //         const res = await axios.patch(`${API_URL}/${clientId}`, {name: data.name})
        //         commit('EDITED_CLIENT', res.data.client)
        //     } catch (e) {
        //         console.log(e)
        //     }
        // }
    },

    getters: {
        getProjects (state) {
            return state.projects
        }
    }
}

