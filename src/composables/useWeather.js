import { ref } from 'vue'
import { fetchNationalWeather, fetchProvincialWeather } from '../services/weatherApi.js'

const ASTURIAS_CODPROV = '33'

export function useWeather() {
    const weatherData = ref(null)
    const loading = ref(false)
    const error = ref(null)
    const scope = ref('nacional')

    async function loadWeather() {
        loading.value = true
        error.value = null
        try {
            weatherData.value = scope.value === 'asturias'
            ? await fetchProvincialWeather(ASTURIAS_CODPROV)
            : await fetchNationalWeather()
        } catch (err) {
            error.value = "Couldn't load weather information."
        } finally {
            loading.value = false
        }
    }

    function setScope(newScope) {
        scope.value = newScope
        loadWeather()
    }

    return { weatherData, loading, error, scope, loadWeather, setScope }
}