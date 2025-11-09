// DOM Elements
const body = document.body;
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const htmlEl = document.documentElement;
const themeToggleBtn = document.getElementById("theme-toggle");
const header = document.getElementById("site-header");
const firstSection = document.querySelector(".hero-section") || document.querySelector("body > main > section") || document.querySelector("body > section");

// Modal functions
function openModal(entreprise, membre, logo) {
  if (!entreprise || !membre || !logo) {
    console.error("Les informations de l'entreprise sont incomplètes");
    return;
  }

  try {
    document.getElementById("modalTitle").textContent = entreprise;
    document.getElementById("modalMember").textContent = membre;
    document.getElementById("modalLogo").textContent = logo;
    document.getElementById(
      "modalDescription"
    ).textContent = `${entreprise} est une entreprise membre du RESPAC représentée par ${membre}.`;
    modal.classList.remove("hidden");
    body.classList.add("overflow-hidden");
  } catch (error) {
    console.error("Erreur lors de l'ouverture du modal:", error);
  }
}

function closeModal() {
  modal.classList.add("hidden");
  body.classList.remove("overflow-hidden");
}

// Modal event listeners
modal.addEventListener("click", function (e) {
  if (!modalContent.contains(e.target)) {
    closeModal();
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Header scroll logic
(() => {
  const rootStyles = getComputedStyle(document.documentElement);
  const headerHeightVar = rootStyles.getPropertyValue("--header-height").trim();
  const headerHeight = parseInt(headerHeightVar || "88", 10) || 88;
  let lastY = window.scrollY;
  let currentY = lastY;
  let ticking = false;

  const updateHeader = () => {
    const scrollingDown = currentY > lastY;
    const heroBottom = firstSection
      ? firstSection.offsetTop + firstSection.offsetHeight - headerHeight
      : 10;

    header.classList.toggle("header-top", currentY <= 10);
    header.classList.toggle("header-scrolled", currentY > heroBottom);

    const hysteresis = 8;
    header.classList.toggle(
      "hidden",
      currentY > heroBottom + hysteresis && scrollingDown
    );
    header.classList.toggle("scrolling-down", scrollingDown);
    header.classList.toggle("scrolling-up", !scrollingDown);

    lastY = currentY;
    ticking = false;
  };

  const onScroll = () => {
    currentY = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  updateHeader();
})();

// Theme toggle functionality
(() => {
  const setThemeIcon = () => {
    const isDark = htmlEl.classList.contains("dark");
    themeToggleBtn.innerHTML = isDark
      ? '<ion-icon name="sunny-outline"></ion-icon>'
      : '<ion-icon name="moon-outline"></ion-icon>';
  };

  // Check initial theme
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    htmlEl.classList.add("dark");
  } else {
    htmlEl.classList.remove("dark");
  }
  setThemeIcon();

  // Theme toggle click handler
  themeToggleBtn.addEventListener("click", () => {
    const isDark = htmlEl.classList.contains("dark");
    htmlEl.classList.toggle("dark", !isDark);
    localStorage.theme = isDark ? "light" : "dark";
    setThemeIcon();
  });
})();

// Tabs behavior
(() => {
  const tabs = document.querySelectorAll(".tab-link");
  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      tabs.forEach((t) => t.classList.remove("tab-active"));
      tab.classList.add("tab-active");
    });
  });
})();

// Hero scroll indicator
(() => {
  const scrollIndicator = document.querySelector(".hero-scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      const heroSection = document.querySelector(".hero-section");
      if (heroSection) {
        const nextSection = heroSection.nextElementSibling;
        if (nextSection) {
          const headerHeight = parseInt(
            getComputedStyle(document.documentElement)
              .getPropertyValue("--header-height")
              .trim() || "88",
            10
          ) || 88;
          const targetPosition = nextSection.offsetTop - headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  }
})();