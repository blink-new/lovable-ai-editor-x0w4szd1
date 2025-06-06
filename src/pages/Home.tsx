import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pencil, Trash2, Plus } from 'lucide-react';
import { useFlowStore } from '../stores/flowStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { flows, deleteFlow } = useFlowStore();

  const handleCreateFlow = () => {
    navigate('/editor');
  };

  const handleEditFlow = (id: string) => {
    navigate(`/editor/${id}`);
  };

  const handleDeleteFlow = (id: string, name: string) => {
    if (window.confirm(`هل أنت متأكد من حذف "${name}"؟`)) {
      deleteFlow(id);
      toast.success('تم حذف الفلو بنجاح');
    }
  };

  const handleRunFlow = (id: string, name: string) => {
    toast.info(`جاري تشغيل "${name}"...`);
    // TODO: Implement flow execution
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Lovable</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {flows.map((flow) => (
            <Card key={flow.id} className="bg-zinc-800 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">{flow.name}</CardTitle>
                <CardDescription className="text-zinc-400">{flow.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleRunFlow(flow.id, flow.name)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Play className="w-4 h-4 mr-1" />
                    تشغيل
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleEditFlow(flow.id)}
                    className="bg-zinc-700 hover:bg-zinc-600"
                  >
                    <Pencil className="w-4 h-4 mr-1" />
                    تعديل
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteFlow(flow.id, flow.name)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    حذف
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {flows.length === 0 && (
          <div className="text-center py-16">
            <p className="text-zinc-400 mb-4">لا توجد فلوهات حتى الآن</p>
          </div>
        )}

        <Button
          onClick={handleCreateFlow}
          className="fixed bottom-8 left-8 rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-700 shadow-lg"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default Home;