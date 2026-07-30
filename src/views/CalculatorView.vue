<script setup>
    import { ref } from 'vue'

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

        switch(currentOperator.value) {
            case '+':
                result = previous + current
                break
            case '-':
                result = previous - current
                break
            case '*':
                result = previous * current
                break
            case '/':
                if (current === 0) {
                    showError('Error: div/0')
                    return
                }
                result = previous / current
                break
            default:
                return
        }

        if (!isFinite(result) || isNaN(result)) {
            showError('Error')
            return
        }

        display.value = String(result)
        previousValue.value = result
    }

    function showError(message) {

    }

    function resetAll() {
        // CE
        display.value = '0'
        previousValue.value = null
        currentOperator.value = null
        errorMessage.value = null
        waitingForNewValues.value = null
    }
</script>

<template>
    <div class="container d-flex justify-content-center mt-5">
        <div class="card shadow-lg" style="max-width: 360px; widt%;">
            <div class="card-body bg-dark text-white rounded">
                <div class="bg-black text-white text-end p-3 mb-3 rounded fs-2 text-truncate">
                    {{ display }}
                </div>

                <div class="calc-grid">
                    <button class="btn btn-danger" @click="resetAll">CE</button>
                    <button class="btn btn-secondary" @click="pressOperator('/')">/</button>
                    <button class="btn btn-secondary" @click="pressOperator('*')">*</button>
                    <button class="btn btn-secondary" @click="pressOperator('-')">-</button>
                    
                    <button class="btn btn-outline-light" @click="pressNumber(7)">7</button>
                    <button class="btn btn-outline-light" @click="pressNumber(8)">8</button>
                    <button class="btn btn-outline-light" @click="pressNumber(9)">9</button>
                    <button class="btn btn-warning plus-btn" @click="pressOperator('+')">+</button>

                    <button class="btn btn-outline-light" @click="pressNumber(4)">4</button>
                    <button class="btn btn-outline-light" @click="pressNumber(5)">5</button>
                    <button class="btn btn-outline-light" @click="pressNumber(6)">6</button>

                    <button class="btn btn-outline-light" @click="pressNumber(3)">3</button>
                    <button class="btn btn-outline-light" @click="pressNumber(2)">2</button>
                    <button class="btn btn-outline-light" @click="pressNumber(1)">1</button>
                    <button class="btn btn-warning equals-btn" @click="pressEquals">=</button>

                    <button class="btn btn-outline-light zero-btn" @click="pressNumber(0)">0</button>
                    <button class="btn btn-outline-light" @click="pressDecimal">.</button>
                </div>  
            </div>

           
        </div>
    </div>
</template>

<style scoped>

    .calc-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 0.5rem;
    }

    .calc-grid button {
        width: 100%;
        height: 100%;
    }

    .plus-btn {
        grid-row: span 2;
    }

    .equals-btn {
        grid-row: span 2;
    }

    .zero-btn {
        grid-column: span 2;
    }

</style>