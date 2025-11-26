/**
 * RESPAC - Header Controller
 * ==========================
 * Handles header scroll behavior and mobile menu
 */

const HeaderController = (() => {
  // State
  let headerHeight = 88;
  let lastScrollY = 0;
  let currentScrollY = 0;
  let ticking = false;
  let header = null;
  let firstSection = null;

  /**
   * Initialize header controller
   */
  const init = () => {
    // Get elements
    header = document.getElementById('site-header');
    firstSection = document.querySelector('.hero-section') || 
                   document.querySelector('body > main > section') || 
                   document.querySelector('body > section');

    if (!header) return;

    // Get header height from CSS variable
    const rootStyles = getComputedStyle(document.documentElement);
    const headerHeightVar = rootStyles.getPropertyValue('--header-height').trim();
    headerHeight = parseInt(headerHeightVar || '88', 10) || 88;

    // Initialize scroll position
    lastScrollY = window.scrollY;
    currentScrollY = lastScrollY;

    // Attach scroll listener
    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial update
    updateHeader();

    // Initialize mobile menu
    initMobileMenu();
  };

  /**
   * Handle scroll event
   */
  const onScroll = () => {
    currentScrollY = window.scrollY;
    
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  };

  /**
   * Update header state based on scroll position
   */
  const updateHeader = () => {
    if (!header) return;

    const scrollingDown = currentScrollY > lastScrollY;
    const heroBottom = firstSection 
      ? firstSection.offsetTop + firstSection.offsetHeight - headerHeight 
      : 10;

    // Toggle classes based on scroll position
    header.classList.toggle('header-top', currentScrollY <= 10);
    header.classList.toggle('header-scrolled', currentScrollY > heroBottom);

    // Hide/show header with hysteresis
    const hysteresis = 8;
    header.classList.toggle(
      'hidden',
      currentScrollY > heroBottom + hysteresis && scrollingDown
    );
    
    header.classList.toggle('scrolling-down', scrollingDown);
    header.classList.toggle('scrolling-up', !scrollingDown);

    lastScrollY = currentScrollY;
    ticking = false;
  };

  /**
   * Initialize mobile menu functionality
   */
  const initMobileMenu = () => {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener('click', () => {
      document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking on a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        document.body.classList.remove('menu-open');
      });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
        document.body.classList.remove('menu-open');
      }
    });
  };

  /**
   * Setup initialization based on DOM state
   */
  const setupInitialization = () => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  };

  // Auto-initialize
  setupInitialization();

  // Public API
  return {
    init,
    updateHeader
  };
})();

// Make available globally
window.HeaderController = HeaderController;

