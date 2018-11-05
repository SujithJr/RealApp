<template>
<div>
    <navbar></navbar>
    <div class="form">
        <form @submit.prevent="addTodo">
            <v-text-field type="text" class="text" v-model="message" placeholder="Message"></v-text-field>
            <v-btn type="submit" class="warning" dark>Submit</v-btn>
        </form>
        <v-card class="todo" v-for="todo in currentTopTodo" :key="todo.index">
            <v-card-text>
                <h5>Id: {{ todo._id }}</h5>
                <p>Message: {{ todo.text }}</p>
            </v-card-text>
        </v-card>
    </div>
</div>
</template>

<script>
const API_URL = 'http://localhost:4000/todos'

import prefixZero from '@/filters/prefix-zero'
import moment from 'moment'
import navbar from '@/components/navbar'
import axios from 'axios'
    export default {
    data() {
        return {
            list: [],
            show: true,
            message: ''
        }
    },
    components: { navbar },
    methods: {
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

<style scoped>
.form {
    margin: 0 2rem;
    margin-top: 6rem;
}
.text {
    width: 50%;
    padding: 0.5rem;
}
.todo {
    margin: 0 0.5rem;
}
.todo .v-card__text {
    margin: 1rem 0;
}
</style>
