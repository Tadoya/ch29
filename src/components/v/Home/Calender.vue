<template>
  <v-layout column>
    <v-card
      class="ma-1"
      height="50"
    >
      <v-layout row wrap fill-height align-center>
        <span class="absolute subheading font-weight-medium pl-2"><v-icon>calendar_today</v-icon> 캘린더</span>
        <v-layout row wrap fill-height align-center justify-center>
          <v-btn
            icon
            @click="$refs.calendar.prev()"
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
              <v-btn flat>
                <span
                  @click="menu1=true"
                >
                  {{ getDateForm(date) }}
                </span>
              </v-btn>
            </template>
            <v-date-picker v-model="date" no-title @input="menu1=false"></v-date-picker>
          </v-menu>
          <v-btn
            icon
            @click="$refs.calendar.next()"
          >
            <v-icon>chevron_right</v-icon>
          </v-btn>
        </v-layout>
      </v-layout>
    </v-card>
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <v-card
          class="ma-1"
          height="250"
        >
          <v-calendar
            ref="calendar"
            v-model="date"
            :now="today"
          />
        </v-card>
      </v-flex>
      <v-flex xs12 sm6>
        <v-card
          class="pa-3 ma-1"
          height="250"
        >
          <v-layout row wrap>
            <v-flex xs12 class="mb-3">
              <span class="subheading">청년 정책 일정</span>
            </v-flex>
            <v-flex xs12>
              <v-card height="180" flat class="outline">
                <v-layout column fill-height align-start justify-start>
                  <span
                    v-for="item in scheduledData" :key="item.title"
                    class="ma-2 pointer"
                    @click="onClickPolicy(item)"
                  >
                    {{ item.contents }}
                  </span>
                </v-layout>
              </v-card>
              <!-- <v-textarea
                v-model="scheduledData"
                outline
                single-line
                hide-details
                no-resize
                readonly
                rows="8"
              ></v-textarea> -->
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>

export default {
  data() {
    return {
      // scheduledData: `[SH공사]행복주택\n ~ 190415 @SH공사\n\n청년수당\n ~ 190415 @서울시`,
      scheduledData: [
        {
          title: '행복주택',
          contents: `[SH공사]행복주택\n ~ 190415 @SH공사`
        },
        {
          title: '청년수당',
          contents: `청년수당\n ~ 190415 @서울시`
        }
      ],
      today: `2019-01-01`,
      date: `2019-01-01`,
      menu1: false,
    }
  },
  mounted() {
    this.today = this.$refs.calendar.getNow().date
    this.date = this.today
  },
  methods: {
    getDateForm(date) {
      const splitedDate = date.split('-')
      const year = splitedDate[0]
      const month = splitedDate[1]

      return `${year}년 ${month}월`
    },
    onClickPolicy(item) {
      this.$router.push({
        name: 'details',
        query: {
          title: item.title
        }
      })
    }
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
</style>
