// Select the <link> element with rel="image_src"
let imageLinkElement = document.querySelector('link[rel="image_src"]');
let imageUrl = null; // Initialize imageUrl to null

// Check if the element exists and get its href
if (imageLinkElement) {
    imageUrl = imageLinkElement.href;
    console.log(imageUrl);
}

// Get the page title
let pageTitle = document.title;

// Get the playlist (assuming it is identified by 'playlist' id)
const playlist = document.getElementById('playlist');

// Check if the playlist element exists
let playlistResults = [];
if (playlist) {
    // Get all the <a> tags within the playlist
    const links = playlist.getElementsByTagName('a');

    // Loop through each link and store its href and title
    for (let i = 0; i < links.length; i++) {
        const url = links[i].href;
        const title = links[i].title || links[i].textContent; // Use title or fallback to textContent

        // Push an object with the url and title to the results array
        playlistResults.push({ url, title });
    }
} else {
    console.error('Playlist not found.');
}

// Get all audio elements on the page
const audioElements = document.querySelectorAll('audio');

// Extract the src attribute from the <source> tag of each audio element
const audioSources = Array.from(audioElements).map(audio => {
    const sourceElement = audio.querySelector('source');
    return sourceElement ? sourceElement.src : null;
}).filter(src => src !== null); // Filter out null values if there are audios with no sources

// Create a JSON array to store audio data
const audioResults = audioSources.map((source, index) => ({
    title: `${pageTitle} - ${index+1}`,
    url:source
}));

// Create the final JSON object combining playlist and audio sources
const finalJsonObject = {
    title: pageTitle,
    author: 'click',
    authorId: 1,
    categories: ['music'],
    description: 'song',
    imageUrl: imageUrl,
    playlist: playlistResults,
    audioSources: audioResults
};

// Log the entire JSON object
console.log(JSON.stringify(finalJsonObject, null, 2));
