import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import UpdateProfile from './pages/UpdateProfile';
import Task from './pages/Task';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    console.log("User updated:", user);
  }, [user]);
  return (
    <Routes> 
      <Route path="/" element={<Login setUser={setUser}/>} />
      <Route path="/task/main" element={<Task user={user}  />} />
      <Route path="/profile" element={<UpdateProfile  user={user} setUser={setUser}/>}/>
    </Routes>
  );
}

export default App;
