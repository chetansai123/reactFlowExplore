import React from 'react'
import { BaseEdge, getBezierPath, useReactFlow, EdgeLabelRenderer, MarkerType } from 'reactflow';
import "./styles.css";

const CustomEdge = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd
}) => {
    const { setEdges } = useReactFlow();
    const [path, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });
    const onEdgeClick = () => {
        setEdges((edges) => edges.filter((edge) => edge.id !== id));
    };
    console.log(markerEnd);
    return (
        <>
            <BaseEdge path={path} markerEnd={markerEnd} style={style} />
            <EdgeLabelRenderer>
                <div
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        fontSize: 12,
                        // everything inside EdgeLabelRenderer has no pointer events by default
                        // if you have an interactive element, set pointer-events: all
                        pointerEvents: 'all',
                    }}
                    className="nodrag nopan"
                >
                    <button className="edgebutton" onClick={onEdgeClick}>
                        ×
                    </button>
                </div>
            </EdgeLabelRenderer>
        </>
    )
}

export default CustomEdge;