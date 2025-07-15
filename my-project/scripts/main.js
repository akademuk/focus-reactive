// Register Service Worker for caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Prevent element flashing on load
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

document.addEventListener("DOMContentLoaded", () => {
  initBurgerMenu();
  initFallingElementsAnimation();
  initWorkItemsLogic();
  
  // Initialize integrate animation after GSAP loads (desktop only)
  if (typeof gsap !== 'undefined') {
    initIntegrateAnimation();
  } else {
    window.addEventListener('load', () => {
      setTimeout(initIntegrateAnimation, 100);
    });
  }
  
  // Re-initialize on window resize
  window.addEventListener('resize', () => {
    // Debounce resize events
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(() => {
      initIntegrateAnimation();
    }, 250);
  });
});

/**
 * Mobile menu functionality
 */
function initBurgerMenu() {
  const burger = document.querySelector(".header__burger");
  const menu = document.querySelector(".mobile-menu");
  const overlay = document.querySelector(".overlay");
  const body = document.body;

  if (!burger || !menu || !overlay) {
    console.warn("Mobile menu elements not found");
    return;
  }

  const animationDuration = 400;

  const openMenu = () => {
    const scrollY = window.scrollY;
    body.dataset.scrollY = scrollY;
    
    burger.classList.add("active");
    menu.classList.add("active");
    overlay.classList.add("active");
    
    burger.setAttribute("aria-expanded", "true");
    menu.removeAttribute("hidden");
    overlay.setAttribute("aria-hidden", "false");

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
  };

  const closeMenu = (targetId = null) => {
    burger.classList.remove("active");
    menu.classList.remove("active");
    overlay.classList.remove("active");

    burger.setAttribute("aria-expanded", "false");
    menu.setAttribute("hidden", "");
    overlay.setAttribute("aria-hidden", "true");

    requestAnimationFrame(() => {
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      body.style.overflow = "";
      
      const savedScrollY = parseInt(body.dataset.scrollY || "0");
      window.scrollTo(0, savedScrollY);

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

  burger.addEventListener("click", (event) => {
    event.preventDefault();
    burger.classList.contains("active") ? closeMenu() : openMenu();
  });

  overlay.addEventListener("click", () => closeMenu());

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

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && burger.classList.contains("active")) {
      closeMenu();
    }
  });
}

/**
 * Scroll-triggered animations
 */
function initFallingElementsAnimation() {
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
 * Work items hover logic
 */
function initWorkItemsLogic() {
  const isDesktop = () => window.innerWidth >= 1280;
  
  if (!isDesktop()) return;

  const workItems = document.querySelectorAll('.work__item');
  if (!workItems.length) return;

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

/**
 * GSAP ScrollTrigger animation for integrate section
 * Only runs on desktop devices (1280px and above)
 */
function initIntegrateAnimation() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not available');
    return;
  }

  // Check if device is desktop
  const isDesktop = () => window.innerWidth >= 1280;
  
  if (!isDesktop()) {
    console.log('GSAP animation disabled on mobile devices');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const introSection = document.querySelector('.intro');
  if (!introSection) {
    console.warn('Intro section not found');
    return;
  }

  // Initial states
  gsap.set(".icons-group-1", { y: "-20vh", opacity: 0.3, scale: 0.95 });
  gsap.set(".icons-group-2", { y: "20vh", opacity: 0, scale: 0.95 });
  gsap.set(".title-1", { y: "50vh", scale: 1.05, opacity: 0 });
  gsap.set(".title-2", { y: "0vh", scale: 1, opacity: 0 });

  // Timeline with smooth scroll - максимально залипающая анимация
  const masterTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".intro",
      start: "top top",
      end: "+=3000vh", // Значительно увеличиваем высоту скролла до 3000vh
      scrub: 0.5, // Делаем scrub еще меньше для максимального "залипания"
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  });

  // Animation sequence - очень медленные переходы с огромными паузами
  masterTL
    // Phase 1: First title appears and settles - очень медленно
    .to(".title-1", {
      y: 0, scale: 1, opacity: 1,
      duration: 300, ease: "sine.out" // Еще больше увеличил
    }, 0)
    // PAUSE: Title stays in stable position ОЧЕНЬ ДОЛГО
    .to(".title-1", {
      y: 0, scale: 1, opacity: 1,
      duration: 600, ease: "none" // Огромная пауза
    }, 300)
    // Phase 2: Icons appear below title - очень поздно и медленно
    .to(".icons-group-1", {
      y: "-10vh", opacity: 1, scale: 1,
      duration: 400, ease: "sine.out" 
    }, 900) // Очень поздно
    // PAUSE: Both title and icons stay visible together ОЧЕНЬ ДОЛГО
    .to(".title-1", {
      y: 0, scale: 1, opacity: 1,
      duration: 800, ease: "none" // Огромная пауза
    }, 1300)
    .to(".icons-group-1", {
      y: "-10vh", opacity: 1, scale: 1,
      duration: 800, ease: "none" // Огромная пауза
    }, 1300)
    // Phase 3: First section exits - НАМНОГО ПОЗЖЕ
    .to(".title-1", {
      y: "-30vh", opacity: 0, scale: 0.9,
      duration: 200, ease: "sine.in"
    }, 2100) // Намного позже
    .to(".icons-group-1", {
      y: "-40vh", opacity: 0, scale: 0.8,
      duration: 200, ease: "sine.in"
    }, 2100)
    // Phase 4: Second title appears above center
    .to(".title-2", {
      y: "-15vh", scale: 1, opacity: 1,
      duration: 400, ease: "sine.out"
    }, 2300)
    // PAUSE: Second title stays in position ОЧЕНЬ ДОЛГО
    .to(".title-2", {
      y: "-15vh", scale: 1, opacity: 1,
      duration: 800, ease: "none" // Огромная пауза
    }, 2700)
    // Phase 5: Second icons appear well below title
    .to(".icons-group-2", {
      y: "25vh", opacity: 1, scale: 1,
      duration: 500, ease: "sine.out"
    }, 3500) // Очень поздно
    // PAUSE: Final position - both elements stay visible ОЧЕНЬ ДОЛГО
    .to(".title-2", {
      y: "-15vh", scale: 1, opacity: 1,
      duration: 1000, ease: "none" // Огромная финальная пауза
    }, 4000)
    .to(".icons-group-2", {
      y: "25vh", opacity: 1, scale: 1,
      duration: 1000, ease: "none" // Огромная финальная пауза
    }, 4000);

  // Background parallax - соответствует новой огромной длительности
  masterTL.to(".bg-parallax", {
    y: -100, scale: 1.05,
    duration: 5000, ease: "none" // Огромная длительность под новую анимацию
  }, 0);

  // Mouse parallax
  document.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    
    gsap.to(".bg-parallax", {
      x: mouseX * 8, y: mouseY * 5,
      duration: 3, ease: "sine.out"
    });
    
    gsap.to(".icons-group-1, .icons-group-2", {
      x: mouseX * 2, duration: 2, ease: "sine.out"
    });
  });

  window.addEventListener('resize', () => {
    const isDesktop = () => window.innerWidth >= 1280;
    
    if (isDesktop()) {
      ScrollTrigger.refresh();
    } else {
      // Kill all ScrollTrigger instances on mobile
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger && trigger.trigger.closest('.intro')) {
          trigger.kill();
        }
      });
    }
  });
}

// Make function globally available
window.initIntegrateAnimation = initIntegrateAnimation;

