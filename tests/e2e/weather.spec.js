import { test, expect } from '@playwright/test'

const nationalMock = {
    ciudades: [
        {
            id: { '0': '28079' },
            name: 'Madrid',
            stateSky: { description: 'Cubierto con lluvia', id: '26' },
            temperatures: { min: '24', max: '30' }
        }
    ]
}

const asturiasMock = {
    ciudades: [
        {
            id: { '0': '33044' },
            name: 'Oviedo',
            stateSky: { description: 'Muy nuboso', id: '15' },
            temperatures: { min: '15', max: '23' }
        }
    ]
}

test.describe('Weather', () => {
    test.beforeEach(async ({ page }) => {
        await page.route('**/json/v3/general**', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(nationalMock)
            })
        })

        await page.route('**/json/v3/provincias/33**', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(asturiasMock)
            })
        })

        await page.goto('/weather')
    })

    test('shows national weather by default', async ({ page }) => {
        await expect(page.getByText('Madrid')).toBeVisible()
        await expect(page.getByText('Cubierto con lluvia')).toBeVisible()
        await expect(page.getByText('24° / 30°')).toBeVisible()
    })

    test('switches to Asturias weather', async ({ page }) => {
        await page.getByTestId('weather-scope').selectOption('asturias')

        await expect(page.getByText('Oviedo')).toBeVisible()
        await expect(page.getByText('Muy nuboso')).toBeVisible()
        await expect(page.getByText('Madrid')).not.toBeVisible()
    })

    test('switching back to national restores the national view', async ({ page }) => {
        await page.getByTestId('weather-scope').selectOption('asturias')
        await expect(page.getByText('Oviedo')).toBeVisible()

        await page.getByTestId('weather-scope').selectOption('nacional')
        await expect(page.getByText('Madrid')).toBeVisible()
        await expect(page.getByText('Oviedo')).not.toBeVisible()
    })

    test('shows an error message if the weather request fails', async ({ page }) => {
        await page.route('**/json/v3/general**', (route) => route.abort())
        await page.goto('/weather')

        await expect(page.getByText(/couldn't load/i)).toBeVisible()
    })
})