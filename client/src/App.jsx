import { useSelector } from 'react-redux';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Explorer from './components/explorer';
import Content from './components/content';
import Footer from './components/footer';
import ConsoleOverlay from './components/consoleOverlay';

const App = () => {
  const explorerVisible = useSelector((state) => state.ui.explorerVisible);

  return (
    <div className="flex h-full flex-col overflow-hidden bg-vscode-bg text-vscode-text">
      <Header />
      <div
        className={`grid min-h-0 flex-1 overflow-hidden soft-transition ${explorerVisible ? 'grid-cols-[72px_320px_1fr]' : 'grid-cols-[72px_0px_1fr]'}`}
      >
        <Sidebar />
        <div className="min-w-0 overflow-hidden soft-transition">
          <div className={`${explorerVisible ? 'opacity-100' : 'opacity-0'} h-full soft-transition`}>
            <Explorer />
          </div>
        </div>
        <div className="min-w-0 overflow-hidden">
          <Content />
        </div>
      </div>
      <Footer />
      <ConsoleOverlay />
    </div>
  );
}

export default App