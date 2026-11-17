/**
 * Our Special Day - Stage 2A Interactive Logic
 * Recipient: Hanna
 */
document.addEventListener("DOMContentLoaded", () => {
  console.log("Our Special Day: Welcome page initialized.");

  const openStoryBtn = document.getElementById("openStoryBtn");
  const envelopeTrigger = document.getElementById("envelopeTrigger");
  const gentleToast = document.getElementById("gentleToast");
  let toastTimer = null;

  function showGentleMessage(text) {
    if (!gentleToast) return;

    const messageEl = gentleToast.querySelector(".toast-message");
    if (messageEl && text) {
      messageEl.textContent = text;
    }

    gentleToast.classList.add("is-visible");
    gentleToast.setAttribute("aria-hidden", "false");

    if (toastTimer) {
      clearTimeout(toastTimer);
    }

    toastTimer = setTimeout(() => {
      gentleToast.classList.remove("is-visible");
      gentleToast.setAttribute("aria-hidden", "true");
    }, 3200);
  }

  if (openStoryBtn) {
    openStoryBtn.addEventListener("click", () => {
      showGentleMessage("Hanna, our story is waiting for you... ♡");
      const anniversarySection = document.getElementById("anniversarySection");
      if (anniversarySection) {
        anniversarySection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  if (envelopeTrigger) {
    envelopeTrigger.addEventListener("click", () => {
      showGentleMessage("A sweet letter is being prepared with all my love, Hanna! ♡");
    });

    envelopeTrigger.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        envelopeTrigger.click();
      }
    });
  }
});
