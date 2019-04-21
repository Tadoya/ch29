<template>
  <v-footer height="auto" class="pt-4 white">
    <v-layout fill-height row wrap class="text-xs-center">
      <v-flex xs12>
        <span class="headline">Contact Us</span>        
      </v-flex>
      <v-flex xs12>
        <span class="caption">
          <a href="mailto:official.ch29@gmail.com">official.ch29@gmail.com</a><br/>
          <a href="mailto:ch_29@naver.com">ch_29@naver.com</a></span>
      </v-flex>
      <v-flex xs12 class="pb-1">
        <v-btn icon flat :href="channels.youtube" target="_blank"><v-icon medium color="red">fab fa-youtube</v-icon></v-btn>
        <v-btn icon flat :href="channels.facebook" target="_blank"><v-icon medium color="blue darken-4">fab fa-facebook</v-icon></v-btn>
        <v-btn icon flat :href="channels.naver" target="_blank"><v-icon medium color="green">fab fa-blogger</v-icon></v-btn>
      </v-flex>
      <v-flex xs12>
        <v-card
          class="blue darken-4"
          tile
          dark
        >
          <v-card-text>
            <span>&copy; 2018 Channel 29 - All Rights reserved</span>
          </v-card-text>
        </v-card>
      </v-flex>      
    </v-layout>
  </v-footer>
</template>

<script>
import channels from '@/assets/js/channels'

export default {
  data() {
    return {
      channels: channels
    }
  },
}
</script>

<style>

</style>
