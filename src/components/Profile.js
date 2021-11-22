import { getCurrentUser } from '../services/auth.service'

export default function Profile() {
    const currentUser = getCurrentUser()

    return (
        <div>
            <header>
                <h3>
                    <strong>{currentUser.username}</strong>
                </h3>
            </header>
            <p>
                <strong>Token:</strong> {currentUser.accessToken.substring(0,20)}...{' '}
            </p>
            <p>
                <strong>Id:</strong> {currentUser.id}
            </p>
            <p>
                <strong>Email:</strong> {currentUser.email}
            </p>

            {currentUser.roles && 
                currentUser.roles.map((role, index) => <li key={index}>{role}</li>)
            }
        </div>
    )
}
