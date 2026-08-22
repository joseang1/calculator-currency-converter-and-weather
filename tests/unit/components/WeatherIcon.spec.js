import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeatherIcon from '../../../src/components/WeatherIcon.vue'

describe('WeatherIcon', () => {
    it('renders the correct icon for a known stateSky id', () => {
        const wrapper = mount(WeatherIcon, {
            props: { stateSky: { id: '11', description: 'Despejado' } }
        })
        const icon = wrapper.find('i')
        expect(icon.classes()).toContain('bi-sun-fill')
    })

    it('renders the fallback icon for an unknown id', () => {
        const wrapper = mount(WeatherIcon, {
            props: { stateSky: { id: '999', description: 'Unknown' } }
        })
        const icon = wrapper.find('i')
        expect(icon.classes()).toContain('bi-question-circle')
    })

    it('renders the fallback  icon when stateSky is missing entirely', () => {
        const wrapper = mount(WeatherIcon)
        const icon = wrapper.find('i')
        expect(icon.classes()).toContain('bi-question-circle')
    })

    it('uses the description as the title attribute', () => {
        const wrapper = mount(WeatherIcon, {
            props: { stateSky: { id: '24', description: 'Nuboso con lluvia' } }
        })
        const icon = wrapper.find('i')
        expect(icon.attributes('title')).toBe('Nuboso con lluvia')
    })

    it('maps rain-related ids to rain icons', () => {
        const rainCases = [
            { id: '23', expected: 'bi-cloud-drizzle-fill' },
            { id: '24', expected: 'bi-cloud-rain-fill' },
            { id: '26', expected: 'bi-cloud-rain-heavy-fill' }
        ]

        rainCases.forEach(({ id, expected, }) => {
            const wrapper = mount(WeatherIcon, {
                props: { stateSky: { id, description: 'test' } }
            })
            expect(wrapper.find('i').classes()).toContain(expected)
        })
    })
})