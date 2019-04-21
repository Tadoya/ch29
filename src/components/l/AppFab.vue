<template>
  <v-fab-transition>
    <v-btn v-show="fab" v-scroll="onScroll" fab="fab" small dark="dark" fixed="fixed" bottom="bottom" right="right" color="red" @click.stop="toTop">
      <v-icon>keyboard_arrow_up</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script>
export default {
  data: () => ({
    fab: false
  }),

  methods: {
    onScroll() {
      if (typeof window === 'undefined') {
        return
      }

      const appTop = window.pageYOffset || document.documentElement.offsetTop || 0

      this.fab = appTop > 300
    },
    toTop() {
      this.$router.push('/')
      this.$vuetify.goTo(0)
    }
  }
}
</script>
