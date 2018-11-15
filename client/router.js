import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import index from '@/pages/index.vue'
import List from '@/pages/List.vue'
import Timer from '@/pages/Timer.vue'
import Timetracker from '@/pages/tracker'
import Project from '@/pages/tracker/project.vue'
import Clients from '@/pages/tracker/clients.vue'
import Team from '@/pages/tracker/team.vue'
import Dashboard from '@/pages/tracker/dashboard.vue'

export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [
            {
                path: '/',
                component: index,
                name: '',
                meta: {
                    zone: '/'
                }
            },
            {
                path: '/List',
                component: List,
                name: 'List',
                meta: {
                    zone: 'List'
                }
            },
            {
                path: '/Timer',
                component: Timer,
                name: 'Timer',
                meta: {
                    zone: 'timer'
                }
            },
            {
                path: '/tracker',
                component: Timetracker,
                name: 'Tracker',
                meta: {
                    zone: 'Tracker'
                }
            },
            {
                path: '/tracker/project',
                component: Project,
                name: 'Project',
                meta: {
                    zone: 'Tracker'
                }
            },
            {
                path: '/tracker/clients',
                component: Clients,
                name: 'Clients',
                meta: {
                    zone: 'Tracker'
                }
            },
            {
                path: '/tracker/team',
                component: Team,
                name: 'Team',
                meta: {
                    zone: 'Tracker'
                }
            },
            {
                path: '/tracker/dashboard',
                component: Dashboard,
                name: 'Dashboard',
                meta: {
                    zone: 'Tracker'
                }
            },
        ]
    })
}