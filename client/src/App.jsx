import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/layout/header';
import Sidebar from './components/layout/sidebar';
import Explorer from './components/layout/explorer/explorer';
import ExplorerResizeHandle from './components/layout/explorer/explorerResizeHandle';
import Content from './components/layout/content';
import Footer from './components/layout/footer';
import { STORAGE_KEY } from './store/slices/uiSlice';

const App = () => {
  const dispatch = useDispatch();
  const explorerVisible = useSelector((state) => state.ui.explorerVisible);
  const explorerWidth = useSelector((state) => state.ui.explorerWidth);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, String(explorerWidth));
  }, [explorerWidth]);

  return (
    <div className="flex h-full flex-col overflow-hidden bg-[var(--app-bg)] text-[var(--app-fg)]">
      <Header />

      <div
        className="grid min-h-0 flex-1 overflow-hidden"
        style={{
          gridTemplateColumns: explorerVisible
            ? `${48}px ${explorerWidth}px 3px minmax(0, 1fr)`
            : `${48}px 0px 0px minmax(0, 1fr)`,
        }}
      >
        <Sidebar />

        <div className="min-w-0 overflow-hidden">
          <Explorer />
        </div>

        <ExplorerResizeHandle />

        <div className="min-w-0 overflow-hidden">
          <Content />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default App;