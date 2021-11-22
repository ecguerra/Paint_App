import { useState, useRef } from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'

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

const SignIn = (props) => {
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
                    props.history.push('/profile')
                    window.location.reload()
                },
                err => {
                    setMessage(resMessage(err))
                }
            )
        }

    }

    console.log(username, password)
    return (
        <div>
            <div>
                <Form onSubmit={handleLogin} ref={form}>
                        <Input
                            type='text'
                            name='username'
                            value={username}
                            onChange={onChangeUsername}
                            validations={[required]}
                        />

                        <Input
                            type='password'
                            name='password'
                            value={password}
                            onChange={onChangePassword}
                            validations={[required]}
                        />

                    {message && (
                        <div>
                            <div>
                                {message}
                            </div>
                        </div>
                    )}
                </Form>
            </div>
        </div>
    )
}

export default SignIn