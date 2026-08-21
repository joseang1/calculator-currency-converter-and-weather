import axios from 'axios'

const BASE_URL = 'https://api.currencyfreaks.com/v2.0/rates/latest'
const API_KEY = import.meta.env.VITE_CURRENCYFREAKS_API_KEY

export async function fetchRates() {
  const response = await axios.get(BASE_URL, {
    params: {
      apikey: API_KEY,
      symbols: 'EUR,USD,JPY'
    }
  })
  return response.data.rates
}