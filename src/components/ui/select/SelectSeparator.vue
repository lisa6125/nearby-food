<script setup lang="ts">
import { reactiveOmit } from "@vueuse/core"
import { cn } from "cn"
import { SelectSeparator } from "reka-ui"

const props = defineProps<{
  class?: any
}>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <SelectSeparator
    data-slot="select-separator"
    v-bind="delegatedProps"
    :class="cn('bg-border pointer-events-none -mx-1 my-1 h-px', props.class)"
  />
</template>
