<template>
  <div class="tw-window">
    <div class="tw-bar">
      <div class="tw-lights" aria-hidden="true">
        <i></i><i></i><i></i>
      </div>
      <span class="tw-path">aek@portfolio:{{ path }}</span>
      <span v-if="live" class="tw-live" aria-hidden="true">
        <i></i>live
      </span>
      <span v-else class="tw-spacer" aria-hidden="true"></span>
    </div>
    <div class="tw-screen">
      <div class="tw-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  path: { type: String, required: true },
  live: { type: Boolean, default: false }
})
</script>
