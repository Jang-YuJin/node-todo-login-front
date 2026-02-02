import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { Link, Navigate, useNavigate } from "react-router-dom";
import api from "../utils/api";

const LoginPage = ({setUser, user}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const response = await api.post('/user/login', {email, password});
      if(response.status === 200){
        setUser(response.data.user);
        sessionStorage.setItem('token', response.data.token);
        api.defaults.headers['authorization'] = `Bearer ${response.data.token}`;
        navigate('/');
      }else{
        throw new Error(response.error);
      }
    } catch (error) {
      setError(error.message);      
    }
  };

  if(user){
    return <Navigate to={'/'}></Navigate>
  }
  return (
    <div className="display-center">
      {error && <div className="error-message">{error}</div>}
      <Form className="login-box" onSubmit={handleSubmit}>
        <h1>다시 만나서 반가워요 🐰</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>이메일</Form.Label>
          <Form.Control type="email" placeholder="이메일" onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control type="password" placeholder="비밀번호" onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>
        <div className="button-box">
          <Button type="submit" className="button-primary">
            Login
          </Button>
          <span>
            아직 계정이 없나요? 🌷 <Link to="/register">회원가입 하기</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
