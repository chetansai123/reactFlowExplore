import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import "../components/reacStyle.css";
import { Button } from "react-bootstrap";
import { Handle, Position } from "reactflow";
import { IoMdClose } from "react-icons/io";

export const AutoAttendantNode = ({ data, id }) => {
  const [attendantData, setAttendantData] = useState({
    showPopup: false,
    name: "",
    description: "",
    file: "",
  });

  const handleDelete = () => {
    data.onDelete(id);
  };

  const handleAutoAttendant = () => {
    setAttendantData((prev) => ({ ...prev, showPopup: !prev.showPopup }));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setAttendantData((prev) => ({ ...prev, [id]: value }));
  };

  const { showPopup, name, description, file } = attendantData;

  const saveAutoAttendantData = () => {
    console.log(attendantData);
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
        <Button variant="success" size="sm" onClick={handleAutoAttendant}>
          Add AutoAttendant
        </Button>
        {showPopup && (
          <div className="agent-popup">
            <div className="agent-popup-header">
              <span>Add Auto Attendant</span>
              <IoMdClose onClick={handleAutoAttendant} />
            </div>
            <div className="agent-popup-body">
              <label htmlFor="name">Auto Attendant Name</label>
              <input
                type="text"
                id="name"
                placeholder="enter auto attendant name"
                value={name}
                onChange={handleInputChange}
              />
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                placeholder="enter description"
                value={description}
                onChange={handleInputChange}
              />
              <label htmlFor="file">Add file</label>
              <input
                type="file"
                id="file"
                placeholder="Add file"
                onChange={handleInputChange}
              />
              <span>WAV File (Max 1 MB)</span>
              <Button variant="outline-success" onClick={saveAutoAttendantData}>
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
