import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link';

import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { useRouter } from 'next/router'

//add bcrypt to hash password

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const authUrl = 'http://localhost:3000/api/auth/signup';

const signup = () => {

    const router = useRouter()

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [password2, setPassword2] = useState('');

    const [validMatch, setValidMatch] = useState(false); //to confirm if the 2 passwords match
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false); //this state reps a successfull signup

    // useEffect(() => {
    //     userRef.current.focus();
    // }, []); // set's the focus on the user input when the component loads

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        // console.log(result);
        // console.log(email);
        setValidEmail(result);
    }, [email]); //validates the email whenever an email has been inputed

    useEffect(() => {
        const result = PWD_REGEX.test(password);
        // console.log(result);
        // console.log(password);
        setValidPassword(result);
        const match = password === password2;
        setValidMatch(match);
    }, [password, password2]);

    useEffect(() => {
        setErrMsg('');
    }, []); //clears out the error message when the user changes the state of the dependencies

    const handleSubmit = async (e) => {
        e.preventDefault();

        //if disabled signup button is enabled with JS hack. not compulsory but just to be cautious
        // const v1 = EMAIL_REGEX.test(email);
        // const v2 = PWD_REGEX.test(password);
        // if (!v1 || v2) {
        //     setErrMsg("Invalid Entry");
        //     return;
        // }

        // const body = {
        //     email,
        //     password
        // }
        // await fetcher("/api/auth/signup", { user: body });
        // setSuccess(true);
        // console.log('pimp')
        try {
            // const body = {
            //     email,
            //     password
            // }
            const response = await axios.post(authUrl,
                JSON.stringify({email, password}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });
            console.log(response.data);
            setSuccess(true);
        } catch (error) {
            if (!error?.response) {
                setErrMsg('No Server Response')
            } else if (error.response?.status === 409) {
                setErrMsg('Email already exists');
            } else {
                setErrMsg('Registration Failed');
            }
        }
    }

    if (success) {
        router.push('/login');
    }


  return (
    <>

        {/* {success && (
            router.push('/login')
        )} */}

        <div className='flex justify-center'>
            

            <form onSubmit={handleSubmit}>
            {errMsg && <p className='text-2xl font-bold pt-5 ml-16 text-pink-600' ref={errRef} aria-live="assertive">{errMsg}</p>}
                <h1 className='text-4xl font-bold py-10 ml-3'>Create an account</h1>

                <div className='flex flex-col pb-5'>
                    <label htmlFor='email' className='text-sm'>Email</label>
                    <input 
                        type="email"
                        name="email"
                        autoComplete='off'
                        className='peer form-control rounded border border-black p-2'
                        placeholder='name@example.com'
                        aria-invalid={validEmail ? "false" : "true"} //helps with form validation. if the email is valid set the aria-invalid to false else it's true
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <p className='invisible peer-invalid:visible text-pink-600 text-sm'>Please provide a valid email address.</p>
                    
                </div>

                <div className='flex flex-col pb-9'>
                    <label htmlFor='password' className='pb-2 text-sm'>Password</label>
                    <input 
                        type="password"
                        name="password"
                        id="password"
                        className='form-control rounded border border-black p-2'
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        aria-invalid={validPassword ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                        required
                    />
                    {passwordFocus && !validPassword && (
                        <p id="pwdnote" className='text-sm'>
                            <FontAwesomeIcon icon={faInfoCircle} />
                             8 to 24 characters.<br />
                            Must include uppercase and lowercase letters,<br /> a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>
                    ) }
                </div>

                <div className='flex flex-col'>
                    <label htmlFor='password2' className='pb-2 text-sm'>Confirm password</label>
                    <input 
                        type="password"
                        id="password2"
                        onChange={(e) => setPassword2(e.target.value)}
                        className='form-control rounded border border-black p-2'
                        placeholder='Password2'
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="matchnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                        required
                    />
                    {matchFocus && !validMatch && (
                        <p id="matchnote" className='text-sm'>
                            <FontAwesomeIcon icon={faInfoCircle} />
                             Must match the first password input field.
                        </p>
                    ) }
                </div>

                <div className='ml-10 pb-5'>
                    <button 
                        // disabled={!validEmail || !validPassword || !validMatch ? true : false}
                        className='bg-black text-white mt-10 p-2 px-20 rounded font-bold'
                    >
                        Sign Up
                    </button>
                </div>

                <Link href='/login'><button className='pb-5 text-gray-600 hover:text-sky-600 ml-8'>Already have an account? Sign in</button></Link>
            </form>
        </div>
    </>
  )
}

export default signup