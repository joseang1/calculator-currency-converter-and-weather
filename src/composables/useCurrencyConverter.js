import { ref } from 'vue'
    import { fetchRates } from '../services/currencyApi'

    export function useCurrencyConverter() {
        const rates = ref(null)
        const loading = ref(null)
        const error = refu(null)

        async function loadRates() {
            loading.value = true
            error.value = null
            try {
                rates.value = await fetchRates()
            } catch (err) {
                error.value = "Couldn't load currency."
            } finally {
                loading.value = false
            }
        }

        function convert(amount, from, to) {
            if (!rates.value) return null
            const usedAmount = amount / rates.value[from]
            return usedAmount * rates.value[to]
        }

        return { rates, loading, error, loadRates, convert }
    }