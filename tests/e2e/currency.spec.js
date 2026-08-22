import { test, expect } from '@playwright/test'

test.describe('Currency converter', () => {
    test.beforeEach(async ({ page }) => {
        await page.route('**/*currencyfreaks*/**', async (route) => {
            console.log('MOCK INTERCEPTED:', route.request().url())
            await route.fulfill({
                status: 200,
                contentType: 'applications/json',
                body: JSON.stringify({
                    date: '2026-08-22',
                    base: 'USD',
                    rates: { EUR: '0.92', USD: '1', JPY: '148.3' }
                })
            })
        })

        await page.goto('/')
    })

    test('shows converted value when typing on the calculator', async ({ page }) => {
        await page.getByRole('button', { name: '5', exact: true }).click()
        await page.getByRole('button', { name: '0', exact: true }).click()

        await expect(page.getByTestId('currency-result')).toContainText('50')
    })

    test('updates the result when switching currencies', async ({ page }) => {
        await page.getByRole('button', { name: '1', exact: true }).click()
        await page.getByRole('button', { name: '0', exact: true }).click()
        await page.getByRole('button', { name: '0', exact: true }).click()

        await page.getByTestId('currency-from').selectOption('EUR')
        await page.getByTestId('currency-to').selectOption('USD')

        await expect(page.getByTestId('currency-result')).toContainText('108.7')
    })

    test('shows an error message if the rates request fails', async ({ page }) => {
        await page.route('**/v2.0/rates/latest***', (route) => route.abort())
        await page.goto('/')

        await expect(page.getByText(/couldn't load currency/i)).toBeVisible()
    })
})



