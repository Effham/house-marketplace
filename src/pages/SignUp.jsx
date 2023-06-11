import React from 'react'
import { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { toast } from 'react-toastify';
import {setDoc,doc,serverTimestamp} from 'firebase/firestore'

import {db} from '../firebase.config'

import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import Spinner from '../components/Spinner';
import OAuth from '../components/OAuth';

const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name:'',
    })

    const [isLoading,setIsLoading] = useState(false)
    const { email, password, name } = formData
    const navigate = useNavigate()

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]:e.target.value,
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        try {

            setIsLoading(true)
            const auth = getAuth()
            const userCredential = await createUserWithEmailAndPassword(auth,email,password)

            const user = userCredential.user

            updateProfile(auth.currentUser,{
                displayName: name
            })
            const formDataCopy = {...formData}
            delete formDataCopy.password
            formDataCopy.timestamp = serverTimestamp()

            await setDoc(doc(db,'users',user.uid), formDataCopy)

            setIsLoading(false)

            navigate('/')
        } catch (error) {
            toast.error(`Something went wrong in registration`);
        }
    }

    return isLoading == true ? <Spinner /> : (
        <>
            <div className="pageContainer">
                <header>
                    <p className="pageHeader">
                        Welcome To House Marketplace.
                    </p>
                </header>
                <main>
                    <form onSubmit={onSubmit}>

                    <input type="text" className="emailInput" placeholder='Name' id='name' value={name} onChange={onChange} />

                        <input type="email" className="emailInput" placeholder='Email' id='email' value={email} onChange={onChange} />

                        <div className="passwordInputDiv">
                            <input type={showPassword ? 'text' : 'password'} className='passwordInput' placeholder='Password' id="password" value={password} onChange={onChange} />

                            <img src={visibilityIcon} className='showPassword' alt="show password" onClick={() => setShowPassword((prevState) => !prevState)} />
                        </div>

                        {/* <Link to='/forgot-password'  className="forgotPasswordLink">
                            Forgot Password
                        </Link> */}

                        <div className="signInBar">
                            <p className="signInText">
                                Register
                            </p>
                            <button className="signInButton">
                                <ArrowRightIcon fill="#fffff" width="34px" height="34px " />
                            </button>
                        </div>
                    </form>

                    <OAuth />
                    {/* Google OAuth */}

                    <Link to='/sign-in' className="registerLink">
                        Log In
                    </Link>
                </main>
            </div>
        </>
    )
}

export default SignUp