/**
 * Focus Reactive Website - Main JavaScript
 * 
 * Features:
 * - Mobile menu with smooth animations
 * - Scroll position preservation
 * - Accessible keyboard navigation
 * - Performance optimized event handling
 */

document.addEventListener("DOMContentLoaded", () => {
  initBurgerMenu();
});

/**
 * Initialize mobile burger menu functionality
 * Handles menu opening, closing, and scroll position management
 */
function initBurgerMenu() {
  const burger = document.querySelector(".header__burger");
  const menu = document.querySelector(".mobile-menu");
  const overlay = document.querySelector(".overlay");
  const body = document.body;

  // Early return if required elements are not found
  if (!burger || !menu || !overlay) {
    console.warn("Mobile menu elements not found");
    return;
  }

  const animationDuration = 400;

  /**
   * Open mobile menu and prevent body scroll
   */
  const openMenu = () => {
    const scrollY = window.scrollY;
    body.dataset.scrollY = scrollY;
    
    // Add active classes for styling
    burger.classList.add("active");
    menu.classList.add("active");
    overlay.classList.add("active");
    
    // Update accessibility attributes
    burger.setAttribute("aria-expanded", "true");
    menu.removeAttribute("hidden");
    overlay.setAttribute("aria-hidden", "false");

    // Prevent background scroll
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
  };

  /**
   * Close mobile menu and restore scroll position
   * @param {string|null} targetId - Optional element ID to scroll to after closing
   */
  const closeMenu = (targetId = null) => {
    burger.classList.remove("active");
    menu.classList.remove("active");
    overlay.classList.remove("active");

    // Update accessibility attributes
    burger.setAttribute("aria-expanded", "false");
    menu.setAttribute("hidden", "");
    overlay.setAttribute("aria-hidden", "true");

    // Restore scroll position using requestAnimationFrame for smooth transition
    requestAnimationFrame(() => {
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      body.style.overflow = "";
      
      const savedScrollY = parseInt(body.dataset.scrollY || "0");
      window.scrollTo(0, savedScrollY);

      // Optional smooth scroll to target element
      if (targetId) {
        setTimeout(() => {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }, animationDuration);
      }
    });
  };

  // Event Listeners
  burger.addEventListener("click", (event) => {
    event.preventDefault();
    burger.classList.contains("active") ? closeMenu() : openMenu();
  });

  overlay.addEventListener("click", () => closeMenu());

  // Handle menu link clicks
  menu.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      const href = event.target.getAttribute("href");
      if (href && href.startsWith("#")) {
        event.preventDefault();
        const targetId = href.slice(1);
        closeMenu(targetId);
      }
    }
  });

  // Close menu on Escape key press
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && burger.classList.contains("active")) {
      closeMenu();
    }
  });
}
