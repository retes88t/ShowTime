import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { SceneDetailPage } from './pages/SceneDetailPage';
import { AdminPage } from './pages/AdminPage';
import { LibretoPage } from './pages/LibretoPage';
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
              <Route path="/libreto" element={<LibretoPage />} />
              <Route path="/admin" element={<AdminPage />} />
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
