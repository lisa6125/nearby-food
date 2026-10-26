<script lang="ts" setup>
import { reactiveOmit } from "@vueuse/core"
import { cn } from "cn"
import { StepperTitle, useForwardProps } from "reka-ui"

const props = defineProps<{
  class?: any
}>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <StepperTitle v-bind="forwarded" :class="cn('text-md font-semibold whitespace-nowrap', props.class)">
    <slot />
  </StepperTitle>
</template>
