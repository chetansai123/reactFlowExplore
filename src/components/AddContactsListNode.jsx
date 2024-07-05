import React, { useState } from "react";
import { MdDeleteOutline, MdOutlineSettings } from "react-icons/md";
import { Position, Handle } from "reactflow";

export const AddContactsListNode = ({ data, id }) => {
  const [showSettings, setShowSettings] = useState(false);
  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };
  const handleDelete = () => {
    data.onDelete(id);
  };

  return (
    <div className="add-contacts">
      <div className="header">
        <p id="list">{data.label}</p>
        <div className="ops">
          <MdDeleteOutline onClick={handleDelete} />
          <MdOutlineSettings onClick={toggleSettings} />
        </div>
      </div>
      <Handle id="cont-a" position={Position.Top} type="target" />
      <Handle id="cont-b" position={Position.Right} type="target" />
      {showSettings && (
        <div className={`settings-popup ${showSettings ? "show" : ""}`}>
          <h2>Settings</h2>
          <p>Settings content goes here...</p>
          <button onClick={toggleSettings}>Close</button>
        </div>
      )}
    </div>
  );
};
