import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clampExplorerWidth, setExplorerWidth } from '../../../store/slices/uiSlice';

export default function ExplorerResizeHandle() {
  const dispatch = useDispatch();
  const explorerVisible = useSelector((state) => state.ui.explorerVisible);
  const explorerWidth = useSelector((state) => state.ui.explorerWidth);

  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(explorerWidth);

  const stopDragging = () => {
    draggingRef.current = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    window.removeEventListener('pointermove', handlePointerMove);
  };

  const handlePointerMove = (event) => {
    if (!draggingRef.current) return;

    const delta = event.clientX - startXRef.current;
    const nextWidth = clampExplorerWidth(startWidthRef.current + delta);
    dispatch(setExplorerWidth(nextWidth));
  };

  const handlePointerUp = () => {
    stopDragging();
  };

  const handlePointerDown = (event) => {
    if (!explorerVisible) return;

    event.preventDefault();
    draggingRef.current = true;
    startXRef.current = event.clientX;
    startWidthRef.current = explorerWidth;

    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp, { once: true });
  };

  useEffect(() => {
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, []);

  if (!explorerVisible) return null;

  return (
    <div
      role="separator"
      aria-orientation="vertical"
      onPointerDown={handlePointerDown}
      className="group h-full w-[3px] cursor-col-resize bg-[var(--sidebar-border)]/70 transition-colors hover:bg-[var(--focus-border)]/80"
    >
      <div className="h-full w-full bg-transparent group-hover:bg-[var(--focus-border)]/35" />
    </div>
  );
}