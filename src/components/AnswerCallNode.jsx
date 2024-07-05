import React from "react";
import { MdOutlineCallEnd, MdDelete } from "react-icons/md";
import { Handle, Position } from "reactflow";
import "./styles.css";

export const AnswerCallNode = ({ data, id }) => {
  const handleDelete = () => {
    data.onDelete(id);
  };

  return (
    <div className="answer-container">
      <Handle
        type="target"
        position={Position.Top}
        id="a-top"
        style={{
          backgroundColor: "grey",
          width: "10px",
          height: "10px",
          border: "1px solid black",
          zIndex: 1001,
        }}
      />
      <div className="answer-content">
        <MdOutlineCallEnd className="answer-end" size="20px" />
        <span className="answer-text">{data.label}</span>
        <MdDelete
          style={{ color: "red" }}
          className="play-audio-delete"
          size="20px"
          onClick={handleDelete}
        />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a-bot"
        style={{
          backgroundColor: "grey",
          width: "10px",
          height: "10px",
          border: "1px solid black",
        }}
      />
    </div>
  );
};

export default AnswerCallNode;
