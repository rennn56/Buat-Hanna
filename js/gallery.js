/**
 * Our Special Day - Our Memories Gallery Interactions
 * Recipient: Hanna
 */
(function () {
  "use strict";

  let toastTimer = null;

  /**
   * Displays a gentle romantic toast notification
   */
  function showGalleryToast(text) {
    const toast = document.getElementById("gentleToast");
    if (!toast) return;

    const messageEl = toast.querySelector(".toast-message");
    if (messageEl && text) {
      messageEl.textContent = text;
    }

    toast.classList.add("is-visible");
    toast.setAttribute("aria-hidden", "false");

    if (toastTimer) {
      clearTimeout(toastTimer);
    }

    toastTimer = setTimeout(() => {
      toast.classList.remove("is-visible");
      toast.setAttribute("aria-hidden", "true");
    }, 3200);
  }

  /**
   * Initializes click & keyboard interactions for Polaroid memory cards
   */
  function initMemoriesGallery() {
    const cards = document.querySelectorAll(".polaroid-card");
    if (!cards || cards.length === 0) return;

    const sweetMessages = [
      "Out of all the people in that server, somehow our paths crossed. I'm so glad they did, Hanna. ♡",
      "What started as a random hello became one of the best things that ever happened to me, Hanna. ♡",
      "Every conversation with you makes my days so much brighter. I could talk to you forever, Hanna. ♡",
      "Hearing your voice is my favorite part of the day. It makes the distance feel so much smaller, Hanna. ♡",
      "I look forward to the day I don't have to say goodnight through a screen anymore. Until then, Hanna. ♡"
    ];

    cards.forEach((card, index) => {
      card.style.cursor = "pointer";
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `View memory note ${index + 1} for Hanna`);

      const triggerMessage = () => {
        const msg = sweetMessages[index] || sweetMessages[0];
        showGalleryToast(msg);
      };

      card.addEventListener("click", triggerMessage);

      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          triggerMessage();
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMemoriesGallery);
  } else {
    initMemoriesGallery();
  }
})();

