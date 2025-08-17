from fastapi import APIRouter, HTTPException, Query
from spotify_service import spotify_service
from typing import Optional
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/spotify", tags=["spotify"])

@router.get("/search")
async def search_music(
    q: str = Query(..., description="Search query"),
    limit: int = Query(20, ge=1, le=50, description="Number of results")
):
    """Search for tracks, artists, albums, playlists"""
    try:
        results = spotify_service.search_tracks(q, limit)
        return results
    except Exception as e:
        logger.error(f"Search error: {e}")
        raise HTTPException(status_code=500, detail="Search failed")

@router.get("/featured-playlists")
async def get_featured_playlists(limit: int = Query(20, ge=1, le=50)):
    """Get featured playlists from Spotify"""
    try:
        results = spotify_service.get_featured_playlists(limit)
        return results
    except Exception as e:
        logger.error(f"Featured playlists error: {e}")
        raise HTTPException(status_code=500, detail="Failed to get featured playlists")

@router.get("/new-releases")
async def get_new_releases(limit: int = Query(20, ge=1, le=50)):
    """Get new album releases"""
    try:
        results = spotify_service.get_new_releases(limit)
        return results
    except Exception as e:
        logger.error(f"New releases error: {e}")
        raise HTTPException(status_code=500, detail="Failed to get new releases")

@router.get("/categories")
async def get_browse_categories(limit: int = Query(20, ge=1, le=50)):
    """Get browse categories"""
    try:
        results = spotify_service.get_categories(limit)
        return results
    except Exception as e:
        logger.error(f"Categories error: {e}")
        raise HTTPException(status_code=500, detail="Failed to get categories")

@router.get("/playlist/{playlist_id}/tracks")
async def get_playlist_tracks(playlist_id: str, limit: int = Query(50, ge=1, le=100)):
    """Get tracks from a specific playlist"""
    try:
        results = spotify_service.get_playlist_tracks(playlist_id, limit)
        return results
    except Exception as e:
        logger.error(f"Playlist tracks error: {e}")
        raise HTTPException(status_code=500, detail="Failed to get playlist tracks")

@router.get("/artist/{artist_id}/top-tracks")
async def get_artist_top_tracks(artist_id: str, country: str = Query("US")):
    """Get artist's top tracks"""
    try:
        results = spotify_service.get_artist_top_tracks(artist_id, country)
        return results
    except Exception as e:
        logger.error(f"Artist top tracks error: {e}")
        raise HTTPException(status_code=500, detail="Failed to get artist top tracks")

@router.get("/recommendations")
async def get_recommendations(
    seed_artists: Optional[str] = Query(None, description="Comma-separated artist IDs"),
    seed_genres: Optional[str] = Query(None, description="Comma-separated genres"),
    seed_tracks: Optional[str] = Query(None, description="Comma-separated track IDs"),
    limit: int = Query(20, ge=1, le=100)
):
    """Get track recommendations"""
    try:
        # Parse comma-separated values
        artists = seed_artists.split(',') if seed_artists else None
        genres = seed_genres.split(',') if seed_genres else None
        tracks = seed_tracks.split(',') if seed_tracks else None
        
        results = spotify_service.get_recommendations(
            seed_artists=artists,
            seed_genres=genres,
            seed_tracks=tracks,
            limit=limit
        )
        return results
    except Exception as e:
        logger.error(f"Recommendations error: {e}")
        raise HTTPException(status_code=500, detail="Failed to get recommendations")

# Authentication routes for user-specific features
@router.get("/auth/login")
async def spotify_login():
    """Get Spotify OAuth login URL"""
    try:
        sp_oauth = spotify_service.get_oauth_manager()
        auth_url = sp_oauth.get_authorize_url()
        return {"auth_url": auth_url}
    except Exception as e:
        logger.error(f"Auth login error: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate login URL")

@router.get("/auth/callback")
async def spotify_callback(code: str):
    """Handle Spotify OAuth callback"""
    try:
        sp_oauth = spotify_service.get_oauth_manager()
        token_info = sp_oauth.get_access_token(code)
        return {
            "access_token": token_info["access_token"],
            "refresh_token": token_info["refresh_token"],
            "expires_in": token_info["expires_in"]
        }
    except Exception as e:
        logger.error(f"Auth callback error: {e}")
        raise HTTPException(status_code=500, detail="Failed to process callback")

@router.post("/auth/refresh")
async def refresh_token(refresh_token: str):
    """Refresh Spotify access token"""
    try:
        sp_oauth = spotify_service.get_oauth_manager()
        token_info = sp_oauth.refresh_access_token(refresh_token)
        return {
            "access_token": token_info["access_token"],
            "expires_in": token_info.get("expires_in")
        }
    except Exception as e:
        logger.error(f"Token refresh error: {e}")
        raise HTTPException(status_code=500, detail="Failed to refresh token")