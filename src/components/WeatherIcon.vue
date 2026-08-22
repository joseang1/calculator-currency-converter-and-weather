<script setup>

    import { computed } from 'vue'

    const props = defineProps({
        stateSky: { type: String, default: ({}) }
    })

    const iconMap = {
        '11': 'bi-sun-fill',          
        '12': 'bi-cloud-sun-fill',    
        '13': 'bi-cloud-sun-fill',     
        '14': 'bi-cloud-fill',        
        '15': 'bi-clouds-fill',       
        '16': 'bi-clouds-fill',        
        '17': 'bi-cloud-haze2-fill',  
        '23': 'bi-cloud-drizzle-fill',
        '24': 'bi-cloud-rain-fill',   
        '26': 'bi-cloud-rain-heavy-fill',
        '33': 'bi-snow',               
        '43': 'bi-cloud-lightning-fill',
        '44': 'bi-cloud-lightning-rain-fill'
    }

    const iconClass = computed(() => {
        const id = props.stateSky?.id
        return iconMap[id] || 'bi-question-circle'
    })

</script>