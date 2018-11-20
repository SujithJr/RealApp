const API_URL = 'http://localhost:4000/tracker'

import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'
Vue.use(Vuex)

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

export default {
    
    state: {
        startedTimer: '',
        running: false,
        routeName: '',
        initialTime: '',
        tracker: [],
        currentTracker: ''
    },
    
    plugins: [createPersistedState({
        storage: {
            getItem: key => Cookies.getJSON(key),
            setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: false }),
            removeItem: key => Cookies.remove(key)
        }
    })],

    mutations: {
        RUNNING_TIMER (state, payload) {
            state.startedTimer = payload
        },
        RUNNING (state, payload) {
            state.running = payload
        },
        INITIAL_TIME (state, payload) {
            state.initialTime = payload
        },
        // SINGLE_TRACKER_DATA (state, payload) {
        //     state.tracker.push(payload)
        // },
        TRACKER_DATA_LIST (state, payload) {
            state.tracker = payload
        },
        TRACKER_DATA (state, payload) {
            // const data = state.tracker.find(track => { return track._id === payload._id })
            // if (data === undefined || data === '') {
                state.tracker.push(payload)
            //     return
            // } else {
            //     data.title = payload.title
            //     data.projClient = payload.projClient
            //     data.startTime = payload.startTime
            //     data.endTime = payload.endTime
            //     data.total = payload.total
            // }
        },
        CURRENT_TRACKER (state, payload) {
            state.currentTracker = payload
        }
    },

    actions: {
        startedTimer ({commit}, payload) {
            const data = JSON.stringify(payload)
            localStorage.setItem('Timer', data)
            commit('RUNNING_TIMER', payload)
        },

        running ({commit}, payload) {
            commit('RUNNING', payload)
        },

        stopTimer ({commit}, payload) {
            commit('RUNNING_TIMER', payload)
        },

        setInitialTime ({commit}, payload) {
            localStorage.setItem('Initial Time',payload)
            commit('INITIAL_TIME', payload)
        },

        getInitialTime ({commit}, payload) {
            const data = localStorage.getItem('Initial Time')
            commit('INITIAL_TIME', data)
        },

        currentTracker ({commit}, payload) {
            commit('CURRENT_TRACKER', payload)
        },

        async trackerData ({commit}, payload) {
            const trackForm = {
                title: payload.title,
                projClient: payload.projClient,
                startTime: payload.startTime,
                endTime: payload.endTime,
                total: payload.total,
                flag: payload.flag
            }
            
            try {
                const res = await axios.post(API_URL, trackForm)
                // commit('SINGLE_TRACKER_DATA', res.data.tracker)
                console.log(res.data.tracker)
                commit('CURRENT_TRACKER', res.data.tracker)
            } catch(e) {
                console.log(e)
            }
        },

        async getTrackerData ({commit}, payload) {
            
            try {
                const res = await axios.get(API_URL)
                // console.log('TRACKER_LIST: ',res.data.tracker)
                commit('TRACKER_DATA_LIST', res.data.tracker)
            } catch(e) {
                console.log(e)
            }
        },

        async trackerFinalData ({commit, getters}, payload) {
            const trackForm = {
                startTime: payload.startTime,
                endTime: payload.endTime,
                total: payload.total,
                flag: payload.flag
            }

            try {
                console.log('CURRENT TRACKER: ', getters.currentTracker._id)
                const res = await axios.patch(`${API_URL}/${getters.currentTracker._id}`, trackForm)
                console.log('PATCHED DATA: ', res.data.track)
                commit('TRACKER_DATA', res.data.track)
                // commit('')
            } catch(e) {
                console.log(e)
            }
        }
    },

    getters: {
        running (state) {
            return state.running
        },
        initialTime (state) {
            return state.initialTime
        },
        currentTracker (state) {
            return state.currentTracker
        },
        trackerList (state) {
            return state.tracker
        }
    }
}

