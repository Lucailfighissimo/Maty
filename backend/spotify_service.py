import spotipy
from spotipy.oauth2 import SpotifyClientCredentials, SpotifyOAuth
import os
from typing import Dict, List, Optional
import logging

logger = logging.getLogger(__name__)

class SpotifyService:
    def __init__(self):
        self.client_id = os.getenv('SPOTIFY_CLIENT_ID')
        self.client_secret = os.getenv('SPOTIFY_CLIENT_SECRET')
        self.redirect_uri = os.getenv('REDIRECT_URI')
        
        # Client credentials for app-only requests (no user auth needed)
        self.client_credentials_manager = SpotifyClientCredentials(
            client_id=self.client_id,
            client_secret=self.client_secret
        )
        self.sp = spotipy.Spotify(client_credentials_manager=self.client_credentials_manager)
        
    def get_oauth_manager(self):
        """Get OAuth manager for user authentication"""
        return SpotifyOAuth(
            client_id=self.client_id,
            client_secret=self.client_secret,
            redirect_uri=self.redirect_uri,
            scope="user-read-playback-state user-modify-playback-state user-read-private streaming user-library-read playlist-read-private"
        )
    
    def get_user_spotify_client(self, access_token: str):
        """Get user-authenticated Spotify client"""
        return spotipy.Spotify(auth=access_token)
    
    def search_tracks(self, query: str, limit: int = 20) -> Dict:
        """Search for tracks using app credentials"""
        try:
            results = self.sp.search(q=query, limit=limit, type='track')
            return results
        except Exception as e:
            logger.error(f"Error searching tracks: {e}")
            return {"tracks": {"items": []}}
    
    def get_featured_playlists(self, limit: int = 20) -> Dict:
        """Get featured playlists"""
        try:
            results = self.sp.featured_playlists(limit=limit)
            return results
        except Exception as e:
            logger.error(f"Error getting featured playlists: {e}")
            return {"playlists": {"items": []}}
    
    def get_new_releases(self, limit: int = 20) -> Dict:
        """Get new album releases"""
        try:
            results = self.sp.new_releases(limit=limit)
            return results
        except Exception as e:
            logger.error(f"Error getting new releases: {e}")
            return {"albums": {"items": []}}
    
    def get_categories(self, limit: int = 20) -> Dict:
        """Get browse categories"""
        try:
            results = self.sp.categories(limit=limit)
            return results
        except Exception as e:
            logger.error(f"Error getting categories: {e}")
            return {"categories": {"items": []}}
    
    def get_playlist_tracks(self, playlist_id: str, limit: int = 50) -> Dict:
        """Get tracks from a playlist"""
        try:
            results = self.sp.playlist_tracks(playlist_id, limit=limit)
            return results
        except Exception as e:
            logger.error(f"Error getting playlist tracks: {e}")
            return {"items": []}
    
    def get_artist_top_tracks(self, artist_id: str, country: str = 'US') -> Dict:
        """Get artist's top tracks"""
        try:
            results = self.sp.artist_top_tracks(artist_id, country=country)
            return results
        except Exception as e:
            logger.error(f"Error getting artist top tracks: {e}")
            return {"tracks": []}
    
    def get_recommendations(self, seed_artists: List[str] = None, seed_genres: List[str] = None, 
                          seed_tracks: List[str] = None, limit: int = 20) -> Dict:
        """Get track recommendations"""
        try:
            results = self.sp.recommendations(
                seed_artists=seed_artists,
                seed_genres=seed_genres,
                seed_tracks=seed_tracks,
                limit=limit
            )
            return results
        except Exception as e:
            logger.error(f"Error getting recommendations: {e}")
            return {"tracks": []}

# Global Spotify service instance
spotify_service = SpotifyService()