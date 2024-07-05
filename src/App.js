import React, { useCallback, useState, useRef, useEffect } from 'react';
import ReactFlow, {
  Background, BackgroundVariant, useNodesState, useEdgesState, addEdge, useReactFlow, Panel,
  ReactFlowProvider, Controls, MiniMap, MarkerType
} from 'reactflow';
import { nodeTypes, edgeTypes } from "../src/components/register.jsx";
import Sidebar from './components/Sidebar.jsx';
import 'reactflow/dist/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const initialNodes = [
  // { id: '1', position: { x: 500, y: 50 }, data: { label: 'STARTCALL', handleType: "single" }, type: "startCall" },
  // { id: '2', position: { x: 600, y: 0 }, data: { label: 'ANSWERCALL', handleType: "multiple" }, type: "answerCall" },
  // { id: '3', position: { x: 300, y: 100 }, data: { label: '3', handleType: "single" } },
  // { id: '4', position: { x: 400, y: 200 }, data: { label: '4', handleType: "multiple" } },
  // { id: '5', position: { x: 400, y: 400 }, data: { label: 'Add Contact List', handleType: "multiple" }, type: "addContactsList" },
  // { id: '6', position: { x: 600, y: 600 }, data: { label: '6', handleType: "multiple" } },
  // { id: '7', position: { x: 800, y: 800 }, data: { label: '7', handleType: "multiple" } },
  // {
  //   id: '8', position: { x: 1000, y: 100 }, data: { label: 'Gather DTMF', handleType: "multiple" }, type: "complexNode"
  // },
];
const defaultEdgeOptions = {
  animated: true,
  style: { stroke: '#ff0000' },
  type: 'customEdge',
  markerEnd: MarkerType.ArrowClosed,
};

const initialEdges = [
  // {
  //   id: 'e3-4', source: '3', target: '4', markerEnd: {
  //     type: MarkerType.ArrowClosed,
  //     width: 20,
  //     height: 20,
  //     color: '#FF0072',
  //   },
  //   style: { stroke: '#FF0072', strokeWidth: 2 },
  //   label: 'default arrow',
  // },
  // { id: 'e6-7', source: '6', target: '7', animated: true, style: { stroke: 'rgb(158, 118, 255)', strokeWidth: 2 }, type: "customEdge" }
];

function App() {

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedEdges, setSelectedEdges] = useState([]);
  const [rfInstance, setRfInstance] = useState(null);
  const reactFlowWrapper = useRef(null);
  const { setViewport, getEdges } = useReactFlow();

  const flowkey = 'flow-key';
  const getNodeId = () => `randomnode_${+new Date()}`;

  const updateNodeData = useCallback((id, key, data) => {
    setNodes((nds) => nds.map((node) =>
      node.id === id ? {
        ...node,
        data: {
          ...node.data,
          [key]: data,
        }
      } : node
    ))
  }, [setNodes]);

  const onDelete = useCallback((nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => {
      const isSource = edge.source === nodeId && edge.sourceHandle;
      const isTarget = edge.target === nodeId && edge.targetHandle;
      return !isSource && !isTarget;
    }));
  }, [setNodes, setEdges]);

  const nodesWithUpdate = nodes.map(node => ({
    ...node,
    data: {
      ...node.data,
      updateNodeData: updateNodeData,
      onDelete,
    }
  }));

  const onConnect = useCallback(
    (params) => {
      const { source, target, sourceHandle, targetHandle } = params;
      console.log('Connecting:', source, sourceHandle, target, targetHandle);

      const isSourceConnected = edges.some(edge => edge.source === source && edge.sourceHandle === sourceHandle);
      const isTargetConnected = edges.some(edge => edge.target === target && edge.targetHandle === targetHandle);

      // if (isSourceConnected || isTargetConnected) {
      //   alert('Connection already exists for single handle type.');
      //   return;
      // }

      // Create new edge
      const newEdge = {
        source,
        target,
        sourceHandle,
        targetHandle,
        id: `${source}-${target}-${sourceHandle}-${targetHandle}`, // Ensure unique ID format
        animated: true,
        type: "customEdge",
        markerEnd: `${MarkerType.ArrowClosed}`,
        style: { stroke: 'rgb(158, 118, 255)', strokeWidth: 2 }
      };

      console.log('Creating new edge:', newEdge);
      try {
        setEdges((prevEdges) => addEdge(newEdge, prevEdges));
        const Edges = getEdges();
        console.log(Edges);
      } catch (err) {
        console.error(err);
        return;
      }
      console.log('Edge created successfully');
    },
    [nodes, edges, setEdges]
  );

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      console.log(flow);
      localStorage.setItem(flowkey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowkey));
      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };
    restoreFlow();
  }, [setNodes, setEdges, setViewport]);

  const onAdd = useCallback(() => {
    const node = {
      id: getNodeId(),
      data: { label: 'new node' },
      position: {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
      },
    };
    setNodes((nodes) => nodes.concat(node));
  }, [setNodes]);

  const onReset = () => {
    localStorage.removeItem(flowkey);
  }

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData('application/reactflow/type');
    const label = event.dataTransfer.getData('application/reactflow/label');
    if (!type || typeof type === 'undefined') {
      return;
    }
    const position = rfInstance.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });
    const newNode = {
      id: getNodeId(),
      type,
      position,
      data: { label }
    }
    setNodes((nds) => nds.concat(newNode));
  }, [rfInstance, setNodes]);

  const onEdgeClick = useCallback((event, edge) => {
    setSelectedEdges((prevSelectedEdges) => [...prevSelectedEdges, edge.id]);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setEdges((eds) => eds.filter((edge) => !selectedEdges.includes(edge.id)));
        setSelectedEdges([]);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedEdges, setEdges]);


  return (
    <div className='main'>
      <Sidebar className='sidebar' />
      <div className='wrapper' ref={reactFlowWrapper} >
        <ReactFlow
          nodes={nodesWithUpdate}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          defaultEdgeOptions={defaultEdgeOptions}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onInit={setRfInstance}
          onEdgeClick={onEdgeClick}
          onDragOver={onDragOver}
          onDrop={onDrop}
          fitView
          deleteKeyCode={27}
        >
          <Background variant={BackgroundVariant.Dots} />
          <Panel position="top-right">
            <button onClick={onSave}>save</button>
            <button onClick={onRestore}>restore</button>
            <button onClick={onReset}>reset</button>
            <button onClick={onAdd}>add node</button>
          </Panel>
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
}
// eslint-disable-next-line
export default () => (
  <ReactFlowProvider>
    <App />
  </ReactFlowProvider>
);