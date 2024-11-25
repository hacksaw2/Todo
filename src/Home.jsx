import React, { useState, useEffect } from 'react';
import Addsvg from './svgs/Addsvg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import List from './List';

function Home() {
  const [todo, setTodo] = useState("");
  const [loggedInUserEmail, setLoggedInUserEmail] = useState('');
  const [refresh, setRefresh] = useState(false); // To trigger re-fetch in List
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('loggedInUserEmail');
    
    if (!email) {
      // Redirect to login page if no user is logged in
      navigate('/login');
    } else {
      setLoggedInUserEmail(email);
    }

    // Remove email from localStorage and log out on page refresh
    const handleUnload = () => {
      localStorage.removeItem('loggedInUserEmail');
    };

    window.addEventListener('beforeunload', handleUnload);

    // Cleanup event listener
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (todo.trim() !== "") {
      axios
        .post('http://localhost:3001/home', { email: loggedInUserEmail, todo })
        .then((result) => {
          if (result.data.success) {
            console.log("Todo added successfully");
            setRefresh((prev) => !prev); // Toggle refresh to trigger List update
          } else {
            console.log(result.data.message);
          }
        })
        .catch((err) => console.log(err));

      setTodo(""); // Clear input field
    }
  };

  return (
    <div className="w-[100vw] h-16 justify-center p-1">
      <div className="write bg-gradient-to-r from-gray-600 via-gray-400 to-gray-800 w-[98vw] flex justify-center p-2">
        <form className="flex" onSubmit={handleSubmit}>
          <div className="totdo">
            <input
              type="text"
              name="todo"
              placeholder="Add Todo"
              className="text-black h-10 w-[80vw] text-center text-2xl"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
          </div>
          <button>
            <Addsvg />
          </button>
        </form>
      </div>
    <div className="list overflow-x-scroll h-[92vh]">
      <List email={loggedInUserEmail} refresh={refresh} />
      </div>
    </div>
  );
}

export default Home;
