document.addEventListener("DOMContentLoaded", function () {
  // Définir le thème sombre comme thème par défaut
  document.documentElement.setAttribute("data-theme", "dark");

  // Sauvegarder la préférence
  localStorage.setItem("theme", "dark");
});
