<template>
  <v-layout column>
    <!-- title -->
    <v-card
      class="ma-1"
      height="50"
    >
      <v-layout row wrap fill-height align-center>
        <span
          class="subheading font-weight-medium pl-2"
          :class="breakpoint!=='xs'?'absolute':''"
        ><v-icon>calendar_today</v-icon> 캘린더</span>
        <v-layout row fill-height align-center justify-center>
          <v-btn
            icon
            class="pa-0 ma-0"
            @click="onClickArrow('prev')"
          >
            <v-icon>chevron_left</v-icon>
          </v-btn>
          <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                flat
                class="pa-0 ma-0"
              >
                <span
                  @click="menu1=true"
                >
                  {{ getDateForm(date) }}
                </span>
              </v-btn>
            </template>
            <v-date-picker v-model="month" no-title type="month" @input="setDateFromDatePicekr"></v-date-picker>
          </v-menu>
          <v-btn
            icon
            class="pa-0 ma-0"
            @click="onClickArrow('next')"
          >
            <v-icon>chevron_right</v-icon>
          </v-btn>
        </v-layout>
        <v-spacer v-if="breakpoint==='xs'"></v-spacer>
      </v-layout>
    </v-card>
    <!-- contents -->
    <v-layout row wrap>
      <!-- calender -->
      <v-flex xs12 sm12 md6>
        <v-card
          class="ma-1"
          height="330"
        >
          <v-calendar
            ref="calendar"
            v-model="date"
            class="pointer"
            :now="today"
            @click:day="onClickOfDay"
          >
            <template v-slot:day="{ date }">
              <v-layout
                row wrap fill-height
                class=""
                :class="{'success white--text':selectedDays.indexOf(date) > -1}"
              >
                <!-- <span class="caption grey--text">정책 수</span> -->
              </v-layout>
            </template>
          </v-calendar>
        </v-card>
      </v-flex>
      <!-- policy schdule -->
      <v-flex xs12 sm12 md6>
        <v-card
          class="pa-3 ma-1"
          height="330"
        >
          <v-layout row wrap>
            <v-flex xs12 class="mb-3">
              <span class="subheading">청년 정책 일정</span>
            </v-flex>
            <v-flex xs12>
              <v-card height="250" flat class="outline">
                <v-layout
                  column fill-height align-start justify-start
                  class="calender__policy__wrapper"
                >
                  <v-hover v-for="(item, index) in items" :key="`schedule${index}`">
                    <div
                      slot-scope="{ hover }"
                      class="mx-2 mt-2 pointer"
                      @click="onClickPolicy(item)"
                    >
                      <p
                        :class="{'blue--text': hover}"
                        v-html="item.contents"
                      >
                      </p>
                    </div>
                  </v-hover>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>

export default {
  props: {
    items: { type: Array, required: false, default: () => [
      {
        contents: `[SH공사]행복주택\n ~ 190415 @SH공사`,
        id: 1
      },
      {
        contents: `청년수당\n ~ 190415 @서울시`,
        id: 2
      }
    ]}
  },
  data() {
    return {
      // title
      month: `2019-01`,
      menu1: false,
      // calender
      date: `2019-01-01`,
      today: `2019-01-01`,
      isMouseDown: false,
      isStarted: false,
      selectedDays: [],

    }
  },
  computed: {
    breakpoint() {
      return this.$vuetify.breakpoint.name
    }
  },
  watch: {
    month(v) {
      this.$store.commit(`SET_MONTH`, v)
    }
  },
  mounted() {
    this.today = this.$refs.calendar.getNow().date
    this.date = this.today
    this.month = this.today.slice(0, this.month.length)
    this.$store.commit(`SET_TODAY`, this.today)
  },
  methods: {
    // title 
    onClickArrow(v) {
      if (v === 'prev') {
        this.$refs.calendar.prev()
      } else {
        this.$refs.calendar.next()
      }

      this.month = this.date.slice(0, this.month.length)
    },
    getDateForm(date) {
      const splitedDate = date.split('-')
      const year = splitedDate[0]
      const month = splitedDate[1]

      return `${year}년 ${month}월`
    },
    setDateFromDatePicekr() {
      this.date = `${this.month}${this.date.slice(this.month.length)}`
      this.menu1 = false
    },
    // calender
    setStartDate(e) {
      this.selectedDays = []

      const indexOfDate = this.selectedDays.indexOf(e.date)

      if (indexOfDate < 0) {
        this.selectedDays.push(e.date)
      }
    },
    setEndDate(e) {
      if (!this.selectedDays.length) {
        return
      }

      let startDay = this.selectedDays[0].split('-')[2] - 0
      let endDay = e.day

      if (startDay > endDay) {
        endDay = startDay
        startDay = e.day
      }

      for (let i = startDay; i <= endDay; ++i) {
        const day = i < 10 ? `0${i}` : i

        if (this.selectedDays.indexOf(`${this.month}-${day}`) < 0) {
          this.selectedDays.push(`${this.month}-${day}`)
        }
      }

      this.$store.commit('SET_START_DATE', this.selectedDays[0])
      this.$store.commit('SET_END_DATE', this.selectedDays[this.selectedDays.length - 1])
    },
    onClickOfDay(e) {
      const indexOfDate = this.selectedDays.indexOf(e.date)
      
      if (indexOfDate > -1) {
        this.selectedDays = []
        this.isStarted = false
        this.$store.commit('SET_START_DATE', "")
        this.$store.commit('SET_END_DATE', "")
        
        return
      }

      if (!this.isStarted) {
        this.setStartDate(e)
        this.isStarted = true
      } else { 
        this.setEndDate(e)
        this.isStarted = false
      }
    },

    // policy schdule
    onClickPolicy(item) {
      this.$router.push({
        name: 'details',
        params: {
          id: item.id
        }
      })
    },
  }
}
</script>

<style scope>
  .absolute{
    position: absolute;
  }
  .outline{
    border:solid 2px;
    border-color: black !important;
  }
  .calender__policy__wrapper{
    overflow: auto;
  }
</style>
