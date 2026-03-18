/*!
 * Blog page JS — filter, load more, newsletter
 */
(function() {
  'use strict';

  /* Filter */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const blogCards  = document.querySelectorAll('.blog-grid-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      blogCards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.style.display = show ? '' : 'none';
        if (show) {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        }
      });
    });
  });

  /* Newsletter */
  document.querySelectorAll('#blogNewsletterForm, #footerNewsletterForm').forEach(form => {
    form && form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailVal = form.querySelector('input')?.value;
      const btn = form.querySelector('button');
      try {
        await fetch('tables/newsletter_subscribers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: emailVal, source: 'blog' })
        });
      } catch(err) {}
      if (btn) { btn.textContent = '✓ Subscribed!'; btn.disabled = true; }
    });
  });

  /* Load more placeholder */
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      loadMoreBtn.innerHTML = '<i class="fas fa-check-circle"></i> You\'re all caught up!';
      loadMoreBtn.disabled = true;
    });
  }

})();
