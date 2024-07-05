import React from 'react';
import { Position, Handle } from 'reactflow';

export const OptionNode = ({ number, style, parentId }) => {
    return (
        <div className="option" style={{ width: style?.width, position: style?.position, right: style?.right }}>
            <p>{number}</p>
            <Handle
                type="source"
                position={Position.Bottom}
                id={`${parentId}-${number}`} // Unique handle ID
                key={`${parentId}-${number}`} // Ensure key remains unique for dynamic rendering
                style={{
                    width: '18px',
                    height: '18px',
                    backgroundColor: '#BAB7B7',
                    borderRadius: '50%',
                }}
            />
        </div>
    );
};
