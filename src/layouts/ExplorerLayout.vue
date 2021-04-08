<template>
  <standard-layout :header="header">
    <template v-slot:main>
      <div class="row">
        <div class="col-12 col-md-4"
             :class="{'d-none d-md-block': workHeader}">
          <slot name="select" :explorer-select="select"></slot>
        </div>
        <div class="col-12 col-md-8"
             :class="{'d-none': !workHeader}">
          <slot name="work-header" :explorer-unselect="unselect">
            <div v-if="workHeader"
                 class="d-md-none border-bottom border-secondary text-primary pb-1 mb-3 d-flex"
                 @click="unselect">
              <div class="align-content-stretch align-middle link">
                <font-awesome-icon icon="angle-left" class="text-primary h-100"/>
              </div>
              <div class="flex-fill ml-3">
                {{ workHeader }}
              </div>
            </div>
          </slot>
          <slot name="work" :explorer-unselect="unselect">
          </slot>
        </div>
      </div>
    </template>
  </standard-layout>
</template>

<script>
import StandardLayout from "@/layouts/StandardLayout";

export default {
  props: {
    header: String
  },
  data() {
    return {
      workHeader: undefined
    }
  },
  methods: {
    select(workHeader) {
      this.workHeader = workHeader
    },
    unselect() {
      this.workHeader = undefined
    }
  },
  components: {StandardLayout}
}
</script>