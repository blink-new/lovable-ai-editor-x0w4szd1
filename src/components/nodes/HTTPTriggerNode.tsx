import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const HTTPTriggerNode: React.FC<NodeProps> = ({ data, isConnectable }) => {
  const webhookUrl = `https://lovable.dev/api/flows/${data.flowId}/trigger`;

  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 min-w-[300px]">
      <div className="flex items-center gap-2 mb-3">
        <Globe className="w-5 h-5 text-blue-500" />
        <h3 className="text-sm font-semibold text-white">HTTP Trigger</h3>
      </div>
      
      <div className="mb-2">
        <label className="text-xs text-zinc-400 block mb-1">Webhook URL</label>
        <Input
          value={webhookUrl}
          readOnly
          className="bg-zinc-900 border-zinc-700 text-white text-xs"
        />
      </div>
      
      <p className="text-xs text-zinc-400">
        نقطة البداية للفلو
      </p>
      
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-3 h-3"
      />
    </div>
  );
};

export default HTTPTriggerNode;