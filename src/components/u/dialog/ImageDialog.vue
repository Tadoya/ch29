<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="dialogConfig.isActive"
      content-class="max-width-1000"
      @keydown.esc.stop="dialogConfig.isActive=false"
    >
      <v-layout column>  
        <v-layout row>
          <v-spacer></v-spacer>
          <v-btn
            class="pa-0 my-0 mx-0"
            small icon
            @click="closeEvent"
          >
            <v-icon small> close</v-icon>
          </v-btn>
        </v-layout>
        <v-img
          class="mb-4 mx-4"
          contain
          :src="dialogConfig.src"
        >
        </v-img>
      </v-layout> 
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: {
    dialogConfig: {
      type: Object,
      required: true
    },
  },
  methods: {
    closeEvent() {
      this.dialogConfig.isActive = false
    }
  }
}
</script>

<style>
  .max-width-1000{
    max-width: 1000px;
  }
</style>

