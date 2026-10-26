<script lang="ts" setup>
import { reactiveOmit } from "@vueuse/core"
import { cn } from "cn"
import { StepperTrigger, useForwardProps } from "reka-ui"

const props = defineProps<{
  class?: any
}>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <StepperTrigger
    v-bind="forwarded"
    :class="cn('p-1 flex flex-col items-center text-center gap-1 rounded-md', props.class)"
  >
    <slot />
  </StepperTrigger>
</template>
