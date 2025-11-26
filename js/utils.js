/**
 * RESPAC - Utility Functions
 * ==========================
 * Reusable utility functions for the website
 */

const Utils = (() => {
  /**
   * Debounce function to limit how often a function is called
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} - Debounced function
   */
  const debounce = (func, wait = 100) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  /**
   * Throttle function to limit function calls to once per interval
   * @param {Function} func - Function to throttle
   * @param {number} limit - Limit in milliseconds
   * @returns {Function} - Throttled function
   */
  const throttle = (func, limit = 100) => {
    let inThrottle;
    return (...args) => {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  /**
   * Get CSS variable value from document
   * @param {string} varName - CSS variable name (without --)
   * @returns {string} - CSS variable value
   */
  const getCSSVar = (varName) => {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(`--${varName}`)
      .trim();
  };

  /**
   * Parse CSS unit value to number
   * @param {string} value - CSS value with unit (e.g., "88px")
   * @returns {number} - Numeric value
   */
  const parseUnit = (value) => {
    return parseInt(value, 10) || 0;
  };

  /**
   * Get header height from CSS variable
   * @returns {number} - Header height in pixels
   */
  const getHeaderHeight = () => {
    const height = getCSSVar("header-height");
    return parseUnit(height) || 88;
  };

  /**
   * Smooth scroll to element
   * @param {HTMLElement} target - Target element
   * @param {number} offset - Offset from top (default: header height)
   */
  const scrollToElement = (target, offset = null) => {
    if (!target) return;

    const headerHeight = offset ?? getHeaderHeight();
    const targetPosition = target.offsetTop - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  };

  /**
   * Add event listener with optional delegation
   * @param {HTMLElement|Document} element - Element to attach listener to
   * @param {string} event - Event type
   * @param {string|Function} selectorOrHandler - CSS selector for delegation or handler
   * @param {Function} handler - Event handler (if using delegation)
   */
  const on = (element, event, selectorOrHandler, handler) => {
    if (typeof selectorOrHandler === "function") {
      element.addEventListener(event, selectorOrHandler);
    } else {
      element.addEventListener(event, (e) => {
        const target = e.target.closest(selectorOrHandler);
        if (target) {
          handler.call(target, e);
        }
      });
    }
  };

  /**
   * Check if element is in viewport
   * @param {HTMLElement} element - Element to check
   * @param {number} threshold - Visibility threshold (0-1)
   * @returns {boolean} - Whether element is visible
   */
  const isInViewport = (element, threshold = 0) => {
    const rect = element.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;

    return (
      rect.top <= windowHeight * (1 - threshold) &&
      rect.bottom >= windowHeight * threshold
    );
  };

  /**
   * Wait for DOM to be ready
   * @param {Function} callback - Function to call when ready
   */
  const ready = (callback) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  };

  /**
   * Query selector shorthand
   * @param {string} selector - CSS selector
   * @param {HTMLElement} context - Context element
   * @returns {HTMLElement|null}
   */
  const $ = (selector, context = document) => context.querySelector(selector);

  /**
   * Query selector all shorthand
   * @param {string} selector - CSS selector
   * @param {HTMLElement} context - Context element
   * @returns {NodeList}
   */
  const $$ = (selector, context = document) =>
    context.querySelectorAll(selector);

  return {
    debounce,
    throttle,
    getCSSVar,
    parseUnit,
    getHeaderHeight,
    scrollToElement,
    on,
    isInViewport,
    ready,
    $,
    $$,
  };
})();

// Make available globally
window.Utils = Utils;
