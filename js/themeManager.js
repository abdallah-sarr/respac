/**
 * RESPAC - Theme Manager
 * ======================
 * Centralized theme management with localStorage persistence
 * Default theme: light
 */

const ThemeManager = (() => {
  const THEME_KEY = "theme";
  const LIGHT_THEME = "light";
  const DARK_THEME = "dark";
  const DEFAULT_THEME = LIGHT_THEME;

  // Icons for theme toggle
  const ICONS = {
    light: '<ion-icon name="moon-outline"></ion-icon>',
    dark: '<ion-icon name="sunny-outline"></ion-icon>',
  };

  /**
   * Get current theme from localStorage or default
   * @returns {string} - Current theme
   */
  const getTheme = () => {
    return localStorage.getItem(THEME_KEY) || DEFAULT_THEME;
  };

  /**
   * Check if dark mode is active
   * @returns {boolean}
   */
  const isDarkMode = () => {
    return document.documentElement.classList.contains("dark");
  };

  /**
   * Apply theme to document
   * @param {string} theme - 'light' or 'dark'
   */
  const applyTheme = (theme) => {
    const htmlEl = document.documentElement;

    if (theme === DARK_THEME) {
      htmlEl.classList.add("dark");
    } else {
      htmlEl.classList.remove("dark");
    }

    localStorage.setItem(THEME_KEY, theme);
    updateThemeIcon();
  };

  /**
   * Toggle between light and dark theme
   */
  const toggle = () => {
    const currentTheme = getTheme();
    const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    applyTheme(newTheme);
  };

  /**
   * Update theme toggle button icon
   */
  const updateThemeIcon = () => {
    const themeToggleBtn = document.getElementById("theme-toggle");
    if (!themeToggleBtn) return;

    themeToggleBtn.innerHTML = isDarkMode() ? ICONS.dark : ICONS.light;
  };

  /**
   * Attach click event to theme toggle button
   */
  const attachToggleListener = () => {
    const themeToggleBtn = document.getElementById("theme-toggle");

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener("click", toggle);
    } else {
      // Retry after short delay if button not found
      setTimeout(attachToggleListener, 100);
    }
  };

  /**
   * Initialize theme on page load
   */
  const init = () => {
    // Apply saved theme or default
    applyTheme(getTheme());
    attachToggleListener();
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
    applyTheme,
    toggle,
    getTheme,
    isDarkMode,
    updateThemeIcon,
  };
})();

// Make available globally
window.ThemeManager = ThemeManager;
