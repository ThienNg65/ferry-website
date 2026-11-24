<script setup lang="ts">
import { STORE_URL } from '~/utils/release'
</script>

<template>
  <GoRedirect
    title="Redirecting to Microsoft Store - Ferry"
    destination-label="Microsoft Store"
    :target="STORE_URL"
  />
</template>
