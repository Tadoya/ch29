<template>
  <div>
    <ImageDialog :dialog-config="imageDialogConfig"></ImageDialog>
    <v-card id="details" flat>
      <v-card class="mb-1 mx-1">
        <v-layout column class="px-3 py-2">
          <span class="title my-1 grey--text">주거</span>
          <span class="title my-1">{{ $route.query.title }}</span>
        </v-layout>
      </v-card>
      <v-layout row wrap>
        <v-flex xs12 sm5 d-flex>
          <v-card class="mx-1 my-1">
            <v-layout row wrap fill-height justify-center>
              <div
                v-if="contents.media.type==='video'"
                class="iframe-container ma-1"
              >
                <iframe
                  class="iframe-size"
                  :src="contents.media.src"
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                >
                </iframe>
              </div>
              <v-img
                v-else-if="contents.media.type==='img'"
                :src="contents.media.src"
                @click.stop="imgClickEvent(contents)"
              >
                <v-layout
                  slot="placeholder"
                  fill-height
                  align-center
                  justify-center
                  ma-0
                >
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-layout>
              </v-img>
            </v-layout>
          </v-card>
        </v-flex>
        <v-flex
          xs12
          sm7
        >
          <v-card class="mx-1 my-1 blue-grey lighten-5">
            <v-layout column fill-height justify-space-between class="pt-2">
              <v-layout
                v-for="key in Object.keys(menu)" :key="key"
                row fill-height
              > 
                <v-flex :class="breakpoint==='xs'?'xs4':'xs3'">
                  <v-textarea
                    v-model="menu[key]"
                    class="body-1"
                    single-line
                    hide-details
                    full-width
                    rows="1"
                    no-resize
                    readonly
                  ></v-textarea>
                </v-flex>
                <v-textarea
                  v-model="contents[key]"
                  class="caption"
                  readonly
                  disabled
                  rows="1"
                  full-width
                  auto-grow
                  single-line
                  hide-details
                >
                </v-textarea>
              </v-layout>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
import ImageDialog from '@/components/u/dialog/ImageDialog'

export default {
  components: {
    ImageDialog
  },
  data() {
    return {
      imageDialogConfig: {
        isActive: false,
        image: ''
      },
      contents: {
        businessIntro: `사업소개에 대한 내용들`,
        target: `단독세대주인 청년계층`,
        receivingPeriod: `2019.05.01 ~ 2019.05.08`,
        businessPeriod: `2019.06.01 ~ 2020.05.08`,
        details: `지원사업에 대한 자세한 내용.\n.\n.\n.\n.`,
        question: `지원사업에 대한 문의사항들.\n.\n.`,
        tips: `채널스물아홉팁에 대한 내용들.\n.\n.`,
        hash: `해시태그들... #행복주택`,
        media: {
          type: 'video',
          src: "https://www.youtube.com/embed?listType=playlist&list=PLQceRxs7JHtIC6jDhAKEsHjj0Q-5FIwCI",
        }
      },
      menu: {
        businessIntro: `사업소개`,
        target: `대상`,
        receivingPeriod: `접수기간`,
        businessPeriod: `사업기간`,
        details: `지원내용`,
        question: `문의사항`,
        tips: `채널스물아홉팁`,
        hash: `해시태그`
      },
      // '사업소개', '대상', '접수시간', '사업기간', '지원내용', '문의사항', '채널스물아홉팁', '해시태그' 
    }
  },
  computed: {
    breakpoint() {
      return this.$vuetify.breakpoint.name
    },
  },
  methods: {
    imgClickEvent(item) {
      this.imageDialogConfig.src = item.content.src
      this.imageDialogConfig.isActive = true
    },
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
  }
}
</script>

<style scope>
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
