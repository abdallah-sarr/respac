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
    console.log('RESPAC App initialized');
    
    // All modules auto-initialize, but we can add
    // any additional global initialization here
    
    // Add loaded class to body for CSS animations
    document.body.classList.add('app-loaded');
    
    // Log initialization status
    if (typeof Utils !== 'undefined') {
      console.log('✓ Utils loaded');
    }
    if (typeof ThemeManager !== 'undefined') {
      console.log('✓ ThemeManager loaded');
    }
    if (typeof HeaderController !== 'undefined') {
      console.log('✓ HeaderController loaded');
    }
    if (typeof ModalController !== 'undefined') {
      console.log('✓ ModalController loaded');
    }
    if (typeof NavigationController !== 'undefined') {
      console.log('✓ NavigationController loaded');
    }
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
    init
  };
})();

// Make available globally
window.App = App;
