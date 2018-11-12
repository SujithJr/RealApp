import createPersistedState from 'vuex-persistedstate'
import * as Cookies from "js-cookie"

// let cookieStorage = {
//   getItem: function(key) {
//     return Cookies.getJSON(key);
//   },
//   setItem: function(key, value) {
//     return Cookies.set(key, value, {expires: 3, secure: false});
//   },
//   removeItem: function(key) {
//     return Cookies.remove(key);
//   }
// };

export default ({store, isHMR, isServer, isClient}) => {

    // if (isHMR) return 

    // if (isClient) {
        window.onNuxtReady((nuxt) => {
            createPersistedState()(store)
        })
    // }
};