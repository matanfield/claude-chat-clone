import React from 'react';
import { Code2, Copy } from 'lucide-react';

const OutputPane: React.FC = () => {
  return (
    <div className="w-96 border-l bg-white">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Code2 size={20} />
          Output
        </h2>
      </div>
      
      <div className="p-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="text-sm font-medium">Generated Code</div>
            <button className="p-1 hover:bg-gray-200 rounded">
              <Copy size={16} />
            </button>
          </div>
          <pre className="text-sm text-gray-700 overflow-x-auto">
            <code>{`function example() {
  console.log("Hello, World!");
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default OutputPane;