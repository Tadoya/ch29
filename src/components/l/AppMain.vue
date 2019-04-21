<template>
  <v-content class="white">
    <v-container id="app-main">
      <v-layout column>
        <v-card id="home" flat>
          <Calender class="mb-4"/>
          <Contents/>
        </v-card>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import Calender from '@/components/v/Calender'
import Contents from '@/components/v/Contents'
export default {
  components: {
    Calender,
    Contents
  },
}
</script>

<style scope>
  #app-main{
    background: #fafafa !important;
    max-width:1000px;
    margin-top: 180px;
  }
</style>
