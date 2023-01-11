import React from 'react'
import userProfile from '../../assets/images/user3.png'
import { IoIosWallet } from 'react-icons/io'
import './sidebar.css'



function SideBar({ userDetails , SetShowModal , SetShowMod , showModal , showMod}) {
    return (
        <>
            <div className='w-full h-full  bg-blue-500 rounded-md flex flex-col  items-center '>
                
                <img src={userProfile} className='rounded-full  h-28 w-28 mt-6 ' />


                <div className='text-xl font-semibold pt-1 text-white'>{userDetails.username}</div>
                <div className='text-base font-medium pb-5 text-white'>{userDetails.userId}</div>
               
                <hr className='w-full text-black' />
                <p className='text-xl font-semibold p-2 text-white'>Wallet </p>
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
                                <span>$</span>{userDetails.wallet}

                            </div>

                        </div>


                    </div>

                </div>


                <div className='flex justify-evenly w-full'>
                    <button onClick={() => { SetShowModal(!showModal) }} type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Deposit</button>

                    <button onClick={() => { SetShowMod(!showMod) }}  type="button" class="inline-block px-6 py-2 border-2 border-blue-400 text-blue-400 font-medium text-xs leading-tight uppercase rounded-full hover:bg-blue-900 focus:bg-blue-700 hover:text-white hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out bg-white">Send</button>


                </div>





            </div>
        </>
    )
}

export default  SideBar
