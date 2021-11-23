import axios from 'axios'
import { getCurrentUser } from './auth.service'

const API_URL = 'http://localhost:8080/api/paintings/'

export const getAllPaintings = () => {
    return axios.get(`${API_URL}`)
}

export const savePainting = (title, dataURL) => {
    const currentUser = getCurrentUser()
    return axios.post(`${API_URL}save`, {
        title,
        artist: currentUser.username,
        dataURL
    })
}