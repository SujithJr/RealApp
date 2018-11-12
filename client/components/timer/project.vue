<template>
    <v-container>
        <v-layout>
            <v-flex xs12 md12 lg12>
                <v-btn round color="red" dark depressed @click.prevent="createProject()"><v-icon>add</v-icon>CREATE PROJECT</v-btn>
                <v-dialog v-model="dialog" max-width="500px">
                    <v-card>
                        <v-card-title>
                            <span class="headline">New Project</span>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field v-model="name"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-select
                                        v-model="client"
                                        :items="clientsName.name"
                                        label="Client"
                                        solo
                                    ></v-select>
                                </v-flex>
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
                <v-card class="mt-4">
                    <form @click.prevent="search" class="c-search ">
                        <input single-line solo placeholder="Search...">
                        <v-btn type="submit" color="#101535" dark depressed large>SEARCH</v-btn>
                    </form>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        dialog: false,
        name: '',
        client: '',
        clientsName: []
    }),

    mounted () {
        this.$store.dispatch('getClients')
    },

    methods: {
        createProject () {
            this.dialog = true
            this.getClients
        },
        save () {

        }
    },

    computed: {
        getClients () {
            this.clientsName = this.$store.state.timer.clients
            console.log(this.clientsName[0].name)
            return this.$store.state.timer.clients
        } 
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
</style>
