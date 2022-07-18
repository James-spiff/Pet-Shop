import React, { useState, useEffect, useRef } from 'react'
import useAuth from '../../hooks/useAuth';
import Link from 'next/link';

import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { useRouter } from 'next/router'

const authUrl = 'http://localhost:3000/api/auth/sigin';

const index = () => {

    const { setAuth, auth } = useAuth(); //share auth state in the _app.js 

    const router = useRouter()
    const emailRef = useRef(); //set's the focus of the screen on the email input field
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');   
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(authUrl,
                JSON.stringify({email, password}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });
            console.log(response?.data);
            const accessToken = response?.data?.accessToken;
            const role = response?.data.role;
            setAuth({ email, password, role, accessToken });
            setEmail('');
            setPassword('');
            //setSuccess(true);
        } catch (error) {
            if (!error?.response) {
                setErrMsg('No Server Response');
            } else if (error.response?.status === 400) {
                setErrMsg('Missing username or password')
            } else if (error.response?.status === 401) {
                setErrMsg('Unathorized');
            } else {
                setErrMsg('Login Failed');
            }
            //errRef.current.focus();
        }
    }

    useEffect(() => {
        window.localStorage.setItem('AUTH_ROLE', JSON.stringify(auth.role));
    }, [auth])

    // if (success) {
    //     router.push('/');
    // }
    

  return (
    <>
        <div className='flex justify-center'>
            <form onSubmit={handleSubmit}>
            {errMsg && <p className='text-2xl font-bold pt-5 ml-16 text-pink-600' ref={errRef} aria-live="assertive">{errMsg}</p>}
                <h1 className='text-4xl font-bold py-10'>Sign in</h1>

                <div className='flex flex-col pb-5'>
                    <label htmlFor='email' className='text-sm'>Email:</label>
                    <input 
                        type="email"
                        name="email"
                        autoComplete='off'
                        ref={emailRef}
                        className='peer form-control rounded border border-black p-2'
                        placeholder='name@example.com'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                    {/* <p className='invisible peer-invalid:visible text-pink-600 text-sm'>Please provide a valid email address.</p> */}
                    
                </div>

                <div className='flex flex-col'>
                    <label htmlFor='password' className='pb-2 text-sm'>Password:</label>
                    <input 
                        type="password"
                        name="password"
                        className='form-control rounded border border-black p-2'
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required    //The password that you've entered is incorrect. Forgotten password?
                    />
                    
                </div>

                <div className=''>
                    <button className='bg-black text-white mt-5 p-2 px-20 rounded font-bold'>Sign in</button>
                </div>

                <div className='pb-3'>
                    <button className='bg-white hover:bg-gray-100 text-black mt-6 p-2 px-10 rounded font-bold'>Forgot password?</button>
                </div>

                <Link href='/login/signup'><button className='pb-5 ml-4 text-gray-600 hover:text-sky-600'>Need an account? Sign up</button></Link>
            </form>
        </div>
    </>
  )
}

export default index