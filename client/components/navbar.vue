<template>
    <div>
        <!-- <v-navigation-drawer
            v-model="drawer"
            fixed
            app
            >
            <v-list dense>
                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon>dashboard</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Dashboard</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile v-for="item in menuItems" :key="item.index">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title><router-link :to="item.link">{{ item.title }}</router-link></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar color="indigo" dark fixed app>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>Real App</v-toolbar-title>
        </v-toolbar> -->

        <v-navigation-drawer
            :mini-variant.sync="mini"
            v-model="drawer"
            hide-overlay
            stateless
        >
            <v-toolbar flat class="transparent">
            <v-list class="pa-0">
                <v-list-tile avatar>
                <v-list-tile-avatar>
                    <img src="https://randomuser.me/api/portraits/men/85.jpg">
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
            

            <!-- <v-list class="pt-0" dense> -->
            <v-divider></v-divider>

            <v-list-tile
                v-for="item in menuItems"
                :key="item.title"
                :to="item.link"
            >
                <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <!-- </v-list> -->
            </v-list>
            </v-toolbar>
        </v-navigation-drawer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            menuItems: [
                { title: 'Home', link: '/', icon: 'home'},
                { title: 'Todo', link: '/List', icon: 'question_answer'}
            ],
            mini: true,
            right: null,
            drawer: true,
        }
    },
    computed: {

    }
}
</script>


<style>
.v-list__tile__title a {
    text-decoration: none;
    color: #000;
}
.v-list__tile__title a.nuxt-link-exact-active {
    color: tomato;
    /* background: #ccc; */
}

/* .c-nav {
    background: #35495E;
    display: flex;
    justify-content: center;
}
.c-nav-list {
    text-align: center;
    list-style-type: none;
    margin: 1rem;
}
.c-nav-link {
    text-decoration: none;
    color: aqua;
}
.VueToNuxtLogo
{
  display: inline-block;
  animation: turn 2s linear forwards 1s;
  transform: rotateX(180deg);
  position: relative;
  overflow: hidden;
  height: 180px;
  width: 245px;
}
.Triangle
{
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
}
.Triangle--one
{
  border-left: 105px solid transparent;
  border-right: 105px solid transparent;
  border-bottom: 180px solid #41B883;
}
.Triangle--two
{
  top: 30px;
  left: 35px;
  animation: goright 0.5s linear forwards 3.5s;
  border-left: 87.5px solid transparent;
  border-right: 87.5px solid transparent;
  border-bottom: 150px solid #3B8070;
}
.Triangle--three
{
  top: 60px;
  left: 35px;
  animation: goright 0.5s linear forwards 3.5s;
  border-left: 70px solid transparent;
  border-right: 70px solid transparent;
  border-bottom: 120px solid #35495E;
}
.Triangle--four
{
  top: 120px;
  left: 70px;
  animation: godown 0.5s linear forwards 3s;
  border-left: 35px solid transparent;
  border-right: 35px solid transparent;
  border-bottom: 60px solid #fff;
}

@keyframes turn {
  100% {
    transform: rotateX(0deg);
  }
}
@keyframes godown {
  100% {
    top: 180px;
  }
}
@keyframes goright {
  100% {
    left: 70px;
  }
} */
</style>
