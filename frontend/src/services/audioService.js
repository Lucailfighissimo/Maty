// Audio playback service for Spotify previews and full tracks
class AudioService {
  constructor() {
    this.currentAudio = null;
    this.isPlaying = false;
    this.currentTrack = null;
    this.volume = 0.7;
    this.listeners = [];
  }

  // Add listener for playback state changes
  addListener(callback) {
    this.listeners.push(callback);
  }

  // Remove listener
  removeListener(callback) {
    this.listeners = this.listeners.filter(cb => cb !== callback);
  }

  // Notify all listeners of state changes
  notifyListeners(event, data) {
    this.listeners.forEach(callback => callback(event, data));
  }

  // Play Spotify preview (30 seconds)
  async playPreview(track) {
    try {
      // Stop current audio if playing
      if (this.currentAudio) {
        this.currentAudio.pause();
        this.currentAudio = null;
      }

      if (!track.preview_url) {
        console.warn('No preview available for this track');
        this.notifyListeners('error', { message: 'No preview available for this track' });
        return false;
      }

      // Create new audio element
      this.currentAudio = new Audio(track.preview_url);
      this.currentAudio.volume = this.volume;
      this.currentTrack = track;

      // Set up event listeners
      this.currentAudio.addEventListener('loadstart', () => {
        this.notifyListeners('loading', { track });
      });

      this.currentAudio.addEventListener('canplay', () => {
        this.notifyListeners('ready', { track });
      });

      this.currentAudio.addEventListener('play', () => {
        this.isPlaying = true;
        this.notifyListeners('play', { track });
      });

      this.currentAudio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notifyListeners('pause', { track });
      });

      this.currentAudio.addEventListener('ended', () => {
        this.isPlaying = false;
        this.notifyListeners('ended', { track });
      });

      this.currentAudio.addEventListener('timeupdate', () => {
        if (this.currentAudio) {
          this.notifyListeners('timeupdate', {
            track,
            currentTime: this.currentAudio.currentTime,
            duration: this.currentAudio.duration
          });
        }
      });

      this.currentAudio.addEventListener('error', (e) => {
        console.error('Audio playback error:', e);
        this.notifyListeners('error', { message: 'Playback failed' });
      });

      // Start playback
      await this.currentAudio.play();
      return true;

    } catch (error) {
      console.error('Error playing preview:', error);
      this.notifyListeners('error', { message: 'Failed to play preview' });
      return false;
    }
  }

  // Pause current playback
  pause() {
    if (this.currentAudio && !this.currentAudio.paused) {
      this.currentAudio.pause();
    }
  }

  // Resume playback
  resume() {
    if (this.currentAudio && this.currentAudio.paused) {
      this.currentAudio.play().catch(error => {
        console.error('Error resuming playback:', error);
      });
    }
  }

  // Stop playback
  stop() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.isPlaying = false;
      this.notifyListeners('stop', { track: this.currentTrack });
    }
  }

  // Set volume (0-1)
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    if (this.currentAudio) {
      this.currentAudio.volume = this.volume;
    }
    this.notifyListeners('volumechange', { volume: this.volume });
  }

  // Get current volume
  getVolume() {
    return this.volume;
  }

  // Seek to specific time
  seekTo(time) {
    if (this.currentAudio) {
      this.currentAudio.currentTime = time;
    }
  }

  // Get current playback state
  getState() {
    return {
      isPlaying: this.isPlaying,
      currentTrack: this.currentTrack,
      currentTime: this.currentAudio ? this.currentAudio.currentTime : 0,
      duration: this.currentAudio ? this.currentAudio.duration : 0,
      volume: this.volume
    };
  }

  // Check if a track has preview
  hasPreview(track) {
    return track && track.preview_url;
  }

  // Clean up
  destroy() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
    this.listeners = [];
    this.currentTrack = null;
    this.isPlaying = false;
  }
}

// Create global audio service instance
export const audioService = new AudioService();
export default audioService;