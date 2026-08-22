import { createRouter, createWebHistory } from 'vue-router'
import CalculatorView from '../views/CalculatorView.vue'
import WeatherView from '../views/WeatherView.vue'

const routes = [
    {
        path: '/',
        name: 'calculator',
        component: CalculatorView
    },
    {
        path: '/weather',
        name: 'weather',
        component: WeatherView
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router