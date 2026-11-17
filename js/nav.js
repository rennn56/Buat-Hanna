/**
 * Our Special Day - Site Navigation
 * Hamburger toggle + active section highlight via IntersectionObserver
 */
(function () {
  "use strict";

  const nav       = document.getElementById("siteNav");
  const hamburger = document.getElementById("navHamburger");
  const drawer    = document.getElementById("navDrawer");
  if (!nav || !hamburger || !drawer) return;

  /* ── Hamburger open / close ─────────────────────────────────────── */
  function openDrawer() {
    drawer.setAttribute("aria-hidden", "false");
    hamburger.setAttribute("aria-expanded", "true");
    hamburger.classList.add("is-open");
    drawer.classList.add("is-open");
  }

  function closeDrawer() {
    drawer.setAttribute("aria-hidden", "true");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.classList.remove("is-open");
    drawer.classList.remove("is-open");
  }

  hamburger.addEventListener("click", () => {
    hamburger.getAttribute("aria-expanded") === "true" ? closeDrawer() : openDrawer();
  });

  /* Close drawer when any nav link is clicked (mobile) */
  drawer.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });

  /* Close drawer on Escape */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });

  /* ── Smooth scroll (all nav links in both menus) ────────────────── */
  nav.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || !targetId.startsWith("#")) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  /* ── Active section highlight (IntersectionObserver) ────────────── */
  const sections = Array.from(
    document.querySelectorAll("section[id], main section[id]")
  );
  const allLinks = Array.from(nav.querySelectorAll(".nav-link"));

  function setActive(id) {
    allLinks.forEach((link) => {
      const matches = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("is-active", matches);
      link.setAttribute("aria-current", matches ? "true" : "false");
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
  }

  /* ── Scroll: add shadow to nav when page is scrolled ────────────── */
  window.addEventListener("scroll", () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 20);
  }, { passive: true });
})();

