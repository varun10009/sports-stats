
import React from 'react';

type ComparisonData = {
  name: string;
  imageUrl: string;
  stats: Record<string, number | string>;
};

type ComparisonTableProps = {
  leftPlayer: ComparisonData;
  rightPlayer: ComparisonData;
  statNames: {
    key: string;
    label: string;
  }[];
};

const ComparisonTable: React.FC<ComparisonTableProps> = ({
  leftPlayer,
  rightPlayer,
  statNames
}) => {
  const getComparisonResult = (stat: string) => {
    if (typeof leftPlayer.stats[stat] === 'number' && typeof rightPlayer.stats[stat] === 'number') {
      if (leftPlayer.stats[stat] > rightPlayer.stats[stat]) return 'left';
      if (leftPlayer.stats[stat] < rightPlayer.stats[stat]) return 'right';
    }
    return 'equal';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="grid grid-cols-3">
        {/* Left Player Header */}
        <div className="bg-sports-blue-700 text-white p-4 text-center">
          <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-3 border-4 border-white">
            <img 
              src={leftPlayer.imageUrl} 
              alt={leftPlayer.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-bold text-lg">{leftPlayer.name}</h3>
        </div>
        
        {/* Center Header */}
        <div className="bg-sports-blue-900 text-white p-4 flex items-center justify-center">
          <h2 className="font-bold text-lg text-center">Player Comparison</h2>
        </div>
        
        {/* Right Player Header */}
        <div className="bg-sports-red-700 text-white p-4 text-center">
          <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-3 border-4 border-white">
            <img 
              src={rightPlayer.imageUrl} 
              alt={rightPlayer.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-bold text-lg">{rightPlayer.name}</h3>
        </div>
      </div>
      
      {/* Comparison Table Body */}
      <div>
        {statNames.map((stat) => {
          const comparisonResult = getComparisonResult(stat.key);
          
          return (
            <div key={stat.key} className="grid grid-cols-3 border-b border-gray-200">
              {/* Left Player Stat */}
              <div
                className={`p-3 text-center font-semibold ${
                  comparisonResult === 'left' ? 'bg-sports-blue-100 text-sports-blue-800' : ''
                }`}
              >
                {leftPlayer.stats[stat.key]}
                {comparisonResult === 'left' && (
                  <span className="ml-2 text-sports-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                )}
              </div>
              
              {/* Stat Label */}
              <div className="p-3 text-center bg-gray-50 font-medium text-gray-600">
                {stat.label}
              </div>
              
              {/* Right Player Stat */}
              <div
                className={`p-3 text-center font-semibold ${
                  comparisonResult === 'right' ? 'bg-sports-red-100 text-sports-red-800' : ''
                }`}
              >
                {rightPlayer.stats[stat.key]}
                {comparisonResult === 'right' && (
                  <span className="ml-2 text-sports-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComparisonTable;
