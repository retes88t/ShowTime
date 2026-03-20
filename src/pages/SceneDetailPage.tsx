import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useScenes } from '../hooks/useScenes';
import { useMaterials } from '../hooks/useMaterials';
import { useEscenografia } from '../hooks/useEscenografia';
import { useAssignments } from '../hooks/useAssignments';
import { useNotes } from '../hooks/useNotes';
import { useChat } from '../hooks/useChat';
import { SceneHeader } from '../components/scene/SceneHeader';
import { SceneContext } from '../components/scene/SceneContext';
import { MaterialsList } from '../components/scene/MaterialsList';
import { ScenographyList } from '../components/scene/ScenographyList';
import { AssignmentPanel } from '../components/scene/AssignmentPanel';
import { NotesPanel } from '../components/scene/NotesPanel';
import { MiniChat } from '../components/scene/MiniChat';
import { Spinner } from '../components/ui/Spinner';

const TABS = [
  { id: 'contexto', label: 'Contexto' },
  { id: 'materiales', label: 'Materiales' },
  { id: 'escenografia', label: 'Escenografia' },
  { id: 'responsables', label: 'Responsables' },
  { id: 'notas', label: 'Notas' },
  { id: 'chat', label: 'Chat' },
] as const;

type TabId = (typeof TABS)[number]['id'];

export function SceneDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<TabId>('contexto');

  const { data: scenes, loading: scenesLoading, syncing } = useScenes();
  const { data: materials, refetch: refetchMaterials } = useMaterials(id);
  const { data: escenografia, refetch: refetchEscenografia } = useEscenografia(id);
  const { data: assignments, refetch: refetchAssignments } = useAssignments(id);
  const { data: notes, refetch: refetchNotes } = useNotes(id);
  const { messages, loading: chatLoading, refetch: refetchChat } = useChat(id || '');

  if (scenesLoading && scenes.length === 0) return <Spinner />;

  const scene = scenes.find((s) => s.id === id);
  if (!scene) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-gray-50">
      <SceneHeader scene={scene} totalScenes={scenes.length} scenes={scenes} />

      <div className="mx-auto max-w-5xl px-4 py-6">
        {syncing && (
          <div className="mb-3 flex items-center gap-2 text-xs text-gray-400">
            <div className="h-3 w-3 animate-spin rounded-full border-2 border-gold border-t-transparent" />
            Sincronizando...
          </div>
        )}
        {/* Tabs */}
        <div className="mb-6 flex gap-1 overflow-x-auto rounded-lg bg-gray-100 p-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition ${
                activeTab === tab.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div>
          {activeTab === 'contexto' && <SceneContext scene={scene} />}
          {activeTab === 'materiales' && (
            <MaterialsList materials={materials} escenaId={scene.id} onRefresh={refetchMaterials} />
          )}
          {activeTab === 'escenografia' && (
            <ScenographyList items={escenografia} escenaId={scene.id} onRefresh={refetchEscenografia} />
          )}
          {activeTab === 'responsables' && (
            <AssignmentPanel assignments={assignments} escenaId={scene.id} onRefresh={refetchAssignments} />
          )}
          {activeTab === 'notas' && (
            <NotesPanel notes={notes} escenaId={scene.id} onRefresh={refetchNotes} />
          )}
          {activeTab === 'chat' && (
            <MiniChat messages={messages} escenaId={scene.id} onRefresh={refetchChat} loading={chatLoading} />
          )}
        </div>
      </div>
    </div>
  );
}
