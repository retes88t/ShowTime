import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { SceneDetailPage } from './pages/SceneDetailPage';
import { AdminPage } from './pages/AdminPage';
import { LibretoPage } from './pages/LibretoPage';
import { EstructuraPage } from './pages/EstructuraPage';
import { AudicionPage } from './pages/AudicionPage';
import { AudicionPersonajePage } from './pages/AudicionPersonajePage';
import { AyudaAudicionesPage } from './pages/AyudaAudicionesPage';
import { CastPage } from './pages/CastPage';
import { TareasPage } from './pages/TareasPage';
import { MinutasPage } from './pages/MinutasPage';
import { MinutaDetallePage } from './pages/MinutaDetallePage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  return (
    <HashRouter>
      <AppProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/escena/:id" element={<SceneDetailPage />} />
              <Route path="/estructura" element={<EstructuraPage />} />
              <Route path="/libreto" element={<LibretoPage />} />
              <Route path="/audicion" element={<AudicionPage />} />
              <Route path="/audicion/:personaje" element={<AudicionPersonajePage />} />
              <Route path="/ayuda-audiciones" element={<AyudaAudicionesPage />} />
              <Route path="/cast" element={<CastPage />} />
              <Route path="/tareas" element={<TareasPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/minutas" element={<MinutasPage />} />
              <Route path="/minutas/:id" element={<MinutaDetallePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AppProvider>
    </HashRouter>
  );
}

export default App;
