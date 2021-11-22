import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getCurrentUser, signOut } from '../services/auth.service'


export default function Layout(props) {
    const [currentUser, setCurrentUser] = useState(undefined)

    useEffect(() => {
        const user = getCurrentUser()

        if(user) {
            setCurrentUser(user)
        }
    },[])

    const signout = () => { signOut() }

    return (
        <div>
            <nav>
                <Link to={'/'}>Paint App</Link>
                <div>
                    {currentUser ? (
                        <div>
                            <Link to={'/profile'}>{currentUser.username}</Link>
                            <a href='/signin' onClick={signout}>Sign Out</a>
                        </div>
                    ) : (
                        <div>
                            <Link to={'/signin'}>Sign In</Link>
                            <Link to={'/signup'}>Sign Up</Link>
                        </div>
                    )}
                </div>
            </nav>
            
            {props.children}
        </div>
    )
}
