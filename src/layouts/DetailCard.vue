<template>
  <div class="pb-2">
    <div class="text-secondary">{{ heading }}</div>
    <div class="card mb-2">
      <div class="card-body p-1 p-md-2">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DetailCard',
  props: {
    heading: String,
  }
}
</script>