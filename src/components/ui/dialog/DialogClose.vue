<script setup lang="ts">
import { DialogClose } from "reka-ui"

const props = defineProps<{
  asChild?: boolean
  as?: any
}>()
</script>

<template>
  <DialogClose
    data-slot="dialog-close"
    v-bind="props"
  >
    <slot />
  </DialogClose>
</template>
