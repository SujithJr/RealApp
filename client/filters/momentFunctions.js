import Vue from 'vue';
import moment from 'moment';

const now = function(value) {
    return moment.utc().local().format('hh:mm A')
}

const today = function(value) {
    return moment.utc(new Date()).local().format()
}

Vue.filter('timeNow', now);
Vue.filter('dateToday', today);