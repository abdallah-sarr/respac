/**
 * Gestionnaire centralisé du thème pour tout le site
 * Gère la persistance du thème via localStorage
 * Thème par défaut : clair
 */

const ThemeManager = (() => {
  const THEME_KEY = "theme";
  const LIGHT_THEME = "light";
  const DARK_THEME = "dark";
  const DEFAULT_THEME = LIGHT_THEME;

  /**
   * Initialise le thème au chargement de la page
   */
  const init = () => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const theme = savedTheme || DEFAULT_THEME;
    applyTheme(theme);
  };

  /**
   * Applique le thème au HTML et sauvegarde dans localStorage
   * @param {string} theme - "light" ou "dark"
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
   * Bascule entre le thème clair et sombre
   */
  const toggle = () => {
    const currentTheme = localStorage.getItem(THEME_KEY) || DEFAULT_THEME;
    const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    applyTheme(newTheme);
  };

  /**
   * Met à jour l'icône du bouton de toggle
   */
  const updateThemeIcon = () => {
    const themeToggleBtn = document.getElementById("theme-toggle");
    if (!themeToggleBtn) return;

    const isDark = document.documentElement.classList.contains("dark");
    themeToggleBtn.innerHTML = isDark
      ? '<ion-icon name="sunny-outline"></ion-icon>'
      : '<ion-icon name="moon-outline"></ion-icon>';
  };

  /**
   * Attache l'événement click au bouton de toggle avec retry
   */
  const attachToggleListener = () => {
    const themeToggleBtn = document.getElementById("theme-toggle");
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener("click", toggle);
    } else {
      // Retry après 100ms si le bouton n'existe pas encore
      setTimeout(attachToggleListener, 100);
    }
  };

  /**
   * Initialisation automatique au DOMContentLoaded
   */
  const setupInitialization = () => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        init();
        attachToggleListener();
      });
    } else {
      // DOM est déjà chargé
      init();
      attachToggleListener();
    }
  };

  setupInitialization();

  // Exporter l'API publique
  return {
    init,
    applyTheme,
    toggle,
    updateThemeIcon,
  };
})();
