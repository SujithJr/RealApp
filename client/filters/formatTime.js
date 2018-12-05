import Vue from 'vue';
import moment from 'moment';

let now = moment(Date.now()).format("h:mm:ss")

const timeFormatter = function(value) {
    return moment.duration(now)
}

// var tempTimer = 0;
// var startedTimer = Date.now();
// setInterval(goTimer, 250);

// function goTimer() {
//     tempTimer = Math.floor((Date.now() - startedTimer) / 500);
//     $("#timer").val(tempTimer);
// }