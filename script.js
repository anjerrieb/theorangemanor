const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeControl = document.getElementById('volume-control');
const trackNameEl = document.getElementById('track-name');
const trackArtistEl = document.getElementById('track-artist');
const albumArtEl = document.getElementById('album-art');

// Load the local track and its metadata
function loadTrack() {
    // Static file paths
    const data = {
        audioUrl: 'audio/plot_twist.mp3', // Path to your local audio file
        trackName: 'Plot Twist', // Track name
        artist: 'NIKI', // Artist name
        albumArt: 'img/plottwist.jpg' // Path to your local album art
    };

    // Set audio and metadata
    audio.src = data.audioUrl;
    trackNameEl.textContent = data.trackName;
    trackArtistEl.textContent = data.artist;
    albumArtEl.src = data.albumArt;

    // Enable looping
    audio.loop = true;

    // Set initial volume to 50%
    audio.volume = 0.1;
    volumeControl.value = 0.1; // Sync slider with initial volume

    // Attempt autoplay
    audio.muted = true; // Mute to satisfy autoplay restrictions
    audio.play().then(() => {
        console.log('Audio is playing automatically!');
        playPauseBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#b3b3b3" viewBox="0 0 16 16">
                <path d="M5.5 3.5A.5.5 0 0 1 6 4v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
            </svg>
        `;
        audio.muted = false; // Unmute after playback starts
    }).catch(err => {
        console.warn('Autoplay failed:', err);
        playPauseBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#b3b3b3" viewBox="0 0 16 16">
                <path d="M11.596 8.697l-6 4.5A.5.5 0 0 1 5 12.5v-9a.5.5 0 0 1 .796-.4l6 4.5a.5.5 0 0 1 0 .8z"/>
            </svg>
        `;
    });
}

// Play/Pause functionality
playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        // Set the button's inner HTML to a pause SVG
        playPauseBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#b3b3b3" viewBox="0 0 16 16">
                <path d="M5.5 3.5A.5.5 0 0 1 6 4v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
            </svg>
        `;
    } else {
        audio.pause();
        // Set the button's inner HTML to a play SVG
        playPauseBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#b3b3b3" viewBox="0 0 16 16">
                <path d="M11.596 8.697l-6 4.5A.5.5 0 0 1 5 12.5v-9a.5.5 0 0 1 .796-.4l6 4.5a.5.5 0 0 1 0 .8z"/>
            </svg>
        `;
    }
});


// Update progress bar and current time
audio.addEventListener('timeupdate', () => {
    const currentTime = Math.floor(audio.currentTime);
    const duration = Math.floor(audio.duration) || 0;

    const progress = (currentTime / duration) * 100 || 0;
    progressBar.value = progress;
    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = formatTime(duration);

    // Update the progress bar color using a linear gradient
    progressBar.style.background = `linear-gradient(to right, #fff ${progress}%, #555 ${progress}%)`;
});

// Seek functionality
progressBar.addEventListener('input', () => {
    const duration = Math.floor(audio.duration) || 0;
    audio.currentTime = (progressBar.value / 100) * duration;
});

// Volume control
volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value;
});

// Helper function to format time
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Load the track on page load
loadTrack();