import React from 'react'
// import photo from '../../assets/images/img3.jpg'
import { FaEnvelope, FaLock, FaUserAlt } from 'react-icons/fa'
// import google from '../../assets/images/google.png'
import { useState } from 'react'
import axios from 'axios'
import './userregistration.css'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registration } from '../../API/UserApi'



export default function UserRegistration() {

    const Navigate = useNavigate()

    const [errorMessage, setErrorMessage] = useState("")
    const [signUp, SetSignUp] = useState({
        username: "",
        userId: "",
        email: "",
        password: "",
        confirmpassword: ""
    })
 


    /* ------------------------------ HANDLE CHANGE ----------------------------- */

    const onHandleChange = (e) => {
        e.preventDefault()
        SetSignUp({ ...signUp, [e.target.name]: e.target.value })


    }



    /* --------------------------------- SIGNUP --------------------------------- */

    const OnSignup = (async (e) => {

        let deatailsOtp = {

            userfullname: signUp.userfullname,
            username: signUp.username,

            email: signUp.email,
            password: signUp.password

        }
        e.preventDefault()

        if (!signUp.username) {
            setErrorMessage("username is required");
        } else if (signUp.username.lenght < 3) {
            setErrorMessage("username must be atleast 3 characters");
        }
        else if (!signUp.userId) {
            setErrorMessage("UserId is required");
        } else if (signUp.userId.length < 3) {
            setErrorMessage("UserId must be atleast 3 characters");
        } else if (!signUp.userId.match(/^(?!.\.\.)(?!.\.$)[^\W][\w.]{0,29}$/)) {
            setErrorMessage("UserId a valid name");
        } else if (!signUp.email) {
            setErrorMessage("Email is required");
        } else if (!signUp.email.match(/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)) {
            setErrorMessage("Enter a valid email");


        } else if (!signUp.password) {
            setErrorMessage("Password is required");
        } else if (signUp.password.length < 4) {
            setErrorMessage("Password must be atleast 4 characters");
        } else if (signUp.password.length > 20) {
            setErrorMessage("Password must be less than 20 characters");
        } else if (!signUp.confirmpassword) {
            setErrorMessage("Confirm Password is required");
        } else if (signUp.password != signUp.confirmpassword) {
            setErrorMessage("Password Incorrect");
        } else {



            registration(signUp).then((data) => {

                Navigate('/login')
            }).catch((data) => {
                setErrorMessage(data.response.data.error);


            })

        }



    })


    return (
        <>
            <div className=' LoginMain h-screen flex flex-col items-center justify-center width-full flex-1 p-10 w-full bg-teal-600' >
                {errorMessage && <div className="p-4 my-4 text-sm text-red-900 bg-red-100 rounded-lg dark:bg-red-400 dark:text-red-800" role="alert">{errorMessage}</div>}
                <div className='main bg-slate-50 rounded-2xl shadow-2xl  lg:w-2/3 flex justify-center max-w-4xl  '>
                    {/* <div hidden className='w-2/5 p-5 py-36 px-12 bg-blue-700 rounded-tl-2xl rounded-bl-2xl lg:block ' >
                    <h2 className='text-2xl font-bold mb-2 text-white'>Hello , freinds</h2>
                    <div className='border-2 w-10  border-white inline-block mb-2'></div>
                    <p className='mb-10  text-white'>Fill Up Personal Information </p>
                    <Link to='/login' className='border-2 border-white rounded full px-12 py-2 font-semibold text-white hover:bg-white hover:text-blue-700'>LOGIN</Link>

                </div> */}

                    <div hidden className='mainbg relative w-2/5   bg-sky-600 rounded-tl-2xl rounded-bl-2xl lg:block   '


                    >
                        {/* <div className='w-20 h-20   absolute left-[40%] bottom-16 rounded-full bg-sky-900 hover:bg-gray-200 flex justify-center items-center'>
                            <Link to='/login' className='text-xl text-white hover:text-sky-900 font-semibold '>LOGIN</Link>

                        </div> */}
                        {/* <h2 className='text-2xl font-bold mb-2 text-white'>Hello , freinds</h2>
          <div className='border-2 w-10  border-white inline-block mb-2'></div>
          <p className='mb-10  text-white'>Fill Up Personal Information </p>
          <a className='border-2 border-white rounded full px-12 py-2 font-semibold text-white hover:bg-white hover:text-blue-400'>Login</a> */}




                    </div>

                    <div className='w-3/5 p-1'>

                        <div className='py- flex flex-col justify-center items-center'>
                            <h2 className='py-5 text-teal-900 text-3xl mb-2 font-semibold align-top flex justify-center '>SIGNUP </h2>
                            {/* <div className='border w-44  border-sky-700  mb-2'></div> */}

                            <form onSubmit={OnSignup}>


                                <div className='flex flex-col items-center '>
                                    <div className='bg-gray-100 w-80 p-1 flex items-center mb-4 rounded-2xl border-2 h-10'>
                                        <FaUserAlt className='mr-2 mx-2' />
                                        <input className=' bg-gray-100 outline-none  flex-1' type="name" placeholder='Username' name='username' onChange={(e) => { onHandleChange(e) }} />
                                    </div>
                                    <div className='bg-gray-100 w-80 p-1 flex items-center mb-4 rounded-2xl border-2 h-10'>
                                        <FaUserAlt className='mr-2 mx-2' />
                                        <input className=' bg-gray-100 outline-none  flex-1' type="name" placeholder='UserId' name='userId' onChange={(e) => { onHandleChange(e) }} />
                                    </div>

                                    <div className='bg-gray-100 w-80 p-1 flex items-center mb-4 rounded-2xl border-2  h-10 '>
                                        <FaEnvelope className='mr-2 mx-2' />
                                        <input className=' bg-gray-100 outline-none flex-1' type="email" placeholder='email' name='email' onChange={(e) => { onHandleChange(e) }} />
                                    </div>
                                    <div className='bg-gray-100 w-80 p-1 flex items-center mb-4 rounded-2xl border-2 h-10 '>
                                        <FaLock className='mr-2 mx-2' />
                                        <input className=' bg-gray-100 outline-none flex-1' type="password" placeholder='password' name='password' onChange={(e) => { onHandleChange(e) }} />
                                    </div>
                                    <div className='bg-gray-100 w-80 p-1 flex items-center mb-4 rounded-2xl border-2  h-10 '>
                                        <FaLock className='mr-2 mx-2' />
                                        <input className=' bg-gray-100 outline-none flex-1' type="password" placeholder='password' name='confirmpassword' onChange={(e) => { onHandleChange(e) }} />
                                    </div>


                                    <button type='submit' className='border-2 bg-sky-600 rounded full px-12 py-2 font-semibold text-white hover:bg-white hover:text-sky-700 hover:border-sky-700'>SIGNUP</button>

                                </div>
                            </form>

                            <Link to='/login' className='text-md text--900 font-semibold p-4'>Login ?</Link>






                        </div>

                    </div>


                </div>




            </div>



        </>
    )
}

