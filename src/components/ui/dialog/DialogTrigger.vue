<script setup lang="ts">
import { DialogTrigger } from "reka-ui"

const props = defineProps<{
  asChild?: boolean
  as?: any
}>()
</script>

<template>
  <DialogTrigger
    data-slot="dialog-trigger"
    v-bind="props"
  >
    <slot />
  </DialogTrigger>
</template>
