<script setup>
    
    import { ref, computed, onMounted } from 'vue'
    import { useCurrencyConverter } from '../composables/useCurrencyConverter.js'

    const props = defineProps({
        display: {type: String, default: '0'}
    })

    const { rates, loading, error, loadRates, convert } = useCurrencyConverter()
    const from = ref("EUR")
    const to = ref("USD")

    const result = computed(() => {
        const amount = parseFloat(props.display)
        if (isNaN(amount) || !rates.value) return null
        return convert(amount, from.value, to.value)
    })

    onMounted(loadRates)

</script>

<template>

    <div class="card mb-3">
        <div class="card-body">
            <div class="d-flex justify-content-between align-itmes-center mb-2">
                <h6 class="mb-0">Currency converter</h6>
                <button class="btn btn-sm btn-outline-secondary" @click="loadRates" :disabled="loading">
                    {{ loading ? 'Loading...' : 'Reload' }}
                </button>
            </div>

            <div v-if="error" class="alert alert-danger py-1 px-2 small mb-2">{{ error }}</div>

            <div class="row g-2 align-items-center">
                <div class="col-4">
                    <select v-model="from" class="form-select" data-testid="currency-from">
                        <option value="EUR">€ EUR</option>
                        <option value="USD">$ USD</option>
                        <option value="JPY">¥ JPY</option>
                    </select>
                </div>
                <div class="col-4 text-center">→</div>
                <div class="col-4">
                    <select class="form-select" v-model="to" data-testid="currency-to">
                        <option value="EUR">€ EUR</option>
                        <option value="USD">$ USD</option>
                        <option value="JPY">¥ JPY</option>
                    </select>
                </div>
            </div>

            <div class="mt-2 fw-bold" v-if="result !== null" data-testid="currency-result">
                {{ display }} {{ from }} = {{ result.toFixed(2) }} {{ to }}
            </div>
        </div>
    </div>

</template>