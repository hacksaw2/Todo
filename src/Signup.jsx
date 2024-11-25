import React from 'react'
import Signupsvg from './svgs/Signupsvg'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Signup(){
  
  const [name,setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')        
  
  const navigate = useNavigate()

  


  const handleSubmit = (e)=>{
   e.preventDefault()
   axios.post('http://localhost:3001/signup',{name,email,password})
   .then(result=>{console.log(result)

        navigate('/login')
   })
   .catch(err=> console.log(err))

  }


  return (
    <div className='lg:flex lg:justify-center lg:items-center h-[91vh]  flex justify-center p-10 pt-20 '>
      <div className="continer bg-gradient-to-tr from-gray-600 via-gray-500 to-gray-700 h-[60vh] w-[50vh] lg:w-[30vw] ">
        
<Signupsvg/>
<form onSubmit={handleSubmit} className='p-1 lg:p-8 '>

<div className='Name'>
    <label htmlFor='email'>
      <strong className='text-2xl '>Name :</strong>
    </label>
    <input
    className='ml-4 text-xl border-2 mb-4 border-black text-center text-black w-48 lg:w-72'
    type='text'
    placeholder='Enter your Name'
    name='name'
    onChange={(e)=> setName(e.target.value)} />


  </div>


  <div className='email'>
    <label htmlFor='email'>
      <strong className='text-2xl'>Email :</strong>
    </label>
    <input
    className='ml-4 text-xl border-2 mb-4 border-black text-center w-48 lg:w-72 text-black'
    type='text'
    placeholder='Enter your email'
    name='email'
    onChange={(e)=> setEmail(e.target.value)} />


  </div>

  <div>
    <label htmlFor='email'>
      <strong className='text-2xl'>
        Password :
      </strong>
    </label>
    <input
    className='ml-1 text-xl border-2 mb-4 border-black text-center w-44 lg:w-[17vw] text-black'
    type='text'
    placeholder='Enter your password'
    name='password'
    onChange={(e)=> setPassword(e.target.value)}/>
  </div>
  <button className='bg-red-700 p-2 rounded-md'>
  Signup
</button>
<NavLink to='/login'><p className='mt-3'> Login?</p></NavLink>
</form>

      
      </div>
   
    </div>
    
    
  )
}

export default Signup
