import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'
Vue.use(Vuex)

import clients from './modules/clients'
import projects from './modules/projects'
// import tracker from './modules/tracker'

const API_URL = 'http://localhost:4000/tracker'

// let cookieStorage = {
//     getItem: function(key) {
//         return Cookies.getJSON(key);
//     },
//     setItem: function(key, value) {
//         return Cookies.set(key, value, {expires: 3, secure: false});
//     },
//     removeItem: function(key) {
//         return Cookies.remove(key);
//     }
// };

// export default (context) => {
//   createPersistedState({
//     storage: cookieStorage,
//     getState: cookieStorage.getItem,
//     setState: cookieStorage.setItem
//   })(context.store);
// };
const store = () => {
    return new Vuex.Store({
        namespaced: true,
        strict: false,
        modules: {
            clients,
            projects,
            // tracker
        },

        state: {
            startedTimer: '',
            // hrs: '',
            // mins: '',
            // sec: '',
            running: false,
            routeName: '',
            initialTime: ''
        },
        
        plugins: [createPersistedState({
            storage: {
                getItem: key => Cookies.getJSON(key),
                setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: false }),
                removeItem: key => Cookies.remove(key)
            }
        })],
        // plugins: [createPersistedState({
        //     storage: cookieStorage,
        //     getState: cookieStorage.getItem,
        //     setState: cookieStorage.setItem
        // })],

        mutations: {
            RUNNING_TIMER (state, payload) {
                state.startedTimer = payload
                // state.hrs = payload.hrs
                // state.mins = payload.mins
                // state.sec = payload.sec
            },
            RUNNING (state, payload) {
                state.running = payload
            },
            INITIAL_TIME (state, payload) {
                state.initialTime = payload
            }
        },

        actions: {
            startedTimer ({commit}, payload) {
                commit('RUNNING_TIMER', payload)
            },
            running ({commit}, payload) {
                commit('RUNNING', payload)
            },
            stopTimer ({commit}, payload) {
                commit('RUNNING_TIMER', payload)
            },
            initialTime ({commit}, payload) {
                commit('INITIAL_TIME', payload)
            },
            // trackerData ({commit}, payload) {
            //     axios.
            // }
        },

        getters: {
            running (state) {
                return state.running
            },
            initialTime (state) {
                return state.initialTime
            }
        }
    })
}

export default store
