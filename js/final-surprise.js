/**
 * Our Special Day - Final Surprise Gift Box & Romantic Choice Logic
 * Recipient: Hanna
 */
(function () {
  "use strict";

  /**
   * Initializes gift box opening interaction and romantic choice responses
   */
  function initFinalSurprise() {
    const giftBox = document.getElementById("giftBox");
    const finalLetter = document.getElementById("finalLetter");
    const btnYesForever = document.getElementById("btnYesForever");
    const btnOfCourse = document.getElementById("btnOfCourse");
    const finalMessage = document.getElementById("finalMessage");

    // 1. Gift Box Opening Logic
    if (giftBox) {
      giftBox.setAttribute("aria-expanded", "false");

      function openGiftBox() {
        if (giftBox.classList.contains("is-open")) {
          return;
        }

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        giftBox.classList.add("is-open");
        giftBox.setAttribute("aria-expanded", "true");
        giftBox.setAttribute("aria-label", "Special gift box opened for Hanna ♡");

        if (finalLetter) {
          setTimeout(() => {
            finalLetter.scrollIntoView({
              behavior: prefersReducedMotion ? "auto" : "smooth",
              block: "nearest"
            });
          }, prefersReducedMotion ? 50 : 350);
        }
      }

      giftBox.addEventListener("click", openGiftBox);

      giftBox.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openGiftBox();
        }
      });
    }

    // 2. Romantic Choice Buttons Interaction & Celebration
    const YES_FOREVER_MSG = "You just made my heart the happiest! Here's to forever filled with love, laughter, and beautiful memories. I love you, Hanna! ♡";
    const OF_COURSE_MSG = "That's the answer I was hoping for! I can't wait to create countless beautiful memories with you, Hanna. You're my favorite person. ♡";

    let celebrationTriggered = false;

    function launchRomanticCelebration() {
      // Ensure celebration is triggered only once
      if (celebrationTriggered) {
        return;
      }
      celebrationTriggered = true;

      // Respect prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) {
        return;
      }

      const celebrationWrap = document.createElement("div");
      celebrationWrap.className = "celebration-overlay";
      celebrationWrap.setAttribute("aria-hidden", "true");

      // Romantic pastel colors & symbols
      const pastelColors = ["#f7b2bd", "#fde2e4", "#e5989b", "#d67584", "#faedd9", "#fff0f3"];
      const romanticSymbols = ["♥", "♡", "✦", "✧"];

      // Limited to 30 lightweight particles for smooth mobile performance
      const particleCount = 30;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("span");
        const isHeart = i % 2 === 0;
        const color = pastelColors[i % pastelColors.length];

        if (isHeart) {
          particle.className = "celebration-heart";
          particle.textContent = romanticSymbols[i % romanticSymbols.length];
          particle.style.color = color;
        } else {
          particle.className = "celebration-confetti";
          particle.style.backgroundColor = color;
        }

        const leftPercentage = Math.floor(Math.random() * 92) + 4;
        const animDelay = (Math.random() * 0.7).toFixed(2);
        const animDuration = (2.2 + Math.random() * 1.6).toFixed(2);
        const driftPx = (Math.random() * 50 - 25).toFixed(0);

        particle.style.left = `${leftPercentage}%`;
        particle.style.animationDelay = `${animDelay}s`;
        particle.style.animationDuration = `${animDuration}s`;
        particle.style.setProperty("--drift", `${driftPx}px`);

        celebrationWrap.appendChild(particle);
      }

      document.body.appendChild(celebrationWrap);

      // Auto-cleanup DOM after animation finishes (4.5s)
      setTimeout(() => {
        if (celebrationWrap && celebrationWrap.parentNode) {
          celebrationWrap.parentNode.removeChild(celebrationWrap);
        }
      }, 4500);
    }

    function handleChoice(messageText) {
      if (!finalMessage) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Display single clean message without stacking
      finalMessage.textContent = messageText;
      finalMessage.classList.add("is-visible");

      // Trigger one-time romantic celebration
      launchRomanticCelebration();

      // Smoothly guide attention to the final message response
      setTimeout(() => {
        finalMessage.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "nearest"
        });
      }, prefersReducedMotion ? 50 : 150);
    }

    if (btnYesForever) {
      btnYesForever.addEventListener("click", () => {
        handleChoice(YES_FOREVER_MSG);
      });
    }

    if (btnOfCourse) {
      btnOfCourse.addEventListener("click", () => {
        handleChoice(OF_COURSE_MSG);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFinalSurprise);
  } else {
    initFinalSurprise();
  }
})();
