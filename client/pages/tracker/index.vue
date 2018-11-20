<template>
    <div>
        <v-layout>
            <v-flex xs12>
                <div class="c-inputs-control">
                    <div class="c-inputs">
                        <v-card class="c-input-cards">
                            <v-text-field
                                v-model="handsOn"
                                placeholder="Hands On..."
                                solo
                                class="content"
                                hide-details
                            >
                            </v-text-field>
                            <dropdown v-if="visible" class="white elevation-2 px-4 dropdown" :projects="projects">
                                <slot name="list" v-for="item in projects">
                                    <a @click.prevent="option(item)" flat class="py-3 block" :key="item.index">{{item.name}} - <small><strong>{{item.client.toUpperCase() }}</strong></small></a>
                                    <v-divider></v-divider>
                                </slot>
                            </dropdown>
                        </v-card>
                        <v-card class="c-input-cards">
                            <v-select
                            v-model="formData.project"
                            :items="listProj"
                            placeholder="Project..."
                            solo
                            hide-details
                            small-chips
                            color="yellow"
                            single-line
                            ></v-select>
                        </v-card>
                    </div>
                    <v-card class="c-wrap hidden-sm-down">
                        <div class="c-wrapper">
                            <h2 class="c-timer">
                                <div class="c-ticker">
                                    <span id="hrs">{{ counter.hrs }}</span>:<span id="mins">{{ counter.mins }}</span>:<span id="sec">{{ counter.sec }}</span>
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
                    <v-card class="c-timer-hour" v-for="item in trackerList" :key="item._id">
                        <p>{{ item.title }} - <span style="display: inline-block; color: #333"><strong><small>{{ item.projClient.toUpperCase() }}</small></strong></span></p>
                        <p>{{ item.startTime }} - {{ item.endTime }}</p>
                        <p>{{ item.total }}</p>
                    </v-card>
                </v-flex>
        </v-layout>
    </div>
</template>

<script>
import dropdown from '@/components/trackerSubComponents/dropdown'
import prefixZero from '@/filters/prefix-zero'
import moment from 'moment'
import axios from 'axios'
import * as Cookies from "js-cookie";

