/**
 * Our Special Day - Our Little Promises Interactions
 * Recipient: Hanna
 */
(function () {
  "use strict";

  let promiseToastTimer = null;

  /**
   * Displays a romantic toast notification for the clicked promise
   */
  function showPromiseToast(text) {
    const toast = document.getElementById("gentleToast");
    if (!toast) return;

    const messageEl = toast.querySelector(".toast-message");
    if (messageEl && text) {
      messageEl.textContent = text;
    }

    toast.classList.add("is-visible");
    toast.setAttribute("aria-hidden", "false");

    if (promiseToastTimer) {
      clearTimeout(promiseToastTimer);
    }

    promiseToastTimer = setTimeout(() => {
      toast.classList.remove("is-visible");
      toast.setAttribute("aria-hidden", "true");
    }, 3200);
  }

  /**
   * Initializes interactions and accessibility for all promise cards
   */
  function initPromisesInteractions() {
    const cards = document.querySelectorAll(".promise-card");
    if (!cards || cards.length === 0) return;

    const promiseToastMessages = [
      "I will always choose you, even on the days when things are not easy, Hanna. ♡",
      "I will always try to listen, understand, and deeply care about your feelings, Hanna. ♡",
      "Hand in hand, let's keep learning, growing, and becoming better together, Hanna. ♡",
      "I will keep finding little ways to make your days brighter and happier, Hanna. ♡",
      "I want to be beside you through both happy and difficult days, always, Hanna. ♡",
      "I will nurture our love with attention, patience, and genuine effort, Hanna. ♡"
    ];

    cards.forEach((card, index) => {
      card.style.cursor = "pointer";
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");

      const titleEl = card.querySelector(".promise-title");
      const titleText = titleEl ? titleEl.textContent.trim() : `Promise ${index + 1}`;
      card.setAttribute("aria-label", `Promise for Hanna: ${titleText}`);

      const triggerPromise = () => {
        const msg = promiseToastMessages[index] || promiseToastMessages[0];
        showPromiseToast(msg);
      };

      card.addEventListener("click", triggerPromise);

      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          triggerPromise();
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPromisesInteractions);
  } else {
    initPromisesInteractions();
  }
})();

