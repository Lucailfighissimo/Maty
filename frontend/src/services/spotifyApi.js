// Spotify API service
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api/spotify`;

class SpotifyApiService {
  async searchTracks(query, limit = 20) {
    try {
      const response = await fetch(`${API}/search?q=${encodeURIComponent(query)}&limit=${limit}`);
      if (!response.ok) throw new Error('Search failed');
      return await response.json();
    } catch (error) {
      console.error('Search error:', error);
      return { tracks: { items: [] } };
    }
  }

  async getFeaturedPlaylists(limit = 20) {
    try {
      const response = await fetch(`${API}/featured-playlists?limit=${limit}`);
      if (!response.ok) throw new Error('Failed to get featured playlists');
      return await response.json();
    } catch (error) {
      console.error('Featured playlists error:', error);
      return { playlists: { items: [] } };
    }
  }

  async getNewReleases(limit = 20) {
    try {
      const response = await fetch(`${API}/new-releases?limit=${limit}`);
      if (!response.ok) throw new Error('Failed to get new releases');
      return await response.json();
    } catch (error) {
      console.error('New releases error:', error);
      return { albums: { items: [] } };
    }
  }

  async getCategories(limit = 20) {
    try {
      const response = await fetch(`${API}/categories?limit=${limit}`);
      if (!response.ok) throw new Error('Failed to get categories');
      return await response.json();
    } catch (error) {
      console.error('Categories error:', error);
      return { categories: { items: [] } };
    }
  }

  async getPlaylistTracks(playlistId, limit = 50) {
    try {
      const response = await fetch(`${API}/playlist/${playlistId}/tracks?limit=${limit}`);
      if (!response.ok) throw new Error('Failed to get playlist tracks');
      return await response.json();
    } catch (error) {
      console.error('Playlist tracks error:', error);
      return { items: [] };
    }
  }

  async getArtistTopTracks(artistId, country = 'US') {
    try {
      const response = await fetch(`${API}/artist/${artistId}/top-tracks?country=${country}`);
      if (!response.ok) throw new Error('Failed to get artist top tracks');
      return await response.json();
    } catch (error) {
      console.error('Artist top tracks error:', error);
      return { tracks: [] };
    }
  }

  async getRecommendations(options = {}) {
    try {
      const params = new URLSearchParams();
      if (options.seed_artists) params.append('seed_artists', options.seed_artists.join(','));
      if (options.seed_genres) params.append('seed_genres', options.seed_genres.join(','));
      if (options.seed_tracks) params.append('seed_tracks', options.seed_tracks.join(','));
      if (options.limit) params.append('limit', options.limit);

      const response = await fetch(`${API}/recommendations?${params}`);
      if (!response.ok) throw new Error('Failed to get recommendations');
      return await response.json();
    } catch (error) {
      console.error('Recommendations error:', error);
      return { tracks: [] };
    }
  }

  // Helper methods to transform Spotify data to our format
  transformTrackData(spotifyTrack) {
    return {
      id: spotifyTrack.id,
      title: spotifyTrack.name,
      artist: spotifyTrack.artists.map(artist => artist.name).join(', '),
      album: spotifyTrack.album.name,
      image: spotifyTrack.album.images[0]?.url || spotifyTrack.album.images[1]?.url || spotifyTrack.album.images[2]?.url,
      duration: this.formatDuration(spotifyTrack.duration_ms),
      uri: spotifyTrack.uri,
      preview_url: spotifyTrack.preview_url,
      popularity: spotifyTrack.popularity
    };
  }

  transformPlaylistData(spotifyPlaylist) {
    return {
      id: spotifyPlaylist.id,
      name: spotifyPlaylist.name,
      description: spotifyPlaylist.description,
      image: spotifyPlaylist.images[0]?.url || spotifyPlaylist.images[1]?.url || spotifyPlaylist.images[2]?.url,
      songs: spotifyPlaylist.tracks?.total || 0,
      uri: spotifyPlaylist.uri
    };
  }

  transformArtistData(spotifyArtist) {
    return {
      id: spotifyArtist.id,
      name: spotifyArtist.name,
      image: spotifyArtist.images[0]?.url || spotifyArtist.images[1]?.url || spotifyArtist.images[2]?.url,
      followers: spotifyArtist.followers?.total ? this.formatFollowers(spotifyArtist.followers.total) : 'N/A',
      uri: spotifyArtist.uri
    };
  }

  formatDuration(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  formatFollowers(count) {
    if (count >= 1000000) {
      return `${Math.floor(count / 1000000)}M`;
    } else if (count >= 1000) {
      return `${Math.floor(count / 1000)}K`;
    }
    return count.toString();
  }
}

export const spotifyApi = new SpotifyApiService();
export default spotifyApi;