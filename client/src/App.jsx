import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from './components/layout/header';
import Sidebar from './components/layout/sidebar';
import Explorer from './components/layout/explorer/explorer';
import ExplorerResizeHandle from './components/layout/explorer/explorerResizeHandle';
import Content from './components/layout/content';
import Footer from './components/layout/footer';
import { STORAGE_KEY } from './store/slices/uiSlice';

const App = () => {
  const explorerVisible = useSelector((state) => state.ui.explorerVisible);
  const explorerWidth = useSelector((state) => state.ui.explorerWidth);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, String(explorerWidth));
  }, [explorerWidth]);

  return (
    <div className="flex h-full flex-col overflow-hidden bg-[var(--app-bg)] text-[var(--app-fg)]">
      <Header />

      <div className="flex min-h-0 flex-1 overflow-hidden soft-transition fade-up">
        <div className="flex h-full min-h-0 shrink-0">
          <Sidebar />

          <div
            className="relative h-full min-h-0 overflow-visible"
            style={{
              width: explorerVisible ? `${explorerWidth}px` : '0px',
            }}
          >
            <Explorer />
            <ExplorerResizeHandle />
          </div>
        </div>

        <div className="min-w-0 flex-1 overflow-hidden">
          <Content />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default App;