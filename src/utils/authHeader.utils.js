import { getItem } from './localStorage.utils'

export default function authHeader() {
    // grabbing the user from the local storage
    const user = getItem('user')

    // check if user and if user has accessToken
    if(user && user.accessToken) {
        return {'x-access-token': user.accessToken}
    } else {
        return {}
    }
}
