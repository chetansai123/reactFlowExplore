import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
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
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>
      <div>
        <ListGroup variant="flush">
          <ListGroup.Item
            onDragStart={(event) =>
              onDragStart(event, "startCall", "start call")
            }
            draggable
          >
            Start Call
          </ListGroup.Item>
          <ListGroup.Item
            onDragStart={(event) =>
              onDragStart(event, "answerCall", "answer call")
            }
            draggable
          >
            Answer Call
          </ListGroup.Item>
          <ListGroup.Item
            onDragStart={(event) =>
              onDragStart(event, "complexNode", "Gather DTMF")
            }
            draggable
          >
            Gather DTMF
          </ListGroup.Item>
          <ListGroup.Item
            onDragStart={(event) =>
              onDragStart(event, "audioNode", "Play Audio Node")
            }
            draggable
          >
            Play Audio Node
          </ListGroup.Item>
          <ListGroup.Item
            onDragStart={(event) =>
              onDragStart(event, "answerCall", "end call")
            }
            draggable
          >
            End Call
          </ListGroup.Item>
          <ListGroup.Item
            onDragStart={(event) =>
              onDragStart(event, "agentNode", "Agent Data")
            }
            draggable
          >
            Agent Node
          </ListGroup.Item>
          <ListGroup.Item
            onDragStart={(event) =>
              onDragStart(event, "autoAttendant", "Attendant Data")
            }
            draggable
          >
            Auto Attendant Node
          </ListGroup.Item>
          <ListGroup.Item
            onDragStart={(event) =>
              onDragStart(event, "groupNode", "Add Group")
            }
            draggable
          >
            Group Node
          </ListGroup.Item>
        </ListGroup>
      </div>
    </div>
  );
};

export default Sidebar;
