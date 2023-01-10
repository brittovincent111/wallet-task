import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'

function NavbarPage() {
  return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default NavbarPage