/*
  Team name: Schock 
  Members: Amandaleeanne Schock
  
  Project description:
  This is a simple song search application that you can search for songs
  using artist, song name, and alblum. It includes a CSV file for searchability and
  users can 'favorite' songs. They can then go to the favorites tab and see all
  of thier favorite songs.

*/

//This script handles searching

// Function to handle song search
function searchSongs(query) {
  // Use an API to search for songs based on the query
  // For now, let's assume the API returns an array of song objects
  let songs = [
    { name: "Song 1", artist: "Artist 1", album: "Album 1" },
    { name: "Song 2", artist: "Artist 2", album: "Album 2" },
    // Add more songs as needed
  ];

  // Display the search results
  displaySearchResults(songs);
}

// Function to display search results
function displaySearchResults(songs) {
  let ul = document.querySelector('.scrollable-container ul');
  ul.innerHTML = ''; // Clear previous search results

  songs.forEach(song => {
    let li = document.createElement('li');
    li.innerHTML = `
      <p>${song.name}</p>
      <p>${song.artist}</p>
      <p>${song.album}</p>
      <button type="button" onclick="addToFavorites('${song.name}', '${song.artist}', '${song.album}')">Add to Favorites</button>
    `;
    ul.appendChild(li);
  });
}

// Function to add a song to favorites
function addToFavorites(name, artist, album) {
  // Store the song in local storage or another appropriate data store
  // For now, let's just log the song details
  console.log(`Added to favorites: ${name} by ${artist} (${album})`);
}
