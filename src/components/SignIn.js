import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import { signIn } from '../services/auth.service'
import { resMessage } from '../utils/functions.utils'


// function given to react-validator
const required = value => {
    if(!value) {
        return (
            <div>
                This field is required
            </div>
        )
    }
}

const SignIn = () => {
    const navigate = useNavigate()
    const form = useRef()
    const checkBtn = useRef()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const onChangeUsername = e => {
        const username = e.target.value
        setUsername(username)
    }

    const onChangePassword = e => {
        const password = e.target.value
        setPassword(password)
    }

    const handleLogin = e => {
        e.preventDefault()

        setMessage('')

        form.current.validateAll()

        if(checkBtn.current.context._errors.length === 0) {
            signIn(username, password).then(
                () => {
                    navigate('/profile')
                    window.location.reload()
                },
                err => {
                    setMessage(resMessage(err))
                }
            )
        }

    }

    return (
        <div>
            <div>
                <Form onSubmit={handleLogin} ref={form}>
                    <label>
                        Username
                        <Input
                            type='text'
                            name='username'
                            value={username}
                            onChange={onChangeUsername}
                            validations={[required]}
                        />
                    </label>
                    <label>
                        Password
                        <Input
                            type='password'
                            name='password'
                            value={password}
                            onChange={onChangePassword}
                            validations={[required]}
                        />
                    </label>

                        <Input 
                            type='submit'
                            name='submit'
                            value='Sign In'
                        />

                    {message && (
                        <div>
                            <div>
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{display:'none'}} ref={checkBtn} />
                </Form>
            </div>
        </div>
    )
}

export default SignIn