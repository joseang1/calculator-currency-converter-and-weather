<script setup>
    import { ref } from 'vue'

    const display = ref(0)
    const previousValue = ref(null)
    const currentOperator = ref(null)
    const errorMessage = ref(null)
    const waitingForNewValue = ref(null)

    function pressNumber(num) {
        
    }

    function pressDecimal() {

    }

    function pressOperator(op) {

    }

    function pressEquals() {

    }

    function calculate() {

    }

    function showError(message) {

    }

    function resetAll() {

    }
</script>

<template>
    <div class="container d-flex justify-content-center mt-5">
        <div class="card shadow-lg" style="max-width: 360px; width: 100%;">
            <div class="card-body bg-dark text-white rounded">
                <div class="bg-black text-white text-end p-3 mb-3 rounded fs-2 text-truncate">
                    {{ display }}
                </div>

                <div class="row g-2">
                    <div class="col-3"><button class="btn btn-danger w-100" @click="resetAll">CE</button></div>
                    <div class="col-3"><button class="btn btn-secondary w-100" @click="pressOperator('/')">/</button></div>
                    <div class="col-3"><button class="btn btn-secondary w-100" @click="pressOperator('*')">*</button></div>
                    <div class="col-3"><button class="btn btn-secondary w-100" @click="pressOperator('-')">-</button></div>
                    
                    <div class="col-3"><button class="btn btn-outline-light w-100" @click="pressNumber(7)">7</button></div>
                    <div class="col-3"><button class="btn btn-outline-light w-100" @click="pressNumber(8)">8</button></div>
                    <div class="col-3"><button class="btn btn-outline-light w-100" @click="pressNumber(9)">9</button></div>
                    <div class="col-3"><button class="btn btn-warning w-100 h-100" @click="pressOperator('+')">+</button></div>

                    <div class="col-3"><button class="btn btn-outline-light w-100" @click="pressNumber(4)">4</button></div>
                    <div class="col-3"><button class="btn btn-outline-light w-100" @click="pressNumber(5)">5</button></div>
                    <div class="col-3"><button class="btn btn-outline-light w-100" @click="pressNumber(6)">6</button></div>

                    <div class="col-3"><button class="btn btn-outline-light w-100" @click="pressNumber(3)">3</button></div>
                    <div class="col-3"><button class="btn btn-outline-light w-100" @click="pressNumber(2)">2</button></div>
                    <div class="col-3"><button class="btn btn-outline-light w-100" @click="pressNumber(1)">1</button></div>
                    <div class="col-3"><button class="btn btn-warning w-100 h-100" @click="pressEquals">=</button></div>

                    <div class="col-6"><button class="btn btn-outline-light w-100" @click="pressNumber(0)">0</button></div>
                    <div class="col-3"><button class="btn btn-outline-light w-100" @click="pressDecimal">.</button></div>
                </div>

            </div>
        </div>

    </div>
</template>

<style>

</style>