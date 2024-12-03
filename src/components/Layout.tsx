import React, { useState } from 'react';
import { ResizableDivider } from './ResizableDivider';

export const Layout: React.FC = () => {
  const [leftWidth, setLeftWidth] = useState(250);
  const [rightWidth, setRightWidth] = useState(300);

  const handleLeftResize = (delta: number) => {
    setLeftWidth(prev => Math.max(150, Math.min(500, prev + delta)));
  };

  const handleRightResize = (delta: number) => {
    setRightWidth(prev => Math.max(200, Math.min(600, prev - delta)));
  };

  return (
    <div className="layout-container">
      <div className="left-pane" style={{ width: leftWidth }}>
        {/* Left pane content */}
      </div>
      <ResizableDivider onResize={handleLeftResize} />
      <div className="main-pane" style={{ flex: 1 }}>
        {/* Main pane content */}
      </div>
      <ResizableDivider onResize={handleRightResize} />
      <div className="right-pane" style={{ width: rightWidth }}>
        {/* Right pane content */}
      </div>
    </div>
  );
}; 