<template>
        <v-navigation-drawer
            fixed
            app
            v-model="drawer"
            :mini-variant.sync="mini"
            hide-overlay
            stateless
            >
            <v-toolbar flat class="transparent">
            <v-list dense>
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                        <img src="./../static/images/sanju.jpeg">
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title>User</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-btn
                        icon
                        @click.stop="mini = !mini"
                        >
                        <v-icon>chevron_left</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                </v-list-tile>
                <!-- <v-list-tile>
                    <v-list-tile-action>
                        <v-icon>dashboard</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Dashboard</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile> -->
                <v-list-tile v-for="item in menuItems" :key="item.index">
                    <v-list-tile-action>
                        <v-icon style="cursor:pointer">{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title><router-link :to="item.link">{{ item.title }}</router-link></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-toolbar>
        </v-navigation-drawer>
</template>

<script>
export default {
    data() {
        return {
            menuItems: [
                { title: 'Home', link: '/', icon: 'home'},
                { title: 'Todo', link: '/List', icon: 'question_answer'},
                { title: 'Tracker', link: '/tracker', icon: 'dashboard'}
            ],
            mini: true,
            right: null,
            drawer: true,
        }
    },
    computed: {
        // color () {
        //     if (this.$route.name === )
        // }
    }
}
</script>


<style scoped>
.theme--light .v-navigation-drawer{
    background: #101535 !important;
}
.v-list__tile__action i {
    color: #888 !important;
}
.theme--light.v-navigation-drawer {
    background: #111;
    border-right: 2px solid #fff;
}
.v-list__tile__content {
    padding: 0 0.5rem;
}
/* .v-list__tile__content .v-list__tile__title a:hover { */
    /* background: rgb(255, 255, 255, 0.8);
} */
.v-list__tile__title a {
    text-decoration: none;
    color: #fff;
    font-weight: 800;
}
.v-list__tile__title a.router-link-exact-active {
    color: #d13739;
    font-weight: 800;
    /* background: #ccc;
    padding: 0 1rem; */
}
.v-list__tile__title a {
    font-size: 1.2rem;
    display: block;
}
.v-list__tile__title {
    /* padding: 0.5rem 1rem; */
    color: #ffffff;
    font-weight: 800;
}
.v-list__tile__title:hover {
    /* background: rgb(0, 0, 0, 0.2); */
}

</style>
