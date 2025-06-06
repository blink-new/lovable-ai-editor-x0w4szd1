import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { FileOutput } from 'lucide-react';

export const OutputNode: React.FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 min-w-[300px]">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-3 h-3"
      />
      
      <div className="flex items-center gap-2 mb-3">
        <FileOutput className="w-5 h-5 text-green-500" />
        <h3 className="text-sm font-semibold text-white">Output</h3>
      </div>
      
      <div className="bg-zinc-900 border border-zinc-700 rounded p-3 min-h-[80px]">
        <p className="text-sm text-zinc-400">
          {data.result || 'سيتم عرض النتيجة هنا...'}
        </p>
      </div>
    </div>
  );
};

export default OutputNode;