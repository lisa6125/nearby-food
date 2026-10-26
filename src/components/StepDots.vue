<script setup>
import { useRouter } from 'vue-router'
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/components/ui/stepper'

const props = defineProps({
  current: { type: Number, required: true },
})

const router = useRouter()

const steps = [
  { title: '輸入', route: 'meal', skippable: false },
  { title: '推薦', route: 'suggest', skippable: false },
  { title: '前往', route: 'accepted', skippable: false },
]

function canGo(index) {
  if (index === props.current || !steps[index].route) return false
  if (index < props.current) return true
  const skipped = steps.slice(props.current + 1, index)
  return skipped.length > 0 && skipped.every((step) => step.skippable)
}

function onPick(step) {
  const index = step - 1
  if (!canGo(index)) return
  router.push({ name: steps[index].route })
}
</script>

<template>
  <Stepper
    :linear="false"
    :model-value="current + 1"
    class="mb-4 flex w-full items-start gap-2"
    aria-label="選餐步驟"
    @update:model-value="onPick"
  >
    <StepperItem
      v-for="(item, index) in steps"
      :key="item.title"
      :step="index + 1"
      :disabled="index !== current && !canGo(index)"
      class="relative flex w-full flex-col items-center justify-center"
    >
      <StepperTrigger>
        <StepperIndicator class="bg-muted">{{ index + 1 }}</StepperIndicator>
        <StepperTitle>{{ item.title }}</StepperTitle>
      </StepperTrigger>
      <StepperSeparator
        v-if="index < steps.length - 1"
        class="absolute top-5 right-[calc(-50%+10px)] left-[calc(50%+20px)] block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
      />
    </StepperItem>
  </Stepper>
</template>
