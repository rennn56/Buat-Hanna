/**
 * Our Special Day - Love Letter Interactive Animation Logic
 * Recipient: Hanna
 */
(function () {
  "use strict";

  /**
   * Initializes open/close toggle for the romantic love letter
   */
  function initLoveLetter() {
    const toggleBtn = document.getElementById("openLetterBtn");
    const envelope = document.getElementById("loveLetterEnvelope");
    const letterPaper = document.getElementById("loveLetterPaper");

    if (!toggleBtn || !envelope) {
      return;
    }

    const OPEN_TEXT = "Open My Letter ♡";
    const CLOSE_TEXT = "Close My Letter ♡";

    toggleBtn.addEventListener("click", () => {
      const isOpen = envelope.classList.contains("is-open");
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!isOpen) {
        // Open envelope and reveal letter
        envelope.classList.add("is-open");
        toggleBtn.textContent = CLOSE_TEXT;
        toggleBtn.setAttribute("aria-expanded", "true");

        // Gentle focus/scroll into view if preferred
        if (letterPaper) {
          letterPaper.setAttribute("tabindex", "-1");
          setTimeout(() => {
            letterPaper.scrollIntoView({
              behavior: prefersReducedMotion ? "auto" : "smooth",
              block: "nearest"
            });
          }, prefersReducedMotion ? 50 : 250);
        }
      } else {
        // Close envelope and tuck letter back
        envelope.classList.remove("is-open");
        toggleBtn.textContent = OPEN_TEXT;
        toggleBtn.setAttribute("aria-expanded", "false");

        envelope.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "nearest"
        });
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLoveLetter);
  } else {
    initLoveLetter();
  }
})();

