import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import "../components/reacStyle.css";
import { Button } from "react-bootstrap";
import { Handle, Position } from "reactflow";
import { IoMdClose } from "react-icons/io";

export const AgentNode = ({ data, id }) => {
  const [agentData, setAgentData] = useState(
    data?.agentData || {
      showPopup: false,
      webrtc: false,
      employeeId: "",
      name: "",
      phoneNumber: "",
      email: "",
    }
  );

  const { showPopup, webrtc, employeeId, name, phoneNumber, email } = agentData;

  useEffect(() => {
    if (data?.agentData) {
      setAgentData(data.agentData);
    }
  }, [id, data.agentData]);

  const handleDelete = () => {
    data.onDelete(id);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    let updatedAgentData = {};
    if (id === "webrtc") {
      updatedAgentData = { ...agentData, [id]: !agentData?.[id] };
    } else {
      updatedAgentData = { ...agentData, [id]: value };
    }
    setAgentData(updatedAgentData);
  };

  const handleAgent = () => {
    const updatedAgentData = {
      ...agentData,
      showPopup: !agentData?.showPopup,
    };
    setAgentData(updatedAgentData);
  };

  const saveAgentData = () => {
    const updatedAgentData = { ...agentData, showPopup: !agentData?.showPopup };
    setAgentData(updatedAgentData);
    data.updateNodeData(id, "agentData", updatedAgentData);
  };

  return (
    <div className="agent-container">
      <Handle
        type="target"
        position={Position.Top}
        id="agent-1"
        style={{
          backgroundColor: "grey",
          width: "10px",
          height: "10px",
          border: "1px solid black",
        }}
      />
      <div className="agent-details">
        <span>{data.label}</span>
        <MdDelete style={{ color: "red" }} onClick={handleDelete} />
      </div>
      <div className="add-agent">
        <Button variant="success" size="sm" onClick={handleAgent}>
          Add Agent
        </Button>
        {showPopup && (
          <div className="agent-popup">
            <div className="agent-popup-header">
              <span>Add Agent</span>
              <IoMdClose onClick={handleAgent} />
            </div>
            <div className="agent-popup-body">
              <div className="webrtc">
                <label htmlFor="webrtc">webrtc</label>
                <input
                  type="checkbox"
                  id="webrtc"
                  checked={webrtc}
                  onChange={handleInputChange}
                />
              </div>
              <label htmlFor="employeeId">Employee Id</label>
              <input
                type="text"
                id="employeeId"
                placeholder="enter your employee Id"
                value={employeeId}
                onChange={handleInputChange}
              />
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="enter your name"
                value={name}
                onChange={handleInputChange}
              />
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                placeholder="enter your mobile number"
                value={phoneNumber}
                onChange={handleInputChange}
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="enter your email"
                value={email}
                onChange={handleInputChange}
              />
              <Button
                variant="outline-success"
                onClick={() => {
                  saveAgentData();
                }}
              >
                Save
              </Button>
            </div>
          </div>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        id="agent-2"
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
