/* ============================================
   CampusFlow — App Logic & Interactivity
   ============================================ */

// ──────────── MOCK DATA ────────────

const announcements = [
  { id: 1, title: 'Mid Sem Exam Schedule Released', desc: 'Check the updated schedule for all branches. Mid-semester exams will begin from November 10th.', branch: 'cs', semester: '5', important: true, tags: ['B.Tech Computer Science', 'Semester 5'] },
  { id: 2, title: 'Library Extended Hours During Exams', desc: 'Library will remain open until midnight from Nov 5 – Nov 25.', branch: 'all', semester: 'all', important: true, tags: ['All Branches', 'All Semesters'] },
  { id: 3, title: 'Lab Manual Submission Deadline', desc: 'Submit your OS lab manuals by October 30th. Late submissions will not be accepted.', branch: 'cs', semester: '3', important: false, tags: ['Computer Science', 'Semester 3'] },
  { id: 4, title: 'Workshop on AI/ML Fundamentals', desc: 'A 3-day hands-on workshop on machine learning basics, starting Nov 5.', branch: 'mech', semester: '4', important: false, tags: ['Mechanical', 'Semester 4'] },
  { id: 5, title: 'Sports Day Registration Open', desc: 'Register for the annual sports day events. Deadline: November 1st.', branch: 'all', semester: 'all', important: false, tags: ['All Branches', 'All Semesters'] },
];

const events = [
  { id: 1, title: 'Tech-Summit 2024', month: 'OCT', day: '24', location: 'Main Auditorium', image: 'assets/event-tech-summit.png' },
  { id: 2, title: 'Career Hackathon', month: 'OCT', day: '26', location: 'Innovation Lab', image: 'assets/event-hackathon.png' },
  { id: 3, title: 'Cultural Night 2024', month: 'NOV', day: '02', location: 'Open Air Theater', image: 'assets/event-cultural-night.png' },
  { id: 4, title: 'AI Workshop', month: 'NOV', day: '10', location: 'CS Lab 3', image: 'assets/event-tech-summit.png' },
  { id: 5, title: 'Sports Meet 2024', month: 'NOV', day: '15', location: 'College Ground', image: 'assets/event-cultural-night.png' },
];

const channels = [
  { id: 1, name: 'Algorithm Masters', members: '12 members online • 3 new', badge: 3, icon: '⟨⟩', cssClass: 'algo' },
  { id: 2, name: 'Campus Sports Hub', members: '48 members online', badge: 6, icon: '⚽', cssClass: 'sports' },
  { id: 3, name: 'Event Volunteers', members: '7 members online', badge: 0, icon: '🎪', cssClass: 'events' },
];

const resources = [
  { id: 1, name: 'Data Structures Notes.pdf', meta: 'CS • SEM 3 • UPR', type: 'pdf', branch: 'cs', semester: '3' },
  { id: 2, name: 'Lab Manual - OS.xlsx', meta: 'CS • SEM 5 • PRACTICALS', type: 'xlsx', branch: 'cs', semester: '5' },
  { id: 3, name: 'Project Guidelines.docx', meta: 'ALL • SEM 7 • THESIS', type: 'docx', branch: 'all', semester: '7' },
  { id: 4, name: 'Physics II Notes.pdf', meta: 'ALL • SEM 2 • THEORY', type: 'pdf', branch: 'all', semester: '2' },
  { id: 5, name: 'Mechanical Drawing.pdf', meta: 'MECH • SEM 3 • DRAWING', type: 'pdf', branch: 'mech', semester: '3' },
  { id: 6, name: 'Circuit Analysis.pptx', meta: 'ECE • SEM 4 • SLIDES', type: 'pptx', branch: 'ece', semester: '4' },
];

const lostFoundItems = [
  { id: 1, name: 'Galaxy Watch 4', location: 'Near Auditorium Court', status: 'lost', image: 'assets/lost-watch.png', time: '2h ago' },
  { id: 2, name: 'Blue Backpack', location: 'In Library Hall', status: 'found', image: 'assets/found-backpack.png', time: '5h ago' },
];

