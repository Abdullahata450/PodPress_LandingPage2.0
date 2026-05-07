/* PodPress — Global Navbar
   Injects the full site navbar on secondary pages.
   Handles: scroll effect, mobile menu open/close, focus-trap, ESC key.
   Works together with theme.js (loaded separately).
   ------------------------------------------------------------------ */
(function () {

  /* ── Detect if we're on the home page ── */
  var isHome = (function () {
    var p = window.location.pathname;
    return p === '/' || p === '/index.html' || p.endsWith('/index.html');
  })();

  /* ── Build nav links with correct href prefix ── */
  var base = isHome ? '' : 'index.html';

  var NAV_HTML = [
    '<nav class="navbar" id="navbar">',
    '  <div class="container">',
    '    <a href="' + (isHome ? '#' : 'index.html') + '" class="nav-logo">',
    '      <img src="logo-dark.png" alt="PodPress" data-logo />',
    '    </a>',
    '    <ul class="nav-links">',
    '      <li><a href="index.html"  >Home</a></li>',
    '      <li class="nav-item-features">',
    '        <a href="' + base + '#features" class="nav-features-toggle" aria-haspopup="true" aria-expanded="false">Features</a>',
    '        <div class="features-menu" role="menu" aria-label="Feature links">',
    '          <h3 class="features-menu-title">Features</h3>',
    '          <div class="features-menu-grid">',
    '            <a class="features-menu-link" href="transcript-to-newsletter.html" role="menuitem"><h4>Transcript to Newsletter</h4><p>Turn transcripts into polished newsletters fast.</p></a>',
    '            <a class="features-menu-link" href="youtube-to-newsletter.html" role="menuitem"><h4>YouTube to Newsletter</h4><p>Convert YouTube episodes into ready email drafts.</p></a>',
    '            <a class="features-menu-link" href="rss-to-newsletter.html" role="menuitem"><h4>RSS to Newsletter</h4><p>Auto-fetch episodes and generate in minutes.</p></a>',
    '            <a class="features-menu-link" href="podcast-to-blog.html" role="menuitem"><h4>Podcast to Blog</h4><p>Repurpose episodes into long-form blog posts.</p></a>',
    '            <a class="features-menu-link" href="podcast-to-faq.html" role="menuitem"><h4>Podcast to FAQ</h4><p>Create instant FAQs from spoken content.</p></a>',
    '            <a class="features-menu-link" href="podcast-to-insights.html" role="menuitem"><h4>Podcast to Key Insights</h4><p>Extract key points and takeaways automatically.</p></a>',
    '            <a class="features-menu-link" href="content-repurposing.html" role="menuitem"><h4>Content Repurposing</h4><p>Generate multiple assets from one episode.</p></a>',
    '            <a class="features-menu-link" href="content-automation.html" role="menuitem"><h4>Content Automation</h4><p>Automate your weekly content publishing workflow.</p></a>',
    '            <a class="features-menu-link" href="integrations.html" role="menuitem"><h4>Integrations</h4><p>Publish your newsletter anywhere your audience already is.</p></a>',
    '            <a class="features-menu-link" href="email-branding.html" role="menuitem"><h4>Email Branding</h4><p>Your brand in every send.</p></a>',
    '            <a class="features-menu-link" href="email-campaigns.html" role="menuitem"><h4>Email Campaigns</h4><p>Send newsletters to your entire audience at once.</p></a>',
    '          </div>',
    '        </div>',
    '      </li>',
    '      <li><a href="' + base + '#how-it-works">How It Works</a></li>',
    '      <li><a href="' + base + '#pricing">Pricing</a></li>',
    '      <li><a href="' + base + '#faq">FAQ</a></li>',
    '    </ul>',
    '    <div class="nav-cta">',
    '      <button class="theme-toggle" id="themeToggle" aria-label="Toggle dark mode"></button>',
    '      <a href="https://app.podpress.so/login" target="_blank" rel="noopener noreferrer" class="btn btn-ghost">Log In</a>',
    '      <a href="https://app.podpress.so/signup" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Get Started</a>',
    '    </div>',
    '    <button class="mobile-toggle" id="mobileToggle" aria-label="Toggle menu"',
    '      aria-expanded="false" aria-controls="mobileMenu">',
    '      <span></span><span></span><span></span>',
    '    </button>',
    '  </div>',
    '</nav>',

    '<div class="mobile-overlay" id="mobileOverlay" aria-hidden="true"></div>',
    '<aside class="mobile-menu" id="mobileMenu" role="dialog" aria-modal="true"',
    '  aria-label="Mobile navigation menu" aria-hidden="true">',
    '  <nav aria-label="Mobile">',
    '    <ul class="mobile-menu-links">',
    '      <li><a href="' + base + '#features">Features</a></li>',
    '      <li><a href="' + base + '#how-it-works">How It Works</a></li>',
    '      <li><a href="' + base + '#pricing">Pricing</a></li>',
    '      <li><a href="' + base + '#faq">FAQ</a></li>',
    '    </ul>',
    '  </nav>',
    '  <div class="mobile-menu-cta">',
    '    <a href="#" class="btn btn-ghost">Log In</a>',
    '    <a href="#" class="btn btn-primary">Get Started</a>',
    '    <button class="theme-toggle" id="themeToggleMobile" aria-label="Toggle dark mode"',
    '      data-theme-label="full"',
    '      style="width:100%;border-radius:999px;height:44px;font-size:0.9rem;font-weight:600;gap:8px;border-width:1.5px;"></button>',
    '  </div>',
    '</aside>'
  ].join('\n');

  /* ── Inject navbar at top of <body> (only if not already present) ── */
  if (!document.getElementById('navbar')) {
    document.body.insertAdjacentHTML('afterbegin', NAV_HTML);
  }

  /* ── Features menu toggle (desktop click support) ── */
  var navFeaturesItem = document.querySelector('.nav-item-features');
  var navFeaturesToggle = document.querySelector('.nav-features-toggle');
  if (navFeaturesItem && navFeaturesToggle) {
    navFeaturesToggle.addEventListener('click', function (e) {
      if (window.innerWidth <= 768) return;
      e.preventDefault();
      var isOpen = navFeaturesItem.classList.toggle('is-open');
      navFeaturesToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', function (e) {
      if (!navFeaturesItem.contains(e.target)) {
        navFeaturesItem.classList.remove('is-open');
        navFeaturesToggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        navFeaturesItem.classList.remove('is-open');
        navFeaturesToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Scroll effect: add .scrolled class ── */
  var navbar = document.getElementById('navbar');
  if (navbar) {
    function onScroll() {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); /* run once on load */
  }

  /* ── Mobile Menu ── */
  (function () {
    var toggle  = document.getElementById('mobileToggle');
    var menu    = document.getElementById('mobileMenu');
    var overlay = document.getElementById('mobileOverlay');
    if (!toggle || !menu || !overlay) return;

    var focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    var savedScrollY = 0;

    function openMenu() {
      savedScrollY = window.scrollY;
      document.body.style.top = '-' + savedScrollY + 'px';
      document.body.classList.add('menu-open');
      toggle.classList.add('is-active');
      menu.classList.add('is-active');
      overlay.classList.add('is-active');
      toggle.setAttribute('aria-expanded', 'true');
      menu.setAttribute('aria-hidden', 'false');
      overlay.setAttribute('aria-hidden', 'false');
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('keydown', trapFocus);
    }

    function closeMenu() {
      toggle.classList.remove('is-active');
      menu.classList.remove('is-active');
      overlay.classList.remove('is-active');
      toggle.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('menu-open');
      document.body.style.top = '';
      window.scrollTo(0, savedScrollY);
      toggle.focus();
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', trapFocus);
    }

    function handleEscape(e) { if (e.key === 'Escape') closeMenu(); }

    function trapFocus(e) {
      if (e.key !== 'Tab') return;
      var focusable = [toggle].concat(Array.prototype.slice.call(menu.querySelectorAll(focusableSelector)));
      var first = focusable[0];
      var last  = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
      }
    }

    toggle.addEventListener('click', function () {
      menu.classList.contains('is-active') ? closeMenu() : openMenu();
    });

    overlay.addEventListener('click', closeMenu);

    menu.querySelectorAll('.mobile-menu-links a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 768 && menu.classList.contains('is-active')) closeMenu();
    });
  })();

})();
