<script setup>

    defineProps({ display: { type: String, required: true } })
    const emit = defineEmits(['number', 'decimal', 'operator', 'equals', 'resetAll', 'memoryAdd', 'memoryRecall', 'memoryClear'])

</script>

<template>
    <div class="container d-flex justify-content-center mt-5">
        <div class="card shadow-lg" style="max-width: 360px; width: 100%;">
            <div class="card-body bg-dark text-white rounded">
                <div class="bg-black text-white text-end p-3 mb-3 rounded fs-2 text-truncate">
                    {{ display }}
                </div>

                <div class="calc-grid">
                    <!-- Top row - Buttons -->
                    <button class="btn btn-danger" @click="$emit('resetAll')">CE</button>
                    <button class="btn btn-info" @click="$emit('memoryAdd')">M+</button>
                    <button class="btn btn-info" @click="$emit('memoryRecall')">MR</button>
                    <button class="btn btn-info" @click="$emit('memoryClear')">MC</button>
                    
                    <!-- Second row - 7 to / -->
                    <button class="btn btn-outline-light" @click="$emit('number', 7)">7</button>
                    <button class="btn btn-outline-light" @click="$emit('number', 8)">8</button>
                    <button class="btn btn-outline-light" @click="$emit('number', 9)">9</button>
                    <button class="btn btn-warning plus-btn" @click="$emit('operator', '/')">/</button>

                    <!-- Third row - 4 to * -->
                    <button class="btn btn-outline-light" @click="$emit('number', 4)">4</button>
                    <button class="btn btn-outline-light" @click="$emit('number', 5)">5</button>
                    <button class="btn btn-outline-light" @click="$emit('number', 6)">6</button>
                    <button class="btn btn-warning" @click="$emit('operator', '*')">*</button>

                    <!-- Fourth row - 3 to - -->
                    <button class="btn btn-outline-light" @click="$emit('number', 3)">3</button>
                    <button class="btn btn-outline-light" @click="$emit('number', 2)">2</button>
                    <button class="btn btn-outline-light" @click="$emit('number', 1)">1</button>
                    <button class="btn btn-warning" @click="$emit('operator', '-')">-</button>

                    <!-- Fifth row - 0 to +-->
                    <button class="btn btn-outline-light zero-btn" @click="$emit('number', 0)">0</button>
                    <button class="btn btn-outline-light" @click="$emit('decimal')">.</button>
                    <button class="btn btn-warning" @click="$emit('operator', '+')">+</button>

                    <!-- Last row - = -->
                    <button class="btn btn-warning equals-btn" @click="$emit('equals')">=</button>
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

    .equals-btn {
        grid-column: span 4;
    }

    .zero-btn {
        grid-column: span 2;
    }

</style>