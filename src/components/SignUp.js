import { useState, useRef } from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import { isEmail } from 'validator'

import {signUp, signIn} from '../services/auth.service'
import {resMessage} from '../utils/functions.utils'

// function given to react-validator
const required = value => {
    if(!value) {
        return (
            <div role='alert'>
                This field is required
            </div>
        )
    }
}

// function that validates username
const vusername = value => {
    if(value.length < 3 || value.length >= 20) {
        return(
            <div role='alert'>
                The username must be between 3 and 20 characters
            </div>
        )
    }
}

// function that checks that email is in valid format
const validEmail = value => {
    if(!isEmail(value)) {
        return(
            <div role='alert'>
                This is not a valid email
            </div>
        )
    }
}

// function that validates password
const vpassword = value => {
    if(value.length < 6){
        return(
            <div role='alert'>
                The password must be at least 6 characters
            </div>
        )
    }
}

const SignUp = (props) => {
    const form = useRef()
    const checkBtn = useRef()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [successful, setSuccessful] = useState(false)
    const [message, setMessage] = useState('')

    const onChangeUsername = e => {
        const username = e.target.value
        setUsername(username)
    }

    const onChangeEmail = e => {
        const email = e.target.value
        setEmail(email)
    }

    const onChangePassword = e => {
        const password = e.target.value
        setPassword(password)
    }

    const handleSignUp = e => {
        e.preventDefault()

        setMessage('')
        setSuccessful(false)

        // validates all the fields
        form.current.validateAll()

        if(checkBtn.current.context._errors.length === 0) {
            signUp(username, email, password).then(
                (response) => {
                    setMessage(response.data.message)
                    setSuccessful(true)
                    signIn(username, password)
                    props.history.push('/profile')
                    window.location.reload()
                },
                err => {
                    setMessage(resMessage(err))
                    setSuccessful(false)
                }
            )
        } 
    }

    return (
        <div>
            <div>
                <Form onSubmit={handleSignUp} ref={form}>
                        <Input
                            type='text'
                            name='username'
                            value={username}
                            onChange={onChangeUsername}
                            validations={[required, vusername]}
                        />

                        <Input
                            type='text'
                            name='email'
                            value={email}
                            onChange={onChangeEmail}
                            validations={[required, validEmail]}
                        />

                        <Input
                            type='password'
                            name='password'
                            value={password}
                            onChange={onChangePassword}
                            validations={[required, vpassword]}
                        />

                    {message && (
                        <div>
                            <div role='alert'>{message}</div>
                        </div>
                    )}
                    
                </Form>
            </div>
        </div>
    )
}

export default SignUp