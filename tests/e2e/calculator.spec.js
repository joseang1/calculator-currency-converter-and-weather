import { test, expect } from '@playwright/test'

test.describe('Calculator', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })

    test('displays 0 by default', async ({ page }) => {
        await expect(page.getByTestId('calculator-display')).toHaveText('0')
    })

    test('adds two numbers and shows the result', async ({ page }) => {
        await page.getByRole('button', { name: '2', exact: true }).click()
        await page.getByRole('button', { name: '+', exact: true }).click()
        await page.getByRole('button', { name: '3', exact: true }).click()
        await page.getByRole('button', { name: '=', exact: true }).click()

        await expect(page.getByTestId('calculator-display')).toHaveText('5')
    })

    test('subtracts two numbers', async ({ page }) => {
        await page.getByRole('button', { name: '9', exact: true }).click()
        await page.getByRole('button', { name: '-', exact: true }).click()
        await page.getByRole('button', { name: '4', exact: true }).click()
        await page.getByRole('button', { name: '=', exact: true }).click()

        await expect(page.getByTestId('calculator-display')).toHaveText('5')
    })

    test('shows an error when dividing by zero', async ({ page }) => {
        await page.getByRole('button', { name: '5', exact: true }).click()
        await page.getByRole('button', { name: '/', exact: true }).click()
        await page.getByRole('button', { name: '0', exact: true }).click()
        await page.getByRole('button', { name: '=', exact: true }).click()

        await expect(page.getByTestId('calculator-display')).toContainText('Error')
    })

    test('CE resets the display back to 0', async ({ page }) => {
        await page.getByRole('button', { name: '9', exact: true }).click()
        await page.getByRole('button', { name: '9', exact: true }).click()
        await page.getByRole('button', { name: 'CE', exact: true }).click()

        await expect(page.getByTestId('calculator-display')).toHaveText('0')
    })

    test('memory recall (M+, MR) stores and retrieves a value', async ({ page }) => {
        await page.getByRole('button', { name: '7', exact: true }).click()
        await page.getByRole('button', { name: 'M+', exact: true }).click()
        await page.getByRole('button', { name: 'CE', exact: true }).click()
        await page.getByRole('button', { name: 'MR', exact: true }).click()

        await expect(page.getByTestId('calculator-display')).toHaveText('7')
    })
})