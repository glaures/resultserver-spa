<template>
  <div>
    <navigation></navigation>
    <div class="m-4">
      <div class="h5 text-primary pb-1 mb-3 border-bottom">
        <span v-if="header">{{header}}</span>
        <slot v-else name="header"></slot>
      </div>
      <div>
        <slot name="main"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import navigation from '@/components/Navigation'

export default {
  props: {
    header: String
  },
  components: {
    navigation
  }
}
</script>