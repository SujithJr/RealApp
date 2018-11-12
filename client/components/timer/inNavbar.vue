<template>
    <div>
        <v-toolbar
        color="#101535"
      dark
      tabs
    >

      <v-toolbar-title>Tracker</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn> -->

      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>

      <v-tabs
        slot="extension"
        v-model="tab"
        grow
        color="#101535"
      >
        <v-tabs-slider color="yellow"></v-tabs-slider>

        <v-tab
          v-for="item in items"
          :key="item"
        >
          {{ item }}
        </v-tab>
      </v-tabs>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"
      >
      <component :is="item"></component>
      </v-tab-item>
    </v-tabs-items>
    </div>    
</template>

<script>
import navbar from '@/components/navbar'
import Tracker from '@/components/timer/tracker'
import Dashboard from '@/components/timer/dashboard'
import Project from '@/components/timer/project'
import Clients from '@/components/timer/clients'
import Team from '@/components/timer/team'

export default {
    components: {
        Tracker,
        Dashboard,
        Clients,
        Project,
        Team,
        navbar
    },
    data: () => ({
        tab: null,
        items: ['Tracker', 'Project', 'Clients', 'Team', 'Dashboard'],
    }),
  }
</script>

<style scoped>

</style>
