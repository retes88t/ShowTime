import { HeroSection } from '../components/home/HeroSection';
import { SceneGrid } from '../components/home/SceneGrid';
import { useScenes } from '../hooks/useScenes';

export function HomePage() {
  const { data: scenes, loading } = useScenes();

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <SceneGrid scenes={scenes} loading={loading} />
    </div>
  );
}
