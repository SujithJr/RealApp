<template>
    <div>
        <v-container>
            <v-layout>
                <v-flex xs12>
                    <div class="c-inputs-control">
                        <div class="c-inputs">
                            <div class="c-input-cards">
                                <v-text-field
                                    v-model="handsOn"
                                    placeholder="Hands On..."
                                    solo
                                    class="content"
                                    hide-details
                                >
                                </v-text-field>
                                <dropdown v-if="visible" ref="filteredList" class="white elevation-2 px-4 dropdown" :projects="filteredItems">
                                    <slot name="list" v-for="item in filteredItems">
                                        <a @click.prevent="option(item)" flat class="py-3 block" :key="item.index">{{item.title}} - <small><span class="red-darkest--text font-weight-bold">{{item.projClient.toUpperCase() }}</span></small></a>
                                        <v-divider></v-divider>
                                    </slot>
                                </dropdown>
                            </div>
                            <div class="c-input-cards">
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
                            </div>
                        </div>
                        <v-card flat class="c-wrap hidden-sm-down" style="background: #f0f0f0">
                            <h2 class="c-timer">
                                <div class="c-ticker">
                                    <span>{{ formatTime }}</span>
                                    <!-- <span id="hrs">{{ counter.hrs }}</span>:<span id="mins">{{ counter.mins }}</span>:<span id="sec">{{ counter.sec }}</span> -->
                                </div>
                                <div class="c-control">
                                    <a href="#/" @click.prevent="startTimer" v-if="show"><v-icon>play_circle_filled</v-icon></a>
                                    <a href="#/" @click.prevent="stop" v-if="!show"><v-icon>stop</v-icon></a>
                                </div>
                            </h2>
                        </v-card>
                    </div>
                </v-flex>
                </v-layout>
                <v-layout class="mt-4 pt-2">
                    <v-flex xs12>
                    <!-- <v-flex xs10 offset-xs1 md10 offset-md1 lg10 offset-lg1 > -->
                        <!-- <v-expansion-panel popout class="py-4">
                            <v-expansion-panel-content v-for="item in trackerList" :key="item._id"> -->
                                <!-- <div slot="header" class="text-capitalize"><span style="display: inline-block; color: #333"><strong>{{ item.date }}</strong></span></div> -->
                                <!-- <v-card>
                                    <v-card-text>
                                        <p>{{ item.title }} - <span style="display: inline-block; color: #333"><strong><small>{{ item.projClient.toUpperCase() }}</small></strong></span></p>
                                        <p>{{ item.startTime }} - {{ item.endTime }}</p>
                                        <p>{{ item.total }}</p>
                                    </v-card-text>
                                </v-card> -->
                                <v-card class="mt-3" v-for="tracker in dailyTrackersList" :key="tracker.index">
                                    <v-card-title class="capitalize font-weight-bold ">{{ tracker._i }}</v-card-title>
                                    <v-divider></v-divider>
                                    <v-data-table :items="trackerList" item-key="title" hide-actions hide-headers>
                                        <template slot="items" slot-scope="props">
                                            <!-- <template v-for="data in props.item.dailyTrackers">
                                                <tr :key="data.index"><td><span class="text-capitalize" style="display: inline-block; color: #333"><strong>{{ data }}</strong></span></td></tr>
                                            </template> -->
                                            <template v-if="tracker._i === props.item.date">
                                                <tr>
                                                    <td class="text-xs-left">{{ props.item.title }}</td>
                                                    <td class="text-xs-left"><span style="display: inline-block; color: #333"><strong><small>{{ props.item.projClient.toUpperCase() }}</small></strong></span></td>
                                                    <td class="text-xs-right">{{ props.item.startTime }} - {{ props.item.endTime }}</td>
                                                    <td class="text-xs-right">{{ props.item.total }}</td>
                                                    <td class="text-xs-right"><a @click.prevent="resume(props.item)" class="like"><v-icon>play_arrow</v-icon></a></td>
                                                </tr>
                                            </template>
                                            <!-- <template v-else>
                                                <tr @click="props.expanded = !props.expanded">
                                                    <td>{{ props.item.title }}</td>
                                                    <td><span style="display: inline-block; color: #333"><strong><small>{{ props.item.projClient.toUpperCase() }}</small></strong></span></td>
                                                    <td>{{ props.item.startTime }} - {{ props.item.endTime }}</td>
                                                    <td>{{ props.item.total }}</td>
                                                </tr>
                                            </template> -->
                                        </template>
                                        <!-- <template slot="expand" slot-scope="props">
                                            <v-card flat>
                                                <v-card-text>Peek-a-boo!</v-card-text>
                                            </v-card>
                                        </template> -->
                                    </v-data-table>
                                </v-card>
                            <!-- </v-expansion-panel-content>
                        </v-expansion-panel> -->
                    </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import dropdown from '@/components/trackerSubComponents/dropdown'
