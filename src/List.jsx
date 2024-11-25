import React, { useState, useEffect } from 'react';
import axios from 'axios';

function List({ refresh }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
    console.log('Logged In User Email from Local Storage:', loggedInUserEmail);

    axios
      .get('http://localhost:3001/home')
      .then((response) => {
        const allUsers = response.data;

        console.log('Fetched Users:', allUsers);

        const loggedInUser = allUsers.find(
          (user) => user.email.trim().toLowerCase() === loggedInUserEmail.trim().toLowerCase()
        );

        if (loggedInUser) {
          setTodos(loggedInUser.todo || []);
        } else {
          setTodos([]); // No todos for the logged-in user
        }
      })
      .catch((err) => console.error('Error fetching data', err));
  }, [refresh]); // Refetch when refresh changes

  return (
    <div className="x  ">
      <div className="  gap-4  p-6">
        {todos.length > 0 ? (
          todos.map((todo, index) => (
            <div key={index} className=' flex justify-center '>
              <div className="x">
              <div className=" p-2 mt-2 bg-gradient-to-br from-pink w-[80vw]">
                <div className="text-[1.1rem]">{todo.todo}</div>
              </div>
              </div>
            </div>
          ))
        ) : (
          <p>No data available for the logged-in user</p>
        )}
      </div>
    </div>
  );
}

export default List;
