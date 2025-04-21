
import React from 'react';
import { Link } from 'react-router-dom';

type PlayerCardProps = {
  id: number;
  name: string;
  image: string;
  team: string;
  position: string;
  stats: {
    points: number;
    assists: number;
    rebounds?: number;
    goals?: number;
    tackles?: number;
    saves?: number;
  };
};

const PlayerCard: React.FC<PlayerCardProps> = ({ id, name, image, team, position, stats }) => {
  // Determine which stats to display based on what's available
  const getStatDisplay = () => {
    if (stats.rebounds !== undefined) {
      // Basketball player
      return (
        <>
          <div className="stat-item">
            <span className="stat-label">PTS</span>
            <span className="stat-value">{stats.points}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">AST</span>
            <span className="stat-value">{stats.assists}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">REB</span>
            <span className="stat-value">{stats.rebounds}</span>
          </div>
        </>
      );
    } else if (stats.goals !== undefined) {
      // Football player
      return (
        <>
          <div className="stat-item">
            <span className="stat-label">GOALS</span>
            <span className="stat-value">{stats.goals}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">ASST</span>
            <span className="stat-value">{stats.assists}</span>
          </div>
        </>
      );
    } else {
      // Generic stats
      return (
        <>
          <div className="stat-item">
            <span className="stat-label">PTS</span>
            <span className="stat-value">{stats.points}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">ASST</span>
            <span className="stat-value">{stats.assists}</span>
          </div>
        </>
      );
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-48 object-cover object-top"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h3 className="font-bold text-xl text-white">{name}</h3>
          <p className="text-gray-300 text-sm">{position}</p>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-3">
          <span className="bg-sports-blue-100 text-sports-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {team}
          </span>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Season Stats</h4>
          <div className="grid grid-cols-3 gap-2 text-center">
            {getStatDisplay()}
          </div>
        </div>
        
        <Link 
          to={`/players/${id}`} 
          className="block w-full bg-sports-blue-700 hover:bg-sports-blue-800 text-white text-center py-2 rounded transition-colors duration-300"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default PlayerCard;

// Add some additional styles
const styles = `
  .stat-item {
    @apply bg-gray-100 p-2 rounded flex flex-col;
  }

  .stat-label {
    @apply text-xs text-gray-500 mb-1;
  }

  .stat-value {
    @apply font-bold text-sports-blue-700;
  }
`;
