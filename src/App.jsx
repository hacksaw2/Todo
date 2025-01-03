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
    
      
    <div className=" bg-navbar shadow-xl bg-gray-950 w-[100vw]  h-16 pt-2 z-1">
      <div className="container  border-2 border-gray-500 w-[98vw] h-12  ml-[1vw]  flex  p-1 justify-around">


        <div className="todos flex p-1 ">
          
      <Todo/>
        <div className="logo font-serif text-lg">Todos</div>
        
        
        <NavLink to='home'> <div className="Home ml-4 bg-gradient-to-r from-blue-800  to-blue-500 p-1 w-auto h-8 rounded-lg lg:w-20 mr-2 lg:ml-[10vw] lg:text-center shadow-sm shadow-purple-400 ">Home</div></NavLink>
        <div className=''></div>

        </div>


      
<div className="profile flex font-serif ml-auto ">
<NavLink to='signup'> <div className="CreateProfile mr-4 bg-gradient-to-r from-red-800  to-red-500 p-1 w-auto lg:w-20 h-8 rounded-lg mt-1  lg:mr-[10vw] lg:text-center shadow-sm shadow-orange-400  ">Signup</div></NavLink>
<div className="profile h-10 w-10 border-green-800  border-2 bg-green-500 rounded-full flex justify-center">
  <NavLink to='/profile'><Profile/></NavLink>
  </div>  
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
