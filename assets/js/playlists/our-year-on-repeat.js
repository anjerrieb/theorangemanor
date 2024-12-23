const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeControl = document.getElementById('volume-control');
const trackNameEl = document.getElementById('track-name');
const trackArtistEl = document.getElementById('track-artist');
const albumArtEl = document.getElementById('album-art');
const mainContent = document.getElementById('main-content');

// Load the local track and its metadata
function loadTrack() {
    // Static file paths
    const data = {
        audioUrl: '../assets/audio/daylight.mp3', // Path to your local audio file
        trackName: 'Daylight', // Track name
        artist: 'Taylor Swift', // Artist name
        albumArt: '../assets/img/albums/lover.png' // Path to your local album art
    };

    // Set audio and metadata
    audio.src = data.audioUrl;
    trackNameEl.textContent = data.trackName;
    trackArtistEl.textContent = data.artist;
    albumArtEl.src = data.albumArt;

    // Enable looping
    audio.loop = true;

    // Set initial volume to 50%
    audio.volume = 0.2;
    volumeControl.value = 0.3; // Sync slider with initial volume

    // Attempt autoplay
    audio.muted = true; // Mute to satisfy autoplay restrictions
    audio.play().then(() => {
        console.log('Audio is playing automatically!');
        playPauseBtn.innerHTML = `
            
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000" class="size-6">
  <path fill-rule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clip-rule="evenodd" />
</svg>

        `;
        audio.muted = false; // Unmute after playback starts
    }).catch(err => {
        console.warn('Autoplay failed:', err);
        playPauseBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000" class="size-6">
  <path fill-rule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clip-rule="evenodd" />
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000" class="size-6">
  <path fill-rule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clip-rule="evenodd" />
</svg>

        `;
    } else {
        audio.pause();
        // Set the button's inner HTML to a play SVG
        playPauseBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000" class="size-6">
  <path fill-rule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clip-rule="evenodd" />
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

// Add spacebar toggle functionality
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') { // Detect spacebar key press
        event.preventDefault(); // Prevent default page scrolling behavior

        // Toggle play/pause
        if (audio.paused) {
            audio.play();
            // Update to pause icon
            playPauseBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000" class="size-6">
                    <path fill-rule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clip-rule="evenodd" />
                </svg>
            `;
        } else {
            audio.pause();
            // Update to play icon
            playPauseBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000" class="size-6">
                    <path fill-rule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clip-rule="evenodd" />
                </svg>
            `;
        }
    }
});

// Select modal elements
const modal = document.getElementById('artist-modal');
const modalImg = document.getElementById('modal-image');
const modalCaption = document.getElementById('modal-caption');
const closeBtn = document.querySelector('.close');

// Add event listeners to artist images
document.querySelectorAll('.artist img').forEach((img) => {
    img.addEventListener('click', () => {
        modal.style.display = 'block'; // Show modal
        modalImg.src = img.src; // Set clicked image as modal content
        modalCaption.textContent = img.alt; // Use alt text as caption
    });
});

// Close modal on close button click
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside the modal content
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});