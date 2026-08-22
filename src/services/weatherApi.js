import axios from 'axios'

const BASE_URL = 'https://api.el-tiempo.net/json/v3'

export async function fetchNationalWeather() {
    const response = await axios.get(`${BASE_URL}/general`)
    return response.data
}

export async function fetchProvincialWeather(codProv) {
    const response = await axios.get(`${BASE_URL}/provincias/${codProv}`)
    return response.data
}