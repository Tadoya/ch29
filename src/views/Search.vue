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
      :menu="`대상 정책(영상 + 설명)(${policyData.length}건)`"
      :results="policyData"
    />
    <SearchTable
      :menu="`관련 사업(${businessData.length}건)`"
      :results="businessData"
    />
  </v-card>
</template>

<script>
import SearchTable from '@/components/v/Search/SearchTable'
import { search } from '@/api'

export default {
  components: {
    SearchTable
  },
  data() {
    return {
      policy: "대상 정책(영상 + 설명)(1건)",
      business: "관련 사업(1건)",
      policyData: [
        {
          number: 1,
          policy_name: '행복주택',
          policy_intro: `대중교통 이용이 편리한 곳에 짓는 공공임대 주택`,
          target: `대학생 / 청년 / 신혼부부`,
          condition: `신청중`,
          id: 1
        },
      ],
      businessData: [
        {
          number: 1,
          policy_name: '역세권청년주택',
          policy_intro: '역세권 지하철 인근에 짓는 주택',
          target: '대학생 / 청년',
          condition: '예정',
          id: 2
        }
      ],
    }
  },
  computed: {
    keyword() {
      return this.$route.query.keyword
    }
  },
  watch: {
    keyword() {
      this.readSearchData()
    }
  },
  created() {
    this.readSearchData()
  },
  methods: {
    readSearchData() {
      if (!this.keyword) { return }

      search.read(this.keyword)
      .then((response) => {
        const data = response.data

        this.policyData = data.target_policy
        this.businessData = data.related_business

        for (const index in this.policyData) {
          this.$set(this.policyData[index], 'number', index - 0 + 1)
        }

        for (const index in this.businessData) {
          this.$set(this.businessData[index], 'number', index - 0 + 1)
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style>
.text--center input{
  text-align: center
}
</style>
