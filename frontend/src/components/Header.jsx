import React from 'react';
import { Search, ChevronLeft, ChevronRight, User } from 'lucide-react';

const Header = ({ searchQuery, setSearchQuery, activeSection }) => {
  const getTitle = () => {
    switch (activeSection) {
      case 'home':
        return 'Good evening';
      case 'search':
        return 'Search';
      case 'library':
        return 'Your Library';
      default:
        return 'Good evening';
    }
  };

  return (
    <header className="bg-gradient-to-b from-gray-800 to-gray-900 text-white p-4">
      <div className="flex items-center justify-between">
        {/* Navigation and Search */}
        <div className="flex items-center space-x-4 flex-1">
          <div className="flex items-center space-x-2">
            <button className="w-8 h-8 bg-black bg-opacity-70 rounded-full flex items-center justify-center hover:bg-opacity-80 transition-all">
              <ChevronLeft size={16} />
            </button>
            <button className="w-8 h-8 bg-black bg-opacity-70 rounded-full flex items-center justify-center hover:bg-opacity-80 transition-all">
              <ChevronRight size={16} />
            </button>
          </div>

          {activeSection === 'search' && (
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="What do you want to play?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-80 bg-white text-black pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-4">
          <button className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
            Upgrade
          </button>
          <button className="bg-black bg-opacity-70 hover:bg-opacity-80 text-white px-4 py-1 rounded-full flex items-center space-x-2 transition-all">
            <User size={16} />
            <span className="text-sm">Profile</span>
          </button>
        </div>
      </div>

      {/* Page Title */}
      {activeSection !== 'search' && (
        <div className="mt-6">
          <h1 className="text-3xl font-bold">{getTitle()}</h1>
        </div>
      )}
    </header>
  );
};

export default Header;