<template>
  <div>
    <ImageDialog :dialog-config="imageDialogConfig"></ImageDialog>
    <v-card id="details" flat>
      <v-card class="mb-1 mx-1">
        <v-layout column class="px-3 py-2">
          <span class="title mt-1 mb-2 grey--text">{{ contents.category }}</span>
          <span class="title my-1">{{ contents.title }}</span>
        </v-layout>
      </v-card>
      <v-layout row wrap>
        <v-flex xs12 sm5 d-flex>
          <v-card class="mx-1 my-1">
            <v-layout row wrap justify-center>
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
              <v-img
                v-else
                :src="require('@/assets/ch29.jpg')"
                class="ma-5"
                contain
              >
              </v-img>
              <span
                v-if="contents.media.name"
                class="body-1 pa-3"
              >{{ contents.media.name }}</span>
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
                v-for="(key, index) in Object.keys(menu)" :key="`detail${index}`"
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
import { details } from '@/api'

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
        category: "",
        title: "",
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
          name: ""
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
    contentId() {
      return this.$route.params.id
    }
  },
  created() {
    this.readData()
  },
  methods: {
    readData() {
      details.read(this.contentId)
      .then((response) => {
        const data = response.data

        this.menu.businessIntro = `${data.item_type ? data.item_type : "사업"}소개`

        this.contents = {
          category: data.category ? data.category : "",
          title: data.policy_name ? data.policy_name : "",
          businessIntro: data.policy_intro ? data.policy_intro : "",
          target: data.target ? data.target : "",
          receivingPeriod: `${data.receive_stdt.split('T')[0]} ~ ${data.receive_eddt.split('T')[0]}`,
          businessPeriod: `${data.policy_stdt.split('T')[0]} ~ ${data.policy_eddt.split('T')[0]}`,
          details: data.support_info ? data.support_info : "",
          question: data.qna ? data.qna : "",
          tips: data.tip ? data.tip : "",
          hash: data.hash ? data.hash : "",
          media: {
            type: data.url_type ? data.url_type : "",
            src: data.url ? data.url : "",
            name: data.url_name ? data.url_name : ""
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })
    },
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
