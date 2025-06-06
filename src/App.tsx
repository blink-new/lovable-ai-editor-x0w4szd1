import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Home from './pages/Home';
import FlowEditor from './pages/FlowEditor';
import { useFlowStore } from './stores/flowStore';
import './App.css';

function App() {
  const { flows, addFlow } = useFlowStore();

  // Add sample flows on first load
  useEffect(() => {
    if (flows.length === 0) {
      // Add sample flows
      addFlow({
        name: 'معالج البيانات الذكي',
        description: 'فلو لمعالجة البيانات وتحليلها باستخدام الذكاء الاصطناعي',
        nodes: [],
        edges: [],
      });
      
      addFlow({
        name: 'مولد المحتوى التلقائي',
        description: 'ينشئ محتوى تلقائيًا باستخدام GPT',
        nodes: [],
        edges: [],
      });
      
      addFlow({
        name: 'أتمتة البريد الإلكتروني',
        description: 'يرسل رسائل بريد إلكتروني تلقائية بناءً على الأحداث',
        nodes: [],
        edges: [],
      });
    }
  }, []);

  return (
    <Router>
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#18181b',
            color: '#fff',
            border: '1px solid #27272a',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<FlowEditor />} />
        <Route path="/editor/:id" element={<FlowEditor />} />
      </Routes>
    </Router>
  );
}

export default App;