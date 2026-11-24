<script setup lang="ts">
import { RELEASE_REPO, releasesPage } from '~/utils/release'

const target = releasesPage(RELEASE_REPO)
</script>

<template>
  <GoRedirect
    title="Redirecting to GitHub Releases - Ferry"
    destination-label="GitHub Releases"
    :target="target"
  />
</template>
