import React from 'react';
import { Home, Search, Library, Plus, Heart, Download } from 'lucide-react';
import { mockUserPlaylists } from '../mockData';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const sidebarItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'library', icon: Library, label: 'Your Library' }
  ];

  return (
    <div className="w-64 bg-black text-white h-full flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-lg">♪</span>
          </div>
          <span className="text-white font-bold text-xl">Spotify</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-6">
        <ul className="space-y-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center space-x-3 w-full text-left py-2 px-2 rounded transition-colors ${
                    activeSection === item.id
                      ? 'text-white bg-gray-800'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon size={24} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Create Playlist */}
      <div className="px-6 mt-6">
        <button className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
          <div className="w-6 h-6 bg-gray-600 flex items-center justify-center rounded-sm">
            <Plus size={16} />
          </div>
          <span className="font-medium">Create Playlist</span>
        </button>
        <button className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors mt-4">
          <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center rounded-sm">
            <Heart size={16} fill="white" />
          </div>
          <span className="font-medium">Liked Songs</span>
        </button>
      </div>

      {/* Separator */}
      <div className="mx-6 mt-4 mb-4 border-t border-gray-700"></div>

      {/* User Playlists */}
      <div className="flex-1 px-6 overflow-y-auto">
        <div className="space-y-2">
          {mockUserPlaylists.map((playlist) => (
            <button
              key={playlist.id}
              className="block w-full text-left text-gray-400 hover:text-white transition-colors py-1 text-sm truncate"
            >
              {playlist.name}
            </button>
          ))}
        </div>
      </div>

      {/* Install App */}
      <div className="px-6 py-4 border-t border-gray-700">
        <button className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
          <Download size={20} />
          <span className="font-medium">Install App</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;