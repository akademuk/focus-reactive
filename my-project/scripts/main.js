// Register Service Worker for caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./js/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initBurgerMenu();
  initFallingElementsAnimation();
  initWorkItemsLogic();
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

/**
 * Initialize scroll-triggered animations
 */
function initFallingElementsAnimation() {
  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  const animateText = (selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      const spans = element.querySelectorAll('span');
      spans.forEach((span, index) => {
        setTimeout(() => {
          span.classList.add('revealed');
        }, index * 200);
      });
    });
  };

  const animateIcons = (selector) => {
    const items = document.querySelectorAll(selector);
    items.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('icon-revealed');
      }, index * 300);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('integrate')) {
          animateText('.integrate .section-title');
          setTimeout(() => {
            animateIcons('.integrate__animation-item');
          }, 400);
        }
        
        if (entry.target.classList.contains('ship')) {
          animateText('.ship .section-title');
          setTimeout(() => {
            animateIcons('.ship__animation-item');
          }, 400);
        }
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: '0px 0px -10% 0px'
  });

  const integrateSection = document.querySelector('.integrate');
  const shipSection = document.querySelector('.ship');
  
  if (integrateSection) observer.observe(integrateSection);
  if (shipSection) observer.observe(shipSection);
}

/**
 * Work Items Logic
 */
function initWorkItemsLogic() {
  const isDesktop = () => window.innerWidth >= 1280;
  
  if (!isDesktop()) {
    return;
  }

  const workItems = document.querySelectorAll('.work__item');
  
  if (!workItems.length) {
    return;
  }

  let activeItem = workItems[0];
  activeItem.classList.add('active');

  workItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      if (activeItem) {
        activeItem.classList.remove('active');
      }
      
      activeItem = item;
      item.classList.add('active');
    });
  });

  window.addEventListener('resize', () => {
    if (!isDesktop()) {
      workItems.forEach(item => {
        item.classList.remove('active');
      });
    } else if (!activeItem || !activeItem.classList.contains('active')) {
      workItems.forEach(item => item.classList.remove('active'));
      activeItem = workItems[0];
      activeItem.classList.add('active');
    }
  });
}

