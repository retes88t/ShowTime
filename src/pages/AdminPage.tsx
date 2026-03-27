import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScenes } from '../hooks/useScenes';
import { useNoticias } from '../hooks/useNoticias';
import { PeopleManager } from '../components/admin/PeopleManager';
import { ScenesManager } from '../components/admin/ScenesManager';
import { NoticiasManager } from '../components/admin/NoticiasManager';
import { seedAllData } from '../utils/seedData';
import { useAppContext } from '../context/AppContext';

const TABS = [
  { id: 'personas', label: 'Personas' },
  { id: 'escenas', label: 'Escenas' },
  { id: 'noticias', label: 'Noticias' },
] as const;

type TabId = (typeof TABS)[number]['id'];

export function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabId>('personas');
  const [seeding, setSeeding] = useState(false);
  const { data: scenes, refetch: refetchScenes } = useScenes();
  const { data: noticias, refetch: refetchNoticias } = useNoticias();
  const { refreshPeople, isAdmin } = useAppContext();

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500">Acceso restringido. Inicia sesion como admin desde el header.</p>
      </div>
    );
  }

  const handleSeed = async () => {
    if (!confirm('Esto poblara datos iniciales (6 escenas, personas, y noticias de ejemplo). Continuar?')) return;
    setSeeding(true);
    try {
      await seedAllData();
      await refetchScenes();
      await refreshPeople();
      await refetchNoticias();
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Administracion</h1>
              <p className="text-sm text-gray-500">Gestiona personas, escenas, noticias y datos de la obra</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/minutas"
                className="rounded-lg border border-blue-300 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
              >
                Minutas
              </Link>
              <button
                onClick={handleSeed}
                disabled={seeding}
                className="rounded-lg border border-gold bg-gold/10 px-4 py-2 text-sm font-medium text-gold-dark hover:bg-gold/20 disabled:opacity-50"
              >
                {seeding ? 'Poblando...' : 'Poblar datos iniciales'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-6">
        {/* Tabs */}
        <div className="mb-6 flex gap-1 rounded-lg bg-gray-100 p-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-md px-4 py-2 text-sm font-medium transition ${
                activeTab === tab.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'personas' && <PeopleManager />}
        {activeTab === 'escenas' && <ScenesManager scenes={scenes} onRefresh={refetchScenes} />}
        {activeTab === 'noticias' && <NoticiasManager noticias={noticias} onRefresh={refetchNoticias} />}
      </div>
    </div>
  );
}
