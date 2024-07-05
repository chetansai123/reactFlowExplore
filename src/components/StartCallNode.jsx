import React from "react";
import { PiPhoneCall } from "react-icons/pi";
import { Handle, Position } from "reactflow";
import "./styles.css"; // Assuming the CSS is in the same folder

export const StartCallNode = ({ data }) => {
  return (
    <div className="start-call-container">
      <div className="start-call-button">
        <PiPhoneCall className="start-call-icon" />
        <p className="start-call-text">{data.label}</p>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={{
          backgroundColor: "grey",
          width: "10px",
          height: "10px",
          position: "relative",
          top: "-4px",
          border: "1px solid black",
        }}
      />
    </div>
  );
};

export default StartCallNode;
