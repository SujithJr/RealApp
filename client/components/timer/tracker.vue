<template>
    <div>
        <v-layout>
            <v-flex xs12>
                <div class="c-inputs-control">
                    <div class="c-inputs">
                        <v-card class="c-input-cards">
                            <input type="text" placeholder="Hands On.!">
                        </v-card>
                        <v-card class="c-input-cards">
                            <input type="text" placeholder="Project">
                        </v-card>
                        <v-card class="c-input-cards">
                            <input type="text" placeholder="Position">
                        </v-card>
                        <v-card class="c-input-cards">
                            <input type="text" placeholder="Billable">
                        </v-card>
                    </div>
                    <v-card class="c-wrap">
                        <div class="c-wrapper">
                            <h2 class="c-timer">
                                <div class="c-ticker">
                                    <!-- <template>{{ times }}</template> -->
                                    <!-- <template v-else>0:00:00</template> -->
                                    <span id="hrs">{{ hrs }}</span>:<span id="mins">{{ mins }}</span>:<span id="sec">{{ sec }}</span>
                                </div>
                                <div class="c-control">
                                    <a href="#/" @click.prevent="startTimer" v-if="show"><v-icon>play_circle_filled</v-icon></a>
                                    <a href="#/" @click.prevent="stop" v-if="!show"><v-icon>stop</v-icon></a>
                                </div>
                            </h2>
                        </div>
                    </v-card>
                </div>
            </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs12>
                    <v-card>
                        <div class="c-timer-hour">
                            <p><span style="color: #fff">Start Time: </span> {{ start }}</p>
                            <p><span style="color: #fff">End Time: </span> {{ end }}</p>
                            <p><span style="color: #fff">Total: </span> {{ total }}</p>
                        </div>
                    </v-card>
                </v-flex>
        </v-layout>
                <h2>End Time: {{ timer }}</h2>
    </div>
</template>

<script>
import prefixZero from '@/filters/prefix-zero'
import moment from 'moment'
import axios from 'axios'
import * as Cookies from "js-cookie";

