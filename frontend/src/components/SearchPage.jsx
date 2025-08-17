import React, { useState, useEffect } from 'react';
import SongCard from './SongCard';
import PlaylistCard from './PlaylistCard';
import ArtistCard from './ArtistCard';
import spotifyApi from '../services/spotifyApi';

const SearchPage = ({ searchQuery, currentTrack, setCurrentTrack, isPlaying, setIsPlaying }) => {
  const [searchResults, setSearchResults] = useState({ tracks: [], artists: [], playlists: [] });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      performSearch(searchQuery);
    } else {
      setSearchResults({ tracks: [], artists: [], playlists: [] });
    }
  }, [searchQuery]);

  const loadCategories = async () => {
    try {
      const result = await spotifyApi.getCategories(8);
      const categoryColors = [
        'bg-green-500', 'bg-blue-600', 'bg-purple-600', 'bg-orange-500',
        'bg-pink-500', 'bg-red-500', 'bg-yellow-500', 'bg-gray-600'
      ];
      
      const transformedCategories = result.categories.items.map((category, index) => ({
        name: category.name,
        color: categoryColors[index % categoryColors.length],
        image: category.icons[0]?.url || `https://images.unsplash.com/photo-${1493225457124 + index}-a3eb161ffa5f?w=300&h=300&fit=crop`
      }));
      
      setCategories(transformedCategories);
    } catch (error) {
      console.error('Error loading categories:', error);
      // Fallback categories
      setCategories([
        { name: 'Podcasts', color: 'bg-green-500', image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=300&h=300&fit=crop' },
        { name: 'Charts', color: 'bg-blue-600', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop' },
        { name: 'New Releases', color: 'bg-purple-600', image: 'https://images.unsplash.com/photo-1445985543470-41fba5c3144a?w=300&h=300&fit=crop' },
        { name: 'Discover', color: 'bg-orange-500', image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop' },
        { name: 'Concert', color: 'bg-pink-500', image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop' },
        { name: 'Hip-Hop', color: 'bg-red-500', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop' },
        { name: 'Rock', color: 'bg-yellow-500', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop' },
        { name: 'Pop', color: 'bg-gray-600', image: 'https://images.unsplash.com/photo-1445985543470-41fba5c3144a?w=300&h=300&fit=crop' }
      ]);
    }
  };

  const performSearch = async (query) => {
    setLoading(true);
    try {
      const results = await spotifyApi.searchTracks(query, 20);
      
      // Transform tracks
      const tracks = results.tracks.items.map(track => spotifyApi.transformTrackData(track));
      
      // Extract unique artists from tracks
      const artistsMap = new Map();
      results.tracks.items.forEach(track => {
        track.artists.forEach(artist => {
          if (!artistsMap.has(artist.id)) {
            artistsMap.set(artist.id, {
              id: artist.id,
              name: artist.name,
              image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop', // Placeholder
              followers: 'N/A',
              uri: artist.uri
            });
          }
        });
      });
      
      const artists = Array.from(artistsMap.values()).slice(0, 6);
      
      setSearchResults({
        tracks: tracks.slice(0, 12),
        artists: artists,
        playlists: [] // We could implement playlist search separately
      });
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults({ tracks: [], artists: [], playlists: [] });
    } finally {
      setLoading(false);
    }
  };

  const handlePlay = (song) => {
    setCurrentTrack(song);
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  if (searchQuery.trim() === '') {
    return (
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 min-h-full text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Browse all</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <div 
              key={index}
              className={`${category.color} rounded-lg p-6 cursor-pointer hover:scale-105 transition-transform relative overflow-hidden h-32`}
            >
              <h3 className="text-white font-bold text-lg mb-2">{category.name}</h3>
              <div className="absolute -right-4 -bottom-2 transform rotate-12">
                <div className="w-20 h-20 rounded shadow-lg">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 min-h-full text-white p-6">
      {loading && (
        <div className="text-center py-4">
          <div className="text-lg text-gray-400">Searching Spotify...</div>
        </div>
      )}

      {/* Search Results */}
      {!loading && (searchResults.tracks.length === 0 && searchResults.artists.length === 0) ? (
        <div className="text-center py-8">
          <p className="text-gray-400 text-lg">No results found for "{searchQuery}"</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Songs */}
          {searchResults.tracks.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Songs</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {searchResults.tracks.map((song, index) => (
                  <SongCard 
                    key={song.id}
                    song={song}
                    index={index}
                    isPlaying={isPlaying && currentTrack?.id === song.id}
                    onPlay={handlePlay}
                    onPause={handlePause}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Artists */}
          {searchResults.artists.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Artists</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {searchResults.artists.map((artist) => (
                  <ArtistCard key={artist.id} artist={artist} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;