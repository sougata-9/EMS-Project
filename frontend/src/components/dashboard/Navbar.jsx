import React from 'react'
import { useAuth } from '../../context/authContext'

const Navbar = () => {
    const {user, logout} = useAuth()
  return (
    <div className='flex items-center text-white justify-between h-12 bg-teal-600 px-5'>
        <p>Welcome {user.name}</p>
        <button 
        className='px-4 py-1 bg-teal-500 
        rounded-md
        hover:bg-teal-700
        transition duration-300 ease-in-out 
                   hover:scale-105' 
        onClick={logout}>
          Logout
          </button>
    </div>
  )
}

export default Navbar