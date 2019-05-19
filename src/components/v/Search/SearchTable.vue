<template>
  <v-card flat>
    <v-text-field
      v-model="menu"
      single-line
      readonly
      hide-details
    ></v-text-field>
    <v-data-table
      :headers="headers"
      :items="results"
      item-key="number"
      :loading="loading"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <tr class="pointer" @click="onClick(props.item)">
          <td class="caption text-xs-center number px-1">{{ props.item.number }}</td>
          <td class="caption text-xs-center title px-1">{{ props.item.policy_name }}</td>
          <td class="caption text-truncate content px-2">{{ props.item.policy_intro }}</td>
          <td class="caption text-xs-center target px-1">{{ props.item.target }}</td>
          <td class="caption text-xs-center text-no-wrap px-1">{{ props.item.condition }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  props: {
    menu: {
      type: String,
      default: ''
    },
    results: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      imageDialogConfig: {
        isActive: false,
        image: ''
      },
      search: "",
      desserts: [],
      loading: false,
      pagination: {},
      headers: [
        {
          text: '번호',
          align: 'center',
          sortable: false,
          value: 'number',
          class: 'px-1'
        },
        {
          text: '사업명',
          align: 'center',
          sortable: false,
          value: 'policy_name',
          class: 'px-1'
        },
        {
          text: '사업소개',
          align: 'left',
          sortable: false,
          value: 'policy_intro',
          class: 'px-2'
        },
        { 
          text: '대상',
          align: 'center',
          value: 'target',
          sortable: false,
          class: 'px-1'
        },
        { 
          text: '상태',
          align: 'center',
          value: 'condition',
          sortable: false,
          class: 'px-1'
        },
        // { 
        //   text: '등록일',
        //   align: 'center',
        //   value: 'createdAt',
        //   sortable: false,
        //   // width:'90px',
        //   class: 'px-1'
        // },
        // { 
        //   text: '조회수',
        //   align: 'center',
        //   value: 'views',
        //   sortable: false,
        //   // width: '30px',
        //   class: 'px-1'
        // },
      ]
    }
  },
  computed: {
    keyword() {
      return this.$route.query.keyword
    }
  },
  methods: {
    makePreview(body) {
      let result = ""

      if (body) {
        result = body
        if (result.length > 1000) {
          result = body.substr(0, 1000) + ' ....'
        }
      }

      return result
    },
    onClick(item) {
      this.$router.push({
        name: 'details',
        query: {
          keyword: this.keyword,
          title: item.title
        }
      })
    }
  }
}
</script>

<style scope>
td.number {
  width: 30px;
}
td.title {
  max-width: 55px;
}
td.content {
  max-width: 100px;
}
td.target {
  max-width: 55px;
}
</style>