const feedPosts = [
  {
    id: 1, user: 'Sarah Williams', role: 'FACULTY ADVISOR', time: '11M AGO',
    avatarColor: 'linear-gradient(135deg, #ff2d78, #ff6b9d)',
    initials: 'SW',
    tag: 'important', tagLabel: 'IMPORTANT',
    content: 'The guest lecture on Quantum Computing has been moved to Hall C. Please reach 10 minutes early to secure your seats. This is a mandatory session for final year CS students.',
    image: null,
    likes: 123, comments: 34, important: true,
  },
  {
    id: 2, user: 'Rohan Mehta', role: 'STUDENT COUNCIL', time: '2H AGO',
    avatarColor: 'linear-gradient(135deg, #00e5ff, #00b4d8)',
    initials: 'RM',
    tag: 'event', tagLabel: 'EVENT',
    content: "Who's hyped for the hackathon this weekend? We just finalized the prize pool and it's massive! 🎉 Check the events tab for more details.",
    image: 'assets/feed-hackathon.png',
    likes: 2400, comments: 892, important: false,
  },
  {
    id: 3, user: 'Campus Admin', role: 'ADMINISTRATION', time: '5H AGO',
    avatarColor: 'linear-gradient(135deg, #9f5cff, #c084fc)',
    initials: 'CA',
    tag: 'help', tagLabel: 'HELP',
    content: 'Reminder: All students must update their ID card information in the registrar office before November 15th to avoid late fees.',
    image: null,
    likes: 56, comments: 12, important: false,
  },
  {
    id: 4, user: 'Dr. Priya Sharma', role: 'HOD - CS DEPT', time: '8H AGO',
    avatarColor: 'linear-gradient(135deg, #00c853, #69f0ae)',
    initials: 'PS',
    tag: 'important', tagLabel: 'IMPORTANT',
    content: 'Project submission deadline extended by one week. New deadline is November 20th. Please make sure your documentation is complete.',
    image: null,
    likes: 312, comments: 78, important: true,
  },
];

// ──────────── STATE ────────────

const state = {
  sidebarExpanded: false,
  currentAnnouncement: 0,
  branchFilter: 'all',
  semesterFilter: 'all',
  resBranchFilter: 'all',
  resSemFilter: 'all',
  feedFilter: 'all',
  registeredEvents: new Set(),
  interestedEvents: new Set(),
  likedPosts: new Set(),
  selectedPollOption: null,
};


// ──────────── DOM REFS ────────────

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ──────────── INIT ────────────

document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initNavbar();
  initGreeting();
  renderAnnouncement();
  renderEvents();
  renderChannels();
  renderResources();
  renderLostFound();
  renderFeed();
  initFilters();
  initAnimations();
  initParallax();
  initModal();
  initPoll();
});

// ──────────── GREETING (time-aware) ────────────

function initGreeting() {
  const hour = new Date().getHours();
  let greeting = 'Good evening';
  if (hour < 12) greeting = 'Good morning';
  else if (hour < 17) greeting = 'Good afternoon';
  const el = $('.navbar-greeting');
  if (el) el.innerHTML = `${greeting}, <span>Alex</span> 👋`;
}

// ──────────── SIDEBAR ────────────

function initSidebar() {
  const toggle = $('#sidebarToggle');
  const sidebar = $('#sidebar');
  const layout = $('#appLayout');

  toggle.addEventListener('click', () => {
    state.sidebarExpanded = !state.sidebarExpanded;
    sidebar.classList.toggle('expanded', state.sidebarExpanded);
    layout.classList.toggle('sidebar-expanded', state.sidebarExpanded);
  });

  // Nav items (placeholder)
  $$('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      $$('.nav-item').forEach(n => n.classList.remove('active'));
      item.classList.add('active');
      showToast(`Navigating to ${item.querySelector('.nav-label').textContent}...`, 'info');
    });
  });
}

// ──────────── NAVBAR ────────────

