<template>
  <div class="p-4 mt-5">
    <div class="text-center mb-4">
      <cld-image public-id="sandkastenliga/favicon" height="40" responsive="true"/>
      <div class="h5">ResultServer Management Console</div>
    </div>
    <form @submit.prevent="submit">
      <div class="form-group">
        <label for="usernameInput">Nutzername</label>
        <input type="text"
               id="usernameInput"
               v-model="credentials.username"
               class="form-control"
               autocomplete="">
      </div>
      <div class="form-group">
        <label for="usernameInput">Passwort</label>
        <input type="password"
               id="passwordInput"
               v-model="credentials.password"
               class="form-control">
      </div>
      <div class="form-group">
        <button
            type="submit"
            class="btn btn-primary">
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      credentials: {}
    }
  },
  methods: {
    submit() {
      this.$emit('login', this.credentials)
    }
  }
}
</script>
