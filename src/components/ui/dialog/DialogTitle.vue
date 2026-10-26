<script setup lang="ts">
import { reactiveOmit } from "@vueuse/core"
import { cn } from "cn"
import { DialogTitle, useForwardProps } from "reka-ui"

const props = defineProps<{
  class?: any
}>()

const delegatedProps = reactiveOmit(props, "class")

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DialogTitle
    data-slot="dialog-title"
    v-bind="forwardedProps"
    :class="cn('text-lg leading-none font-semibold', props.class)"
  >
    <slot />
  </DialogTitle>
</template>
