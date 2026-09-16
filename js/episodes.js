/**
 * Playing Books Podcast - Episodes Page JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();

  // Mobile menu toggle
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');

  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // Close mobile menu when nav items are clicked
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      if (navLinks.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  });

  // Donation button functionality
  const donateButtons = document.querySelectorAll('.donate-btn');

  donateButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Redirect to the donation page
      window.location.href = 'donation.html';
    });
  });

  // Load all episodes
  loadAllEpisodes();

  // Setup search functionality
  setupSearch();
});

/**
 * Fetches all podcast episodes from the RSS feed
 */
async function loadAllEpisodes() {
  const episodeGrid = document.getElementById('allEpisodesGrid');
  const rssUrl = 'https://anchor.fm/s/103ba4880/podcast/rss';

  // Show loading message
  const loadingElement = document.querySelector('.episode-loading');
  if (!loadingElement) {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'episode-loading';
    loadingDiv.textContent = 'Loading episodes...';
    episodeGrid.appendChild(loadingDiv);
  }

  try {
    const response = await fetch(rssUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, 'application/xml');

    // Remove loading message
    const loadingElement = document.querySelector('.episode-loading');
    if (loadingElement) {
      loadingElement.remove();
    }

    // Parse the RSS feed
    const items = xml.querySelectorAll('item');
    const episodes = [];

    items.forEach(item => {
      // Extract episode data
      const title = item.querySelector('title')?.textContent || 'Untitled Episode';
      const pubDate = item.querySelector('pubDate')?.textContent || '';
      const description = item.querySelector('description')?.textContent || '';
      const link = item.querySelector('link')?.textContent || '#';

      // Get audio URL
      let audioUrl = '';
      const enclosure = item.querySelector('enclosure');
      if (enclosure && enclosure.getAttribute('type').includes('audio')) {
        audioUrl = enclosure.getAttribute('url');
      }

      // Get image from itunes:image or media:content or use default
      let image = 'img/hero-bg.svg'; // Default image
      const itunesImage = item.querySelector('itunes\\:image, image')?.getAttribute('href');
      const mediaContent = item.querySelector('media\\:content, content')?.getAttribute('url');

      if (itunesImage) {
        image = itunesImage;
      } else if (mediaContent) {
        image = mediaContent;
      }

      // Format date
      const date = new Date(pubDate);
      const formattedDate = isNaN(date.getTime()) ? '' : date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // Clean description (remove HTML tags)
      const cleanDescription = description.replace(/<\/?[^>]+(>|$)/g, '');

      episodes.push({
        title,
        date: formattedDate,
        description: cleanDescription,
        image,
        link,
        audioUrl
      });
    });

    // Display all episodes
    displayEpisodes(episodes);

  } catch (error) {
    console.error('Error fetching podcast episodes:', error);

    // Remove loading message
    const loadingElement = document.querySelector('.episode-loading');
    if (loadingElement) {
      loadingElement.remove();
    }

    // Display error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'episode-error';
    errorMessage.textContent = 'Unable to load episodes. Please try again later.';
    errorMessage.style.textAlign = 'center';
    errorMessage.style.padding = '2rem';
    errorMessage.style.color = '#ff6b6b';
    episodeGrid.appendChild(errorMessage);
  }
}

/**
 * Displays episodes in the grid
 */
function displayEpisodes(episodes) {
  const episodeGrid = document.getElementById('allEpisodesGrid');

  // Store episodes in a data attribute for search functionality
  episodeGrid.setAttribute('data-episodes', JSON.stringify(episodes));

  // Clear any existing content
  episodeGrid.innerHTML = '';

  if (episodes.length === 0) {
    const noEpisodes = document.createElement('div');
    noEpisodes.className = 'no-episodes';
    noEpisodes.textContent = 'No episodes found.';
    noEpisodes.style.textAlign = 'center';
    noEpisodes.style.padding = '2rem';
    episodeGrid.appendChild(noEpisodes);
    return;
  }

  // Create episode cards
  episodes.forEach(episode => {
    const episodeCard = document.createElement('div');
    episodeCard.className = 'episode-card';

    episodeCard.innerHTML = `
      <div class="episode-image">
        <img src="${episode.image}" alt="${episode.title}" onerror="this.src='img/hero-bg.svg'">
      </div>
      <div class="episode-content">
        <div class="episode-date">${episode.date}</div>
        <h3 class="episode-title">${episode.title}</h3>
        <p class="episode-description">${episode.description}</p>
        <button class="play-episode" data-audio="${episode.audioUrl}" data-title="${episode.title}" data-date="${episode.date}" data-image="${episode.image}">
          <i class="fas fa-play"></i> Play Episode
        </button>
        <a href="${episode.link}" class="episode-link" target="_blank">View Details</a>
      </div>
    `;

    episodeGrid.appendChild(episodeCard);
  });

  // Add event listeners to play buttons
  setupPlayButtons();
}

/**
 * Sets up event listeners for play buttons
 */
function setupPlayButtons() {
  const playButtons = document.querySelectorAll('.play-episode');
  const audioPlayerSection = document.getElementById('audioPlayerSection');
  const audioElement = document.getElementById('audioElement');
  const playerImage = document.getElementById('playerImage');
  const playerTitle = document.getElementById('playerTitle');
  const playerDate = document.getElementById('playerDate');

  playButtons.forEach(button => {
    button.addEventListener('click', function() {
      const audioUrl = this.getAttribute('data-audio');
      const title = this.getAttribute('data-title');
      const date = this.getAttribute('data-date');
      const image = this.getAttribute('data-image');

      // Update player UI
      playerImage.src = image;
      playerImage.onerror = function() {
        this.src = 'img/hero-bg.svg';
      };
      playerTitle.textContent = title;
      playerDate.textContent = date;

      // Update audio source and play
      audioElement.src = audioUrl;
      audioElement.load();
      audioElement.play();

      // Show audio player
      audioPlayerSection.classList.add('active');
    });
  });
}

/**
 * Sets up search functionality
 */
function setupSearch() {
  const searchInput = document.getElementById('episodeSearch');
  const searchButton = document.getElementById('searchButton');

  // Search when button is clicked
  searchButton.addEventListener('click', performSearch);

  // Search when Enter key is pressed
  searchInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      performSearch();
    }
  });
}

/**
 * Performs search on episodes
 */
function performSearch() {
  const searchInput = document.getElementById('episodeSearch');
  const episodeGrid = document.getElementById('allEpisodesGrid');
  const searchTerm = searchInput.value.trim().toLowerCase();

  // Get episodes from data attribute
  const episodes = JSON.parse(episodeGrid.getAttribute('data-episodes') || '[]');

  if (searchTerm === '') {
    // If search is empty, show all episodes
    displayEpisodes(episodes);
    return;
  }

  // Filter episodes based on search term
  const filteredEpisodes = episodes.filter(episode => {
    return (
      episode.title.toLowerCase().includes(searchTerm) ||
      episode.description.toLowerCase().includes(searchTerm) ||
      episode.date.toLowerCase().includes(searchTerm)
    );
  });

  // Display filtered episodes
  displayEpisodes(filteredEpisodes);
}
