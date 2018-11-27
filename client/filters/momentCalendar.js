import Vue from 'vue';
import moment from 'moment';

const dateObj = function(value) {
    return moment(value).calendar(null, {
        sameDay: '[Today], Do MMM ',
        nextDay: '[Tomorrow]',
        nextWeek: 'DD/MM/YYYY',
        lastDay: '[Yesterday], Do MMM',
        lastWeek: 'DD/MM/YYYY',
        sameElse: 'DD/MM/YYYY'
    })
}

Vue.filter('dateExact', dateObj);
