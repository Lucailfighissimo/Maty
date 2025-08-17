// Mock data for Spotify clone
export const mockTrendingSongs = [
  {
    id: 1,
    title: "Die With A Smile",
    artist: "Lady Gaga, Bruno Mars",
    album: "Die With A Smile",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    duration: "4:11"
  },
  {
    id: 2,
    title: "APT.",
    artist: "ROSÉ, Bruno Mars",
    album: "rosie",
    image: "https://images.unsplash.com/photo-1445985543470-41fba5c3144a?w=300&h=300&fit=crop",
    duration: "2:49"
  },
  {
    id: 3,
    title: "Birds Of A Feather",
    artist: "Billie Eilish",
    album: "HIT ME HARD AND SOFT",
    image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop",
    duration: "3:30"
  },
  {
    id: 4,
    title: "DTMF",
    artist: "Bad Bunny",
    album: "DeBÍ TiRAR MáS FOToS",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop",
    duration: "3:45"
  },
  {
    id: 5,
    title: "A Bar Song (Tipsy)",
    artist: "Shaboozey",
    album: "Where I've Been, Isn't Where I'm Going",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
    duration: "2:42"
  },
  {
    id: 6,
    title: "Espresso",
    artist: "Sabrina Carpenter",
    album: "Short n' Sweet",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    duration: "2:55"
  }
];

export const mockPopularArtists = [
  {
    id: 1,
    name: "The Weeknd",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
    followers: "85M"
  },
  {
    id: 2,
    name: "Taylor Swift",
    image: "https://images.unsplash.com/photo-1445985543470-41fba5c3144a?w=200&h=200&fit=crop",
    followers: "72M"
  },
  {
    id: 3,
    name: "Drake",
    image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=200&h=200&fit=crop",
    followers: "65M"
  },
  {
    id: 4,
    name: "Bad Bunny",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=200&h=200&fit=crop",
    followers: "58M"
  },
  {
    id: 5,
    name: "Billie Eilish",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop",
    followers: "45M"
  },
  {
    id: 6,
    name: "Ed Sheeran",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
    followers: "42M"
  }
];

export const mockPlaylists = [
  {
    id: 1,
    name: "Today's Top Hits",
    description: "The most played songs right now.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    songs: 50
  },
  {
    id: 2,
    name: "RapCaviar",
    description: "New music from Lil Baby, Future and more.",
    image: "https://images.unsplash.com/photo-1445985543470-41fba5c3144a?w=300&h=300&fit=crop",
    songs: 65
  },
  {
    id: 3,
    name: "Pop Rising",
    description: "The next generation of pop superstars.",
    image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop",
    songs: 42
  },
  {
    id: 4,
    name: "All Out 2010s",
    description: "The biggest songs of the 2010s.",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop",
    songs: 75
  }
];

export const mockUserPlaylists = [
  {
    id: 1,
    name: "My Playlist #1",
    description: "Created by You",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
    songs: 23,
    isPrivate: false
  },
  {
    id: 2,
    name: "Liked Songs",
    description: "642 liked songs",
    image: null,
    songs: 642,
    isLiked: true
  },
  {
    id: 3,
    name: "Road Trip Vibes",
    description: "Created by You",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    songs: 87,
    isPrivate: true
  }
];

export const mockRecentlyPlayed = [
  {
    id: 1,
    name: "Chill Mix",
    description: "Made for You",
    image: "https://images.unsplash.com/photo-1445985543470-41fba5c3144a?w=300&h=300&fit=crop",
    type: "playlist"
  },
  {
    id: 2,
    name: "Discover Weekly",
    description: "Made for You",
    image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop",
    type: "playlist"
  },
  {
    id: 3,
    name: "Rock Classics",
    description: "Spotify",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop",
    type: "playlist"
  }
];

export const mockCurrentTrack = {
  id: 1,
  title: "Blinding Lights",
  artist: "The Weeknd",
  album: "After Hours",
  image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
  duration: 200, // in seconds
  currentTime: 45 // in seconds
};