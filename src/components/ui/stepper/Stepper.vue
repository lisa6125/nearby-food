<script lang="ts" setup>
import { reactiveOmit } from "@vueuse/core"
import { cn } from "cn"
import { StepperRoot, useForwardPropsEmits } from "reka-ui"

const props = defineProps<{
  class?: any
  defaultValue?: number
  modelValue?: number
  linear?: boolean
  orientation?: "horizontal" | "vertical"
  dir?: "ltr" | "rtl"
}>()
const emits = defineEmits<{
  "update:modelValue": [value: number | undefined]
}>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <StepperRoot
    v-slot="slotProps"
    :class="cn(
      'flex gap-2',
      props.class,
    )"
    v-bind="forwarded"
  >
    <slot v-bind="slotProps" />
  </StepperRoot>
</template>
