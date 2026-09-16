document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  fetchPodcastEpisodes();
  initAudioPlayer();
  initSearch();
});

async function fetchPodcastEpisodes() {
  const homeGrid = document.getElementById('latestEpisodesGrid');
  const fullGrid = document.getElementById('fullEpisodesGrid');
  
  if (!homeGrid && !fullGrid) return;
  
  const rssUrl = 'https://anchor.fm/s/103ba4880/podcast/rss';
  
  try {
    const response = await fetch(rssUrl);
    if (!response.ok) throw new Error('HTTP Error');
    const data = await response.text();
    const xml = new DOMParser().parseFromString(data, 'application/xml');
    const allItems = Array.from(xml.querySelectorAll('item'));
    
    // Determine which grid to populate
    const isHome = !!homeGrid;
    const targetGrid = isHome ? homeGrid : fullGrid;
    const items = isHome ? allItems.slice(0, 4) : allItems;
    
    targetGrid.innerHTML = '';
    
    items.forEach((item, index) => {
      const title = item.querySelector('title')?.textContent || 'Episode';
      const pubDate = item.querySelector('pubDate')?.textContent || '';
      const date = new Date(pubDate);
      const dateStr = isNaN(date.getTime()) ? '' : date.toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' });
      
      let image = 'img/hero-bg.svg';
      const itunesImg = item.querySelector('itunes\\:image, image')?.getAttribute('href');
      const mediaImg = item.querySelector('media\\:content, content')?.getAttribute('url');
      if (itunesImg) image = itunesImg; else if (mediaImg) image = mediaImg;
      
      const audioUrl = item.querySelector('enclosure')?.getAttribute('url') || '';
      
      const el = document.createElement('article');
      el.className = 'episode-card';
      el.innerHTML = `
        <div class="episode-image">
          <img src="${image}" alt="Cover" onerror="this.style.display='none'">
        </div>
        <div class="episode-info">
          <div class="ep-date">${dateStr}</div>
          <h3 class="ep-title">${title}</h3>
          <button class="ep-play-btn play-trigger" id="play-trigger-${index}" data-audio="${audioUrl}" data-title="${title.replace(/"/g, '&quot;')}" data-cover="${image}">
            <span>Play Episode</span>
            <i class="fas fa-play"></i>
          </button>
        </div>
      `;
      targetGrid.appendChild(el);
    });
    
    // Hook up the hero button if it exists
    const heroPlayBtn = document.getElementById('playLatestHeroBtn');
    if (heroPlayBtn) {
      heroPlayBtn.addEventListener('click', () => {
        const firstEpisodeBtn = targetGrid.querySelector('.play-trigger');
        if (firstEpisodeBtn) firstEpisodeBtn.click();
      });
    }
    
  } catch(e) {
    console.error(e);
    if(homeGrid) homeGrid.innerHTML = '<div style="padding:3rem;">Library temporarily unavailable.</div>';
    if(fullGrid) fullGrid.innerHTML = '<div style="padding:3rem;">Library temporarily unavailable.</div>';
  }
}


