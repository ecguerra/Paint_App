import axios from 'axios'
import authHeader from '../utilities/authHeader.utilities'

const API_URL = 'http://localhost:8080/api/test/'

const getPublicContent = () => {
    return axios.get(`${API_URL}/all`)
}

const getUserBoard = () => {
    return axios.get(`${API_URL}/user`, {header: authHeader()})
}

const getAdminBoard = () => {
    return axios.get(`${API_URL}/admin`, {header: authHeader()})
}

export default {
    getPublicContent,
    getUserBoard,
    getAdminBoard
}