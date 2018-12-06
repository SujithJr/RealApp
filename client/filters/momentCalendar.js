import Vue from 'vue';
import moment from 'moment';

const dateObj = function(value) {
    return moment(value).calendar(null, {
        sameDay: '[Today], D MMM \'YY ',
        nextDay: '[Tomorrow]',
        nextWeek: 'DD/MM/YYYY',
        lastDay: '[Yesterday], D MMM \'YY',
        lastWeek: 'DD/MM/YYYY',
        sameElse: 'ddd, D MMM \'YY'
    })
}

Vue.filter('dateExact', dateObj);
