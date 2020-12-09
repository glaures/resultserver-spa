<template>
  <div>
    <router-view @error="error = $event"/>
    <div v-if="error"
         class="alert alert-danger alert-dismissible fade show" role="alert">
      {{ error.message }}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Resultserver-Admin-Console',
  data() {
    return {
      error: null
    }
  }
}
</script>

<style lang="scss">
@import './assets/styles/custom.scss';
@import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>
