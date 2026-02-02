import React from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({ item, deleteTask, complelteTask }) => {
  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item ${item.isComplete ? "item-complete" : ""}`}>
          <div className="todo-left">
            <input
              type="checkbox"
              className="todo-checkbox"
              checked={item.isComplete}
              onChange={() => complelteTask(item._id, item.isComplete, item.author)}
            />

            <div>
              <div
                className={`todo-text ${
                  item.isComplete ? "complete" : ""
                }`}
              >
                {item.task}
              </div>

              {item.isComplete && item.completeDt && (
                <div className="complete-date">
                  완료일: {new Date(item.completeDt).toLocaleDateString()}
                </div>
              )}
            </div>

            <div className="todo-meta">
              <span className="todo-author">
                🐰 {item.author ? item.author.name : "알 수 없음"}
              </span>
            </div>
          </div>

          <button
            className="button-delete"
            onClick={() => deleteTask(item._id)}
          >
            삭제
          </button>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
