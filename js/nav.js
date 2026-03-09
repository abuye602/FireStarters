document.addEventListener("DOMContentLoaded", () => {
  const headers = document.querySelectorAll("header");

  const closeMenu = (nav, hamburger) => {
    nav.classList.remove("active");
    hamburger.classList.remove("active");
    document.body.classList.remove("menu-open");
  };

  headers.forEach((header) => {
    const hamburger = header.querySelector(".hamburger");
    const nav = header.querySelector(".nav");

    if (!hamburger || !nav) {
      return;
    }

    hamburger.addEventListener("click", () => {
      nav.classList.toggle("active");
      hamburger.classList.toggle("active");
      document.body.classList.toggle("menu-open", nav.classList.contains("active"));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        const href = (link.getAttribute("href") || "").trim();
        const isHashLink = href.startsWith("#");

        // Only animate close on in-page links; let full page navigation happen directly.
        if (isHashLink) {
          closeMenu(nav, hamburger);
        }
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        closeMenu(nav, hamburger);
      }
    });
  });
});
