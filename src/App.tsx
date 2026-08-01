import { useState, useEffect } from 'react';
import './styles/theme.css';
import { MonolithicGrid } from './components/MonolithicGrid';
import { AdminPage } from './components/AdminPage';

export function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const isAdminRoute = currentPath.toLowerCase() === '/admin';

  useEffect(() => {
    if (isAdminRoute) {
      document.documentElement.classList.add('admin-mode-active');
      document.body.classList.add('admin-mode-active');
    } else {
      document.documentElement.classList.remove('admin-mode-active');
      document.body.classList.remove('admin-mode-active');
    }
  }, [isAdminRoute]);

  return (
    <div className={`app-root-wrapper ${isAdminRoute ? 'admin-mode-active' : ''}`}>
      <div className={`app-main-container ${isAdminRoute ? 'admin-mode-active' : ''}`}>
        {isAdminRoute ? <AdminPage /> : <MonolithicGrid />}
      </div>
    </div>
  );
}

export default App;
