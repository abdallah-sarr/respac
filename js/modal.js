/**
 * RESPAC - Modal Controller
 * =========================
 * Handles modal opening, closing, and interactions
 */

const ModalController = (() => {
  let modal = null;
  let modalContent = null;

  /**
   * Initialize modal controller
   */
  const init = () => {
    modal = document.getElementById('modal');
    modalContent = document.getElementById('modalContent');

    if (!modal) return;

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (modalContent && !modalContent.contains(e.target)) {
        close();
      }
    });

    // Close on escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        close();
      }
    });
  };

  /**
   * Open modal with company information
   * @param {string} entreprise - Company name
   * @param {string} membre - Member name
   * @param {string} logo - Logo text/content
   */
  const open = (entreprise, membre, logo) => {
    if (!modal) {
      console.error('Modal element not found');
      return;
    }

    if (!entreprise || !membre || !logo) {
      console.error('Missing required information for modal');
      return;
    }

    try {
      const modalTitle = document.getElementById('modalTitle');
      const modalMember = document.getElementById('modalMember');
      const modalLogo = document.getElementById('modalLogo');
      const modalDescription = document.getElementById('modalDescription');

      if (modalTitle) modalTitle.textContent = entreprise;
      if (modalMember) modalMember.textContent = membre;
      if (modalLogo) modalLogo.textContent = logo;
      if (modalDescription) {
        modalDescription.textContent = `${entreprise} est une entreprise membre du RESPAC représentée par ${membre}.`;
      }

      modal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
      
      // Focus trap for accessibility
      modal.focus();
    } catch (error) {
      console.error('Error opening modal:', error);
    }
  };

  /**
   * Close the modal
   */
  const close = () => {
    if (!modal) return;

    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
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
    open,
    close
  };
})();

// Make available globally
window.ModalController = ModalController;

// Legacy function support
function openModal(entreprise, membre, logo) {
  ModalController.open(entreprise, membre, logo);
}

function closeModal() {
  ModalController.close();
}

