/**
 * RESPAC - Navigation Controller
 * ==============================
 * Handles navigation tabs and scroll behavior
 */

const NavigationController = (() => {
  /**
   * Initialize navigation controller
   */
  const init = () => {
    initTabs();
    initScrollIndicator();
    initSmoothScroll();
  };

  /**
   * Initialize tab navigation behavior
   */
  const initTabs = () => {
    const tabs = document.querySelectorAll('.tab-link');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        // Only prevent default if it's not a navigation link
        if (tab.getAttribute('href')?.startsWith('#')) {
          e.preventDefault();
          
          // Update active state
          tabs.forEach(t => t.classList.remove('tab-active'));
          tab.classList.add('tab-active');
        }
      });
    });
  };

  /**
   * Initialize hero scroll indicator
   */
  const initScrollIndicator = () => {
    const scrollIndicator = document.querySelector('.hero-scroll-indicator');
    
    if (!scrollIndicator) return;

    scrollIndicator.addEventListener('click', () => {
      const heroSection = document.querySelector('.hero-section');
      
      if (heroSection) {
        const nextSection = heroSection.nextElementSibling;
        
        if (nextSection) {
          scrollToSection(nextSection);
        }
      }
    });
  };

  /**
   * Initialize smooth scroll for anchor links
   */
  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        
        if (href === '#' || href === '') return;
        
        const target = document.querySelector(href);
        
        if (target) {
          e.preventDefault();
          scrollToSection(target);
        }
      });
    });
  };

  /**
   * Scroll to a section with header offset
   * @param {HTMLElement} target - Target element
   */
  const scrollToSection = (target) => {
    if (!target) return;

    const headerHeight = parseInt(
      getComputedStyle(document.documentElement)
        .getPropertyValue('--header-height')
        .trim() || '88',
      10
    ) || 88;

    const targetPosition = target.offsetTop - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  };

  /**
   * Update active navigation based on scroll position
   */
  const updateActiveNav = () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.tab-link').forEach(link => {
          link.classList.remove('tab-active');
          
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('tab-active');
          }
        });
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
    scrollToSection,
    updateActiveNav
  };
})();

// Make available globally
window.NavigationController = NavigationController;

