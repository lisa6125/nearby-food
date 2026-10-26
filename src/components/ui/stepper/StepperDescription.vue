<script lang="ts" setup>
import { reactiveOmit } from "@vueuse/core"
import { cn } from "cn"
import { StepperDescription, useForwardProps } from "reka-ui"

const props = defineProps<{
  class?: any
}>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <StepperDescription v-slot="slotProps" v-bind="forwarded" :class="cn('text-xs text-muted-foreground', props.class)">
    <slot v-bind="slotProps" />
  </StepperDescription>
</template>