function initNavbar() {
  // Toggle switch
  const sw = $('#modeSwitch');
  sw.addEventListener('click', () => {
    sw.classList.toggle('active');
    showToast(sw.classList.contains('active') ? 'Performance Mode ON' : 'Performance Mode OFF', 'info');
  });

  // Search input
  const searchInput = $('#searchInput');
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && searchInput.value.trim()) {
      showToast(`Searching for "${searchInput.value}"...`, 'info');
      searchInput.value = '';
    }
  });

  // Notification button
  $('#notifBtn').addEventListener('click', () => showToast('No new notifications', 'info'));

  // Nav profile
  $('#navProfile').addEventListener('click', () => showToast('Profile menu coming soon!', 'info'));
}

// ──────────── ANNOUNCEMENT ────────────

function filterAnnouncements() {
  let filtered = [...announcements];
  if (state.branchFilter !== 'all') {
    filtered = filtered.filter(a => a.branch === state.branchFilter || a.branch === 'all');
  }
  if (state.semesterFilter !== 'all') {
    filtered = filtered.filter(a => a.semester === state.semesterFilter || a.semester === 'all');
  }
  // Sort: important first
  filtered.sort((a, b) => (b.important ? 1 : 0) - (a.important ? 1 : 0));
  return filtered;
}

function renderAnnouncement() {
  const filtered = filterAnnouncements();
  if (filtered.length === 0) {
    $('#heroTitle').textContent = 'No announcements match your filters';
    $('#heroChips').innerHTML = '';
    return;
  }
  const ann = filtered[0];
  $('#heroTitle').textContent = ann.title;
  $('#heroChips').innerHTML = ann.tags.map(t => `<span class="hero-filter-chip">${t}</span>`).join('');

  // Update hero tag
  const heroTag = $('.hero-tag');
  if (ann.important) {
    heroTag.innerHTML = '<span class="dot"></span> IMPORTANT ANNOUNCEMENT';
    heroTag.style.color = '';
    heroTag.style.background = '';
    heroTag.style.borderColor = '';
  } else {
    heroTag.innerHTML = '📣 ANNOUNCEMENT';
    heroTag.style.color = 'var(--accent-cyan)';
    heroTag.style.background = 'var(--accent-cyan-dim)';
    heroTag.style.borderColor = 'rgba(0,229,255,0.2)';
  }
}

// ──────────── EVENTS ────────────

function renderEvents() {
  const container = $('#eventsScroll');
  container.innerHTML = events.map(ev => `
    <div class="event-card" data-id="${ev.id}">
      <div class="event-image">
        <img src="${ev.image}" alt="${ev.title}" loading="lazy">
        <div class="event-date">
          <div class="month">${ev.month}</div>
          <div class="day">${ev.day}</div>
        </div>
      </div>
      <div class="event-info">
        <div class="event-title">${ev.title}</div>
        <div class="event-location">
          <svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          ${ev.location}
        </div>
      </div>
      <div class="event-actions">
        <button class="event-btn register ${state.registeredEvents.has(ev.id) ? 'active' : ''}" data-event="${ev.id}" data-action="register">
          ${state.registeredEvents.has(ev.id) ? '✓ REGISTERED' : 'REGISTER NOW'}
        </button>
        <button class="event-btn interested ${state.interestedEvents.has(ev.id) ? 'active' : ''}" data-event="${ev.id}" data-action="interested">
          ${state.interestedEvents.has(ev.id) ? '♥ INTERESTED' : 'INTERESTED'}
        </button>
      </div>
    </div>
  `).join('');

  // Event button listeners
  container.querySelectorAll('.event-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.event);
      const action = btn.dataset.action;
      if (action === 'register') {
        if (state.registeredEvents.has(id)) {
          state.registeredEvents.delete(id);
        } else {
          state.registeredEvents.add(id);
          showToast('Registered successfully!', 'success');
        }
      } else {
        if (state.interestedEvents.has(id)) {
          state.interestedEvents.delete(id);
        } else {
          state.interestedEvents.add(id);
          showToast('Marked as interested!', 'success');
        }
      }
      renderEvents();
    });
  });

  // Scroll arrows
  const scrollEl = container;
  $('#eventsLeft').onclick = () => scrollEl.scrollBy({ left: -280, behavior: 'smooth' });
  $('#eventsRight').onclick = () => scrollEl.scrollBy({ left: 280, behavior: 'smooth' });
}

