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

  const normalizedPath = currentPath.toLowerCase();
  const isAdminRoute = normalizedPath === '/admin';
  const isLayoutRoute = normalizedPath === '/layout';

  useEffect(() => {
    if (isAdminRoute) {
      document.documentElement.classList.add('admin-mode-active');
      document.body.classList.add('admin-mode-active');
      document.documentElement.classList.remove('layout-mode-active');
      document.body.classList.remove('layout-mode-active');
    } else if (isLayoutRoute) {
      document.documentElement.classList.add('layout-mode-active');
      document.body.classList.add('layout-mode-active');
      document.documentElement.classList.remove('admin-mode-active');
      document.body.classList.remove('admin-mode-active');
    } else {
      document.documentElement.classList.remove('admin-mode-active', 'layout-mode-active');
      document.body.classList.remove('admin-mode-active', 'layout-mode-active');
    }
  }, [isAdminRoute, isLayoutRoute]);

  return (
    <div
      className={`app-root-wrapper ${isAdminRoute ? 'admin-mode-active' : ''} ${
        isLayoutRoute ? 'layout-mode-active' : ''
      }`}
    >
      <div
        className={`app-main-container ${isAdminRoute ? 'admin-mode-active' : ''} ${
          isLayoutRoute ? 'layout-mode-active' : ''
        }`}
      >
        {isAdminRoute ? (
          <AdminPage />
        ) : (
          <MonolithicGrid isEditMode={isLayoutRoute} />
        )}
      </div>
    </div>
  );
}

export default App;
