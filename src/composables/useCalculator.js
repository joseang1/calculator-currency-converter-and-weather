import { ref } from 'vue'
import { useMemoryStore } from '../stores/memory.js'

export function useCalculator() {
  const memoryStore = useMemoryStore()

  const display = ref('0')
  const previousValue = ref(null)
  const currentOperator = ref(null)
  const errorMessage = ref(null)
  const waitingForNewValue = ref(null)

  function pressNumber(num) {
    if (errorMessage.value) resetAll()
    if (waitingForNewValue.value) {
      display.value = String(num)
      waitingForNewValue.value = false
    } else {
      display.value = display.value === '0' ? String(num) : display.value + num
    }
  }

  function pressDecimal() {
    if (errorMessage.value) resetAll()
    if (waitingForNewValue.value) {
      display.value = '0.'
      waitingForNewValue.value = false
      return
    }
    if (display.value.includes('.')) return
    display.value += '.'
  }

  function pressOperator(op) {
    if (errorMessage.value) return
    if (waitingForNewValue.value && currentOperator.value !== null) {
      currentOperator.value = op
      return
    }
    if (currentOperator.value !== null && previousValue.value !== null) {
      calculate()
    }
    previousValue.value = parseFloat(display.value)
    currentOperator.value = op
    waitingForNewValue.value = true
  }

  function pressEquals() {
    if (errorMessage.value) return
    if (currentOperator.value === null || previousValue.value === null) return
    calculate()
    currentOperator.value = null
    previousValue.value = true
  }

  function calculate() {
    const current = parseFloat(display.value)
    const previous = previousValue.value
    let result

    switch (currentOperator.value) {
      case '+': result = previous + current; break
      case '-': result = previous - current; break
      case '*': result = previous * current; break
      case '/':
        if (current === 0) { showError('Error: div/0'); return }
        result = previous / current
        break
      default: return
    }

    if (!isFinite(result) || isNaN(result)) { showError('Error'); return }

    display.value = String(result)
    previousValue.value = result
  }

  function showError(message) {
    errorMessage.value = message
    display.value = message
  }

  function resetAll() {
    display.value = '0'
    previousValue.value = null
    currentOperator.value = null
    errorMessage.value = null
    waitingForNewValue.value = null
  }

  function pressMemoryAdd() {
    memoryStore.setMemory(parseFloat(display.value))
    waitingForNewValue.value = true
  }

  function pressMemoryRecall() {
    display.value = String(memoryStore.value)
    waitingForNewValue.value = true
  }

  function pressMemoryClear() {
    memoryStore.clearMemory()
  }

  return {
    display, previousValue, currentOperator, errorMessage,
    pressNumber, pressDecimal, pressOperator, pressEquals,
    resetAll, pressMemoryAdd, pressMemoryRecall, pressMemoryClear
  }
}