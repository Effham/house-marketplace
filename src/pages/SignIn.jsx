import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { getAuth,signInWithEmailAndPassword } from 'firebase/auth'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import {toast} from 'react-toastify'
import Spinner from '../components/Spinner'
import OAuth from '../components/OAuth'
const SignIn = () => {
 
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''    
    })
    const { email, password } = formData
    const navigate = useNavigate()

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]:e.target.value,
        }))
    }

    const onSubmit = async (e) => {


        setIsLoading(true)

        e.preventDefault()
        try {
            const auth = getAuth()
            const userCredential = await signInWithEmailAndPassword(auth,email,password)
            
            setIsLoading(false)
            if(userCredential.user) {
                navigate('/')
            }   
        } catch (error) {
            toast.error('Bad User Credentials') 
        }
    }

    return isLoading ? <Spinner /> : (
        <>
            <div className="pageContainer">
                <header>
                    <p className="pageHeader">
                        Welcome Back
                    </p>
                </header>
                <main>
                    <form onSubmit={onSubmit}>
                        <input type="text" className="emailInput" placeholder='Email' id='email' value={email} onChange={onChange} />

                        <div className="passwordInputDiv">
                            <input type={showPassword ? 'text' : 'password'} className='passwordInput' placeholder='Password' id="password" value={password} onChange={onChange} />

                            <img src={visibilityIcon} className='showPassword' alt="show password" onClick={() => setShowPassword((prevState) => !prevState)} />
                        </div>
                        <Link to='/forgot-password'  className="forgotPasswordLink">
                            Forgot Password
                        </Link>

                        <div className="signInBar">
                            <p className="signInText">
                                Sign In
                            </p>
                            <button className="signInButton">
                                <ArrowRightIcon fill="#fffff" width="34px" height="34px " />
                            </button>
                        </div>
                    </form>

                    <OAuth />
                    {/* Google OAuth */}

                    <Link to='/sign-up' className="registerLink">
                        Sign Up
                    </Link>
                </main>
            </div>
        </>
    )
}

export default SignIn