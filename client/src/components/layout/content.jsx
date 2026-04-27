import { useSelector } from 'react-redux';
import TabContent from './tabs/tabContent';

export default function Content() {
  const panelMode = useSelector((state) => state.ui.panelMode);
  const explorerVisible = useSelector((state) => state.ui.explorerVisible);

  return (
    <div className="flex h-full min-w-0 flex-1 overflow-hidden">
      <div
        className={`min-w-0 flex-1 overflow-hidden soft-transition ${
          explorerVisible ? '' : 'w-full'
        }`}
      >
        <div
          className={`flex h-full min-h-0 flex-col overflow-hidden ${
            panelMode === 'expanded' ? 'bg-vscode-bg' : ''
          }`}
        >
          <TabContent />
        </div>
      </div>
    </div>
  );
}