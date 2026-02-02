import React, { useEffect, useState } from "react";
import TodoBoard from "../components/TodoBoard";
import api from "../utils/api";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";

const TodoPage = ({user}) => {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const navigate = useNavigate();

  const getTasks = async() => {
    const response = await api.get('/tasks');

    setTodoList(response.data.data);
  };

  useEffect(() => {
    getTasks();
  }, []);

    const addTask = async() => {
    try {
      const response = await api.post('/tasks', {task: todoValue, isComplete: false});

      if(response.status === 200){
        console.log('성공');
        setTodoValue('');
        getTasks();
      } else{
        throw new Error('task can not be added');
      }
    } catch (error) {
      console.log('err: ', error);
    }
  };

  const deleteTask = async(id) => {
    try {
      const response = await api.delete(`/tasks/${id}`);

      if(response.status === 200){
        console.log('삭제 성공');
        getTasks();
      } else{
        throw new Error('fail to delete task');
      }
    } catch (error) {
      console.log('err: ', error);
    }
  };

  const complelteTask = async(id, isComplete) => {
    try {
      const response = await api.put(`/tasks/${id}`, {isComplete: !isComplete, completeDt: !isComplete ? new Date() : null});
  
      if(response.status === 200){
        console.log('수정 성공');
        getTasks();
      } else{
        throw new Error('fail to complete task');
      }
    } catch (error) {
      console.log('err: ', error);
    }
  };

  const handleLogout = () => {
    navigate('/logout');
  };

  return (
    <Container>
      <div className="todo-header">
        <div className="greeting">
          <h3>{user.name}님, 안녕하세요 🐰</h3>
          <p>오늘의 할 일도 하나씩 끝내봐요 🌷</p>
        </div>

        <button className="logout-button" onClick={handleLogout}>
          로그아웃
        </button>
      </div>
      <Row className="add-item-row">
        <Col xs={8} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(event) => setTodoValue(event.target.value)}
          />
        </Col>
        <Col xs={4} sm={2}>
          <button className="button-add" onClick={addTask}>추가</button>
        </Col>
      </Row>

      <TodoBoard todoList={todoList} deleteTask={deleteTask} complelteTask={complelteTask}/>
    </Container>
  );
};

export default TodoPage;
