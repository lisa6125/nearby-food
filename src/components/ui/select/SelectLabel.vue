<script setup lang="ts">
import { cn } from "cn"
import { SelectLabel } from "reka-ui"

const props = defineProps<{
  class?: any
}>()
</script>

<template>
  <SelectLabel
    data-slot="select-label"
    :class="cn('text-muted-foreground px-2 py-1.5 text-xs', props.class)"
  >
    <slot />
  </SelectLabel>
</template>
