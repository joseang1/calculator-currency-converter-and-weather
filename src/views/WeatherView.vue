<script setup>

    import { onMounted } from 'vue'
    import WeatherIcon from '../components/WeatherIcon.vue'
    import { useWeather } from '../composables/useWeather.js'

    const { weatherData, loading, error, scope, loadWeather, setScope } = useWeather()

    onMounted(loadWeather)

</script>

<template>

    <div class="container py-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h4 class="mb-0">Weather</h4>
            <select class="form-select w-auto" v-model="scope" @change="setScope(scope)">
                <option value="nacional">National</option>
                <option value="asturias">Asturias</option>
            </select>
        </div>

        <div v-if="loading">Loading...</div>
        <div v-else-if="error" class="alert alert-danger">{{ error }}</div>

        <div v-else-if="weatherData?.ciudades?.length" class="row g-3">
            <div class="col-md-4" v-for="ciudad in weatherData.ciudades" :key="ciudad.id['0']">
                <div class="card h-100">
                    <div class="card-body d-flex align-items-center gap-3">
                        <WeatherIcon :state-sky="ciudad.stateSky" />
                        <div>
                            <p class="mb-1 fw-bold">{{ ciudad.name }}</p>
                            <p class="text-muted mb-0">{{ ciudad.stateSky.description }}</p>
                            <p class="mb-0">{{ ciudad.temperatures.min }}° / {{ ciudad.temperatures.max }}°</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>