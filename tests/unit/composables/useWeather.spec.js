import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useWeather } from '../../../src/composables/useWeather.js'
import { fetchNationalWeather, fetchProvincialWeather } from '../../../src/services/weatherApi.js'

vi.mock('../../../src/services/weatherApi.js', () => ({
    fetchNationalWeather: vi.fn(),
    fetchProvincialWeather: vi.fn(),
}))

describe('useWeather', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('starts with scope set to "nacional"', () => {
        const { scope, weatherData, loading, error } = useWeather()
        expect(scope.value).toBe('nacional')
        expect(weatherData.value).toBe(null)
        expect(loading.value).toBe(false)
        expect(error.value).toBe(null)
    })

    describe('loadWeather', () => {
        it('calls fetchNationalWeather when scope is "nacional"', async () => {
            fetchNationalWeather.mockResolvedValue({ ciudades: [{ name: 'Madrid'}] })

            const { weatherData, loadWeather } = useWeather()
            await loadWeather()

            expect(fetchNationalWeather).toHaveBeenCalledOnce()
            expect(fetchProvincialWeather).not.toHaveBeenCalled()
            expect(weatherData.value).toEqual({ ciudades: [{ name: 'Madrid'}] })
        })

        it('calls fetchProvincialWeather with the Asturias code when scope is "asturias"', async () => {
            fetchProvincialWeather.mockResolvedValue({  ciudades: [{name: 'Oviedo'}] })

            const { weatherData, setScope } = useWeather()
            await setScope('asturias')

            expect(fetchProvincialWeather).toHaveBeenCalledWith('33')
            expect(fetchNationalWeather).not.toHaveBeenCalled()
            expect(weatherData.value).toEqual({ ciudades: [{name: 'Oviedo'}] })
        })

        it('sets loading to true while the request is in process', () => {
            let resolvePromise
            fetchNationalWeather.mockReturnValue(new Promise((resolve) => { resolvePromise = resolve }))

            const { loading, loadWeather } = useWeather()
            const promise = loadWeather()

            expect(loading.value).toBe(true)

            resolvePromise({ ciudades: [] })
            return promise
        })

        it('sets an error message when request fails', async () => {
            fetchNationalWeather.mockRejectedValue(new Error('Network error'))

            const { error, weatherData, loading, loadWeather } = useWeather()
            await loadWeather()

            expect(error.value).toBe("Couldn't load weather information.")
            expect(weatherData.value).toBe(null)
            expect(loading.value).toBe(false)
        })
    })

    describe('setScope', () => {
        it('updates the scope value', async () => {
            fetchProvincialWeather.mockResolvedValue({ ciudades: [] })

            const { scope, setScope } = useWeather()
            await setScope('asturias')

            expect(scope.value).toBe('asturias')
        })

        it('triggers a reload with the new scope', async () => {
            fetchNationalWeather.mockResolvedValue({ ciudades: [{ name: 'Madrid'}] })
            fetchProvincialWeather.mockResolvedValue({ ciudades: [{ name: 'Oviedo' }] })

            const { weatherData, setScope } = useWeather()
            
            await setScope('asturias')
            expect(weatherData.value).toEqual({ ciudades: [{ name: 'Oviedo' }] })

            await setScope('nacional')
            expect(weatherData.value).toEqual({ ciudades: [{ name: 'Madrid' }] })
        })
    })
})