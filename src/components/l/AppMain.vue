<template>
  <v-content class="">
    <v-container id="app-main" class="px-2 pb-3">
      <router-view></router-view>
    </v-container>
  </v-content>
</template>

<style scope>
  #app-main{
    background: white !important;
    max-width:1000px;
    margin-top: 130px;
  }
</style>
