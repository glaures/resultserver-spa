<template>
  <centered-layout>
    <template v-slot:main>
      <div class="row m-auto">
        <div class="col-12 col-md-6 offset-md-4">
          <login @login="login($event)"></login>
        </div>
      </div>
    </template>
  </centered-layout>
</template>

<script>
import CenteredLayout from "@/layouts/CenteredLayout";
import Login from "@/components/Login";

export default {
  methods: {
    async login(credentials) {
      try {
        await this.$store.dispatch('login', credentials)
        await this.$router.push('/')
      } catch(error){
        await this.$store.dispatch('showMessage', {
          message: error.message,
          type: 'warning'
        })
      }
    }
  },
  components: {Login, CenteredLayout}
}
</script>