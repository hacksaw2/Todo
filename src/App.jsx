import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Todo from './svgs/Todosvg'
import Profile from './svgs/Profilesvg'
import { NavLink,Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="x  text-white ">
    
      
    <div className=" bg-navbar  bg-black w-[100vw]  h-16 pt-2 z-1">
      <div className="container  border-2 border-gray-500 w-[98vw] h-12  ml-[1vw]  flex  p-1 justify-around">


        <div className="todos flex p-1 ">
          
      <Todo/>
        <div className="logo font-serif text-lg">Todos</div>
        
        <NavLink to='home'> <div className="Home ml-4 bg-blue-800 p-1 w-auto h-8 rounded-lg lg:w-20 mr-2 lg:ml-[5vw] lg:text-center ">Home</div></NavLink>

        </div>


      
<div className="profile flex font-serif ml-auto ">
<NavLink to='signup'> <div className="CreateProfile ml-4 bg-red-800 p-1 w-auto lg:w-20 h-8 rounded-lg mt-1 mr-2 lg:mr-[5vw] lg:text-center ">Signup</div></NavLink>

  <Profile/>  
  </div>




      </div>
      
    </div>
    

    <div className="content bg-gradient-to-t from-gray-600 to-gray-900 bg  min-h-screen">
<Outlet/>
    </div>

    </div>
    </>
  )
}

export default App
