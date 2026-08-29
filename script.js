document.getElementById('year').textContent = new Date().getFullYear();

async function loadBlogTeaser() {
  const list = document.getElementById('blog-teaser-list');
  if (!list) return;
  try {
    const res = await fetch('blog/posts.json');
    const posts = await res.json();
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    const latest = posts.slice(0, 3);

    if (latest.length === 0) {
      list.innerHTML = '<p class="empty-state">No posts yet — the first one is coming soon.</p>';
      return;
    }

    list.innerHTML = latest.map(p => `
      <a class="post-card" href="blog/posts/${p.slug}.html">
        <span class="post-tag tag-${p.category}">${p.categoryLabel}</span>
        <h3>${p.title}</h3>
        <p>${p.excerpt}</p>
      </a>
    `).join('');
  } catch (err) {
    list.innerHTML = '<p class="empty-state">Could not load posts right now.</p>';
    console.error(err);
  }
}

loadBlogTeaser();
