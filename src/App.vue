<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  async created() {
    if (this.$route.name !== 'login') {
      console.log('trying autoLogin')
      await this.$store.dispatch('autoLogin')
      if (!this.$store.getters.loggedIn) {
        console.log('autoLogin failed')
        await this.$router.push({name: 'login'})
      } else {
        console.log('autoLogin successful')
      }
    }
  },
  computed: {
    ...mapGetters(['message'])
  },
  methods: {
    ...mapActions(['clearMessages'])
  },
  watch: {
    message() {
    }
  }
}
</script>

<style lang="scss">
@import './assets/styles/custom.scss';
@import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>
