function decision(id, term, value) {
  return {
    id,
    term,
    type: 'category',
    value,
    options: ['exclude', 'less_preferred'],
  }
}

export function mockConditionResponse(draft) {
  const text = typeof draft.text === 'string' ? draft.text : ''
  const avoid = draft.avoid || ''
  const needsDecision = []
  const conflicts = []
  const unsupported = []

  if (text.includes('便當')) {
    needsDecision.push(decision('d-bento', '不想再吃便當', '便當'))
  }
  if (avoid === '牛' && text.includes('牛肉麵')) {
    conflicts.push({
      id: 'c-beef-noodle',
      term: '牛肉麵',
      selection: `不吃${avoid}`,
      message: `你勾選了不吃${avoid}，但文字提到「牛肉麵」，可以先修正其中一項。`,
    })
  }
  if (text.includes('肯德基')) {
    unsupported.push({ term: '肯德基', reason: 'no_data' })
  }

  const blocked = needsDecision.length + conflicts.length + unsupported.length > 0

  return {
    status: 'pending_confirm',
    can_confirm: !blocked,
    raw_text: text || null,
    summary: {
      preferences: (draft.tastes || []).map((value) => ({ type: 'taste', value })),
      exclusions: [],
      less_preferred: [],
      needs_decision: needsDecision,
      conflicts,
      unsupported,
    },
    error: blocked
      ? {
          code: 'CONFLICT_UNRESOLVED',
          message: '仍有需要使用者決定或矛盾的項目，處理後才能確認。',
        }
      : null,
  }
}

export function submitConditions(draft) {
  return Promise.resolve(mockConditionResponse(draft))
}
