import React from 'react'
import {AiOutlineArrowUp ,AiOutlineArrowDown} from 'react-icons/ai'





function Table({ obj }) {

    console.log(obj.date , "dateeee")
    let date = new Date(obj.date)
     date = date.toLocaleString()
    return (
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            {obj?.status == "debited" ?

                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {obj.recieverId.username}
                </th> : <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {obj.senderId.username}
                </th>
            }
            <td class="py-4 px-6">
                {date}
            </td>
            <td class="py-4 px-6">
                {obj.amount}
            </td>
            <td class="py-4 px-6">
                {obj.message}
            </td>
            {
                obj.status == "debited" ?
                    <td class="py-4 px-6 flex  items-center">
                       
                        {obj.status}
                        <span className='px-1'><AiOutlineArrowDown className='text-red-600 text-base'/></span>
                    </td> :
                      <td class="py-4 px-6 flex  items-center">
                       
                      {obj.status}
                      <span className='px-1'><AiOutlineArrowUp className='text-green-600 text-base font-semibold'/></span>
                  </td>


            }



        </tr>
    )
}



export default Table