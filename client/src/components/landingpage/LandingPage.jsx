import React, { useState } from 'react'
import { Button } from '@material-tailwind/react';
import { AiOutlineWallet } from 'react-icons/ai'
import { IoIosWallet } from 'react-icons/io'
import Table from '../table/Table';
import { useEffect } from 'react';
import { findSearch, payment, userDetail } from '../../API/UserApi';
import {FcApproval} from 'react-icons/fc'
import {AiFillCloseCircle} from 'react-icons/ai'
import {MdSend} from 'react-icons/md'
import jwt_decode from "jwt-decode";



function LandingPage() {
    let token = localStorage.getItem('userToken');
    let decoded = jwt_decode(token);
    console.log(decoded , "deccoded")

    const [showMod, SetShowMod] = useState(true)
    const [details, setDetails] = useState({
        senderId : decoded.id,
        recieverId : "",
        userId: "",
        username: "",
        amount: "",
        message : ""

    })

    const [ userDetails , setUserDetails] = useState( {

        userId : "",
        username : "" ,
        wallet : "",

    })

    const [transation , setTransation] = useState([])

    const [searchUser, setSearchUser] = useState([])

    const [ filters , setFilters ] = useState([])


    useEffect(()=>{
       
        try{

            const call = async()=>{

            
            const {data} =  await userDetail(decoded.id)
    
            console.log(data ,"dataaaa")
            setUserDetails(data.details)
            setTransation(data.payment)
            }

            call()

        }catch(error){

        }
        
    },[])

    const handleSearch = async (e) => {
        e.preventDefault()
        const val = e.target.value

        console.log(val, "value")

        if (val == "") {
            setSearchUser([])
        }

        try {
            const { data } = await findSearch(val)
            setSearchUser(data)
        } catch (error) {

        }




    }

    const handleSelect = (e, obj) => {
        e.preventDefault()
        setDetails({ ...details, userId: obj.userId, username: obj.username , recieverId : obj._id })
        console.log(details)
        setSearchUser([])


    }

    const handleRemove = (e, obj) => {
        e.preventDefault()
        setDetails({ ...details, userId: "", username: "" })
        console.log(details)


    }

    const handleChange = ((e) => {

        e.preventDefault()
    
        setDetails({ ...details, [e.target.name]: e.target.value })
        // console.log(Login)
    
      })

      const handleSubmit = async(e)=>{
        e.preventDefault()

        try{

            const {data} = await payment(details)

        }catch(error){

        }
      }

    return (
        <>
            <div className='w-screen flex  h-screen bg-gray-100'>
                <div className='h-full w-[30%] bg-white px-5 pt-28 pb-5 '>
                    <div className='w-full h-full bg-blue-300 rounded-md flex flex-col  items-center '>
                        <div className='rounded-full bg-white h-28 w-28 mt-8 '>
                        </div>
                        <div className='text-xl font-semibold p-3'>UserName</div>
                        <div className='text-xl font-semibold pb-5'>UserId</div>

                        <hr className='w-full text-black' />
                        <p className='text-xl font-semibold p-2'>Wallet </p>
                        <hr className='w-full text-black' />
                        <div className='p-5'>
                            <div className='flex   '>
                                <div className='w-32  h-24 flex justify-center items-center  bg-slate-100 rounded-l-md '>
                                    <IoIosWallet className='h-12 w-12' />
                                </div>
                                <div className=' h-24 flex flex-col w-full bg-blue-800 justify-center items-center rounded-r-md '>
                                    <div className='text-xl font-medium p-2  w-fit text-white'>
                                        wallet balance
                                    </div>
                                    <div className='text-xl font-semibold p-2 w-fit text-white'>
                                        <span>$</span>100

                                    </div>

                                </div>


                            </div>

                        </div>


                        <div className='flex justify-evenly w-full'>
                            <button type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Primary</button>

                            <button type="button" class="inline-block px-6 py-2 border-2 border-blue-400 text-blue-400 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Info</button>


                        </div>





                    </div>
                </div>
                <div className='mt-24 w-[70%] p-10'>
                    <div className='w-full h-10 flex justify-center text-lg font-bold'> MonthlyReport</div>
                    <div class="overflow-x-auto relative shadow-md sm:rounded-lg ">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="py-3 px-6">
                                        Date
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Estimated Time
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Time Taken
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Total Task
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Total Task
                                    </th>


                                </tr>
                            </thead>
                            <tbody>







                                <Table />


                                {/* })} */}


                            </tbody>
                        </table>
                    </div>
                </div>


            </div>

            {showMod ? (
                <>
                    <form
                    onSubmit={handleSubmit}
                    >
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                            <div className="relative w-2/5 my-6 mx-auto max-w-3xl">

                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none justify-center items-center">
                                    <div className="flex items-start w-full justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="text-3xl font-semibold text-center w-full">Payment</h3>

                                    </div>
                                    <div className="relative p-6 flex-col w-full justify-center items-center ">
                                        {details.userId ? 
                                         <>
                                         <div className='flex justify-center w-full rounded-md bg-gray-100 p-2 shadow-md '>
                                            <div className='w-full flex flex-col ' >
                                                <span className=' w-full font-semibold  '>{details.username}</span>
                                                <span className='w-full text-sm '>{details.userId}</span>

                                            </div>
                                            <div className='flex flex-col justify-center gap-2'>
                                                <div><FcApproval className='text-lg'/></div>
                                                <div><AiFillCloseCircle className='text-red-600' onClick={handleRemove}/></div>

                                            </div>


                                             </div> 
                                             <br />
                                            </>:
                                            <div>
                                                <input
                                                    type="text"
                                                    className='w-full p-2'

                                                    name="userId"
                                                    placeholder="Enter the userId"
                                                    onChange={handleSearch} required />
                                                {searchUser.length > 0 ?

                                                    searchUser.map((obj) => {
                                                        return (
                                                            <div className=''>

                                                                <div className=' absolute h-20 w-20' onClick={(e) => { handleSelect(e, obj) }}>{obj.username}</div>
                                                            </div>
                                                        )
                                                    })
                                                    : null
                                                }
                                                <br /> <br />
                                            </div>


                                        }


                                        <input
                                            type="number"
                                            name="amount"
                                            className='w-full p-2'
                                            placeholder="Enter the Amount"
                                            onChange={handleChange}
                                            required />
                                        <br /> <br />
                                        <textarea
                                            type="text"
                                            name="message"
                                            className='w-full p-2'
                                            placeholder="Enter the Message"
                                            onChange={handleChange}
                                            required />

                                    </div>

                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => SetShowMod(false)}
                                        >
                                            Close
                                        </button>
                                        <button
                                            className="bg-blue-500 flex items-center text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="submit"

                                        >
                                           <span className='px-1'>Pay</span> 
                                            <MdSend/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    )
}

export default LandingPage