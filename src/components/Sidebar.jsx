import React from "react";
import {
  MdPhoneCallback,
  MdAudioFile,
  MdDialpad,
  MdSupportAgent,
  MdCallEnd,
  MdGroups,
} from "react-icons/md";
import { nodeTypes } from "../components/register.jsx";
import "../components/styles.css";

const Sidebar = () => {
  const onDragStart = (event, nodeType, nodeLabel) => {
    event.dataTransfer.setData("application/reactflow/type", nodeType);
    event.dataTransfer.setData("application/reactflow/label", nodeLabel);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="full">
      <div className="list">
        <div
          onDragStart={(event) => onDragStart(event, "startCall", "Start")}
          draggable
          className="s-icon1 s-icon1-start"
        >
          <MdPhoneCallback className="icon" />
          <span>Start</span>
        </div>
        <div
          onDragStart={(event) =>
            onDragStart(event, "audioNode", "Play Audio Node")
          }
          draggable
          className="s-icon1 s-icon1-audio"
        >
          <MdAudioFile className="icon" />
          <span>Audio</span>
        </div>
        <div
          onDragStart={(event) =>
            onDragStart(event, "complexNode", "Gather DTMF")
          }
          draggable
          className="s-icon1 s-icon1-menu"
        >
          <MdDialpad className="icon" />
          <span>Menu</span>
        </div>
        <div
          onDragStart={(event) => onDragStart(event, "agentNode", "Agent Data")}
          draggable
          className="s-icon1 s-icon1-agent"
        >
          <MdSupportAgent className="icon" />
          <span>Agent</span>
        </div>
        <div
          onDragStart={(event) => onDragStart(event, "groupNode", "Add Group")}
          draggable
          className="s-icon1 s-icon1-group"
        >
          <MdGroups className="icon" />
          <span>Group</span>
        </div>
        <div
          onDragStart={(event) => onDragStart(event, "answerCall", "End Call")}
          draggable
          className="s-icon1 s-icon1-end"
        >
          <MdCallEnd className="icon" />
          <span>End</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

//auto-attendant and answer call node removed- for new sidebar design.