export default {
    components: {
        dropdown
    },
    data() {
        return {
            counter: {
                hrs: 0,
                mins: '0' + 0,
                sec: '0' + 0,
            },
            visible: false,
            handsOn: '',
            startTime: '',
            zeroSec: '0',
            duration: {
                start: '',
                end: '',
                total: '',
            },
            formData: {
                project: '',
            },
            timerSet: '',
            show: true,
        }
    },

    mounted() {
        console.log('MOUNTED')
        this.startTime = localStorage.getItem('Initial Time')
        this.setInitialTime
        this.$store.dispatch('getProject')
        setTimeout(() => {
            this.$store.dispatch('getTrackerData')
            this.started
        }, 100)
        this.getProjects
    },

    watch: {
        handsOn() {
            this.contentDrop(this.handsOn)
        }
    },

    methods: {
        option(data) {
            console.log('DROPING MENU: ', data)
        },

        contentDrop(data) {
            if ( data === '' || !this.projects) {
                this.visible = false
            } else {
                this.visible = true
            }
        },

        startTimer() {
            this.show = !this.show
            this.$store.dispatch('running', true)
            if (this.startTime === '') {
                const starter = moment().format("HH:mm:ss")
                const starting = moment.utc(starter, "hh:mm:ss A").format("hh:mm:ss A")
                console.log('New Start', this.starter)
                this.$store.dispatch('setInitialTime', starting)
                this.$store.dispatch('trackerData', {
                    title: this.handsOn,
                    projClient: this.formData.project,
                    startTime: starting,
                    endTime: this.duration.end,
                    total: this.duration.total
                })
            }
            // if (this.startTime === '' || this.startTime === undefined) {
                
            // } else {
            //     this.startTime = this.setInitialTimeTime
            //     console.log('INSIDE ELSE IF: ', this.startTime)
            //     console.log('Type inside ELSE: ', typeof this.startTime)
            //     // this.$store.dispatch('setInitialTimeTime', this.startTime)
            // }
            // console.log('TIMER STARTED + START TIME: ', this.setInitialTimeTime)
                this.timerSet = setInterval(() => {
                    this.counter.sec = parseInt(this.counter.sec) + 1  // Increments 'seconds' counter in the timer by 1 on each interval
                    if (this.counter.sec < 10 || this.counter.sec === 0) {  // Adds a trialing zero to the 'seconds' counter if it is less than 10 (eg: 01)
                        this.counter.sec = this.zeroSec + this.counter.sec
                    }
                    if (parseInt(this.counter.sec) >= 60) {
                        this.counter.mins = parseInt(this.counter.mins) + 1
                        if (this.counter.mins < 10 || this.counter.mins === 0) {
                            this.counter.mins = this.zeroSec + this.counter.mins
                        }
                        this.counter.sec = this.zeroSec + 0
                    }
                    if (parseInt(this.counter.mins) >= 60) {
                        this.counter.hrs = parseInt(this.counter.hrs) + 1
                        if (this.counter.hrs < 10 || this.counter.hrs === 0) {
                            this.counter.hrs = this.zeroSec + this.counter.hrs
                        }
                        this.counter.mins = this.zeroSec + 0
                    }
                    this.$store.dispatch('startedTimer', { hrs: this.counter.hrs, mins: this.counter.mins, sec: this.counter.sec })
                }, 1000);
                // this.$store.dispatch('trackerData', {
                //     title: this.handsOn,
                //     projClient: this.formData.project,
                //     startTime: starting,
                //     endTime: this.duration.end,
                //     total: this.duration.total
                // })
            // }
        },

        stop() {
            this.show = !this.show
            this.$store.dispatch('running', false)
            clearInterval(this.timerSet)
            this.stopper()
        },

        stopper() {
            console.log('TIMER STOPPED')
            const startValue = moment(this.getInitialTime, "hh:mm:ss A").format("HH:mm:ss")
            const ticking = this.counter.hrs + '' + this.counter.mins + '' + this.counter.sec  // Connects the hr, min and sec counter values (eg: 01:23:45 => 012345)
            const timerValue = moment(ticking, "hmmss").format("HH:mm:ss")  // Converts the connected timer value into time format
            const timeDuration = [startValue, timerValue]
            const totalTime = timeDuration.slice(1).reduce((prev, cur) => moment.duration(cur).add(prev), moment.duration(timeDuration[0]))  // Adds the start time (tick) and counter value (timerValue)
            this.duration.total = timerValue
            this.duration.start = moment.utc(this.getInitialTime, "hh:mm:ss A").format("hh:mm:ss A")
            this.duration.end = moment.utc(totalTime.asMilliseconds()).format("hh:mm:ss A")
            this.$store.dispatch('stopTimer', { hrs: 0, mins: '0'+0, sec: '0'+0 })
            this.$store.dispatch('setInitialTime', '')
            this.counter.hrs = this.timerStopped.hrs
            this.counter.mins = this.timerStopped.mins
            this.counter.sec = this.timerStopped.sec

            // console.log('SET: ', )
            if (this.getInitialTime === '' || !this.running) {
                this.$store.dispatch('trackerFinalData', {
                    startTime: this.duration.start,
                    endTime: this.duration.end,
                    total: this.duration.total
                })
                this.trackerList
                this.$store.dispatch('currentTracker', '')
                this.startTime = ''
            }
            // setTimeout(() => {
                // this.$store.dispatch('getTrackerData')
            // }, 100)
        },
        // currentTrackItem (startingTime) {
        //     console.log('FROM currentTrackItem: ', startingTime)
        //     if (startingTime) {
        //         this.startTime = startingTime
        //         this.$store.dispatch('initialTime', startingTime)
        //         this.$store.dispatch('getTrackerData')
        //     }
        //     // this.initialTime
        // },
    },

    computed: {
        running() {
            return this.$store.getters.running
        },
        
        started() {
            if (this.$store.getters.running === true) {
                this.counter.hrs = this.$store.state.tracker.startedTimer.hrs
                this.counter.mins = this.$store.state.tracker.startedTimer.mins 
                this.counter.sec = this.$store.state.tracker.startedTimer.sec
                console.log('CHECKING: ', {
                    hrs: this.$store.state.tracker.startedTimer.hrs,
                    mins: this.$store.state.tracker.startedTimer.mins,
                    sec: this.$store.state.tracker.startedTimer.sec
                })
                this.startTimer()
            }
        },

        getInitialTime() {
            const data = this.$store.getters.initialTime
            this.startTime = data
            console.log('INITIAL TIME: ', data)
            return data
        },
        timerStopped() {
            return this.$store.state.tracker.startedTimer
        },

        getProjects() {
            return this.$store.getters.getProjects
        },

        listProj() {
            const itemArr = []
            this.getProjects.forEach((item) => {
                itemArr.push(item.name + ' - ' + item.client )
            })
            return itemArr
        },

        projects() {
            return this.getProjects.filter((project) => {
                    return project.name.toLowerCase().match(this.handsOn) || project.client.toLowerCase().match(this.handsOn)
            })
        },

        trackerList() {
            // this.$store.dispatch('getTrackerData')
            return this.$store.getters.trackerList
        },
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
    /* min-height: 280px;
    max-height: 300px;
    height: 100%; */
    max-width: 400px;
    width: 100%;
    border-radius: 20px 0 0 20px;
    background: #333 !important;
    display: flex;
    align-items: center;
    justify-content: center;
    /* border: 4px solid #d13739 !important; */
    /* margin-left: -11rem; */
    position: relative;
}
.c-wrap::after {
    content: '';
    display: block;
    position: absolute;
    height: 100%;
    width: 100%;
    background: #333 !important;
    right: -100%;
}
.c-wrapper {
    position: relative;
    width: 100%;
    text-align: center;
    /* margin-top: 2rem; */
}
.c-timer {
    font-size: 5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 1rem;
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
    border-radius: 50%;
}
.c-timer-hour {
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 1px 2px 5px 0px #ccc;
    /* width: 90%; */
    padding: 1rem;
    font-weight: 800;
    margin: 0 auto;
    /* margin-top: 2rem; */
    font-size: 1rem;
    /* background: rgb(0,0,0,0.8); */
}
.c-timer-hour:first-child {
    margin-top: 2rem;
}
.c-timer-hour p {
    color: yellowgreen;
}
.c-control {
    width: 70px;
    height: 70px;
    line-height: 45px;
    text-align: center;
    margin-left: 2rem;
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
    padding: 1.25rem;
    max-width: 570px;
}
.c-input-cards .v-text-field {
    padding-top: 0;
    margin-top: 0;
}
/* .v-text-field > .v-input__control > .v-input__slot::after, .v-text-field > .v-input__control > .v-input__slot::before {
    content: none !important;
} */
.c-input-cards input {
    width: 420px;
}
.proj-card {
    height: 150px;
    overflow-y: auto;
}
.v-text-field > .v-input__control > .v-input__slot::after,
.v-text-field > .v-input__control > .v-input__slot::before {
    content: none !important;
}
.content {
    position: relative;
}
.dropdown {
    position: absolute;
    z-index: 100;
    top: 80px;
    width: auto;
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
