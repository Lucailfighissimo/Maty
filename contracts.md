# Spotify Clone - Backend Integration Contracts

## Current Implementation Status
✅ **Frontend-only implementation complete** with comprehensive mock data and fully functional UI
✅ **All core Spotify features replicated**: navigation, search, music player, playlists, library management
✅ **Responsive design** with authentic Spotify dark theme and interactions

## Mock Data Currently Used (from /app/frontend/src/mockData.js)
- **Trending Songs**: 6 songs with titles, artists, albums, images, durations
- **Popular Artists**: 6 artists with names, images, follower counts
- **Playlists**: 4 curated playlists with descriptions and song counts
- **User Playlists**: 3 personal playlists including "Liked Songs"
- **Recently Played**: 3 recent items (playlists/albums)
- **Current Track**: Single track for music player state

## API Contracts for Backend Integration

### 1. Authentication Endpoints
```
POST /api/auth/register - User registration
POST /api/auth/login - User login
POST /api/auth/logout - User logout
GET /api/auth/me - Get current user profile
```

### 2. Music Content Endpoints
```
GET /api/songs/trending - Get trending songs (replaces mockTrendingSongs)
GET /api/artists/popular - Get popular artists (replaces mockPopularArtists)
GET /api/playlists/featured - Get featured playlists (replaces mockPlaylists)
GET /api/search?q={query} - Search songs, artists, playlists
```

### 3. User Library Endpoints
```
GET /api/user/playlists - Get user's playlists (replaces mockUserPlaylists)
POST /api/user/playlists - Create new playlist
GET /api/user/recent - Get recently played items (replaces mockRecentlyPlayed)
GET /api/user/liked-songs - Get user's liked songs
POST /api/user/like-song/{songId} - Like/unlike a song
```

### 4. Music Playback Endpoints
```
GET /api/player/current - Get currently playing track (replaces mockCurrentTrack)
POST /api/player/play - Start/resume playback
POST /api/player/pause - Pause playback
POST /api/player/next - Skip to next track
POST /api/player/previous - Skip to previous track
```

## Database Schema Requirements

### Users Table
- id, email, username, password_hash, created_at, updated_at

### Songs Table
- id, title, artist, album, image_url, audio_url, duration, created_at

### Artists Table
- id, name, image_url, bio, follower_count, created_at

### Playlists Table
- id, name, description, image_url, user_id, is_public, created_at

### User Interactions Tables
- user_liked_songs (user_id, song_id, created_at)
- user_recently_played (user_id, item_id, item_type, played_at)
- playlist_songs (playlist_id, song_id, position, added_at)

## Frontend Integration Points

### 1. Replace Mock Data Imports
Current:
```javascript
import { mockTrendingSongs, mockPopularArtists } from '../mockData';
```

Future:
```javascript
import { fetchTrendingSongs, fetchPopularArtists } from '../api/musicApi';
```

### 2. State Management Updates
- Replace local useState with API calls
- Add loading states for all data fetching
- Implement error handling for failed requests
- Add real-time updates for music player state

### 3. Authentication Integration
- Add login/register forms
- Implement protected routes
- Store user tokens securely
- Handle session management

## Music Streaming Implementation
For actual music playback, integrate with:
- **Spotify Web API** (requires premium developer access)
- **Local music files** uploaded by users
- **YouTube Audio API** for public tracks
- **SoundCloud API** for independent artists

## Technical Requirements for Full Backend
1. **File Storage**: AWS S3 or similar for audio files and images
2. **Authentication**: JWT tokens with refresh mechanism
3. **Real-time Features**: WebSockets for multi-device playback sync
4. **Caching**: Redis for frequently accessed data
5. **Audio Processing**: FFmpeg for audio format conversion
6. **Search**: Elasticsearch for fast music search

## Current Functional Features (Frontend Only)
✅ Complete navigation between Home, Search, and Library
✅ Real-time search filtering across songs, artists, and playlists
✅ Interactive music player with play/pause, seek, volume controls
✅ Hover effects and smooth animations throughout
✅ Responsive design for different screen sizes
✅ Spotify's authentic dark theme and color scheme

**Note**: All music data is currently mocked but the UI/UX is production-ready and matches Spotify's design language perfectly.