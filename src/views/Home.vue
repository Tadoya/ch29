<template>
  <v-card id="home" flat>
    <Calender class="mb-4"/>
    <Contents/>
  </v-card>
</template>

<script>
import Calender from '@/components/v/Home/Calender'
import Contents from '@/components/v/Home/Contents'
export default {
  components: {
    Calender,
    Contents
  },
}
</script>

<style scope>
#home {
  margin-top: 50px;
}
</style>