function initAudioPlayer() {
  const widget = document.getElementById('audioPlayerWidget');
  const audio = document.getElementById('global-audio');
  if (!widget || !audio) return;

  const titles = document.querySelectorAll('.pillTitleSync');
  const covers = [document.getElementById('pillCover'), document.getElementById('barCover'), document.getElementById('cardCover')];
  const playBtns = document.querySelectorAll('.play-btn-sync i');
  
  // Controls
  const btnMin = document.getElementById('btnMin');
  const btnMax = document.getElementById('btnMax');
  const btnExpand = document.getElementById('btnExpand'); // on bottom bar
  const btnMinCard = document.getElementById('btnMinCard'); // on card
  const btnCompress = document.getElementById('btnCompress'); // on card
  
  const closeBtns = [document.getElementById('btnClose'), document.getElementById('btnCloseCard'), document.getElementById('btnClosePill')];
  const skipBackBtns = [document.getElementById('btnSkipBack'), document.getElementById('btnSkipBackCard')];
  const skipFwdBtns = [document.getElementById('btnSkipFwd'), document.getElementById('btnSkipFwdCard')];
  
  const seekSliders = [document.getElementById('seek-slider'), document.getElementById('seek-slider-card')];
  const currentTimes = [document.getElementById('current-time'), document.getElementById('current-time-card')];
  const durationTimes = [document.getElementById('duration-time'), document.getElementById('duration-time-card')];
  const volSliders = [document.getElementById('volume-slider'), document.getElementById('volume-slider-card')];

  let currentTrackIndex = -1;
  let isDragging = false;
  
  function setState(state) {
    widget.className = 'audio-player-widget ' + state + (audio.paused ? ' paused' : '');
    widget.style.top = '';
    widget.style.bottom = '';
    widget.style.left = '';
    widget.style.transform = '';
  }

  // Handle Play Triggers
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.play-trigger');
    if (!trigger) return;
    
    const match = trigger.id.match(/play-trigger-(\d+)/);
    if (match) currentTrackIndex = parseInt(match[1]);

    const src = trigger.getAttribute('data-audio');
    const title = trigger.getAttribute('data-title');
    const cover = trigger.getAttribute('data-cover');
    
    if (audio.src.includes(src)) {
      togglePlay();
    } else {
      audio.src = src;
      titles.forEach(t => t.textContent = title);
      covers.forEach(c => { if(c) c.src = cover; });
      
      if (widget.classList.contains('hidden')) {
        setState('maximized'); // Default to bottom bar when started
      }
      audio.play();
    }
  });

  function togglePlay() { if (audio.paused) audio.play(); else audio.pause(); }
  
  document.querySelectorAll('.play-btn-sync').forEach(btn => {
    btn.addEventListener('click', (e) => { e.stopPropagation(); togglePlay(); });
  });

  // State transitions
  btnMax?.addEventListener('click', (e) => { e.stopPropagation(); setState('maximized'); });
  btnMin?.addEventListener('click', (e) => { e.stopPropagation(); setState('minimized'); });
  btnExpand?.addEventListener('click', (e) => { e.stopPropagation(); setState('expanded'); });
  btnMinCard?.addEventListener('click', (e) => { e.stopPropagation(); setState('minimized'); });
  btnCompress?.addEventListener('click', (e) => { e.stopPropagation(); setState('maximized'); });
  
  closeBtns.forEach(btn => btn?.addEventListener('click', (e) => {
    e.stopPropagation(); audio.pause(); setState('hidden');
  }));

  skipBackBtns.forEach(btn => btn?.addEventListener('click', (e) => { 
    e.stopPropagation();
    if (currentTrackIndex <= 0) return;
    const prev = document.getElementById(`play-trigger-${currentTrackIndex - 1}`);
    if (prev) prev.click();
  }));
  
  skipFwdBtns.forEach(btn => btn?.addEventListener('click', (e) => { 
    e.stopPropagation();
    if (currentTrackIndex === -1) return;
    const next = document.getElementById(`play-trigger-${currentTrackIndex + 1}`);
    if (next) next.click();
  }));

  // Audio Events
  audio.addEventListener('play', () => { playBtns.forEach(icon => icon.className = 'fas fa-pause'); widget.classList.remove('paused'); });
  audio.addEventListener('pause', () => { playBtns.forEach(icon => icon.className = 'fas fa-play'); widget.classList.add('paused'); });

  function formatTime(sec) {
    if (isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  let isSeeking = false;
  audio.addEventListener('timeupdate', () => {
    if (!isSeeking) {
      seekSliders.forEach(s => { if(s) s.value = (audio.currentTime / audio.duration) * 100 || 0; });
    }
    currentTimes.forEach(c => { if(c) c.textContent = formatTime(audio.currentTime); });
  });
  audio.addEventListener('loadedmetadata', () => {
    durationTimes.forEach(d => { if(d) d.textContent = formatTime(audio.duration); });
  });

  seekSliders.forEach(s => {
    s?.addEventListener('input', (e) => {
      isSeeking = true;
      const time = (e.target.value / 100) * audio.duration;
      currentTimes.forEach(c => { if(c) c.textContent = formatTime(time); });
    });
    s?.addEventListener('change', (e) => {
      isSeeking = false;
      audio.currentTime = (e.target.value / 100) * audio.duration;
    });
  });

  volSliders.forEach(v => {
    v?.addEventListener('input', (e) => { audio.volume = e.target.value / 100; });
  });

  // DRAG LOGIC (Pill & Expanded Card only)
  let startX, startY, initialLeft, initialTop;

  function startDrag(e) {
    // Allowing drag for all states now, including bottom bar
    if (e.target.closest('button') || e.target.closest('input')) return;
    
    // Disable text selection while dragging
    document.body.style.userSelect = 'none';

    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
    const rect = widget.getBoundingClientRect();
    
    widget.style.transform = 'none';
    widget.style.bottom = 'auto';
    widget.style.left = rect.left + 'px';
    widget.style.top = rect.top + 'px';

    startX = clientX; startY = clientY;
    initialLeft = rect.left; initialTop = rect.top;
    isDragging = false;

    document.addEventListener('mousemove', onDrag);
    document.addEventListener('touchmove', onDrag, {passive: false});
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
  }

  function onDrag(e) {
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
    const dx = clientX - startX; const dy = clientY - startY;

    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      isDragging = true;
      widget.classList.add('dragging');
      e.preventDefault();
    }

    if (isDragging) {
      widget.style.left = (initialLeft + dx) + 'px';
      widget.style.top = (initialTop + dy) + 'px';
    }
  }

  function endDrag() {
    widget.classList.remove('dragging');
    document.body.style.userSelect = ''; // restore text selection
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('touchmove', onDrag);
    document.removeEventListener('mouseup', endDrag);
    document.removeEventListener('touchend', endDrag);
    
    setTimeout(() => { isDragging = false; }, 50);
  }

  widget.addEventListener('mousedown', startDrag);
  widget.addEventListener('touchstart', startDrag, {passive: false});
  
  widget.addEventListener('click', (e) => {
    if (widget.classList.contains('minimized') && !isDragging) {
      if (!e.target.closest('.pill-btn')) {
        setState('maximized');
      }
    }
  });
}


