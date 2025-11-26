/**
 * RESPAC - Main Application
 * =========================
 * Main entry point that initializes all controllers
 *
 * Dependencies:
 * - utils.js
 * - themeManager.js
 * - header.js
 * - modal.js
 * - navigation.js
 */

const App = (() => {
  /**
   * Initialize the application
   */
  const init = () => {
    console.log("RESPAC App initialized");

    // All modules auto-initialize, but we can add
    // any additional global initialization here

    // Add loaded class to body for CSS animations
    document.body.classList.add("app-loaded");

    // Log initialization status
    if (typeof Utils !== "undefined") {
      console.log("✓ Utils loaded");
    }
    if (typeof ThemeManager !== "undefined") {
      console.log("✓ ThemeManager loaded");
    }
    if (typeof HeaderController !== "undefined") {
      console.log("✓ HeaderController loaded");
    }
    if (typeof ModalController !== "undefined") {
      console.log("✓ ModalController loaded");
    }
    if (typeof NavigationController !== "undefined") {
      console.log("✓ NavigationController loaded");
    }

    // Initialize scroll animations for sections
    try {
      initScrollAnimations();
    } catch (err) {
      // Fail gracefully if the helper isn't available
      console.warn("Scroll animations failed to initialize", err);
    }
  };

  /**
   * Initialize simple scroll animations using IntersectionObserver.
   * Adds `.animate-on-scroll` to section elements and toggles `.is-visible`.
   */
  const initScrollAnimations = () => {
    if (!("IntersectionObserver" in window)) return;

    const sections = document.querySelectorAll("section");
    if (!sections || sections.length === 0) return;

    sections.forEach((s) => s.classList.add("animate-on-scroll"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            // Keep animations once visible. If you want repeat animations,
            // comment out the next line.
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    sections.forEach((s) => observer.observe(s));
  };

  /**
   * Setup initialization based on DOM state
   */
  const setupInitialization = () => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }
  };

  // Auto-initialize
  setupInitialization();

  // Public API
  return {
    init,
  };
})();

// Make available globally
window.App = App;
