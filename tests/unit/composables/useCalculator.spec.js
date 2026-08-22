import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCalculator } from '../../../src/composables/useCalculator.js'

describe('useCalculator', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('starts with a display of "0"', () => {
    const { display } = useCalculator()
    expect(display.value).toBe('0')
  })

  describe('pressNumber', () => {
    it('replaces the leading zero with the pressed digit', () => {
      const { display, pressNumber } = useCalculator()
      pressNumber(5)
      expect(display.value).toBe('5')
    })

    it('appends digits to build a multi-digit number', () => {
      const { display, pressNumber } = useCalculator()
      pressNumber(1)
      pressNumber(2)
      pressNumber(3)
      expect(display.value).toBe('123')
    })
  })

  describe('pressDecimal', () => {
    it('adds a decimal point', () => {
      const { display, pressNumber, pressDecimal } = useCalculator()
      pressNumber(1)
      pressDecimal()
      pressNumber(5)
      expect(display.value).toBe('1.5')
    })

    it('does not add a second decimal point', () => {
      const { display, pressDecimal, pressNumber } = useCalculator()
      pressNumber(1)
      pressDecimal()
      pressDecimal()
      expect(display.value).toBe('1.')
    })
  })

  describe('basic arithmetic', () => {
    it('adds two numbers', () => {
      const { display, pressNumber, pressOperator, pressEquals } = useCalculator()
      pressNumber(2)
      pressOperator('+')
      pressNumber(3)
      pressEquals()
      expect(display.value).toBe('5')
    })

    it('subtracts two numbers', () => {
      const { display, pressNumber, pressOperator, pressEquals } = useCalculator()
      pressNumber(9)
      pressOperator('-')
      pressNumber(4)
      pressEquals()
      expect(display.value).toBe('5')
    })

    it('multiplies two numbers', () => {
      const { display, pressNumber, pressOperator, pressEquals } = useCalculator()
      pressNumber(6)
      pressOperator('*')
      pressNumber(7)
      pressEquals()
      expect(display.value).toBe('42')
    })

    it('divides two numbers', () => {
      const { display, pressNumber, pressOperator, pressEquals } = useCalculator()
      pressNumber(8)
      pressOperator('/')
      pressNumber(2)
      pressEquals()
      expect(display.value).toBe('4')
    })
  })

  describe('error handling', () => {
    it('shows a div/0 error when dividing by zero', () => {
      const { display, pressNumber, pressOperator, pressEquals } = useCalculator()
      pressNumber(5)
      pressOperator('/')
      pressNumber(0)
      pressEquals()
      expect(display.value).toBe('Error: div/0')
    })

    it('resets after an error when a new number is pressed', () => {
      const { display, pressNumber, pressOperator, pressEquals } = useCalculator()
      pressNumber(5)
      pressOperator('/')
      pressNumber(0)
      pressEquals()
      pressNumber(7)
      expect(display.value).toBe('7')
    })
  })

  describe('resetAll (CE)', () => {
    it('resets the display back to "0"', () => {
      const { display, pressNumber, resetAll } = useCalculator()
      pressNumber(9)
      pressNumber(9)
      resetAll()
      expect(display.value).toBe('0')
    })
  })
})