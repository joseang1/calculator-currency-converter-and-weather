import { defineStore } from 'pinia'

export const useMemoryStore = defineStore('memory', {
    state: () => ({
        value: 0
    }),
    actions: {
        setMemory(num) {
            this.value = num
        },
        clearMemory() {
            this.value = 0
        }
    }
})