import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clampExplorerWidth, setExplorerWidth } from '../../../store/slices/uiSlice';

export default function ExplorerResizeHandle() {
  const dispatch = useDispatch();
  const explorerVisible = useSelector((state) => state.ui.explorerVisible);
  const explorerWidth = useSelector((state) => state.ui.explorerWidth);

  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);

  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(explorerWidth);

  const handlePointerMove = (event) => {
    if (!draggingRef.current) return;

    const delta = event.clientX - startXRef.current;
    const nextWidth = clampExplorerWidth(startWidthRef.current + delta);
    dispatch(setExplorerWidth(nextWidth));
  };

  const stopDragging = () => {
    draggingRef.current = false;
    setDragging(false);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    window.removeEventListener('pointermove', handlePointerMove);
  };

  const handlePointerUp = () => {
    stopDragging();
  };

  const handlePointerDown = (event) => {
    if (!explorerVisible) return;

    event.preventDefault();
    draggingRef.current = true;
    setDragging(true);
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

  const active = hovered || dragging;

  return (
    <div
      role="separator"
      aria-orientation="vertical"
      onPointerDown={handlePointerDown}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className="absolute right-0 top-0 z-30 h-full w-2 cursor-col-resize select-none touch-none"
      title="Resize explorer"
    >
      <div
        className={[
          'mx-auto h-full w-px transition-colors duration-150',
          active
            ? 'bg-[var(--focus-border)]/80'
            : 'bg-[var(--sidebar-border)]/35 hover:bg-[var(--focus-border)]/70',
        ].join(' ')}
      />
    </div>
  );
}