<template>
  <v-toolbar
    class="pa-0 ma-0"
    :height="isHome?'180px':'130px'"
    transition="fade-transition"
    fixed
    :color="computedColor"
  >
    <v-layout fill-height align-start>
      <v-layout column :fill-height="false">
        <!-- 로고, & icons -->
        <v-layout row justify-center>
          <v-flex xs12 class="max-1000">
            <div
              v-if="!isScrollingUp"
              class="toobar-background"
            >
            </div>
            <v-layout row fill-height align-center>
              <v-btn
                class="px-0 pb-1 mx-0"
                flat
                large
                href="/"
              >
                <img
                  height="50"
                  src="@/assets/ch.29-ci.png"
                />
              </v-btn>
              <v-spacer></v-spacer>
              <v-toolbar-items class="opacity-3">
                <v-btn
                  v-for="(item, index) in menus" :key="`menu${index}`"
                  class="hidden-xs-only"
                  flat :dark="!isScrollingUp"
                >
                  {{ item.name }}
                </v-btn>
                <v-btn icon :dark="!isScrollingUp" :href="channels.youtube" target="_blank"><v-icon color="red">fab fa-youtube</v-icon></v-btn>
                <v-btn icon :dark="!isScrollingUp" :href="channels.facebook" target="_blank"><v-icon color="blue darken-4">fab fa-facebook</v-icon></v-btn>
                <v-btn icon :dark="!isScrollingUp" :href="channels.naver" target="_blank"><v-icon color="green">fab fa-blogger</v-icon></v-btn>
                <!-- <v-btn icon :dark="!isScrollingUp"><v-icon>search</v-icon></v-btn> -->
                <v-menu
                  v-if="menus.length"
                  class="hidden-sm-and-up"
                  content-class="hidden-sm-and-up fixed"
                  :close-on-content-click="false"
                >
                  <v-btn
                    slot="activator"
                    :dark="!isScrollingUp"
                    icon
                    small
                  >
                    <v-icon>more_vert</v-icon>
                  </v-btn>
                  <v-card>
                    <v-layout column justify-end>
                      <v-btn
                        v-for="item in menus" :key="item.name"
                        flat
                      >
                        {{ item.name }}
                      </v-btn>
                    </v-layout>
                  </v-card>
                </v-menu>
              </v-toolbar-items>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout row justify-center>
          <v-flex xs12 class="max-1000">
            <v-layout row fill-height align-center justify-center>
              <v-text-field
                v-model="search"
                class="ml-3 mr-1"
                :class="breakpoint==='xs'?'caption':'subheading'"
                placeholder="청년 정책을 검색하세요! ex)창업, 행복주택"
                outline
                single-line
                hide-details
                @keypress.enter="onSearch"
              ></v-text-field>
              <v-btn
                large round :loading="isSearching"
                color="success" class="mx-1"
                :icon="breakpoint==='xs'"
                @click="onSearch"
              >
                <v-icon>search</v-icon>
                <span v-if="breakpoint !== 'xs'" class="ml-2">검색</span>
              </v-btn>
              <v-btn
                large round dark
                color="blue darken-4" class="mx-1"
                :icon="breakpoint==='xs'"
              >
                <v-icon>person</v-icon>
                <span v-if="breakpoint !== 'xs'" class="ml-2">로그인</span>
              </v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout
          v-if="isHome"
          row justify-center
        >
          <v-flex xs12 class="max-1000">
            <v-divider class="ml-3 mr-1 my-2"/>
          </v-flex>
        </v-layout>
        <v-layout
          v-if="isHome"
          row
          :justify-center="breakpoint!=='xs'"
          :justify-space-between="breakpoint==='xs'"
          class="mb-2"
          style="overflow:auto;"
        >
          <v-chip
            v-for="(item, index) in categories" :key="`category${index}`"
            outline
            :color="isSelectedCategory(item)?`green lighten-2`:`black`"
            class="pointer"
            :class="{ 'mx-3': breakpoint!==`xs` }"
            @click.stop="onClickChip(item)"
          >
            <span class="caption">{{ item }}</span>
          </v-chip>
        </v-layout>
      </v-layout>
    </v-layout>
  </v-toolbar>