function initSearch() {
  const searchInput = document.getElementById('episodeSearchInput');
  const fullGrid = document.getElementById('fullEpisodesGrid');
  
  if (!searchInput || !fullGrid) return;
  
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const cards = fullGrid.querySelectorAll('.episode-card');
    
    let visibleCount = 0;
    
    cards.forEach(card => {
      const title = card.querySelector('.ep-title')?.textContent.toLowerCase() || '';
      if (title.includes(query)) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });
    
    // Handle "no results" state
    let noResultsMsg = fullGrid.querySelector('.no-results-msg');
    if (visibleCount === 0) {
      if (!noResultsMsg) {
        noResultsMsg = document.createElement('div');
        noResultsMsg.className = 'no-results-msg';
        noResultsMsg.style.gridColumn = '1 / -1';
        noResultsMsg.style.padding = '3rem';
        noResultsMsg.style.color = '#556b7d';
        noResultsMsg.textContent = 'No episodes match your search.';
        fullGrid.appendChild(noResultsMsg);
      }
      noResultsMsg.style.display = 'block';
    } else if (noResultsMsg) {
      noResultsMsg.style.display = 'none';
    }
  });
}

// =============================================
// RICH BOOKS SCENE — Mouse parallax + OPEN plays latest
// =============================================
(function() {
  const scene       = document.getElementById('booksScene');
  const featBook    = document.getElementById('featuredBook');
  const leftPile    = document.getElementById('leftPile');
  const rightPile   = document.getElementById('rightPile');
  const wrap        = document.getElementById('booksSceneWrap');
  if (!scene || !featBook) return;

  // ---- Mouse parallax across the whole scene ----
  scene.addEventListener('mousemove', (e) => {
    const rect = scene.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2); // -1 to 1
    const dy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);

    // Featured book: track mouse with 3D tilt
    featBook.style.animation = 'none';
    featBook.style.transform = `rotateY(${dx * 20}deg) rotateX(${dy * -10}deg) translateY(-8px) scale(1.05)`;

    // Piles shift slightly opposite direction (parallax depth)
    if (leftPile)  leftPile.style.transform  = `translateY(-50%) rotate(-8deg) translate(${dx * -12}px, ${dy * -6}px)`;
    if (rightPile) rightPile.style.transform = `translateY(-50%) rotate(6deg)  translate(${dx * -8}px,  ${dy * -4}px)`;
  });

  scene.addEventListener('mouseleave', () => {
    featBook.style.animation = '';
    featBook.style.transform = '';
    if (leftPile)  leftPile.style.transform  = '';
    if (rightPile) rightPile.style.transform = '';
  });

  // ---- Flat book click: pop upward then settle ----
  document.querySelectorAll('.flat-book').forEach(book => {
    book.addEventListener('click', () => {
      book.style.transition = 'transform 0.35s cubic-bezier(0.23,1,0.32,1)';
      book.style.transform = 'scaleY(1.3) translateX(10px) translateY(-8px)';
      setTimeout(() => { book.style.transform = ''; }, 500);
    });
  });

  // ---- OPEN button: fetch RSS and play latest episode ----
  const btnOpen = document.getElementById('btnPlayLatest');
  if (btnOpen) {
    btnOpen.addEventListener('click', async (e) => {
      e.stopPropagation();
      const origText = btnOpen.textContent;
      btnOpen.textContent = '...';

      try {
        const rssUrl = 'https://anchor.fm/s/103ba4880/podcast/rss';
        const response = await fetch(rssUrl);
        if (!response.ok) throw new Error('RSS fetch failed');
        const data = await response.text();
        const xml  = new DOMParser().parseFromString(data, 'application/xml');
        const item = xml.querySelector('item');

        if (item) {
          const title = item.querySelector('title')?.textContent || 'Latest Episode';
          const src   = item.querySelector('enclosure')?.getAttribute('url') || '';
          const img   = item.querySelector('itunes\\:image')?.getAttribute('href')
                      || item.querySelector('image')?.getAttribute('href')
                      || 'img/hero-bg.svg';

          const audio  = document.getElementById('global-audio');
          const widget = document.getElementById('audioPlayerWidget');
          if (audio && widget) {
            audio.src = src;
            document.querySelectorAll('.pillTitleSync').forEach(t => t.textContent = title);
            ['pillCover','barCover','cardCover'].forEach(id => {
              const el = document.getElementById(id);
              if (el) el.src = img;
            });
            if (widget.classList.contains('hidden')) {
              widget.className = 'audio-player-widget maximized';
            }
            audio.play();
          }
        }
      } catch (err) {
        console.error('Error playing latest episode:', err);
      } finally {
        btnOpen.textContent = origText;
      }
    });
  }
})();






// ==============================================
// HAMBURGER MENU
// ==============================================
(function () {
  const btn     = document.getElementById('hamburgerBtn');
  const overlay = document.getElementById('mobileNavOverlay');
  const close   = document.getElementById('mobileNavClose');
  if (!btn || !overlay) return;

  function openNav() {
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    btn.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
  }

  function closeNav() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    btn.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  }

  btn.addEventListener('click', () => {
    overlay.classList.contains('is-open') ? closeNav() : openNav();
  });

  if (close) close.addEventListener('click', closeNav);

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeNav();
  });

  // Close when clicking a nav link
  overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Close on backdrop click (clicking outside the inner panel)
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeNav();
  });
})();
