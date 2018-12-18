<template>
    <div>
        <v-container>
            <v-layout>
                <v-flex xs12>
                    <div class="c-inputs-control">
                        <div class="c-inputs elevation-4">
                            <div class="c-input-cards">
                                <v-text-field
                                    v-model="handsOn"
                                    placeholder="Hands On..."
                                    solo
                                    flat
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
                                flat
                                hide-details
                                small-chips
                                color="yellow"
                                single-line
                                ></v-select>
                            </div>
                        </div>
                        <v-card flat class="c-wrap hidden-sm-down elevation-4" dark>
                            <h2 class="c-timer">{{ formatTime }}</h2>
                            <div class="c-control">
                                <a href="#/" @click.prevent="startTimer" v-if="show"><v-icon>play_circle_filled</v-icon></a>
                                <a href="#/" @click.prevent="stop" v-if="!show"><v-icon>stop</v-icon></a>
                            </div>
                        </v-card>
                    </div>
                </v-flex>
            </v-layout>
            <v-layout class="mt-4 pt-2">
                <v-flex xs12>
                    <v-card class="mt-3" v-for="tracker in dailyTrackersList" :key="tracker.index">
                        <v-card-title class="capitalize font-weight-bold ">{{ tracker }}</v-card-title>
                        <v-divider></v-divider>
                        <v-data-table :items="trackerList" item-key="title" hide-actions hide-headers>
                            <template slot="items" slot-scope="props">
                                <template v-if="tracker === props.item.date">
                                    <tr>
                                        <td class="text-xs-left">{{ props.item.title }}</td>
                                        <td class="text-xs-left"><span style="display: inline-block; color: #333"><strong><small>{{ props.item.projClient.toUpperCase() }}</small></strong></span></td>
                                        <td class="text-xs-right">{{ props.item.startTime }} - {{ props.item.endTime }}</td>
                                        <td class="text-xs-right">{{ props.item.total }}</td>
                                        <td class="text-xs-right"><a @click.prevent="resume(props.item)" class="like"><v-icon>play_arrow</v-icon></a></td>
                                    </tr>
                                </template>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import dropdown from '@/components/trackerSubComponents/dropdown'
import prefixZero from '@/filters/prefix-zero'
import dateExact from '@/filters/momentCalendar'
import momentCalc from '@/filters/momentFunctions'
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
            if (this.startTime === '' || this.startTime === null) {
                this.startTime = moment().toDate().getTime()
                this.$store.dispatch('setInitialTime', this.startTime)
                this.$store.dispatch('trackerData', {
                    title: this.handsOn,
                    projClient: this.formData.project,
                    startTime: this.$options.filters.timeNow(),
                    endTime: this.endTime,
                    total: this.total,
                    flag: false,
                    date: this.$options.filters.dateToday(),
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
                        endTime: this.$options.filters.timeNow(),
                        total: this.formatTime,
                        flag: true,
                    })
                    this.$store.dispatch('durationProjList', { total: this.formatTime })
                }
                this.$store.dispatch('currentTracker', '')
                this.$store.dispatch('stopTimer', '00:00:00')
                this.timerStopped
                this.handsOn = ''
                this.formData.project = ''
                setTimeout(() => {
                    this.trackerList
                }, 100)
            }
        },

        padString: function(data) {
            return _.padStart(data, 2, 0)
        },

        resume(e) {
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
            this.formatTime = this.$store.state.tracker.startedTimer
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
            console.log('Project list: ', itemArr)
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
            // const arr = dateObject.map(item => moment(item))
            // console.log('Hoosh: ', dateObject)
            let maxDate = dateObject.forEach((item) => {
                // console.log('Hoosh: ', moment.max(item))
                return exactList.push(moment.max(item))
            })
            // console.log('haaaaaaa: ', exactList)
            const dataTracker = _.uniq(exactList)
            // console.log('Yuppp: ', dataTracker)
            this.dailyTrackersList = dataTracker.reverse()
            return listing.sort().reverse()
        },

        filteredItems() {
            return this.trackerList.filter((item) => {
                return item.title.toLowerCase().match(this.handsOn.toLowerCase()) || item.projClient.toLowerCase().match(this.handsOn.toLowerCase())
            })
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
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 0.3rem 3rem;
    background: #222;
}
.c-timer {
    font-size: 3rem;
    padding: 0 1rem;
    /* color: #101535; */
    color: rgba(255, 255, 255, 0.8);
    height: 42px;
    line-height: 42px;
}
.c-timer-hour {
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 1px 2px 5px 0px #ccc;
    padding: 1rem;
    font-weight: 800;
    margin: 0 auto;
    font-size: 1rem;
}
.c-timer-hour:first-child {
    margin-top: 2rem;
}
.c-timer-hour p {
    color: yellowgreen;
}
.c-control a {
    text-decoration: none;
    color: rgb(255, 255, 255, 0.85);
    outline: 0;
    width: 100%;
    height: 100%;
    display: inline-block;
}
.c-control a .v-icon {
    vertical-align: middle;
    background: brown;
    color: #fff;
    font-size: 3rem;
    border-radius: 50%;
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
    position: relative;
    width: 100%;
}
.c-input-cards .v-text-field {
    padding-top: 0;
    margin-top: 0;
}
.proj-card {
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