</template>

<script>
import channels from '@/assets/js/channels'
export default {
  props: {
    color: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isScrollingUp: true,
      offsetTop: 0,
      mainImageSize: 0,
      channels: channels,
      menus: [
        // { name: 'home' },
        // { name: '정책검색' },
      ],
      search: '',
      isSearching: false,
      // categories: [
      //   { text: `전체`, value: `전체` },
      //   { text: `취업/직장`, value: `취업/직장` },
      //   { text: `창업`, value: `창업` },
      //   { text: `복지/문화`, value: `복지/문화` },
      //   { text: `주거`, value: `주거` },
      //   { text: `금융`, value: `금융` },
      // ],
      categories: [
        `전체`, `취업/직장`, `창업`, `복지/문화`, `주거`, `금융`
      ],
      selectedCategories: ['전체']
    }
  },
  computed: {
    computedColor() {
      let result = 'transparent'

      if (this.isScrollingUp) {
        // result = "#0463B6"
        result = "white"
      }

      return result
    },
    breakpoint() {
      return this.$vuetify.breakpoint.name
    },
    isHome() {
      return (this.$route.name === 'home') ? true : false
    }
  },
  watch: {
    // '$route.path'(v) {
    //   console.log(v)
    //   const hashPath = v.replace('/', '#')

    //   if (hashPath === '#') {
    //     this.$vuetify.goTo(0)
    //   } else {
    //     this.$vuetify.goTo(hashPath, { offset: -63 })
    //   }
    // }
  },
  created() {
    if (this.$route.query.keyword) {
      this.search = this.$route.query.keyword
    }
  },
  methods: {
    onClickChip(item) {
      if (item === '전체') {
        this.selectedCategories = ['전체']
        this.$store.commit('SET_CATEGORY_SELECTED', this.selectedCategories)

        return
      } 
      
      const indexOfItem = this.selectedCategories.indexOf(item)

      if (indexOfItem > -1) {
        this.selectedCategories.splice(indexOfItem, 1)
        if (!this.selectedCategories.length) {
          this.selectedCategories = ['전체']
        }
      } else {
        if (this.selectedCategories.indexOf('전체') > -1) {
          this.selectedCategories.splice(this.selectedCategories.indexOf('전체'))
        }
        this.selectedCategories.push(item)
        if (this.selectedCategories.length === this.categories.length - 1) {
          this.selectedCategories = ['전체']
        }
      }
      this.$store.commit('SET_CATEGORY_SELECTED', this.selectedCategories)
    },
    onSearch() {
      if (!this.search) { return }
      this.$router.push({ name: 'search', query: { keyword: this.search }})
    },
    isSelectedCategory(item) {
      let result = false

      if (this.selectedCategories.indexOf(item) > -1) {
        result = true
      }

      return result
    }
    // onScroll() {
    //   this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
    //   this.mainImageSize = document.getElementsByClassName('v-carousel')[0].clientHeight
    //   if (this.offsetTop > this.mainImageSize || this.offsetTop < 60) {
    //     this.isScrollingUp = true
    //   } else {
    //     this.isScrollingUp = false
    //   }
    // },
    // toTop() {
    //   this.$router.push('/')
    //   this.$vuetify.goTo(0)
    // },
    // goEvent(item) {
    //   const path = item.name.toLowerCase()
    //   const hashPath = '#' + path
      
    //   this.$router.push(path)

    //   if (hashPath === '#') {
    //     this.$vuetify.goTo(0)
    //   } else {
    //     this.$vuetify.goTo(hashPath, { offset: -63 })
    //   }
    // }
  }

}
</script>

<style scoped>
  .fixed {
    position: fixed;
    top:55px !important;
  }
  .toobar-background {
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.4;
  }
</style>
