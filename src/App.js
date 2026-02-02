import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import { useEffect, useState } from "react";
import PrivateRoute from "./route/PrivateRoute";
import api from "./utils/api";
import LogoutPage from "./pages/LogoutPage";

function App() {
  const [user, setUser] = useState(null);
  const getUser = async() => {
    try {
      const token = sessionStorage.getItem('token');
      if(token){
        const response = await api.get('/user/me');
        setUser(response.data.user)
      }
    } catch (error) {
      
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<PrivateRoute user={user}><TodoPage user={user}/></PrivateRoute>} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/login" element={<LoginPage setUser={setUser} user={user}/>} />
      <Route path="/logout" element={<LogoutPage setUser={setUser} user={user}/>} />
    </Routes>
  );
}

export default App;
