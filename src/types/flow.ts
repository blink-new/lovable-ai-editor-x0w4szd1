import { Node, Edge } from 'reactflow';

export interface FlowNode extends Node {
  data: {
    label: string;
    content?: string;
    type?: 'ai-prompt' | 'http-trigger' | 'output';
  };
}

export type FlowEdge = Edge;

export interface Flow {
  id: string;
  name: string;
  description: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
  createdAt: string;
  updatedAt: string;
}