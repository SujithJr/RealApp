<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <v-card class="mt-4">
                    <form @submit.prevent="addClient()" class="c-search">
                        <input v-model="clientName" single-line solo placeholder="Add New Clients...">
                        <v-btn color="#101535" dark depressed large type="submit">ADD</v-btn>
                    </form>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <v-dialog v-model="dialog" max-width="500px">
                    <v-card>
                        <v-card-title>
                            <span class="headline">Client</span>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field v-model="editedItem.name"></v-text-field>
                                </v-flex>
                                <!-- <v-flex xs12 sm6 md4>
                                    <v-text-field v-model="editedItem.shortname"></v-text-field>
                                </v-flex> -->
                                <!-- <v-flex xs12 sm6 md4>
                                <v-select label="Genre" :items='items' v-model="editedAlbum.genre" required></v-select>
                                </v-flex> -->
                            </v-layout>
                            </v-container>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                            <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
                        </v-card-actions>
                        </v-card>
                </v-dialog>
                <v-data-table
                    :headers="headers"
                    :items="getClients"
                    hide-actions
                    class="elevation-1 mt-4">
                    <!-- <div v-for="(album, index) in albumData" :key="index"> -->
                    <template slot="items" slot-scope="props">
                        <!-- <td>{{ desserts.name }}</td> -->
                        <td class="text-xs-left" >{{ props.item.name}}</td>
                        <td class="text-xs-left" ><v-chip>
                            <v-avatar class="teal">{{ props.item.name[0].toUpperCase() }}</v-avatar>
                            {{ props.item.name }}
                        </v-chip></td>
                        <td class="text-xs-left layout">
                            <v-icon small class="mr-2" @click="editItem(props.item)">
                                edit
                            </v-icon>
                            <v-icon small @click="deleteItem(props.item)">
                                delete
                            </v-icon>
                        </td>
                        <!-- <td class="text-xs-right">{{ desserts.protein }}</td>
                        <td class="text-xs-right">{{ desserts.iron }}</td> -->
                    </template>
                    <template slot="no-data">
                        <v-alert :value="true" color="red" icon="warning">
                            Sorry, nothing to display here :(
                        </v-alert>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
const API_URL = 'http://localhost:4000/clients'

import axios from 'axios'
// import store from '@/store'

export default {
    data: () => ({
      dialog: false,
      headers: [
            { 
                text: 'Client Name', 
                value: 'name'
            },
            { 
                text: 'Badge', 
                value: 'badge', 
                align: 'left',
                sortable: false 
            },
            { 
                text: 'Actions', 
                value: 'actions', 
                align: 'left',
                sortable: false 
            },
        ],
        clientName: '',
        editedIndex: -1,
        editedItem: {
            name: '',
        },
        defaultItem: {
            name: '',
        }
    }),
    mounted () {
        this.$store.dispatch('getClients')
    },
    computed: {
        getClients () {
            return this.$store.state.timer.clients
        },
    },
    watch: {
        dialog (val) {
            val || this.close()
        }
    },
    methods: {
        addClient () {
            const name = this.clientName
            this.$store.dispatch('addClient', name)
            this.clientName = ''
            this.getClients
        },
        editItem (item) {
            this.editedIndex = this.getClients.indexOf(item)
            console.log('Index ',this.editedIndex)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        deleteItem (item) {
            const index = this.getClients.indexOf(item)
            const deleteClient = this.getClients[index]
            console.log(deleteClient._id, deleteClient.name)

            confirm('Are you sure you want to delete this item?') && this.getClients.splice(index, 1)
            this.$store.dispatch('deleteClient', deleteClient)
            // this.$store.dispatch('getClients')
        },
        close () {
            this.dialog = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            }, 300)
        },
        save () {
            console.log('Edited Item', this.editedItem._id, this.editedItem.name)
            if (this.editedIndex > -1) {
                Object.assign(this.getClients[this.editedIndex], this.editedItem)
            } else {
                this.getClients.push(this.editedItem)
            }
            const data = this.editedItem
            console.log(data.name, data._id)
            this.$store.dispatch('editClient', data)
            this.close()
        },
    }
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
.v-dialog:not(.v-dialog--fullscreen) {
    max-height: auto !important;
}

</style>