export default {
    components: {
    
    },
    data() {
        return {
            hrs: 0,
            mins: '0' + 0,
            sec: '0' + 0,
            startTime: moment().format("HH:mm:ss"),
            zeroSec: '0',
            start: '',
            end: '',
            total: '',
            timerSet: '',
            show: true,
            // times: '0:00:00',
            // object: ''
        }
    },
    methods: {
        startTimer() {
            this.show = !this.show
            this.$store.dispatch('running', true)
            this.timerSet = setInterval(() => {
                this.sec = parseInt(this.sec) + 1  // Increments 'seconds' counter in the timer by 1 on each interval
                if (this.sec < 10 || this.sec === 0) {  // Adds a trialing zero to the 'seconds' counter if it is less than 10 (eg: 01)
                    this.sec = this.zeroSec + this.sec
                }
                if (this.sec >= 60) {
                    // this.minutes(60)
                    if (parseInt(this.sec) >= 60) {
                        this.mins = parseInt(this.mins) + 1
                        if (this.mins < 10 || this.mins === 0) {
                            this.mins = this.zeroSec + this.mins
                        }
                        this.sec = this.zeroSec + 0
                    }
                }
                if (this.mins >= 60) {
                    // this.hours(60)
                    if (parseInt(this.mins) >= 60) {
                        this.hrs = parseInt(this.hrs) + 1
                        if (this.hrs < 10 || this.hrs === 0) {
                            this.hrs = this.zeroSec + this.hrs
                        }
                        this.mins = this.zeroSec + 0
                    }
                }
            this.$store.dispatch('startedTimer', { hrs: this.hrs, mins: this.mins, sec: this.sec })
            }, 1000);
        },
        // minutes(data) {
        //     if (parseInt(this.sec) >= data) {
        //         this.mins = parseInt(this.mins) + 1
        //         if (this.mins < 10 || this.mins === 0) {
        //             this.mins = this.zeroSec + this.mins
        //         }
        //        this.sec = this.zeroSec + 0
        //     }
        // },
        // hours(data) {
        //     if (parseInt(this.mins) >= data) {
        //         this.hrs = parseInt(this.hrs) + 1
        //         if (this.hrs < 10 || this.hrs === 0) {
        //             this.hrs = this.zeroSec + this.hrs
        //         }
        //         this.mins = this.zeroSec + 0
        //     }
        // },
        stop() {
            this.show = !this.show
            this.$store.dispatch('running', false)
            clearInterval(this.timerSet)
            this.stopper()
        },
        stopper() {
            // const tick = this.startTime
            // this.endingTime
            const ticking = this.hrs + '' + this.mins + '' + this.sec  // Connects the hr, min and sec counter values (eg: 01:23:45 => 012345)
            const timerValue = moment(ticking, "hmmss").format("HH:mm:ss")  // Converts the connected timer value into time format
            const timeDuration = [this.startTime, timerValue]
            const totalTime = timeDuration.slice(1).reduce((prev, cur) => moment.duration(cur).add(prev), moment.duration(timeDuration[0]))  // Adds the start time (tick) and counter value (timerValue)
            this.total = timerValue
            this.start = moment.utc(this.startTime, "hh:mm:ss A").format("hh:mm:ss A")
            this.end = moment.utc(totalTime.asMilliseconds()).format("hh:mm:ss A")
            this.$store.dispatch('stopTimer', { hrs: 0, mins: '0'+0, sec: '0'+0 })
            // setTimeout(() => { // Resets the counter after 300ms once the timer stops
            // }, 300)
            // return this.end
        },
    },
    mounted() {
        setTimeout(() => {
            this.started
        }, 100)
    },
    computed: {
        timer () {
            // if (!this.show) {
            //     console.log(Cookies.getJSON('vuex').startedTimer)
            //     return Cookies.getJSON('vuex').startedTimer
            // }
            // this.object = Cookies.get('vuex').startedTimer
            this.hrs = this.$store.state.startedTimer.hrs
            this.mins = this.$store.state.startedTimer.mins
            this.sec = this.$store.state.startedTimer.sec
            return this.hrs + ':' + this.mins + ':' + this.sec
            
        },
        running () {
            console.log('CONSOLE RUNNING: ', this.$store.getters.running)
            return this.$store.getters.running
        },
        started () {
            console.log('MOUNTED: ', this.$store.getters.running)
            // this.times = this.stopper()
            if (this.$store.getters.running === true) {
                // this.show = this.show
                this.hrs = this.$store.state.startedTimer.hrs
                this.mins = this.$store.state.startedTimer.mins
                this.sec = this.$store.state.startedTimer.sec
                this.startTimer()
                // this.$store.dispatch('startedTimer', Cookies.get('vuex').startedTimer)
                // this.timer
            }
        }
        // endingTime () {
        //     console.log(Cookies.getJSON('vuex').startedTimer)
        //     return Cookies.getJSON('vuex').startedTimer
        // }
    }
}
</script>

<style scoped>
body {
    overflow-y: auto;
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.main {
    margin-left: 5.5rem;
}
.c-wrap {
    min-height: 280px;
    max-height: 300px;
    height: 100%;
    max-width: 300px;
    width: 100%;
    border-radius: 50%;
    background: #333;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 4px solid #d13739;
    margin-left: -11rem;
}
.c-wrapper {
    position: relative;
    width: 100%;
    text-align: center;
    margin-top: 2rem;
}
.c-timer {
    font-size: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    color: rgb(255, 255, 255, 0.85);
    width: 100%;
}
.c-timer a {
    text-decoration: none;
    color: rgb(255, 255, 255, 0.85);
    outline: 0;
    width: 100%;
    height: 100%;
    display: inline-block;
}
.c-timer a .v-icon {
    vertical-align: middle;
    background: brown;
    color: #fff;
    font-size: 5rem;
    border-radius: 25%;
}
.c-timer-hour {
    display: flex;
    justify-content: space-around;
    box-shadow: 1px 2px 5px 0px #ccc;
    /* width: 90%; */
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
.c-control {
    width: 70px;
    height: 70px;
    line-height: 45px;
    text-align: center;
}
.c-inputs {
    width: 600px;
}
.c-inputs-control {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3rem;
}
.c-input-cards {
    padding: 1.8rem 1rem;
    min-width: 500px;
}
input {
    width: 420px;
}
/* .v-text-field {
    padding: 0;
    margin: 0;
}
.project-title {
    max-width: 350px; 
    width: 100%;
    color: #fff;
}
.v-text-field.v-text-field--solo .v-input__control {
    padding: 0;
    height: 32px;
    min-height: auto;
} */
</style>
