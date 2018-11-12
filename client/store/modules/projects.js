// const API_URL = 'http://localhost:4000/todos'
const API_URL = 'http://localhost:4000/projects'

import axios from 'axios'
import Vuex from 'vuex'

export default {
    state:{
        projects: []
    },

    mutations: {
        ADD_PROJECT (state, payload) {
            state.projects.push(payload)
        },
        GET_PROJECT (state, payload) {
            state.projects = payload
        },
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
        async addProject ({ commit, dispatch}, data) {
            console.log(data.name)
            try {
                const res = await axios.post(API_URL, { name: data.name, client: data.client })
                console.log(res.data.project)
                commit('ADD_PROJECT', res.data.project)
            } catch(e) {
                console.log(e)
            }
        },

        async getProject ({ commit, dispatch}) {
            try {
                const res = await axios.get(API_URL)
                console.log(res.data.project)
                commit('GET_PROJECT', res.data.project)
            } catch(e) {
                console.log(e)
            }
        },

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

