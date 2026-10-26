<script setup>
import { computed, reactive, watch } from 'vue';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';

const props = defineProps({
  open: { type: Boolean, required: true },
  response: { type: Object, default: null },
});

const emit = defineEmits(['update:open', 'clear-selection', 'confirm']);

const choice = reactive({});
const conflictChoice = reactive({});
const removedTerms = reactive({});

watch(
  () => props.response,
  () => {
    for (const key of Object.keys(choice)) delete choice[key];
    for (const key of Object.keys(conflictChoice)) delete conflictChoice[key];
    for (const key of Object.keys(removedTerms)) delete removedTerms[key];
  },
);

const summary = computed(() => props.response?.summary || {});
const needsDecision = computed(() => summary.value.needs_decision || []);
const conflicts = computed(() => summary.value.conflicts || []);
const unsupported = computed(() => summary.value.unsupported || []);

const unresolved = computed(() => {
  const decisionsLeft = needsDecision.value.filter(
    (item) => !choice[item.id],
  ).length;
  const conflictsLeft = conflicts.value.filter(
    (item) => !conflictChoice[item.id],
  ).length;
  const unsupportedLeft = unsupported.value.filter(
    (item) => !removedTerms[item.term],
  ).length;
  return decisionsLeft + conflictsLeft + unsupportedLeft;
});

function chooseDecision(item, value) {
  choice[item.id] = value;
}

function fixSelection(item) {
  conflictChoice[item.id] = 'selection';
  emit('clear-selection', item);
}

function removeConflict(item) {
  conflictChoice[item.id] = 'remove';
}

function removeUnsupported(item) {
  removedTerms[item.term] = true;
}

function editInstead() {
  emit('update:open', false);
}

function confirm() {
  if (unresolved.value) return;
  const exclusions = [];
  const lessPreferred = [];
  for (const item of needsDecision.value) {
    const picked = choice[item.id];
    if (picked === 'exclude') exclusions.push(item.value);
    if (picked === 'less_preferred') lessPreferred.push(item.value);
  }
  emit('confirm', { exclusions, lessPreferred });
}
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent
      class="flex max-h-[85vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-lg"
    >
      <div
        class="shrink-0 border-b border-[#ececec] bg-background px-6 pt-6 pr-14 pb-4"
      >
        <DialogTitle class="text-2xl">有幾個地方要你決定</DialogTitle>
        <DialogDescription class="mt-1.5">處理完才能確認。</DialogDescription>
      </div>

      <div class="min-h-0 flex-1 overflow-y-auto px-6 py-4">
        <article v-for="item in needsDecision" :key="item.id" class="stop">
          <p class="tag">停下 1　意思模糊</p>
          <p>「{{ item.term }}」是指這次不要，還是比較不想吃？</p>
          <div class="choices">
            <button
              type="button"
              class="choice"
              :class="{ on: choice[item.id] === 'exclude' }"
              @click="chooseDecision(item, 'exclude')"
            >
              這次不要
            </button>
            <button
              type="button"
              class="choice"
              :class="{ on: choice[item.id] === 'less_preferred' }"
              @click="chooseDecision(item, 'less_preferred')"
            >
              比較不想吃
            </button>
          </div>
        </article>

        <article v-for="item in conflicts" :key="item.id" class="stop">
          <p class="tag">停下 2　文字與勾選矛盾</p>
          <p>{{ item.message }}</p>
          <div class="choices">
            <button
              type="button"
              class="choice"
              :class="{ on: conflictChoice[item.id] === 'selection' }"
              @click="fixSelection(item)"
            >
              修改勾選
            </button>
            <button
              type="button"
              class="choice"
              :class="{ on: conflictChoice[item.id] === 'remove' }"
              @click="removeConflict(item)"
            >
              移除「{{ item.term }}」
            </button>
          </div>
        </article>

        <article v-for="item in unsupported" :key="item.term" class="stop">
          <p class="tag">停下 3　系統處理不了</p>
          <p>目前的資料裡沒有「{{ item.term }}」，可以修改或移除。</p>
          <div class="choices">
            <button type="button" class="choice" @click="editInstead">
              修改
            </button>
            <button
              type="button"
              class="choice"
              :class="{ on: removedTerms[item.term] }"
              @click="removeUnsupported(item)"
            >
              移除
            </button>
          </div>
        </article>
      </div>

      <div
        class="flex shrink-0 flex-col gap-2 border-t border-[#ececec] bg-background px-6 py-4"
      >
        <p v-if="unresolved" class="warn">
          還有需要你決定的項目，處理完才能確認。
        </p>
        <button
          type="button"
          class="confirm"
          :disabled="unresolved > 0"
          @click="confirm"
        >
          確認，推薦一份
        </button>
      </div>
    </DialogContent>
  </Dialog>
</template>

<style scoped>
.stop {
  border: 1.5px solid #ececec;
  border-radius: 18px;
  padding: 14px;
}

.stop + .stop {
  margin-top: 10px;
}

.tag {
  display: inline-block;
  margin-bottom: 8px;
  border-radius: 999px;
  background: #f3f3f3;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 800;
}

.stop p + p,
.choices {
  margin-top: 8px;
}

.stop p {
  font-weight: 700;
  line-height: 1.5;
}

.choices {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.choice {
  border: 1.5px solid #1c1c1c;
  border-radius: 999px;
  background: #fff;
  padding: 8px 14px;
  font-weight: 800;
  cursor: pointer;
}

.choice.on {
  background: #1c1c1c;
  color: #fff;
}

.warn {
  border-radius: 16px;
  background: #fff6d0;
  padding: 12px 14px;
  font-weight: 800;
  line-height: 1.5;
}

.confirm {
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

.confirm:disabled {
  background: #d9d9d9;
  color: #8d8d8d;
  cursor: default;
}
</style>
