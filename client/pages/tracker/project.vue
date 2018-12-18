<template>
    <v-container>
        <v-layout>
            <v-flex xs12 md12 lg12>
                <v-btn round color="red" class="ma-0" dark depressed @click.prevent="createProject()"><v-icon>add</v-icon>CREATE PROJECT</v-btn>
                <v-dialog v-model="dialog" max-width="500px" :fullscreen="$vuetify.breakpoint.xsOnly">
                    <v-card>
                        <v-card-title>
                            <span class="headline">New Project</span>
                        </v-card-title>
                        <v-divider></v-divider>
                        <form @submit.prevent="save()">
                            <v-card-text>
                                <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12 sm6 md6>
                                        <v-text-field v-model="name"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-select
                                            v-model="client"
                                            :items="clientsName"
                                            label="Client"
                                            solo
                                        ></v-select>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-text-field v-model="team"></v-text-field>
                                    </v-flex>
                                </v-layout>
                                </v-container>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                                <v-btn color="blue darken-1" flat type="submit">Save</v-btn>
                            </v-card-actions>
                        </form>
                    </v-card>
                </v-dialog>
                <v-card class="mt-4">
                    <form class="c-search" @submit.prevent="searchItem()">
                        <input single-line solo ref="inputSearch" placeholder="Search...">
                        <v-btn type="submit" color="#101535" dark depressed large>SEARCH</v-btn>
                    </form>
                </v-card>
                <v-data-table
                    :headers="headers"
                    :items="projects"
                    hide-actions
                    class="elevation-1 mt-4 dataTable">
                    <template slot="items" slot-scope="props">
                        <td class="text-xs-left font-weight-bold">{{ props.item.name}}</td>
                        <td class="text-xs-left"><v-chip>
                            <v-avatar class="something" color="#ef5350">{{ props.item.client[0].toUpperCase() }}</v-avatar>
                            {{ props.item.client }}
                        </v-chip></td>
                        <!-- <td class="text-xs-left layout">
                            <v-icon small class="mr-2" @click="editItem(props.item)">
                                edit
                            </v-icon>
                            <v-icon small @click="deleteItem(props.item)">
                                delete
                            </v-icon>
                        </td> -->
                    </template>
                    <!-- <template>
                        <v-alert slot="no-results" :value="true" color="error" icon="warning">
                            Your search for "{{ search }}" found no results.
                        </v-alert>
                    </template> -->
                    <template slot="no-data">
                        <v-alert :value="true" color="red" icon="warning">
                            Sorry, nothing to display here :(
                        </v-alert>
                    </template>
                </v-data-table>
                <h3>{{ getTrackerList }}</h3>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import prefixZero from '@/filters/prefix-zero'
import dateExact from '@/filters/momentCalendar'
import moment from 'moment'
import _ from 'lodash'
import * as Cookies from "js-cookie";

export default {
    data: () => ({
        dialog: false,
        name: '',
        client: '',
        team: '',
        search: '',
        clientsName: [],
        headers: [
            { 
                text: 'Project', 
                value: 'project',
                sortable: true 
            },
            { 
                text: 'Client', 
                value: 'client', 
                align: 'left',
                sortable: true 
            },
            { 
                text: 'Duration', 
                value: 'duration', 
                align: 'left',
                sortable: false
            },
            { 
                text: 'Squad', 
                value: 'squad', 
                align: 'left',
                sortable: false
            },
        ]
    }),

    mounted () {
        this.$store.dispatch('getProject')
        this.$store.dispatch('getTrackerData')
    },

    computed: {
        getClients () {
            // this.clientsName = this.$store.state.timer.clients
            // console.log(this.clientsName[0].name)
            return this.$store.getters.getClients
        },
        getProjects () {
            console.log('Proj List: ', this.$store.getters.getProjects)
            return this.$store.getters.getProjects
        },
        projects () {
            // const track = []
            // const proj = []
            // const final = []
            // this.$store.getters.trackerList.forEach((item) => {
            //     track.push({
            //         item,
            //         Title: _.startCase(item.projClient)
            //     })
            // })
            // this.getProjects.forEach((item) => {
            //     this.track.forEach((data) => {
            //         let detail = item.name + ' '+ item.client
            //         if (data.Title === detail) {
                        
            //         }
            //     })
            // })
            return this.getProjects.filter((project) => {
                    return project.name.toLowerCase().match(this.search.toLowerCase()) || project.client.toLowerCase().match(this.search.toLowerCase())
            })
        },
        getTrackerList() {
            const track = []
            const proj = []
            this.$store.getters.trackerList.forEach((item) => {
                item.total
            })
            console.log('Dura: ', moment.duration('00:00:34'))
            return this.$store.getters.trackerList
        } 
    },

    methods: {
        searchItem () {
            this.search = this.$refs.inputSearch.value
            this.projects
        },

        createProject () {
            this.dialog = true
            this.getClients
            this.getClients.forEach(client => {
                this.clientsName.push(client.name)
            });
            console.log('Clients: ', this.clientsName)
        },
        save () {
            this.$store.dispatch('addProject', {
                name: this.name,
                client: this.client,
                duration: '',
                team: this.team,
                date: this.$options.filters.dateToday()
            })
            this.name = ''
            this.client = ''
            this.team = ''
            this.getProjects
            this.dialog = false
        },
        close () {
            this.dialog = false
        }
    },
}
</script>

<style scoped>
.c-search {
    display: flex;
    padding: 0.5rem 1rem;
}
.c-search input {
    width: 100%;
}
.c-search .v-btn {
    margin: 0;
    padding: 0.5rem;
    width: 125px;
}
.v-list__tile__title {
    color: rgb(0, 0, 0, 0.8) !important;
}
</style>
