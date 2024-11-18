/* eslint-disable react/prop-types */
import { useState } from 'react';
import "../App.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = ({setUser})=> {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [inputEmail, setInputEmail] = useState('');
  const [error, setError] = useState(null); 
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/users/login", {
        email: inputEmail,
        password: password,
      });
      const { token, } = response.data.data;
      localStorage.setItem("jwtToken", token);
      setUser(response.data.data.user);

      navigate("/task/main");
    } catch (err) {
      console.error("Login failed", err);
      setError("Invalid email or password. Please try again.");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="bg-gray-800 p-10 rounded-xl shadow-2xl w-full max-w-lg">
        <h2 className="text-4xl font-bold text-purple-400 text-center mb-2">VOCA</h2>
        <p className="text-gray-400 text-center mb-10 text-lg">Task</p>
        <form onSubmit={handleLogin}>
        
             <div className="mb-6">
      
   
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 mb-2" htmlFor="email">
              Email
            </label>
           
            <input
              type="email"
              id="email"
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="sarah.santoso@gmail.com"
              required
            />
          </div>
          <div className="mb-8">
            <label className="block text-gray-400 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          {error && (
            <p className="text-red-500 text-center mb-4">{error}</p>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-200"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;