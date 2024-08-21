import React, { useEffect, useState } from "react";
import { MdPhoneCallback } from "react-icons/md";
import { IoIosCloseCircle, IoMdSettings } from "react-icons/io";
import { Handle, Position } from "reactflow";
import Portal from "./Portal";
import "./styles.css";

export const StartCallNode = ({ data, id }) => {
  const [callData, setCallData] = useState(
    data?.callData || {
      showPopup: false,
      name: "",
      dtmf: "",
    }
  );
  const [tempData, setTempData] = useState({
    tempName: "",
    tempDtmf: "",
  });
  const handleDelete = () => {
    data.onDelete(id);
  };
  const handlePopup = () => {
    const updatedCallData = { ...callData, showPopup: !showPopup };
    setCallData(updatedCallData);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCallData((prev) => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    if (data?.callData) {
      setCallData(data.callData);
    }
  }, [id, data.callData]);

  const handleSave = () => {
    const updatedCallData = { ...callData, showPopup: !showPopup };
    setCallData(updatedCallData);
    data.updateNodeData(id, "callData", updatedCallData);
  };
  const { showPopup, dtmf, name } = callData;
  return (
    <>
      <div className="start-call-container">
        <div className="start-call-header">
          <div className="start-call-header-div">
            <MdPhoneCallback className="start-call-header-icon" />
            <p className="start-call-header-text">{data.label}</p>
          </div>
          <div className="start-call-header-div2">
            <IoMdSettings
              className="start-call-settings"
              onClick={handlePopup}
            />
            <IoIosCloseCircle
              className="start-call-circle"
              onClick={handleDelete}
            />
          </div>
        </div>
        <div className="start-call-body">
          {/* <p className="start-call-body-text">Call flow name</p> */}
          <input
            type="text"
            placeholder="Call flow name"
            value={name}
            id="name"
            className="start-call-body-text"
            onChange={handleInputChange}
          />
        </div>
        <Handle
          type="source"
          position={Position.Bottom}
          id="a"
          className="start-call-handle"
        />
      </div>
      {showPopup && (
        <Portal>
          <div className="popup-area">
            <div className="popup-header">
              <div className="header-content">
                <span
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={handlePopup}
                >
                  CANCEL
                </span>
                <span
                  style={{ color: "green", cursor: "pointer" }}
                  onClick={handleSave}
                >
                  SAVE
                </span>
              </div>
            </div>
            <hr />
            <div className="popup-body">
              <div className="popup-body-a">
                <MdPhoneCallback
                  style={{
                    color: "#1aba27",
                    fontSize: "24px",
                    marginLeft: "55px",
                  }}
                />
                <h2
                  style={{
                    fontSize: "18px",
                    color: "#1aba27",
                    fontWeight: "750",
                  }}
                >
                  Start IVR
                </h2>
              </div>
              <span style={{ marginLeft: "55px", opacity: "0.5" }}>
                Select a number that begins this IVR program
              </span>
              <div className="popup-body-b">
                <label
                  htmlFor="number"
                  style={{
                    marginLeft: "55px",
                    fontSize: "13px",
                  }}
                >
                  Select Number
                </label>
                <input
                  type="number"
                  name="number"
                  value={dtmf}
                  id="dtmf"
                  onChange={handleInputChange}
                  style={{ width: "30%", marginLeft: "55px" }}
                />
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

export default StartCallNode;
