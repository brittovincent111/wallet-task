import  React from 'react'
import { FaRegEnvelope, FaLock } from 'react-icons/fa'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
// import './userLogin.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'



function UserLogin() {


  const Navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState("")
  const [Login, SetLogin] = useState({
    email: "",
    password: ""
  })


  /* ------------------------------ HANDLE CHANGE ----------------------------- */
  const onHandleChange = ((e) => {

    e.preventDefault()

    SetLogin({ ...Login, [e.target.name]: e.target.value })
    console.log(Login)

  })


  /* -------------------------------- ON LOGIN -------------------------------- */
  const OnLogin = (async (e) => {
    e.preventDefault()
    try {

      if (!Login.email) {
        setErrorMessage("Email is required");
      } else if (!Login.email.match(/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)) {
        setErrorMessage("Enter a valid email");
      } else if (!Login.password) {
        setErrorMessage("Password is required");
      } else if (Login.password.length < 4) {
        setErrorMessage("Password must be atleast 4 characters");
      } else if (Login.password.length > 20) {
        setErrorMessage("Password must be less than 20 characters");

      } else {
   console.log("call reached")
        await axios.post('http://localhost:5000/login', {

          email: Login.email,
          password: Login.password

        }).then((response) => {

          localStorage.
            setItem('userToken', response.data.UserToken)
          localStorage.
            setItem('user', JSON.stringify(response.data.user))

          Navigate('/')

        }).catch((data) => {

          setErrorMessage(data.response.data.error);

        })


      }
    } catch (error) {
      console.log(error , "error")
      // Navigate('/errorPage')

    }

})
    return (
       

<>
      <div className=' LoginMain h-screen flex flex-col items-center justify-center width-full flex-1 p-20 w-full  bg-blue-100 ' >

        <div className='main bg-white rounded-2xl shadow-2xl flex lg:w-2/3  justify-center max-w-4xl '>
          <div className='w-3/5 p-5 flex flex-col justify-center items-center'>
            <div className='py-10 flex flex-col justify-center items-center'>
              <h2 className='text-sky-600 font-semibold text-3xl mb-2 align-top'>LOGIN </h2>
              <div className='border w-44  border-sky-600 inline-block mb-6'></div>
              {errorMessage && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{errorMessage}</div>}

              <form onSubmit={OnLogin}>
                <div className='flex flex-col items-center '>
                  <div className='bg-gray-100 w-80 p-1 flex items-center mt-4 mb-4 rounded-2xl border-2 shadow-sm h-10'>
                    <FaRegEnvelope className='mr-2 mx-2' />
                    <input className=' bg-gray-100 outline-none  flex-1' type="email" placeholder='email' name='email' onChange={(e) => { onHandleChange(e) }} />
                  </div>

                  <div className='bg-gray-100 w-80 p-1 flex items-center mt-4 mb-4 rounded-2xl    border-2 h-10 '>
                    <FaLock className='mr-2 mx-2' />
                    <input className=' bg-gray-100 outline-none flex-1' type="password" placeholder='password' name='password' onChange={(e) => { onHandleChange(e) }} />
                  </div>


                  <button type='submit' className='border-2  p-2 bg-sky-600 rounded full px-12  py-2 mt-8 font-semibold text-white hover:bg-white hover:text-sky-600 hover:border-sky-400'>LOGIN</button>

                </div>
              </form>

             


            </div>

          </div>
          <div hidden className='mainPhoto relative w-2/5  bg-sky-600 rounded-tr-2xl rounded-br-2xl lg:block  '  >


          </div>

        </div>


      </div>

     
      
           
    </>
       
    )
}

export default UserLogin