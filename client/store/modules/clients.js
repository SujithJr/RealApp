// const API_URL = 'http://localhost:4000/todos'
const API_URL = 'http://localhost:4000/clients'

import axios from 'axios'
import Vuex from 'vuex'

export default {
    state:{
        clients: []
    },

    mutations: {
        ADD_CLIENT (state, payload) {
            state.clients.push(payload)
        },
        GET_CLIENTS (state, payload) {
            state.clients = payload
        },
        EDITED_CLIENT (state, payload) {
            const client = state.clients.find(client => { return client._id === payload._id })
            if (client === undefined || client === '') {
                return
            } else {
                if (payload.name) {
                    client.name = payload.name
                }
            }
        }
    },

    actions: {
        async addClient ({ commit, dispatch}, data) {
            try {
                const res = await axios.post(API_URL, { name: data.name, color: data.color })
                console.log(res.data.doc)
                commit('ADD_CLIENT', res.data.doc)
            } catch(e) {
                console.log(e)
            }
        },

        async getClients ({ commit, dispatch}) {
            try {
                const res = await axios.get(API_URL)
                console.log(res.data.clients)
                commit('GET_CLIENTS', res.data.clients)
            } catch(e) {
                console.log(e)
            }
        },

        async deleteClient ({commit}, data) {
            const clientId = data._id
            try {
                const res = await axios.delete(`${API_URL}/${clientId}`)
                commit('EDITED_CLIENT', data)
            } catch(e) {
                console.log(e)
            }
        },

        async editClient ({commit}, data) {
            const clientId = data._id
            try {
                const res = await axios.patch(`${API_URL}/${clientId}`, {name: data.name})
                commit('EDITED_CLIENT', res.data.client)
            } catch (e) {
                console.log(e)
            }
        }
    },

    getters: {
        getClients (state) {
            return state.clients
        }
    }
}

