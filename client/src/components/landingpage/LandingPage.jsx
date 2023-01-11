import React, { useState } from 'react'
import { AiOutlineWallet } from 'react-icons/ai'
import { IoIosWallet } from 'react-icons/io'
import Table from '../table/Table';
import { useEffect } from 'react';
import { debitedDetails, deposit, findSearch, payment, userDetail } from '../../API/UserApi';
import { FcApproval } from 'react-icons/fc'
import { AiFillCloseCircle } from 'react-icons/ai'
import { MdSend } from 'react-icons/md'
import jwt_decode from "jwt-decode";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import userProfile from '../../assets/images/user3.png'
import Swal from 'sweetalert2';



import { AiOutlineArrowUp } from 'react-icons/ai'
import SideBar from '../sidebar/SideBar';
import { useNavigate } from 'react-router-dom';



function LandingPage() {
    let token = localStorage.getItem('userToken');
    let decoded = jwt_decode(token);
    console.log(decoded, "deccoded")

    const Navigate = useNavigate()

    const [showMod, SetShowMod] = useState(false)
    const [details, setDetails] = useState({
        senderId: decoded.id,
        recieverId: "",
        userId: "",
        username: "",
        amount: "",
        message: ""

    })

    const [userDetails, setUserDetails] = useState({

        userId: "",
        username: "",
        wallet: "",

    })

    const [addAmount, setAddAmount] = useState({
        senderId: decoded.id,
        recieverId: decoded.id,
        amount: "",
        message: ""

    })

    const [transation, setTransation] = useState([])
    const [searchUser, setSearchUser] = useState([])
    const [filters, setFilters] = useState([])
    const [showModal, SetShowModal] = useState(false)
    const [vale, setVal] = useState('ACTIVITY')
    const [updation, setUpdation] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [stateManage, setStateManage] = useState(true)



  




    /* ---------------- USER DETAILS AND PAYMENT HISTORY SETTING ---------------- */

    useEffect(() => {

        try {

            const call = async () => {


                const { data } = await userDetail(decoded.id)

                console.log(data, "dataaaa")
                setUserDetails(data.details)
                setTransation(data.payment)
                setFilters(data.payment)
            }

            call()

        } catch (error) {
            if (error?.response?.status === 403) {
                console.log("hiiii")
                localStorage.removeItem('userToken')
               
                Navigate("/login")
             }else{
               Navigate('/errorPage')
             }

        }

    }, [stateManage])


    /* -------------------------- SEARCHING VALID USER -------------------------- */


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

            if (error?.response?.status === 403) {
                console.log("hiiii")
                localStorage.removeItem('userToken')
               
                Navigate("/login")
             }else{
            //    Navigate('/errorPage')
             }

        }
    }   

    /* -------------------------- SETTING VERIFYED USER ------------------------- */

    const handleSelect = (e, obj) => {
        e.preventDefault()
        setDetails({ ...details, userId: obj.userId, username: obj.username, recieverId: obj._id })
        console.log(details)
        setSearchUser([])


    }

    /* -------------------------- REMOVE USER SELECTED -------------------------- */


    const handleRemove = (e, obj) => {
        e.preventDefault()
        setDetails({ ...details, userId: "", username: "" })
        console.log(details)


    }


    /* ----------------------- SETTING FORM VALUES SENDING ---------------------- */

    const handleChange = ((e) => {

        e.preventDefault()

        setDetails({ ...details, [e.target.name]: e.target.value })
        // console.log(Login)

    })

    /* ---------------------------- SUBMIT SEND FORM ---------------------------- */

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            if (!details.recieverId) {
                setErrorMessage("userdetails is required");
            } else if (!details.amount) {
                setErrorMessage("enter the amount");
            } else if (details.amount > userDetails.wallet) {
                console.log("reachedddddddd")
                setErrorMessage("Amount excced wallet ");

            } else {

                Swal.fire({
                    title: 'Are you sure?',
                    text: "Amount Will Be Debited From Your Account!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, continue!'
                }).then(async (result) => {
                    if (result.isConfirmed) {



                        SetShowMod(!showMod)
                        setUpdation(Date.now())

                        const { data } = await payment(details)
                        setStateManage(!stateManage)
                    }
                })


            }

        } catch (error) {

            if (error?.response?.status === 403) {
                console.log("hiiii")
                localStorage.removeItem('userToken')
               
                Navigate("/login")
             }else{
               Navigate('/errorPage')
             }

        }
    }

    /* --------------------- THREE DIFFERENT TRANSATION VIEW -------------------- */

    const filterHistory = async(e, val) => {
        e.preventDefault()

        setVal(val)

       


        if (val == 'CREDITED') {
            let creaditData = transation.filter((obj) => {

                return obj.status === 'credited'
            })

            setFilters(creaditData)

            console.log(creaditData, "credited data")
        } else if (val == 'DEBITED') {
            let creaditData = transation.filter((obj) => {

                return obj.status === 'debited'
            })
            setFilters(creaditData)

        } else {

            setFilters(transation)


        }
       


    }


    


    const onHandleChange = (e) => {
        e.preventDefault()

        try {

            
            console.log("reached")
            setAddAmount({ ...addAmount, [e.target.name]: e.target.value })

        } catch (error) {


        }

    }

    const onHandleDeposit = async (e) => {
        e.preventDefault()
        try {
            
         
            if (!addAmount.amount) {
                setErrorMessage("enter the amount");
            } else if ( !addAmount.message ) {
                console.log("reachedddddddd")
                setErrorMessage("Enter The Message");

            } else {

                Swal.fire({
                    title: 'Are you sure?',
                    text: "Amount Will Be Added To Account!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, continue!'
                }).then(async (result) => {
                    if (result.isConfirmed) {



                        SetShowModal(!showModal)
                    
                        const { data } = await deposit(addAmount)
                        setStateManage(!stateManage)
                    }
                })


            }
            
       

        } catch (error) {

        }
    }

    /* ------------------------------- MODAL CLOSE ------------------------------ */

    const closeModal =(e)=>{
        e.preventDefault()
        SetShowMod(false)
        setErrorMessage("")
    // setDetails("")




    }
    return (
        <>
            <div className='w-screen flex  h-screen bg-gray-100'>
                <div className='h-full w-[30%] bg-white px-5 pt-28 pb-5  '>
                    <SideBar userDetails={userDetails} SetShowMod={SetShowMod} showMod={showMod} SetShowModal={SetShowModal} showModal={showModal} />
                </div>
                <div className='mt-24 w-[70%] p-10'>
                    <div className='flex flex-col justify-evenly pb-2'>

                        <div className='flex justify-between mb-2'>
                            <div onClick={(e) => filterHistory(e, "TRANSACTION")}
                                className={vale === "TRANSACTION" ? 'cursor-pointer hover:bg-gray-50 w-28 h-12 p-1  flex justify-center items-center rounded-md shadow-md bg-gray-200 ' : 'cursor-pointer hover:bg-gray-50 w-28 h-12 p-1  flex justify-center items-center rounded-md shadow-md'}>All</div>
                            <div onClick={(e) => filterHistory(e, "CREDITED")}
                                className={vale === "CREDITED" ? 'cursor-pointer hover:bg-gray-50 w-28 h-12 p-1  flex justify-center items-center rounded-md shadow-md bg-gray-200 ' : 'cursor-pointer hover:bg-gray-50 w-28 h-12 p-1  flex justify-center items-center rounded-md shadow-md'}>
                                Credited</div>

                            <div onClick={(e) => filterHistory(e, "DEBITED")}
                                className={vale === "DEBITED" ? 'cursor-pointer hover:bg-gray-50 w-28 h-12 p-1  flex justify-center items-center rounded-md shadow-md bg-gray-200 ' : 'cursor-pointer hover:bg-gray-50 w-28 h-12 p-1  flex justify-center items-center rounded-md shadow-md'}>
                                Debited</div>


                        </div>

                        <div className='w-full h-10 flex justify-center text-lg font-bold my-3'> {vale}</div>


                    </div>

                    <div class="overflow-x-auto relative shadow-md sm:rounded-lg ">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="py-3 px-6">
                                        UserName
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Date
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Amount
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Message
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Status
                                    </th>


                                </tr>
                            </thead>
                            <tbody>





                                {
                                    filters.map((obj) => {
                                        return (

                                            <Table obj={obj} />
                                        )


                                    })
                                }



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
                                {errorMessage && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{errorMessage}</div>}

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
                                                        <div><FcApproval className='text-lg' /></div>
                                                        <div><AiFillCloseCircle className='text-red-600' onClick={handleRemove} /></div>

                                                    </div>


                                                </div>
                                                <br />
                                            </> :
                                            <>
                                                <div className='relative w-full'>
                                                    <input
                                                        type="text"
                                                        className='w-full p-2 border'

                                                        name="userId"
                                                        placeholder="Enter the userId"
                                                        onChange={handleSearch} required />
                                                    {searchUser.length > 0 ?

                                                        <div className='fixed w-64  bg-white'>

                                                            {
                                                                searchUser.map((obj) => {
                                                                   
                                                                    if(obj._id != decoded.id){

                                                                        return (

                                                                       

                                                                            <div className='rounded-xl border my-1 shadow-md w-60 h-8 p-1 flex justify-center bg-white' onClick={(e) => { handleSelect(e, obj) }}>{obj.userId}</div>
    
    
                                                                        )

                                                                    }
                                                              
                                                                })
                                                            }
                                                        </div>
                                                        : null
                                                    }
                                                    <br /> <br />
                                                </div>
                                            </>


                                        }


                                        <input
                                            type="number"
                                            name="amount"
                                            className='w-full p-2 border'
                                            placeholder="Enter the Amount"
                                            onChange={handleChange}
                                            required />
                                        <br /> <br />
                                        <textarea
                                            type="text"
                                            name="message"
                                            className='w-full p-2 border'
                                            placeholder="Enter the Message"
                                            onChange={handleChange}
                                            required />

                                    </div>

                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={closeModal}
                                        >
                                            Close
                                        </button>
                                        <button
                                            className="bg-blue-500 flex items-center text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="submit"

                                        >
                                            <span className='px-1'>Pay</span>
                                            <MdSend />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}

            {showModal ? (
                <>
                    <form
                        onSubmit={onHandleDeposit}
                    >
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                            <div className="relative w-2/5 my-6 mx-auto max-w-3xl">

                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none justify-center items-center">
                                    <div className="flex items-start w-full justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="text-3xl font-semibold text-center w-full">Add To Wallet</h3>

                                    </div>
                                    <div className="relative p-6 flex-col w-full">

                                        <input
                                            type="number"
                                            name="amount"
                                            className='w-full p-2 border'
                                            placeholder="Enter the Amount"
                                            onChange={onHandleChange}
                                            required />
                                        <br /> <br />
                                        <textarea
                                            type="text"
                                            name="message"
                                            className='w-full p-2 border'
                                            placeholder="Enter the Message"
                                            onChange={onHandleChange}
                                            required />
                                    </div>

                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => SetShowModal(false)}
                                        >
                                            Close
                                        </button>
                                        <button
                                            className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="submit"

                                        >
                                            Deposit
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