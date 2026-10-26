<script setup lang="ts">
import { reactiveOmit } from "@vueuse/core"
import { cn } from "cn"
import { DialogDescription, useForwardProps } from "reka-ui"

const props = defineProps<{
  class?: any
}>()

const delegatedProps = reactiveOmit(props, "class")

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DialogDescription
    data-slot="dialog-description"
    v-bind="forwardedProps"
    :class="cn('text-muted-foreground text-sm', props.class)"
  >
    <slot />
  </DialogDescription>
</template>
