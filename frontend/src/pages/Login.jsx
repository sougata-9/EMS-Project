import axios from 'axios'
import React, { useState } from 'react'
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [error, setError] = useState(null)
   const {login} = useAuth()
   const navigate = useNavigate()

   const handleSubmit = async (e) => {
    
      e.preventDefault();
      //   alert("sorry")
      try {
         const response = await axios.post(
            "http://localhost:5000/api/auth/login",
            { email, password }
         );
         if(response.data.success) {
            login(response.data.user)
                                 // console.log(response.data.user)
            localStorage.setItem("token", response.data.token)
            if(response.data.user.role === "admin") {
               navigate('/admin-dashboard')
            } else {
               navigate("/employee-dashboard")
            }
         }
      } catch (error) {
         if(error.response && !error.response.data.success) {
            setError(error.response.data.error)
         } else {
            setError("Server Error")
         }
      }
   };

   return (
       <div
        // Full Page Container - Gradient Background for the "Glass" effect
        // Using a deep, modern blue/purple palette
        className="flex flex-col items-center h-screen justify-center 
                   bg-gradient-to-br from-gray-500 via-gray-900 to-gray-900 space-y-12 p-4"
     >
        
        {/* Main Title - Clean White Text */}
        <h2 className="text-5xl font-extrabold text-white tracking-widest drop-shadow-lg animate-pulse">
            Employee Management System
        </h2>
        
        {/* Login Card Container - Glassmorphism Style & Animation */}
        <div 
            // NOTE: If the card remains invisible, ensure the custom CSS is applied!
            // Change to this:
       className="backdrop-filter backdrop-blur-xl bg-white bg-opacity-10 
           border border-white border-opacity-30 shadow-2xl p-12 max-w-sm w-full 
           rounded-3xl transform transition duration-1000 ease-out"
        >
            <h2 className="text-3xl font-light mb-10 text-white text-center tracking-wide">
                Login
            </h2>
            
            {error && <p className="text-red-300 text-center mb-6 font-medium">{error}</p>}
            
            <form onSubmit={handleSubmit}>
                
                {/* === Email Field === */}
                <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-bold text-gray-200 mb-2">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-5 py-3 border border-white border-opacity-30 rounded-xl 
                                   bg-white bg-opacity-20 text-white placeholder-gray-300 
                                   focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600
                                   transition duration-300 ease-in-out"
                        placeholder="Enter your email address"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {/* === Password Field === */}
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-bold text-gray-200 mb-2">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-5 py-3 border border-white border-opacity-30 rounded-xl 
                                   bg-white bg-opacity-20 text-white placeholder-gray-300
                                   focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500
                                   transition duration-300 ease-in-out"
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {/* === Remember Me & Forgot Password === */}
                <div className="mb-12 flex items-center justify-between text-sm">
                    <label className="inline-flex items-center text-gray-300">
                        <input type="checkbox" className="form-checkbox text-pink-500 h-4 w-4 rounded transition duration-150 ease-in-out" />
                        <span className="ml-2 font-bold">Remember me</span>
                    </label>
                    <a 
                        href="#" 
                        className="font-medium text-gray-200 hover:text-teal-300 transition duration-150 ease-in-out hover:underline"
                    >
                        Forgot Password?
                    </a>
                </div>

                {/* === Login Button === */}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-400 to-blue-700 text-white py-3 rounded-xl font-bold text-lg
                               shadow-lg hover:shadow-2xl transition duration-300 ease-in-out 
                               transform hover:scale-[1.03] active:scale-[0.98] 
                               focus:outline-none focus:ring-4 focus:ring-pink-400 focus:ring-opacity-50"
                >
                    Authenticate
                </button>
                
            </form>
        </div >
     </div >
   )
}

export default Login