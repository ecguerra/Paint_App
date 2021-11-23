import axios from 'axios'
import { getItem, setItem, removeItem } from '../utils/localStorage.utils'

const API_URL = 'http://localhost:8080/api/auth/'

export const signUp = (username, email, password) => {
    return axios.post(`${API_URL}signup`, {
        username,
        email,
        password
    })
}

export const signIn = (username, password) => {
    return axios
    .post(`${API_URL}signin`, {
        username,
        password
    })
    .then(response => {
        if(response.data.accessToken) {
            setItem('user', response.data)
        }
        return response.data
    })
}

export const signOut = () => {
    removeItem('user')
}

export const getCurrentUser = () => {
    return getItem('user')
}