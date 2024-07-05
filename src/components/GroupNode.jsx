import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import "../components/reacStyle.css";
import { Button } from "react-bootstrap";
import { Handle, Position } from "reactflow";
import { IoMdClose } from "react-icons/io";

export const GroupNode = ({ data, id }) => {
  const [groupData, setGroupData] = useState({
    showPopup: false,
    name: "",
    description: "",
    type: "",
  });

  const handleDelete = () => {
    data.onDelete(id);
  };

  const handleGroup = () => {
    setGroupData((prev) => ({ ...prev, showPopup: !prev.showPopup }));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setGroupData((prev) => ({ ...prev, [id]: value }));
  };

  const { showPopup, name, description, type } = groupData;

  const saveGroupData = () => {
    console.log(groupData);
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
        <Button variant="success" size="sm" onClick={handleGroup}>
          Add Group
        </Button>
        {showPopup && (
          <div className="agent-popup">
            <div className="agent-popup-header">
              <span>Group Name</span>
              <IoMdClose onClick={handleGroup} />
            </div>
            <div className="agent-popup-body">
              <input
                type="text"
                id="name"
                placeholder="enter group name"
                value={name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                id="description"
                placeholder="enter description"
                value={description}
                onChange={handleInputChange}
              />
              <select
                id="type"
                value={type}
                onChange={handleInputChange}
                style={{ padding: "5px" }}
              >
                <option value="">Select Routing Type</option>
                <option value="priority">Priority</option>
                <option value="roundrobin">Rund Robin</option>
              </select>
              <Button variant="outline-success" onClick={saveGroupData}>
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
