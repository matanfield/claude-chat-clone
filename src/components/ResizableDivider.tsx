import React, { useState, useCallback } from 'react';

interface ResizableDividerProps {
  onResize: (delta: number) => void;
  isVertical?: boolean;
}

export const ResizableDivider: React.FC<ResizableDividerProps> = ({ onResize, isVertical = true }) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const delta = isVertical ? e.movementX : e.movementY;
      onResize(delta);
    }
  }, [isDragging, onResize, isVertical]);

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      className={`resizable-divider ${isVertical ? 'vertical' : 'horizontal'}`}
      onMouseDown={handleMouseDown}
      style={{
        cursor: isVertical ? 'col-resize' : 'row-resize',
        width: isVertical ? '4px' : '100%',
        height: isVertical ? '100%' : '4px',
      }}
    />
  );
}; 