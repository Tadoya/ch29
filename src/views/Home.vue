<template>
  <v-card id="home" flat>
    <Calender
      class="mb-4"
      :items="calenderData"
    />
    <Contents
      :items="contentData"
    />
  </v-card>
</template>

<script>
import Calender from '@/components/v/Home/Calender'
import Contents from '@/components/v/Home/Contents'

import { main } from '@/api'

export default {
  components: {
    Calender,
    Contents
  },
  data() {
    return {
      calenderData: [],
      contentData: []
    }
  },
  computed: {
    month() {
      return this.$store.getters.month
    },
    selectedCategories() {
      return this.$store.getters.selectedCategories
    },
    startDate() {
      return this.$store.getters.startDate
    },
    endDate() {
      return this.$store.getters.endDate
    }
  },
  watch: {
    selectedCategories(v) {
      if (!this.endDate) {
        this.readDataWithMonth()
      } else {
        this.readDataWithDate()
      }
    },
    month(v) {
      this.readDataWithMonth()
    },
    endDate(v) {
      if (!v) {
        this.readDataWithMonth()
      } else {
        this.readDataWithDate()
      }
    }
  },
  created() {
    // this.readDataWithDate()
    this.$nextTick(() => {
      this.readDataWithMonth()
    })
  },
  methods: {
    readDataWithMonth() {
      main.readWithMonth(this.month, this.selectedCategories)
      .then((response) => {
        this.setCalenderData(response)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    readDataWithDate() {
      main.readWithDate(this.startDate, this.endDate, this.selectedCategories)
      .then((response) => {
        this.setCalenderData(response)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    setCalenderData(response) {
      const data = response.data

      this.calenderData = []
      this.contentData = []
      
      this.calenderData = data.calender
      for (const index in this.calenderData) {
        const receiveEndDate = this.calenderData[index].receive_eddt.split('T')[0]
        const receiveStartDate = this.calenderData[index].receive_stdt.split('T')[0]
        const itemType = this.calenderData[index].item_type
        const title = this.calenderData[index].policy_name
        const category = this.calenderData[index].category
        const policyStartDate = this.calenderData[index].policy_stdt.split('T')[0]
        const policyEndDate = this.calenderData[index].policy_eddt.split('T')[0]

        this.$set(this.calenderData[index], 'contents', 
          `<b>${index - 0 + 1}. [${category} ${itemType}] ${title}</b><br>
          <span class="mx-3 caption">접수기간: ${receiveStartDate} ~ ${receiveEndDate}</span><br>
          <span class="mx-3 caption">${itemType}기간: ${policyStartDate} ~ ${policyEndDate}</span>`)
      }

      this.contentData = []
      for (const index in data.url) {
        if (!data.url[index].url) {
          continue
        }
        this.contentData.push(data.url[index])
        const realIndex = this.contentData.indexOf(data.url[index])
        const hash = this.contentData[realIndex].hash
        const contents = this.contentData[realIndex].url_name
        
        this.$set(this.contentData[realIndex], 'src', this.contentData[realIndex].url)
        this.$set(this.contentData[realIndex], 'title', this.contentData[realIndex].policy_name)
        this.$set(this.contentData[realIndex], 'description',
          `${contents ? contents : ""}\n${hash ? hash : ""}`)
      }
    }
  }
}
</script>

<style scope>
#home {
  margin-top: 50px;
}
</style>
