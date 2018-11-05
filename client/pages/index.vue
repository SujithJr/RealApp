<template>
    <div>
        <navbar></navbar>
        <v-layout>
            <v-flex xs12 md6 offset-md3>
                <v-card class="c-wrap">
                        <div class="c-wrapper">
                            <h2 class="c-timer">
                                <span id="hrs">{{ hrs }}</span>:<span id="mins">{{ mins }}</span>:<span id="sec">{{ sec }}</span>
                                <a href="#/" @click.prevent="startTimer" v-if="show"><v-icon>play_circle_filled</v-icon></a>
                                <a href="#/" @click.prevent="stop" v-if="!show"><v-icon>stop</v-icon></a>
                            </h2>
                        </div>
                </v-card>
                <v-card>
                        <div class="c-timer-hour">
                                <p><span style="color: #fff">Start Time: </span> {{ start }}</p>
                                <p><span style="color: #fff">End Time: </span> {{ end }}</p>
                                <p><span style="color: #fff">Total: </span> {{ total }}</p>
                            </div>
                </v-card>
            </v-flex>
        </v-layout>
        
        
    </div>
</template>

<script>
const API_URL = 'http://localhost:4000/todos'

import prefixZero from '@/filters/prefix-zero'
import moment from 'moment'
import navbar from '@/components/navbar'
import axios from 'axios'
// import axios from '~/plugins/axios'

export default {
    data() {
        return {
            hrs: 0,
            mins: '0' + 0,
            sec: '0' + 0,
            startTime: moment().format('hh:mm:ss'),
            zeroSec: '0',
            start: '',
            end: '',
            total: '',
            timerSet: '',
            list: [],
            show: true,
            message: '',
            drawer: null
        }
    },
    components: { navbar },
    methods: {
        startTimer() {
            this.show = !this.show
            this.timerSet = setInterval(() => {

                // Increments 'seconds' counter in the timer by 1 on each interval
                this.sec = parseInt(this.sec) + 1;

                // Adds a trialing zero to the 'seconds' counter if it is less than 10 (eg: 01)
                if (this.sec < 10 || this.sec === 0) {
                    this.sec = this.zeroSec + this.sec;
                }
                if (this.sec >= 60) {
                    this.minutes(60);
                }
                if (this.mins >= 60) {
                    this.hours(60);
                }

            }, 1000);
        },
        minutes(data) {
            if (parseInt(this.sec) >= data) {
                this.mins = parseInt(this.mins) + 1;
                if (this.mins < 10 || this.mins === 0) {
                    this.mins = this.zeroSec + this.mins;
                }
               this.sec = this.zeroSec + 0;
            }
        },
        hours(data) {
            if (parseInt(this.mins) >= data) {
                this.hrs = parseInt(this.hrs) + 1;
                if (this.hrs < 10 || this.hrs === 0) {
                    this.hrs = this.zeroSec + this.hrs;
                }
                this.mins = this.zeroSec + 0;
            }
        },
        stop() {
            this.show = !this.show;
            clearInterval(this.timerSet);
            this.stopper();
        },
        stopper() {
            const tick = this.startTime;

            // Connects the hrs, mins and sec counter values (eg: 01:23:45 => 012345)
            const ticking = this.hrs + '' + this.mins + '' + this.sec;
            console.log(ticking)
            // Converts the connected timer value into time format
            const timerValue = moment(ticking, "hmmss").format('HH:mm:ss');

            console.log(timerValue)
            const timeDuration = [tick, timerValue];

            // Adds the start time (tick) and counter value (timerValue)
            const totalTime = timeDuration.slice(1).reduce((prev, cur) => moment.duration(cur).add(prev), moment.duration(timeDuration[0]));

            this.total = timerValue;
            this.start = moment.utc(this.startTime, "hh:mm").format("h:mm A");
            this.end = moment.utc(totalTime.asMilliseconds()).format("h:mm A");

            // Resets the counter after 500ms once the timer stops
            setTimeout(() => {
                this.hrs = this.zeroSec + 0;
                this.mins = this.zeroSec + 0;
                this.sec = this.zeroSec + 0;
            }, 500);
        },
        addTodo() {
            console.log(this.message)
            axios.post(API_URL, {
                text: this.message
            }).then((res) => {
                this.getTodos
                // console.log(res.data.doc)
                this.list.push(res.data.doc)
            }).catch((e) => console.log(e));
        }
    },
    mounted() {
        this.getTodos
    },
    computed: {
        getTodos() {
            axios.get(API_URL).then((res) => {
                console.log(res.data)
                return this.list = res.data.todos
            });
        },
        currentTopTodo() {
            return this.list.slice().reverse()
        }
    }
}
</script>

<style>
body {
    overflow-y: auto;
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.c-wrap {
    margin-top: 8rem;
}
.c-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* height: 70vh; */
    overflow: hidden;
}
.c-timer {
    font-size: 5rem;
    display: flex;
    align-items: center;
    background: rgb(0, 0, 0, 0.8);
    padding: 1rem;
    border-radius: 10px;
    color: rgb(255, 255, 255, 0.85);
}
.c-timer a {
    /* background: brown; */
    text-decoration: none;
    /* padding: 10px 20px; */
    /* margin-left: 1rem; */
    /* font-size: 2rem; */
    /* border-radius: 5px; */
    color: rgb(255, 255, 255, 0.85);
    /* border-radius: 50%; */
    outline: 0;
}
.c-timer a .v-icon {
    vertical-align: middle;
    background: brown;
    color: #fff;
    font-size: 4rem;
    border-radius: 50%;
}
.c-timer-hour {
    display: flex;
    justify-content: space-around;
    box-shadow: 1px 2px 5px 0px #ccc;
    width: 90%;
    padding: 1rem;
    font-weight: 800;
    margin: 0 auto;
    margin-top: 2rem;
    font-size: 1rem;
    background: rgb(0,0,0,0.8);
}
.c-timer-hour p {
    color: yellowgreen;
}
</style>
