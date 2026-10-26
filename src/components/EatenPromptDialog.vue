<script setup>
import { computed, ref } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { submitEatenRecord } from '../data/eatenRecord'

const props = defineProps({
  open: { type: Boolean, required: true },
  pending: { type: Object, required: true },
})

const emit = defineEmits(['update:open', 'submitted'])

const eatenAt = ref(localInput(new Date()))
const reaction = ref(null)
const error = ref('')

const maxAt = computed(() => localInput(new Date()))

function localInput(date) {
  const pad = (value) => String(value).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

function pick(value) {
  reaction.value = reaction.value === value ? null : value
}

function submit() {
  const chosen = new Date(eatenAt.value)
  if (Number.isNaN(chosen.getTime()) || chosen.getTime() > Date.now()) {
    error.value = '食用時間不能晚於現在，請修改。'
    return
  }
  error.value = ''
  submitEatenRecord(props.pending, chosen.toISOString(), reaction.value)
  emit('update:open', false)
  emit('submitted')
}
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="sm:max-w-md">
      <DialogTitle class="text-2xl">吃完了嗎</DialogTitle>
      <DialogDescription>
        {{ pending.mealName }} · {{ pending.storeName }}
      </DialogDescription>
      <label class="time">
        <span>食用時間</span>
        <input v-model="eatenAt" type="datetime-local" :max="maxAt" />
      </label>
      <p class="hint">可以改成較早的時間，不能晚於現在。</p>
      <p v-if="error" class="error">{{ error }}</p>
      <h3>喜歡這一份嗎？（可以不選）</h3>
      <div class="reactions">
        <button
          type="button"
          class="choice"
          :class="{ on: reaction === 'like' }"
          @click="pick('like')"
        >
          喜歡
        </button>
        <button
          type="button"
          class="choice"
          :class="{ on: reaction === 'dislike' }"
          @click="pick('dislike')"
        >
          不喜歡
        </button>
      </div>
      <p class="note">接受不等於吃了。送出紀錄才會記下來。喜歡與不喜歡另外記。</p>
      <button type="button" class="submit" @click="submit">送出紀錄</button>
    </DialogContent>
  </Dialog>
</template>

<style scoped>
.time {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-bottom: 1px solid #ececec;
  padding-bottom: 12px;
  font-weight: 800;
}

.time input {
  border: 0;
  background: transparent;
  font-weight: 800;
}

.hint,
.note {
  color: #6f6f6f;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.5;
}

.error {
  border-radius: 14px;
  background: #fff6d0;
  padding: 10px 12px;
  font-weight: 800;
}

h3 {
  font-size: 16px;
}

.reactions {
  display: flex;
  gap: 8px;
}

.choice {
  flex: 1;
  border: 0;
  border-radius: 999px;
  background: #f3f3f3;
  padding: 14px;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
}

.choice.on {
  background: #1c1c1c;
  color: #fff;
}

.submit {
  width: 100%;
  border: 0;
  border-radius: 999px;
  background: #1c1c1c;
  color: #fff;
  padding: 14px;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
}
</style>
