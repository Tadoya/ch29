<template>
  <v-layout column>
    <v-card
      class="ma-1"
      height="50"
    >
      <v-layout row fill-height align-center>
        <span class="absolute subheading font-weight-medium pl-2"><v-icon>play_circle_outline</v-icon> 채널스물아홉TV</span>
      </v-layout>
    </v-card>
    <v-card class="ma-1">
      <v-card
        v-if="!items.length"
        height="280"
        flat
      >
        <v-layout row align-center justify-center fill-height="">
          <span class="title">준비된 영상 자료가 없습니다.</span>
        </v-layout>
      </v-card>
      <v-layout
        v-else
        row fill-height justify-center align-center
      >
        <v-btn
          icon
          small
          @click="onBefore"
        >
          <v-icon>chevron_left</v-icon>
        </v-btn>
        <v-tabs
          v-model="contentPosition"
          style="max-width:calc(100% - 36px - 36px);"
          height="280"
          class="hide-arrows"
          hide-slider
        >
          <v-tab
            v-for="(item, index) in items" :key="`contents${index}`"
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
  props: {
    items: { type: Array, required: false, default: () => [{
      src: "",
      title: "",
      description: ""
    }]}
  },
  data() {
    return {
      contentPosition: null,
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
