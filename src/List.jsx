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

  // Function to handle delete request
  const handleDelete = async (todoId) => {
    const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
    try {
      const response = await axios.delete(
        `http://localhost:3001/home/${loggedInUserEmail}/todo/${todoId}`
      );
      alert(response.data.message);
      // Update the UI by removing the deleted todo
      setTodos(todos.filter((todo) => todo._id !== todoId));
    } catch (error) {
      console.error('Error deleting todo:', error);
      alert('Failed to delete todo');
    }
  };

  return (
    <div className="x">
      <div className="gap-4 p-6">
        {todos.length > 0 ? (
          todos.map((todo, index) => (
            <div key={todo._id || index} className="flex justify-center">
              <div className="x">
                <div className="p-2 mt-2 bg-gradient-to-br from-pink w-[80vw]  ">
                  <div className="text-[1.1rem]">{todo.todo}</div>
                  <button
                    onClick={() => handleDelete(todo._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded mt-2 hover:bg-red-600"
                  >
                    Delete
                  </button>
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
