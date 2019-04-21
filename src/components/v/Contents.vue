<template>
  <v-layout column>
    <v-card
      class="ma-1"
      height="50"
    >
      <v-layout row fill-height align-center>
        <span class="absolute subheading font-weight-medium pl-2"><v-icon>calendar_today</v-icon> 채널스물아홉TV</span>
      </v-layout>
    </v-card>
    <v-card class="ma-1">
      <v-layout row fill-height justify-center align-center>
        <v-btn
          icon
          small
          @click="onBefore"
        >
          <v-icon>chevron_left</v-icon>
        </v-btn>
        <v-tabs
          v-model="contentPosition"
          style="max-width:calc(100% - 36px - 36px)"
          height="280"
          class="hide-arrows"
          hide-slider
        >
          <v-tab
            v-for="item in items"
            :key="item.title"
          >
            <v-card flat>
              <v-card-title class="px-1 pt-0 pb-2">
                <span class="body-2 font-weight-bold text-truncate">
                  {{ item.title }}
                </span>
              </v-card-title>
              <div class="iframe-container">
                <iframe
                  class="iframe-size"
                  :src="item.src"
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                >
                </iframe>
              </div>
              <v-textarea
                v-model="item.description"
                readonly
                no-resize
                full-width
                single-line
                hide-details
                height="70"
                row="4"
                class="caption pointer mb-3 padding-zero mx-1"
              />
            </v-card>
          </v-tab>
        </v-tabs>
        <v-btn
          icon
          small
          @click="onNext"
        >
          <v-icon>chevron_right</v-icon>
        </v-btn>
      </v-layout>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      contentPosition: null,
      items: [
        {
          src: "https://www.youtube.com/embed?listType=playlist&list=PLQceRxs7JHtIC6jDhAKEsHjj0Q-5FIwCI",
          title: "청년정책 브리핑",
          description: '한달에 150만원 받고 정국이가 신난 이유\n#취업 #실업수당\n1\n2\n3'
        },
        {
          src: "https://www.youtube.com/embed?listType=playlist&list=PLQceRxs7JHtJnLyBsr3aSoASfuktJj1j0",
          title: "다섯명의 청년 이야기1",
          description: '한달에 150만원 받고 정국이가 신난 이유\n#취업 #실업수당'
        },
        {
          src: "https://www.youtube.com/embed?listType=playlist&list=PLQceRxs7JHtJnLyBsr3aSoASfuktJj1j0",
          title: "다섯명의 청년 이야기2",
          description: '한달에 150만원 받고 정국이가 신난 이유\n#취업 #실업수당'
        },
        {
          src: "https://www.youtube.com/embed?listType=playlist&list=PLQceRxs7JHtJnLyBsr3aSoASfuktJj1j0",
          title: "다섯명의 청년 이야기3",
          description: '한달에 150만원 받고 정국이가 신난 이유\n#취업 #실업수당'
        },
        {
          src: "https://www.youtube.com/embed?listType=playlist&list=PLQceRxs7JHtJnLyBsr3aSoASfuktJj1j0",
          title: "다섯명의 청년 이야기4",
          description: '한달에 150만원 받고 정국이가 신난 이유\n#취업 #실업수당'
        },
        {
          src: "https://www.youtube.com/embed?listType=playlist&list=PLQceRxs7JHtJnLyBsr3aSoASfuktJj1j0",
          title: "다섯명의 청년 이야기5",
          description: '한달에 150만원 받고 정국이가 신난 이유\n#취업 #실업수당'
        },
        {
          src: "https://www.youtube.com/embed?listType=playlist&list=PLQceRxs7JHtJnLyBsr3aSoASfuktJj1j0",
          title: "다섯명의 청년 이야기6",
          description: '한달에 150만원 받고 정국이가 신난 이유\n#취업 #실업수당'
        },
      ]
    }
  },
  mounted() {
    if (this.items.length) {
      this.contentPosition = ~~(this.items.length / 2)
    }
  },
  methods: {
    onBefore() {
      const active = parseInt(this.contentPosition)
      
      this.contentPosition = (active > 0 ? active - 1 : this.items.length - 1)
    },
    onNext() {
      const active = parseInt(this.contentPosition)

      this.contentPosition = (active < this.items.length - 1 ? active + 1 : 0)
    }
  }
}
</script>
 
<style scoped>
  .iframe-container {
    position: relative;
    min-width: 260px;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
  }
  .iframe-size {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>

<style>
  .hide-arrows i{
    display: none;
  }
  .padding-zero .v-input__slot {
    padding: 0!important;
  }
</style>
