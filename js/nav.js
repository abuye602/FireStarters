document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const dropdowns = document.querySelectorAll(".nav-dropdown");

  const closeDropdowns = () => {
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("is-open");
      const button = dropdown.querySelector(".nav-dropdown__toggle");
      if (button) {
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-label", "Show ministry links");
      }
    });
  };

  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector(".nav-dropdown__toggle");
    if (!button) return;

    button.addEventListener("click", () => {
      const isOpen = dropdown.classList.contains("is-open");
      closeDropdowns();
      dropdown.classList.toggle("is-open", !isOpen);
      button.setAttribute("aria-expanded", String(!isOpen));
      button.setAttribute(
        "aria-label",
        isOpen ? "Show ministry links" : "Hide ministry links",
      );
    });
  });

  if (toggle && nav) {
    const closeMenu = () => {
      closeDropdowns();
      toggle.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
      nav.classList.remove("active");
      document.body.classList.remove("menu-open");
    };

    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.classList.toggle("active", !isOpen);
      toggle.setAttribute("aria-expanded", String(!isOpen));
      toggle.setAttribute(
        "aria-label",
        isOpen ? "Open navigation" : "Close navigation",
      );
      nav.classList.toggle("active", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
    });

    nav
      .querySelectorAll("a")
      .forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
    document.addEventListener("click", (event) => {
      if (!event.target.closest(".nav-dropdown")) closeDropdowns();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  document.querySelectorAll(".belief button").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.getElementById(
        button.getAttribute("aria-controls"),
      );
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      if (panel) panel.hidden = expanded;
    });
  });
});
