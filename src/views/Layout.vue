<template>
  <v-app>
    <AppToolbar/>
    <v-layout column fill-height>
      <AppMain/>
      <v-divider/>
      <AppFooter/>
      <AppFab/>
    </v-layout>
  </v-app>
</template>

<script>
import AppToolbar from '@/components/l/AppToolbar'
import AppMain from '@/components/l/AppMain'
import AppFooter from '@/components/l/AppFooter'
import AppFab from '@/components/l/AppFab'

export default {
  components: {
    AppToolbar,
    AppMain,
    AppFooter,
    AppFab
  }
}
</script>
