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
    </div>
</template>

<script>
import prefixZero from '@/filters/prefix-zero'
import moment from 'moment'
import axios from 'axios'

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
        }
    },
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
            
            // Converts the connected timer value into time format
            const timerValue = moment(ticking, "hmmss").format("HH:mm:ss");

            const timeDuration = [tick, timerValue];

            // Adds the start time (tick) and counter value (timerValue)
            const totalTime = timeDuration.slice(1).reduce((prev, cur) => moment.duration(cur).add(prev), moment.duration(timeDuration[0]));

            this.total = timerValue;
            this.start = moment.utc(this.startTime, "hh:mm:ss A").format("hh:mm:ss A");
            this.end = moment.utc(totalTime.asMilliseconds()).format("hh:mm:ss A");

            // Resets the counter after 500ms once the timer stops
            setTimeout(() => {
                this.hrs = 0;
                this.mins = this.zeroSec + 0;
                this.sec = this.zeroSec + 0;
            }, 500);
        },
        save () {
            this.snack = true
            this.snackColor = 'success'
            this.snackText = 'Data saved'
        },
        cancel () {
            this.snack = true
            this.snackColor = 'error'
            this.snackText = 'Canceled'
        },
        open () {
            this.snack = true
            this.snackColor = 'info'
            this.snackText = 'Dialog opened'
        },
        close () {
            console.log('Dialog closed')
        }
    },
    mounted() {
        
    },
    computed: {
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
    /* display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between; */
    position: relative;
    width: 100%;
    text-align: center;
    margin-top: 2rem;
    /* height: 100%; */
    /* height: 60px; */
    /* background: #d13739; */
    /* overflow: hidden; */
    /* padding-left: 1rem; */
}
.c-timer {
    font-size: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* background: #333; */
    padding: 1rem;
    /* border-radius: 5px; */
    color: rgb(255, 255, 255, 0.85);
    /* position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%); */
    /* max-width: 280px; */
    width: 100%;
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
    width: 100%;
    height: 100%;
    display: inline-block;
}
.c-timer a .v-icon {
    vertical-align: middle;
    background: brown;
    color: #fff;
    font-size: 3.25rem;
    border-radius: 50%;
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
    width: 50px;
    height: 50px;
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
