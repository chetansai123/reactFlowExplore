import React, { useEffect, useState } from 'react';
import { MdDeleteOutline, MdOutlineSettings } from "react-icons/md";
import "../complexNode/style.css";
import { OptionNode } from './OptionNode.js';
import { useUpdateNodeInternals } from 'reactflow';

export const ComplexNode = ({ data, id }) => {

    const [nodeData, setNodeData] = useState(data?.nodeData || {});

    const { showPopup = false, conditionCount = 0 } = nodeData;
    const updateNodeInternals = useUpdateNodeInternals();

    const handleInputChange = (e) => {
        const value = parseInt(e.target.value, 10);
        console.log(value);
        const updatedNodeData = { ...nodeData, conditionCount: value };
        setNodeData(updatedNodeData);
        updateNodeInternals(id);
    };

    useEffect(() => {
        if (data?.nodeData) {
            data.updateNodeData(id, "nodeData", nodeData);
        }
    }, [id, data.updateNodeData]);

    const handlePopupToggle = () => {
        const updatedNodeData = { ...nodeData, showPopup: !showPopup };
        setNodeData(updatedNodeData);
        data.updateNodeData(id, "nodeData", updatedNodeData);
    };

    const handleDelete = () => {
        data.onDelete(id);
    };

    const renderConditions = () => {
        const conditionNodes = [];
        for (let i = 1; i <= conditionCount; i++) {
            conditionNodes.push(
                <OptionNode number={i} parentId={id} key={`option-${id}-${i}`} />
            );
        }
        return conditionNodes;
    };

    return (
        <div className="gather-dtmf-component">
            <div className="header-dtmf">
                <div className='label'>{data.label}</div>
                <div className='icons'>
                    <MdDeleteOutline size={33} onClick={handleDelete} />
                    <MdOutlineSettings size={33} onClick={handlePopupToggle} />
                </div>
            </div>

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <label htmlFor="condition-count">Enter Number of Conditions (0-9):</label>
                        <input
                            id="condition-count"
                            type="number"
                            max={9}
                            min={1}
                            value={conditionCount}
                            onChange={handleInputChange}
                        />
                        <button onClick={handlePopupToggle}>Close</button>
                    </div>
                </div>
            )}
            <div className='content'>
                <p style={{ fontWeight: "bold" }}>CONDITIONS</p>
                <div className="conditions" >
                    <div >
                        <OptionNode style={{ width: "230px" }} key={"press"} parentId={id} number={'Use press or say something'} />
                    </div>
                    <div style={{ width: "430px", display: "flex", gap: "12px" }}>
                        {renderConditions()}
                    </div>
                    <div >
                        <OptionNode style={{ width: "100px" }} key={"none"} parentId={id} number={'No Input'} />
                    </div>
                </div>
            </div>
        </div>
    );
};
