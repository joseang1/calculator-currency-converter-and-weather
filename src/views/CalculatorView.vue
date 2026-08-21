<script setup>
    
    import Calculator from '../components/Calculator.vue'
    import Currency from '../components/Currency.vue'
    import { useCalculator } from '../composables/useCalculator.js'

    const {
        display, pressNumber, pressDecimal, pressOperator,
        pressEquals, resetAll, pressMemoryAdd, pressMemoryRecall, pressMemoryClear
    } = useCalculator()

</script>

<template>

    <div class="container d-flex flex-column aling-items-center mt-5 gap-3">
         <Currency :display="display" />
         <Calculator
            :display="display"
            @number="pressNumber"
            @decimal="pressDecimal"
            @operator="pressOperator"
            @equals="pressEquals"
            @reset-all="resetAll"
            @memory-add="pressMemoryAdd"
            @memory-recall="pressMemoryRecall"
            @memory-clear="pressMemoryClear"
        />
    </div>

</template>