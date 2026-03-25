import { HeroSection } from '../components/home/HeroSection';
import { SceneGrid } from '../components/home/SceneGrid';
import { useScenes } from '../hooks/useScenes';
import { useNoticias } from '../hooks/useNoticias';

export function HomePage() {
  const { data: scenes, loading, syncing } = useScenes();
  const { data: noticias } = useNoticias();

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection noticias={noticias} />
      <SceneGrid scenes={scenes} loading={loading && scenes.length === 0} syncing={syncing} />
    </div>
  );
}
