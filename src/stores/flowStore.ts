import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { Flow, FlowNode, FlowEdge } from '../types/flow';

interface FlowStore {
  flows: Flow[];
  addFlow: (flow: Omit<Flow, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateFlow: (id: string, flow: Partial<Flow>) => void;
  deleteFlow: (id: string) => void;
  getFlow: (id: string) => Flow | undefined;
}

export const useFlowStore = create<FlowStore>()(
  persist(
    (set, get) => ({
      flows: [],
      addFlow: (flow) => {
        const newFlow: Flow = {
          ...flow,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ flows: [...state.flows, newFlow] }));
        return newFlow.id;
      },
      updateFlow: (id, flow) => {
        set((state) => ({
          flows: state.flows.map((f) =>
            f.id === id ? { ...f, ...flow, updatedAt: new Date().toISOString() } : f
          ),
        }));
      },
      deleteFlow: (id) => {
        set((state) => ({
          flows: state.flows.filter((f) => f.id !== id),
        }));
      },
      getFlow: (id) => {
        return get().flows.find((f) => f.id === id);
      },
    }),
    {
      name: 'flow-storage',
    }
  )
);