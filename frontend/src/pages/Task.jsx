/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import axios from 'axios'; // Import axios for API requests

const Task = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const token = localStorage.getItem("jwtToken");
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) throw new Error('No Token Found. Redirecting to login.');
  
      const resp = await axios.get("http://localhost:8080/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(resp);
      setUser(resp.data.data);
    };
  
    const fetchTasks = async () => {
      try {
        if (!token) {
          throw new Error("No token found. Redirecting to login.");
        }
  
        const response = await axios.get("http://localhost:8080/api/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        console.log("Fetched tasks:", response.data);
        const allTasks = response.data.data || [];
        // Separate tasks based on isDone status
        const completed = allTasks.filter(task => task.isDone);
        const pending = allTasks.filter(task => !task.isDone);
        console.log(completed)
        setCompletedTasks(completed);
        setTasks(pending);
      } catch (err) {
        console.error("Failed to fetch tasks:", err.message);
        alert("Session expired. Please log in again.");
        navigate('/');
      }
    };
  
    fetchUser();
    fetchTasks();
  }, [token]);

  const handleAddTask = async () => {
    if (taskInput.trim()) {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) throw new Error("No token found.");

        const response = await axios.post(
          "http://localhost:8080/api/tasks",
          { title:taskInput  },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Task added:", response.data);
        setTasks((prevTasks) => [...prevTasks, response.data.data]); 
        
        setTaskInput('');
      } catch (err) {
        console.error("Failed to add task:", err.message);
        alert("Error adding task. Please try again.");
      }
    }
  };

  const handleMarkDone = async (taskIndex) => {
    const doneTask = tasks[taskIndex];
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) throw new Error("No token found.");

      await axios.patch(
        `http://localhost:8080/api/tasks/${doneTask._id}/done`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCompletedTasks((prev) => [...prev, doneTask]);
      setTasks((prev) => prev.filter((_, index) => index !== taskIndex));
    } catch (err) {
      console.error("Failed to mark task as done:", err.message);
      alert("Error marking task as done.");
    }
  };

  const handleDeleteTask = async (taskIndex) => {
    const taskToDelete = tasks[taskIndex];
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) throw new Error("No token found.");
      console.log(taskToDelete);
      
      await axios.delete(`http://localhost:8080/api/tasks/${taskToDelete._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks((prev) => prev.filter((_, index) => index !== taskIndex));
    } catch (err) {
      console.error("Failed to delete task:", err.message);
      alert("Error deleting task.");
    }
  };

  console.log("asdsa");
  console.log(tasks);
  
  return (
    <div className="min-h-screen bg-gray-900 text-white flex p-8 space-x-8">
      <div className="bg-gray-800 w-1/4 p-6 rounded-lg flex flex-col items-center space-y-4">
      <div className="w-24 h-24 rounded-full bg-purple-600 flex items-center justify-center text-4xl text-white mb-4 overflow-hidden">
  {user?.photo_url ? (
    <img
      src={user.photo_url}
      alt="Profile"
      className="w-full h-full object-cover"
    />
  ) : (
    <span>👤</span>
  )}
</div>
        <h2 className="text-lg font-semibold text-center">
          Welcome Back, <span className="text-purple-400">{user?.name || 'User'}</span>!
        </h2>
        <button
          className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg mt-2 hover:bg-gray-600"
          onClick={() => navigate('/profile')}
        >
          Edit Profile
        </button>
        <button
          onClick={() => navigate('/')}
          className="bg-red-600 text-white px-4 py-2 rounded-lg mt-2 hover:bg-red-700"
        >
          Sign Out
        </button>
      </div>

      <div className="bg-gray-800 w-3/4 p-8 rounded-lg">
        <div className="flex items-center space-x-2 mb-6 bg-gray-900 p-4 rounded-lg">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Add a new task"
            className="flex-grow px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={handleAddTask}
            className="bg-purple-600 w-10 h-10 rounded-full flex items-center justify-center hover:bg-purple-700 text-white text-2xl"
          >
            +
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Tasks to do - {tasks.length}</h3>
          {tasks.map((task, index) => (
            <div
              key={index}
              className="bg-gray-700 p-4 mb-2 rounded-lg flex justify-between items-center"
            >
              <span className="text-gray-200">{task.title || task}</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleMarkDone(index)}
                  className="bg-green-600 w-8 h-8 rounded-full flex items-center justify-center hover:bg-green-700"
                >
                  ✓
                </button>
                <button
                  onClick={() => handleDeleteTask(index)}
                  className="bg-red-600 w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-700"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Done - {completedTasks.length}</h3>
          {completedTasks.map((task, index) => (
            <div
              key={ index}
              className="bg-gray-700 p-4 mb-2 rounded-lg text-gray-400 line-through"
            >
              {task.title || task}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Task;