import prefixZero from '@/filters/prefix-zero'
import dateExact from '@/filters/momentCalendar'
import moment from 'moment'
import _ from 'lodash'
import axios from 'axios'
import * as Cookies from "js-cookie";

export default {
    components: {
        dropdown
    },
    data() {
        return {
            visible: false,
            handsOn: '',
            formatTime: '00:00:00',
            startTime: '',
            endTime: '',
            total: '',
            dailyTrackersList: [],
            formData: {
                project: '',
            },
            timerSet: '',
            show: true,
        }
    },

    mounted() {
        document.addEventListener('click', this.documentClick)
        this.startTime = localStorage.getItem('Initial Time')
        this.setInitialTime
        this.running
        this.$store.dispatch('getProject')
        setTimeout(() => {
            this.$store.dispatch('getTrackerData')
            this.started
            this.trackerList
        }, 100)
        this.getProjects
    },

    destroyed () {
        document.removeEventListener('click', this.documentClick)
    },

    watch: {
        handsOn() {
            this.contentDrop(this.handsOn)
        }
    },

    methods: {
        option(data) {
            this.handsOn = data.title
            this.formData.project = data.projClient
        },

        contentDrop(data) {
            if ( data === '' || !this.trackerList) {
                this.visible = false
            } else {
                this.visible = true
            }
        },

        documentClick(e) {
            let element = this.$refs.filteredList
            let target = e.target
            if (element !== target) {
                this.visible = false
            }
        },

        startTimer() {
            this.show = !this.show
            this.$store.dispatch('running', true)
            console.log('Start: ', this.startTime)
            if (this.startTime === '' || this.startTime === null) {
                this.startTime = moment().toDate().getTime()
                this.$store.dispatch('setInitialTime', this.startTime)
                this.$store.dispatch('trackerData', {
                    title: this.handsOn,
                    projClient: this.formData.project,
                    startTime: moment.utc().local().format('hh:mm:ss A'),
                    endTime: this.endTime,
                    total: this.total,
                    flag: false,
                    date: moment.utc(new Date()).local().format(),
                })
            }
            let ending = moment().toDate().getTime() 
            let secondsDuration
            this.timerSet = setInterval(() => {
                secondsDuration = Math.floor((moment().toDate().getTime() - this.startTime) / 1000)
                this.formatTime = this.padString(moment.duration(secondsDuration, 'seconds').get('hours')) +':'+ this.padString(moment.duration(secondsDuration, 'seconds').get('minutes')) +':'+ this.padString(moment.duration(secondsDuration, 'seconds').get('seconds'))
                this.$store.dispatch('startedTimer', this.formatTime)
            }, 1000);
        },

        stop() {
            this.show = !this.show
            clearInterval(this.timerSet)
            this.$store.dispatch('running', false)
            this.$store.dispatch('setInitialTime', '')
            this.stopper()
        },

        stopper() {
            if (this.running === false) {
                if (this.getInitialTime === '') {
                    this.$store.dispatch('trackerFinalData', {
                        endTime: moment.utc().local().format('hh:mm:ss A'),
                        total: this.formatTime,
                        flag: true,
                    })
                }
                this.$store.dispatch('currentTracker', '')
                this.$store.dispatch('stopTimer', '00:00:00')
                setTimeout(() => {
                    this.trackerList
                }, 100)
            }
        },

        padString: function(data) {
            return _.padStart(data, 2, 0)
        },

        resume(e) {
            console.log('OOPS: ', e)
            this.handsOn = e.title
            this.formData.project = e.projClient
            this.startTimer()
        }
    },

    computed: {
        running() {
            return this.$store.getters.running
        },
        
        started() {
            if (this.$store.getters.running === true) {
                this.formatTime = this.$store.state.startedTimer
                this.startTimer()
            }
        },

        getInitialTime() {
            const data = this.$store.getters.initialTime
            this.startTime = data
            return data
        },
        timerStopped() {
            this.formatTime = this.$store.state.startedTimer
            return this.formatTime
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
            const listing = []
            const dateObject = []
            const data = this.$store.getters.trackerList.forEach((item) => {
                if (item.flag === true) {
                    dateObject.push(this.$options.filters.dateExact(item.date))
                    return listing.push({
                        title: item.title,
                        projClient: item.projClient,
                        startTime: item.startTime,
                        endTime: item.endTime,
                        total: item.total,
                        date: this.$options.filters.dateExact(item.date)
                    })
                }
            })
            let exactList = []
            const arr = dateObject.map(item => moment(item))
            let maxDate = arr.forEach((item) => {
                return exactList.push(moment.max(item))
            })
            const dataTracker = _.uniqBy(exactList, '_i')
            this.dailyTrackersList = dataTracker.reverse()
            return listing.sort().reverse()
        },

        filteredItems() {
            return this.trackerList.filter((item) => {
                    return item.title.toLowerCase().match(this.handsOn.toLowerCase()) || item.projClient.toLowerCase().match(this.handsOn.toLowerCase())
            })
        },

        sample() {
            // let data
            // const arr = this.trackerList.map((item) => data = { title: item.title, projClient: item.projClient} ).filter((item, index, array) => console.log(item.title, array[index].title))
            // const idea = arr.filter((item, index, array) => console.log('OMG: ', array[index]))
            // return arr
            // let data = moment('0:00:25', 'h:mm:ss').format('h:mm:ss')
            const data = moment().toDate().getTime()
            // const time = Date.now()
            let time
            let times = 0
            // setInterval(() => {
            //     // times = moment.duration(time.diff(data)).seconds()
            //     times = Math.floor((Date.now() - data) / 1000)
            //     console.log(times)
            // }, 1000) 
            // setInterval(() => {
            //     times = Math.floor((moment().toDate().getTime() - data) / 1000)
            //     // times = moment.duration(time.diff(data))
            //     // console.log("WHOOPY: ", moment(data.toString(), 'ss').format('h:mm:ss'))
            //     console.log('Humm: ', Math.floor(moment.duration(times, 'seconds').get('hours')) +':'+ Math.floor(moment.duration(times, 'seconds').get('minutes')) +':'+ Math.floor(moment.duration(times, 'seconds').get('seconds')))
            // }, 1000)
            // return moment.utc(time).local().format('h:mm:ss') + '-' + Date.now()
            // console.log('Whoop: ', moment.duration(data)._milliseconds)
            // return moment('00045', 'h:mm:ss').format('h:mm:ss')
            // return times.get('hours') +':'+ times.get('minutes') +':'+ times.get('seconds')
            // console.log('Wait: ', moment.duration(861837353).get('hours'))
            // return moment.duration('25').get('seconds')
            // return _.padStart(times.get('hours'), 2, 0) +':'+ _.padStart(times.get('minutes'), 2, 0) +':'+ _.padStart(times.get('seconds'), 2, 0)
            // return moment().toDate().getTime()
            let num = 3660
            const shoot = moment.duration(34, 'minutes')
            num = parseInt(num)
            // return Math.floor(moment.duration(num, 'seconds').get('hours')) +':'+ Math.floor(moment.duration(num, 'seconds').get('minutes')) +':'+ Math.floor(moment.duration(num, 'seconds').get('seconds'))
            // return Math.floor(moment.duration(num, 'seconds').asMinutes())
            // return moment.utc().local().format('h:mm:ss A')
            return moment.utc(new Date()).local().format()
            // let secondsDuration = Math.floor((moment().toDate().getTime() - this.startTime) / 1000)
            // return this.padString(moment.duration(secondsDuration, 'seconds').get('seconds'))
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
    max-width: 400px;
    width: 100%;
    /* background: #333 !important; */
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: 5px;
    /* min-width: 200px;
    max-width: 380px; */
    width: 100%;
}
.c-timer {
    font-size: 4rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
    color: #101535;
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
    font-size: 4rem;
    border-radius: 50%;
    margin: 7px 0;
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
    margin-left: 0.5rem;
}
.c-inputs {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}
.c-inputs-control {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3rem;
}
.c-input-cards {
    padding: 1.25rem;
    /* max-width: 570px; */
    position: relative;
    width: 100%;
}
.c-input-cards .v-text-field {
    padding-top: 0;
    margin-top: 0;
}
/* .v-text-field > .v-input__control > .v-input__slot::after, .v-text-field > .v-input__control > .v-input__slot::before {
    content: none !important;
} */
.c-input-cards input {
    /* width: 420px; */
}
.proj-card {
    /* height: 150px; */
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
    top: 75px;
    width: auto;
}
.dropdown a {
    color: #880E4F;
}
</style>
