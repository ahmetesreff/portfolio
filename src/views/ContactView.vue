<template>
  <div class="tw-page">
    <TerminalWindow path="~/contact" live>
      <ContactInfo />
    </TerminalWindow>
  </div>
</template>

<script setup>
import TerminalWindow from '../components/TerminalWindow.vue'
import ContactInfo from '../components/contact/ContactInfo.vue'
</script>
