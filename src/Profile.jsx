import React, { useState,useEffect } from 'react'
import axios from 'axios'

function MyProfile(){

   const [todoers, setTodoers] = useState([])

   useEffect(() => {

    const loggedInUserEmail = localStorage.getItem('loggedInUserEmail')
    console.log('Logged In User Email from Local Storage:',localStorage.getItem('loggedInUserEmail'));
   
  axios.get('http://localhost:3001/profile')
    .then(response =>{
     
      const allUsers = response.data;

      console.log('Fetched USers:',allUsers)

      allUsers.forEach(user=>{
        console.log('Database Email:',user.email)
      })
      

      const loggedInUser = allUsers.filter(user=>user.email.trim().toLowerCase()===loggedInUserEmail.trim().toLowerCase());
      // console.log('Filtered USer',loggedInUser)

      setTodoers(loggedInUser)



    })
    .catch(err => console.error('Error fetching  data',err));


   },[])
   


  return (
    <div className=''>
       <div className="center flex justify-center ">

      <div className="welcome text-3xl text-yellow-600  font-thin mt-4 lg:mt-10 lg:text-[4rem] lg:mb-20">
        <div className="panel text-center text-white font-bold mb-4 lg:mb-20 ">Admin Panel</div>
        Welcome Admin
      </div>
      </div>
      <div className="id flex justify-center mt-10  ">
{todoers.length > 0 ?(
     todoers.map((user,index) => (
      
      <div className="x border-2 p-4 border-blue-500" key={index}>
        
<div className="email flex text-2xl"> <div className="y mr-2 font-serif text-yellow-300">Email : </div>{user.email}</div>
<div className="email flex text-2xl"><div className="z mr-2 font-serif text-yellow-300">Name :</div>{user.name}</div>

      </div>

     ))
    ) :(
    
   <p>No data available for the logged in user</p>
    )}
    </div>
   

    
    </div>
  )
}

export default MyProfile
