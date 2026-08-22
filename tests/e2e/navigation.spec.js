import { test, expect } from '@playwright/test'

test.describe('Navigation - mobile', () => {
    test.use({ viewport: { width: 400, height: 800 } })

    test('navigates to weather via the mobile collapse menu', async ({ page }) => {
        await page.goto('/')
        await page.getByRole('button', { name: 'Toggle navigation' }).click()
        await page.getByRole('link', { name: 'Weather' }).click()

        await expect(page).toHaveURL('/weather')
        await expect(page.getByRole('heading', { name: 'Weather' })).toBeVisible()
    })

    test('navigates back to the calculator via the mobile collapse menu', async ({ page }) => {
        await page.goto('/weather')
        await page.getByRole('button', { name: 'Toggle navigation' }).click()
        await page.getByRole('link', { name: 'Calculator', exact: true }).click()

        await expect(page).toHaveURL('/')
        await expect(page.getByTestId('calculator-display')).toBeVisible()
    })
})

test.describe('Navigation - desktop', () => {
    test.use({ viewport: { width: 1280, height: 800 } })

    test('navigates to weather via the desktop offcanvas menu', async ({ page }) => {
        await page.goto('/')
        await page.getByRole('button', { name: 'Toggle navigation' }).click()
        await page.getByTestId('offcanvas-nav-weather').click()

        await expect(page).toHaveURL('/weather')
        await expect(page.getByRole('heading', { name: 'Weather' })).toBeVisible()
    })

    test('navigates back to the calculator via the desktop offcanvas menu', async ({ page }) => {
        await page.goto('/weather')
        await page.getByRole('button', { name: 'Toggle navigation' }).click()
        await page.getByTestId('offcanvas-nav-calculator').click()

        await expect(page).toHaveURL('/')
        await expect(page.getByTestId('calculator-display')).toBeVisible()
    })
})