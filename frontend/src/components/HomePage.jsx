import React, { useState, useEffect } from 'react';
import SongCard from './SongCard';
import PlaylistCard from './PlaylistCard';
import ArtistCard from './ArtistCard';
import spotifyApi from '../services/spotifyApi';

const HomePage = ({ currentTrack, setCurrentTrack, isPlaying, setIsPlaying }) => {
  const [trendingSongs, setTrendingSongs] = useState([]);
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    setLoading(true);
    try {
      // Get trending songs by searching popular terms
      const trendingResults = await spotifyApi.searchTracks('chart hits 2025', 6);
      const transformedTrending = trendingResults.tracks.items.map(track => 
        spotifyApi.transformTrackData(track)
      );

      // Get featured playlists
      const playlistsResult = await spotifyApi.getFeaturedPlaylists(4);
      const transformedPlaylists = playlistsResult.playlists.items.map(playlist => 
        spotifyApi.transformPlaylistData(playlist)
      );

      // Get new releases
      const releasesResult = await spotifyApi.getNewReleases(3);
      const transformedReleases = releasesResult.albums.items.map(album => ({
        id: album.id,
        name: album.name,
        description: `${album.artists.map(a => a.name).join(', ')}`,
        image: album.images[0]?.url || album.images[1]?.url,
        type: 'album'
      }));

      setTrendingSongs(transformedTrending);
      setFeaturedPlaylists(transformedPlaylists);
      setNewReleases(transformedReleases);
      setRecentlyPlayed(transformedReleases); // Use new releases as recently played for demo

    } catch (error) {
      console.error('Error loading home data:', error);
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

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 min-h-full text-white p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-xl">Loading Spotify data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 min-h-full text-white p-6">
      {/* Recently Played */}
      <div className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentlyPlayed.slice(0, 3).map((item) => (
            <div 
              key={item.id}
              className="bg-gray-700 bg-opacity-50 rounded-md flex items-center p-2 hover:bg-opacity-70 transition-all cursor-pointer group"
            >
              <img 
                src={item.image} 
                alt={item.name}
                className="w-16 h-16 rounded object-cover"
              />
              <div className="ml-4 flex-1">
                <p className="text-white font-medium text-sm">{item.name}</p>
                <p className="text-gray-400 text-xs">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Playlists */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Featured playlists</h2>
          <button className="text-gray-400 hover:text-white text-sm font-medium">Show all</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {featuredPlaylists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </section>

      {/* Trending Songs */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Trending songs</h2>
          <button className="text-gray-400 hover:text-white text-sm font-medium">Show all</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {trendingSongs.map((song, index) => (
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

      {/* New Releases */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">New releases</h2>
          <button className="text-gray-400 hover:text-white text-sm font-medium">Show all</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {newReleases.map((release) => (
            <div 
              key={release.id}
              className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-all duration-300 cursor-pointer group"
            >
              <div className="relative mb-3">
                <img 
                  src={release.image} 
                  alt={release.name}
                  className="w-full aspect-square object-cover rounded-md"
                />
              </div>
              <h3 className="text-white font-medium text-sm mb-1 truncate">{release.name}</h3>
              <p className="text-gray-400 text-xs truncate">{release.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;