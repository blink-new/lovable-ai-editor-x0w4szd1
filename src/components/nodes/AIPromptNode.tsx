import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export const AIPromptNode: React.FC<NodeProps> = ({ data, isConnectable }) => {
  const [prompt, setPrompt] = React.useState(data.content || '');

  const handleRun = () => {
    console.log('Running AI Prompt:', prompt);
    // TODO: Implement AI prompt execution
  };

  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 min-w-[300px]">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-3 h-3"
      />
      
      <div className="mb-2">
        <h3 className="text-sm font-semibold text-white mb-2">AI Prompt</h3>
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="أدخل الأمر هنا..."
          className="bg-zinc-900 border-zinc-700 text-white min-h-[100px]"
        />
      </div>
      
      <Button
        size="sm"
        onClick={handleRun}
        className="w-full bg-blue-600 hover:bg-blue-700"
      >
        <Play className="w-4 h-4 mr-1" />
        تشغيل
      </Button>
      
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-3 h-3"
      />
    </div>
  );
};

export default AIPromptNode;