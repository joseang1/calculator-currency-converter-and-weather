import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useCurrencyConverter } from '../../../src/composables/useCurrencyConverter.js'
import { fetchRates } from '../../../src/services/currencyApi.js'

vi.mock('../../../src/services/currencyApi.js', () => ({
    fetchRates: vi.fn()
}))

describe('useCurrencyConverter', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('starts with no rates loaded', () => {
        const { rates, loading, error } = useCurrencyConverter()
        expect(rates.value).toBe(null)
        expect(loading.value).toBe(null)
        expect(error.value).toBe(null)
    })

    describe('loadRates', () => {
        it('stores the fetched rates on success', async () => {
            fetchRates.mockResolvedValue({EUR: 0.92, USD: 1, JPY: 148.3 })

            const { rates, loading, error, loadRates } = useCurrencyConverter()
            await loadRates()

            expect(rates.value).toEqual({ EUR: 0.92, USD: 1, JPY: 148.3 })
            expect(loading.value).toBe(false)
            expect(error.value).toBe(null)
        })

        it('sets loading to true while the request is in flight', () => {
            let resolvePromise
            fetchRates.mockResolvedValue(new Promise((resolve) => { resolvePromise = resolve }))

            const  { loading, loadRates } = useCurrencyConverter()
            const promise = loadRates()

            expect(loading.value).toBe(true)

            resolvePromise({ EUR: 1, USD: 1, JPY: 1 })
            return promise
        })

        it('sets an error message when the request fails', async () => {
            fetchRates.mockRejectedValue(new Error('Network error'))

            const { rates, error, loading, loadRates } = useCurrencyConverter()
            await loadRates()

            expect(error.value).toBe("Couldn't load currency.")
            expect(rates.value).toBe(null)
            expect(loading.value).toBe(false)
        })
    })

    describe('convert', () => {
        it('returns null when rates have not loaded yet', () => {
            const { convert } = useCurrencyConverter()
            expect(convert(100, 'EUR', 'USD')).toBe(null)
        })

        it('converts using USD as the base currency', async () => {
            fetchRates.mockResolvedValue({ EUR: 0.92, USD: 1, JPY: 148.3 })

            const { convert, loadRates } = useCurrencyConverter()
            await loadRates()

            expect(convert(100, 'EUR', 'USD')).toBeCloseTo(108.7, 1)
        })

        it('returns the same amount when converting a currency to itself', async() => {
            fetchRates.mockResolvedValue({ EUR: 0.92, USD: 1, JPY: 148.3 })

            const { convert, loadRates } = useCurrencyConverter()
            await loadRates()

            expect(convert(100, 'EUR', 'USD')).toBeCloseTo(108.7, 1)
        })

        it('returns the same amount when converting a currency to itself', async () => {
            fetchRates.mockResolvedValue({ EUR: 0.92, USD: 1, JPY: 148.3 })

            const { convert, loadRates } = useCurrencyConverter()
            await loadRates()

            expect(convert(100, 'EUR', 'USD')).toBeCloseTo(108.7, 1)
        })

        it('returns the same amount when converting a currency to itself', async () => {
            fetchRates.mockResolvedValue({ EUR: 0.92, USD: 1, JPY: 148.3 })

            const { convert, loadRates } = useCurrencyConverter()
            await loadRates()

            expect(convert(50, 'USD', 'USD')).toBeCloseTo(50, 5)
        })
    })
})