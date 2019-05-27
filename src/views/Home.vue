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
    }
  },
  watch: {
    selectedCategories(v) {
      this.readDataWithMonth()
    },
    month(v) {
      this.readDataWithMonth()
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
        const data = response.data
        
        this.calenderData = data.calender
        for (const index in this.calenderData) {
          const endDate = this.calenderData[index].receive_eddt.split('T')[0]
          const startDate = this.calenderData[index].receive_stdt.split('T')[0]
          const itemType = this.calenderData[index].item_type
          const title = this.calenderData[index].policy_name
          const category = this.calenderData[index].category

          this.$set(this.calenderData[index], 'contents', 
            `<b>${index - 0 + 1}. [${category} ${itemType}] ${title}</b><br><span class="mx-3">${startDate} ~ ${endDate}</span>`)
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
      })
      .catch((err) => {
        console.log(err)
      })
    },
    readDataWithDate() {
      main.readWithDate("2019-05-01", "2019-05-31", ["전체"])
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scope>
#home {
  margin-top: 50px;
}
</style>
