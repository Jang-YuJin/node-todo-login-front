import React from "react";
import TodoItem from "./TodoItem";

const TodoBoard = ({ todoList, deleteTask, complelteTask }) => {
  return (
    <div>
      <h3 style={{fontWeight: 'bold'}}>오늘의 할 일 🐰</h3>
      {todoList.length > 0
      ? todoList.map((item) => <TodoItem item={item} deleteTask={deleteTask} complelteTask={complelteTask}></TodoItem>)
      : <h6 style={{ color: "#c7a1b0", textAlign: "center", marginTop: '20px' }}>
          아직 할 일이 없어요 💭<br />
          하나 추가해볼까요?
        </h6>}
    </div>
  );
};

export default TodoBoard;