// ──────────── CHANNELS ────────────

function renderChannels() {
  const container = $('#channelList');
  container.innerHTML = channels.map(ch => `
    <div class="channel-item">
      <div class="channel-icon ${ch.cssClass}">${ch.icon}</div>
      <div class="channel-info">
        <div class="channel-name">${ch.name}</div>
        <div class="channel-members">${ch.members}</div>
      </div>
      ${ch.badge > 0 ? `<div class="channel-badge">${ch.badge}</div>` : ''}
    </div>
  `).join('');
}

// ──────────── RESOURCES ────────────

function filterResources() {
  let filtered = [...resources];
  if (state.resBranchFilter !== 'all') {
    filtered = filtered.filter(r => r.branch === state.resBranchFilter || r.branch === 'all');
  }
  if (state.resSemFilter !== 'all') {
    filtered = filtered.filter(r => r.semester === state.resSemFilter);
  }
  return filtered;
}

function renderResources() {
  const list = $('#resourceList');
  const filtered = filterResources();

  if (filtered.length === 0) {
    list.innerHTML = '<p style="color:var(--text-muted);padding:16px;text-align:center;">No resources match your filters.</p>';
    return;
  }

  list.innerHTML = filtered.map(r => `
    <div class="resource-item" data-id="${r.id}">
      <div class="resource-icon ${r.type}">${r.type.toUpperCase()}</div>
      <div class="resource-info">
        <div class="resource-name">${r.name}</div>
        <div class="resource-meta">${r.meta}</div>
      </div>
      <button class="resource-download" title="Download">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      </button>
    </div>
  `).join('');

  list.querySelectorAll('.resource-download').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      showToast('Download started!', 'success');
    });
  });
}


// ──────────── LOST & FOUND ────────────

function renderLostFound() {
  const grid = $('#lostfoundGrid');
  grid.innerHTML = lostFoundItems.map(item => `
    <div class="lostfound-card" data-id="${item.id}">
      <div class="lostfound-image">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
      </div>
      <span class="lostfound-badge ${item.status}">${item.status.toUpperCase()}</span>
      <span class="lostfound-time">${item.time}</span>
      <div class="lostfound-info">
        <div class="lostfound-name">${item.name}</div>
        <div class="lostfound-detail">${item.location}</div>
      </div>
    </div>
  `).join('') + `
    <div class="lostfound-card add-card" id="addLostFound">
      <div class="lostfound-add-icon">+</div>
    </div>
  `;

  $('#addLostFound').addEventListener('click', () => {
    showToast('Report item form coming soon!', 'info');
  });
}

// ──────────── FEED ────────────

function filterFeed() {
  let filtered = [...feedPosts];
  if (state.feedFilter !== 'all') {
    filtered = filtered.filter(p => p.tag === state.feedFilter);
  }
  // Sort: important first
  filtered.sort((a, b) => (b.important ? 1 : 0) - (a.important ? 1 : 0));
  return filtered;
}

function formatNumber(n) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  return n.toString();
}

function renderFeed() {
  const container = $('#feedPosts');
  const filtered = filterFeed();

  if (filtered.length === 0) {
    container.innerHTML = '<p style="color:var(--text-muted);padding:24px;text-align:center;">No posts match this filter.</p>';
    return;
  }

  container.innerHTML = filtered.map(post => `
    <div class="feed-post" data-id="${post.id}">
      <div class="post-header">
        <div class="post-avatar" style="background:${post.avatarColor}">${post.initials}</div>
        <div class="post-user-info">
          <div class="post-user-name">${post.user}</div>
          <div class="post-user-meta">${post.role} • ${post.time}</div>
        </div>
        <span class="post-tag ${post.tag}">${post.tagLabel}</span>
      </div>
      <div class="post-content">${post.content}</div>
      ${post.image ? `<div class="post-image"><img src="${post.image}" alt="Post image" loading="lazy"></div>` : ''}
      <div class="post-actions">
        <button class="post-action-btn ${state.likedPosts.has(post.id) ? 'liked' : ''}" data-post="${post.id}" data-action="like">
          <svg viewBox="0 0 24 24" fill="${state.likedPosts.has(post.id) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
          ${formatNumber(post.likes + (state.likedPosts.has(post.id) ? 1 : 0))}
        </button>
        <button class="post-action-btn" data-action="comment">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          ${post.comments}
        </button>
        <button class="post-action-btn" data-action="share" style="margin-left:auto;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
        </button>
      </div>
    </div>
  `).join('');

  // Like buttons
  container.querySelectorAll('[data-action="like"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.post);
      if (state.likedPosts.has(id)) {
        state.likedPosts.delete(id);
      } else {
        state.likedPosts.add(id);
      }
      renderFeed();
    });
  });

  // Comment buttons
  container.querySelectorAll('[data-action="comment"]').forEach(btn => {
    btn.addEventListener('click', () => showToast('Comments opening soon!', 'info'));
  });

  // Share buttons
  container.querySelectorAll('[data-action="share"]').forEach(btn => {
    btn.addEventListener('click', () => showToast('Post link copied!', 'success'));
  });
}

// ──────────── FILTERS ────────────

function initFilters() {
  // Announcement filters
  $('#branchFilter').addEventListener('change', (e) => {
    state.branchFilter = e.target.value;
    renderAnnouncement();
  });
  $('#semesterFilter').addEventListener('change', (e) => {
    state.semesterFilter = e.target.value;
    renderAnnouncement();
  });

  // Resource filters
  $('#resBranchFilter').addEventListener('change', (e) => {
    state.resBranchFilter = e.target.value;
    renderResources();
  });
  $('#resSemFilter').addEventListener('change', (e) => {
    state.resSemFilter = e.target.value;
    renderResources();
  });

  // Feed filter tabs
  $$('.feed-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.feed-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.feedFilter = btn.dataset.filter;
      renderFeed();
    });
  });
}

// ──────────── POLL ────────────

function initPoll() {
  $$('.poll-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.poll-option-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.selectedPollOption = btn.dataset.poll;
      showToast('Vote recorded!', 'success');
    });
  });
}

// ──────────── MODAL ────────────

function initModal() {
  const modal = $('#createPostModal');
  const open = () => modal.classList.add('active');
  const close = () => modal.classList.remove('active');

  $('#createPostBtn').addEventListener('click', open);
  $('#modalClose').addEventListener('click', close);
  $('#modalCancel').addEventListener('click', close);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });

  $('#modalSubmit').addEventListener('click', () => {
    const textarea = modal.querySelector('textarea');
    if (textarea.value.trim()) {
      showToast('Post published!', 'success');
      textarea.value = '';
      close();
    } else {
      showToast('Write something first!', 'info');
    }
  });

  // Composer post button (inline)
  $('.composer-post-btn').addEventListener('click', () => {
    const input = $('.composer-input');
    if (input.value.trim()) {
      showToast('Post published!', 'success');
      input.value = '';
    } else {
      showToast('Write something first!', 'info');
    }
  });
}

// ──────────── ANIMATIONS ────────────

function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  $$('.animate-in').forEach(el => observer.observe(el));
}

// ──────────── PARALLAX ────────────

function initParallax() {
  const mainArea = $('#mainArea');
  const hero = $('#heroCard');

  mainArea.addEventListener('scroll', () => {
    const scrollY = mainArea.scrollTop;
    if (hero) {
      const offset = scrollY * 0.15;
      hero.style.transform = `translateY(${offset}px)`;
    }
  });
}

// ──────────── TOAST ────────────

function showToast(message, type = 'info') {
  const container = $('#toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="toast-icon ${type}"></span>${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) toast.remove();
  }, 3000);
}
