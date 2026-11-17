/**
 * Our Special Day - Anniversary Tracker & Countdown Logic
 * Recipient: Hanna
 */
(function () {
  "use strict";

  // First anniversary date: November 1, 2026 at 00:00:00 local time
  const FIRST_ANNIVERSARY = new Date(2026, 10, 1, 0, 0, 0);

  // Next target anniversary date: November 1, 2027 at 00:00:00 local time
  const NEXT_ANNIVERSARY = new Date(2027, 10, 1, 0, 0, 0);

  const MS_PER_SECOND = 1000;
  const MS_PER_MINUTE = MS_PER_SECOND * 60;
  const MS_PER_HOUR = MS_PER_MINUTE * 60;
  const MS_PER_DAY = MS_PER_HOUR * 24;

  let countdownInterval = null;

  /**
   * Helper to format numbers as non-negative 2-digit strings
   */
  function formatTwoDigits(val) {
    const safeVal = Math.max(0, Math.floor(val));
    return String(safeVal).padStart(2, "0");
  }

  /**
   * Updates Days Together and Countdown display values
   */
  function updateAnniversaryTracker() {
    const now = new Date();

    // 1. Calculate Days Together since November 1, 2026
    const daysTogetherEl = document.getElementById("daysTogetherCount");
    if (daysTogetherEl) {
      const elapsedMs = now.getTime() - FIRST_ANNIVERSARY.getTime();
      const daysTogether = elapsedMs > 0 ? Math.floor(elapsedMs / MS_PER_DAY) : 0;
      daysTogetherEl.textContent = String(Math.max(0, daysTogether));
    }

    // 2. Calculate Countdown to November 1, 2027
    const countdownDaysEl = document.getElementById("countdownDays");
    const countdownHoursEl = document.getElementById("countdownHours");
    const countdownMinutesEl = document.getElementById("countdownMinutes");
    const countdownSecondsEl = document.getElementById("countdownSeconds");
    const countdownContainerEl = document.getElementById("anniversaryCountdown");

    const remainingMs = NEXT_ANNIVERSARY.getTime() - now.getTime();

    // Target reached condition
    if (remainingMs <= 0) {
      if (countdownDaysEl) countdownDaysEl.textContent = "00";
      if (countdownHoursEl) countdownHoursEl.textContent = "00";
      if (countdownMinutesEl) countdownMinutesEl.textContent = "00";
      if (countdownSecondsEl) countdownSecondsEl.textContent = "00";

      if (countdownContainerEl && !countdownContainerEl.classList.contains("is-celebrating")) {
        countdownContainerEl.classList.add("is-celebrating");
        countdownContainerEl.innerHTML = `
          <div class="anniversary-celebration-message" style="grid-column: 1 / -1; font-family: var(--font-heading); font-size: 1.35rem; color: var(--color-deep-rose); font-weight: 700; padding: 1rem;">
            Happy Anniversary, My Beloved Hanna! ♡
          </div>
        `;
      }

      if (countdownInterval !== null) {
        clearInterval(countdownInterval);
        countdownInterval = null;
      }
      return;
    }

    // Deconstruct remaining time
    const days = Math.floor(remainingMs / MS_PER_DAY);
    const hours = Math.floor((remainingMs % MS_PER_DAY) / MS_PER_HOUR);
    const minutes = Math.floor((remainingMs % MS_PER_HOUR) / MS_PER_MINUTE);
    const seconds = Math.floor((remainingMs % MS_PER_MINUTE) / MS_PER_SECOND);

    if (countdownDaysEl) countdownDaysEl.textContent = formatTwoDigits(days);
    if (countdownHoursEl) countdownHoursEl.textContent = formatTwoDigits(hours);
    if (countdownMinutesEl) countdownMinutesEl.textContent = formatTwoDigits(minutes);
    if (countdownSecondsEl) countdownSecondsEl.textContent = formatTwoDigits(seconds);
  }

  /**
   * Initializes countdown and sets single recurrent interval
   */
  function initCountdown() {
    updateAnniversaryTracker();

    if (countdownInterval !== null) {
      clearInterval(countdownInterval);
    }

    countdownInterval = setInterval(updateAnniversaryTracker, 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCountdown);
  } else {
    initCountdown();
  }
})();

