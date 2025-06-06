import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactFlow, {
  Node,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Play, Save, ArrowLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useFlowStore } from '../stores/flowStore';
import AIPromptNode from '../components/nodes/AIPromptNode';
import HTTPTriggerNode from '../components/nodes/HTTPTriggerNode';
import OutputNode from '../components/nodes/OutputNode';

const nodeTypes = {
  'ai-prompt': AIPromptNode,
  'http-trigger': HTTPTriggerNode,
  'output': OutputNode,
};

const FlowEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getFlow, addFlow, updateFlow } = useFlowStore();
  const [flowName, setFlowName] = useState('فلو جديد');
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [showNodeMenu, setShowNodeMenu] = useState(false);

  useEffect(() => {
    if (id) {
      const flow = getFlow(id);
      if (flow) {
        setFlowName(flow.name);
        setNodes(flow.nodes);
        setEdges(flow.edges);
      }
    }
  }, [id, getFlow]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleSave = () => {
    const flowData = {
      name: flowName,
      description: 'فلو أتمتة',
      nodes,
      edges,
    };

    if (id) {
      updateFlow(id, flowData);
      toast.success('تم حفظ التغييرات');
    } else {
      const newId = addFlow(flowData);
      navigate(`/editor/${newId}`, { replace: true });
      toast.success('تم إنشاء الفلو بنجاح');
    }
  };

  const handleRun = () => {
    toast.info('جاري تشغيل الفلو...');
    // TODO: Implement flow execution
  };

  const addNode = (type: string) => {
    const newNode: Node = {
      id: `${type}-${Date.now()}`,
      type,
      position: { x: 250, y: 250 },
      data: { label: type, flowId: id },
    };
    setNodes((nds) => [...nds, newNode]);
    setShowNodeMenu(false);
  };

  return (
    <div className="h-screen bg-zinc-900 text-white flex flex-col">
      {/* Header */}
      <div className="bg-zinc-800 border-b border-zinc-700 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="text-zinc-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            رجوع
          </Button>
          <input
            type="text"
            value={flowName}
            onChange={(e) => setFlowName(e.target.value)}
            className="bg-transparent text-xl font-bold outline-none"
            placeholder="اسم الفلو"
          />
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleRun}
            className="bg-green-600 hover:bg-green-700"
          >
            <Play className="w-4 h-4 mr-2" />
            تشغيل
          </Button>
          <Button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Save className="w-4 h-4 mr-2" />
            حفظ
          </Button>
        </div>
      </div>

      {/* Flow Canvas */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background color="#333" gap={16} />
          <Controls />
          <MiniMap
            nodeColor="#1f2937"
            maskColor="rgb(39, 39, 42, 0.8)"
            pannable
            zoomable
          />
        </ReactFlow>

        {/* Add Node Button */}
        <div className="absolute bottom-8 right-8">
          <Button
            onClick={() => setShowNodeMenu(!showNodeMenu)}
            className="rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-700 shadow-lg"
          >
            <Plus className="w-6 h-6" />
          </Button>
          
          {showNodeMenu && (
            <div className="absolute bottom-16 right-0 bg-zinc-800 border border-zinc-700 rounded-lg p-2 shadow-xl">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addNode('http-trigger')}
                className="w-full justify-start mb-1"
              >
                HTTP Trigger
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addNode('ai-prompt')}
                className="w-full justify-start mb-1"
              >
                AI Prompt
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addNode('output')}
                className="w-full justify-start"
              >
                Output
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlowEditor;