async function loadPosts() {
  const list = document.getElementById('post-list');
  try {
    const res = await fetch('posts.json');
    const posts = await res.json();
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    renderPosts(posts, 'all');
    setupFilters(posts);
  } catch (err) {
    list.innerHTML = '<p class="empty-state">Could not load posts right now — refresh to try again.</p>';
    console.error(err);
  }
}

function renderPosts(posts, filter) {
  const list = document.getElementById('post-list');
  const filtered = filter === 'all' ? posts : posts.filter(p => p.category === filter);

  if (filtered.length === 0) {
    list.innerHTML = '<p class="empty-state">No posts in this category yet — check back soon.</p>';
    return;
  }

  list.innerHTML = filtered.map(p => `
    <a class="post-card" href="posts/${p.slug}.html">
      <span class="post-tag tag-${p.category}">${p.categoryLabel}</span>
      <h3>${p.title}</h3>
      <p>${p.excerpt}</p>
      <div class="post-meta">
        <span>${formatDate(p.date)}</span>
        <span>&middot;</span>
        <span>${p.readTime}</span>
      </div>
    </a>
  `).join('');
}

function formatDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function setupFilters(posts) {
  const btns = document.querySelectorAll('.filter-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderPosts(posts, btn.dataset.filter);
    });
  });
}

loadPosts();
