<template>
  <v-card id="search" flat class="mx-1">
    <v-layout row wrap align-start justify-start>
      <v-spacer/>
      <v-text-field
        class="text--center title"
        single-line
        hide-details
        readonly
        value="통합검색결과"
      ></v-text-field>
      <v-spacer/>
    </v-layout>
    <SearchTable
      class="mb-5"
      :menu="`대상 정책(영상 + 설명)(${firstData.length}건)`"
      :results="firstData"
    />
    <SearchTable
      :menu="`관련 사업(${secondData.length}건)`"
      :results="secondData"
    />
  </v-card>
</template>

<script>
import SearchTable from '@/components/v/Search/SearchTable'
export default {
  components: {
    SearchTable
  },
  data() {
    return {
      policy: "대상 정책(영상 + 설명)(1건)",
      business: "관련 사업(1건)",
      firstData: [
        {
          number: 1,
          title: '행복주택',
          contents: `대중교통 이용이 편리한 곳에 짓는 공공임대 주택`,
          target: `대학생 / 청년 / 신혼부부`,
          condition: `신청중`
        },
      ],
      secondData: [
        {
          number: 1,
          title: '역세권청년주택',
          contents: '역세권 지하철 인근에 짓는 주택',
          target: '대학생 / 청년',
          condition: '예정'
        }
      ]
    }
  }
}
</script>

<style>
.text--center input{
  text-align: center
}
</style>
