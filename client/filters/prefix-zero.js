import Vue from 'vue';

const addZero = function(value) {
    if (value < 10) {
        return '0' + value;
    } else {
        return value;
    }
}

Vue.filter('prefixZero', addZero);
