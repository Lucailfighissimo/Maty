import React, { useState } from 'react';
import { Grid3X3, List, Search, Plus, ArrowRight } from 'lucide-react';
import { mockUserPlaylists } from '../mockData';

const LibraryPage = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [filter, setFilter] = useState('all'); // 'all', 'playlists', 'artists', 'albums'

  const filters = [
    { id: 'all', label: 'Recently played' },
    { id: 'playlists', label: 'Playlists' },
    { id: 'artists', label: 'Artists' },
    { id: 'albums', label: 'Albums' }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 min-h-full text-white">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Your Library</h1>
          <div className="flex items-center space-x-2">
            <button className="text-gray-400 hover:text-white transition-colors">
              <Search size={20} />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <Plus size={20} />
            </button>
            <button 
              onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {viewMode === 'list' ? <Grid3X3 size={20} /> : <List size={20} />}
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex space-x-2 mb-4">
          {filters.map((filterItem) => (
            <button
              key={filterItem.id}
              onClick={() => setFilter(filterItem.id)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filter === filterItem.id
                  ? 'bg-white text-black'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              {filterItem.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-6">
        {viewMode === 'list' ? (
          <div className="space-y-2">
            {mockUserPlaylists.map((playlist) => (
              <div 
                key={playlist.id}
                className="flex items-center p-2 rounded hover:bg-gray-800 transition-colors cursor-pointer group"
              >
                <div className="w-12 h-12 rounded mr-3 flex-shrink-0 bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  {playlist.image ? (
                    <img 
                      src={playlist.image} 
                      alt={playlist.name}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <span className="text-white text-lg">♪</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">{playlist.name}</p>
                  <p className="text-gray-400 text-xs truncate">
                    {playlist.isLiked ? `${playlist.songs} liked songs` : 
                     `${playlist.description} • ${playlist.songs} songs`}
                  </p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight size={16} className="text-gray-400" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {mockUserPlaylists.map((playlist) => (
              <div 
                key={playlist.id}
                className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <div className="w-full aspect-square rounded mb-3 bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  {playlist.image ? (
                    <img 
                      src={playlist.image} 
                      alt={playlist.name}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <span className="text-white text-2xl">♪</span>
                  )}
                </div>
                <h3 className="text-white font-medium text-sm mb-1 truncate">{playlist.name}</h3>
                <p className="text-gray-400 text-xs">
                  {playlist.isLiked ? `${playlist.songs} liked songs` : 
                   `${playlist.songs} songs`}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryPage;