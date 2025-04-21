
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSportsContext } from '../context/SportsContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { selectedSport, setSelectedSport } = useSportsContext();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-sports-blue-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v10" />
            </svg>
            <span className="text-xl font-bold">SportStats</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-sports-blue-300 transition duration-300">Home</Link>
            <Link to="/teams" className="hover:text-sports-blue-300 transition duration-300">Teams</Link>
            <Link to="/players" className="hover:text-sports-blue-300 transition duration-300">Players</Link>
            <Link to="/compare" className="hover:text-sports-blue-300 transition duration-300">Compare</Link>
            <Link to="/contact" className="hover:text-sports-blue-300 transition duration-300">Contact</Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="mobile-menu-button p-2 focus:outline-none focus:bg-sports-blue-900 rounded"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden mt-4 pb-4`}>
          <div className="flex flex-col space-y-3">
            <Link to="/" className="hover:bg-sports-blue-900 px-3 py-2 rounded" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/teams" className="hover:bg-sports-blue-900 px-3 py-2 rounded" onClick={() => setIsMenuOpen(false)}>Teams</Link>
            <Link to="/players" className="hover:bg-sports-blue-900 px-3 py-2 rounded" onClick={() => setIsMenuOpen(false)}>Players</Link>
            <Link to="/compare" className="hover:bg-sports-blue-900 px-3 py-2 rounded" onClick={() => setIsMenuOpen(false)}>Compare</Link>
            <Link to="/contact" className="hover:bg-sports-blue-900 px-3 py-2 rounded" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          </div>
        </div>
      </div>
      
      {/* Sport Selection Bar */}
      <div className="bg-sports-blue-900 py-2">
        <div className="container mx-auto px-4 overflow-x-auto whitespace-nowrap">
          <div className="flex space-x-4">
            {['basketball', 'football', 'tennis', 'cricket'].map((sport) => (
              <button
                key={sport}
                onClick={() => setSelectedSport(sport)}
                className={`px-4 py-1 text-sm rounded-full transition duration-300 ${
                  selectedSport.toLowerCase() === sport.toLowerCase()
                    ? 'bg-sports-red-500 text-white'
                    : 'text-white hover:bg-sports-blue-700'
                }`}
              >
                {sport.charAt(0).toUpperCase() + sport.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
