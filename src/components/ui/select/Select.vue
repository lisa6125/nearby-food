<script setup lang="ts">
import { SelectRoot, useForwardPropsEmits } from "reka-ui"

const props = defineProps<{
  modelValue?: any
  defaultValue?: any
  open?: boolean
  defaultOpen?: boolean
  disabled?: boolean
  dir?: "ltr" | "rtl"
  name?: string
  required?: boolean
}>()
const emits = defineEmits<{
  "update:modelValue": [value: any]
  "update:open": [value: boolean]
}>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <SelectRoot
    v-slot="slotProps"
    data-slot="select"
    v-bind="forwarded"
  >
    <slot v-bind="slotProps" />
  </SelectRoot>
</template>
