<template>
    <div>
        <!-- <ul slot="list">
            <li class="mb-2" v-for="item in projects" :key="item.index" @click="option()">
                <a href="#/" class="py-3 block"><slot name="list">{{item.name}} - <small><strong>{{item.client.toUpperCase() }}</strong></small></slot></a>
                <v-divider></v-divider>
            </li>
        </ul> -->
        <!-- <a href="#/"> -->
            <slot></slot>
        <!-- </a> -->
    </div>
</template>

<script>
export default {
    props: ['projects'],
}
</script>

<style scoped>
li:last-child {
    margin-bottom: 0 !important;
}
a {
    display: block;
}
</style>

