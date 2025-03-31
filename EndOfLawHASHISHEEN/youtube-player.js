// Create the YouTube player script tag
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;

// Set a global function the YouTube API will call once it's ready
function onYouTubeIframeAPIReady() {
    // This function will now do nothing directly, since we will initialize the player in the `loadYouTubeVideo` function
}

// Function to initialize the player, with a dynamic videoId
function loadYouTubeVideo(videoId) {
    if (typeof YT !== "undefined" && YT.Player) {
        if (player) {
            player.destroy();  // Destroy the previous player if it exists
        }
        player = new YT.Player('youtube-player', {
            height: '150',
            width: '300',
            videoId: videoId, // Dynamically passed video ID
            playerVars: {
                'playsinline': 1,
                'autoplay': 1,  // Auto-play video
                'controls': 1,  // Show player controls
                'rel': 0,       // Do not show related videos at the end
                'showinfo': 0,  // Do not show video info
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    } else {
        // Wait for the API to load and then initialize
        window.onYouTubeIframeAPIReady = function() {
            loadYouTubeVideo(videoId);  // Call the dynamic loader function
        };
    }
}

// Triggered when the video player is ready
function onPlayerReady(event) {
    event.target.playVideo();
}

// Handle video state changes
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        console.log('Video ended');
    }
}