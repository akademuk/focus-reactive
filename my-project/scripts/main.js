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

// Предотвращаем мигание элементов при загрузке
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

document.addEventListener("DOMContentLoaded", () => {
  initBurgerMenu();
  initFallingElementsAnimation();
  initWorkItemsLogic();
  
  // Запускаем анимацию integrate после загрузки GSAP
  if (typeof gsap !== 'undefined') {
    initIntegrateAnimation();
  } else {
    // Если GSAP еще не загружен, ждем
    window.addEventListener('load', () => {
      setTimeout(initIntegrateAnimation, 100);
    });
  }
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

/**
 * Initialize Integrate Section Animation
 * Beautiful scroll-triggered animation with smooth transitions
 */
function initIntegrateAnimation() {
  // Check if GSAP and ScrollTrigger are available
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not available for integrate animation');
    return;
  }

  console.log('Initializing integrate animation...');

  gsap.registerPlugin(ScrollTrigger);

  const introSection = document.querySelector('.intro');
  
  if (!introSection) {
    console.warn('Intro section not found');
    return;
  }

  // Мягкие начальные состояния - элементы почти на своих местах
  gsap.set(".icons-group-1", { y: "-20vh", opacity: 0.3, scale: 0.95 }); // Иконки слегка выше
  gsap.set(".icons-group-2", { y: "20vh", opacity: 0, scale: 0.95 }); // Иконки слегка ниже
  gsap.set(".title-1", { y: "50vh", scale: 1.05, opacity: 0 }); // Заголовок немного снизу
  gsap.set(".title-2", { y: "50vh", scale: 1.05, opacity: 0 }); // Второй заголовок тоже

  // Очень плавная анимация с большим скроллом
  const masterTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".intro",
      start: "top top",
      end: "+=600vh", // Длинный скролл для медленной анимации
      scrub: 2, // Очень плавная синхронизация
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  });

  // Непрерывная плавная анимация без резких переходов
  masterTL
    // Первый заголовок медленно поднимается и проявляется (0-25%)
    .to(".title-1", {
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 40,
      ease: "sine.out"
    }, 0)
    
    // Первые иконки медленно спускаются (5-30%)
    .to(".icons-group-1", {
      y: "-10vh",
      opacity: 1,
      scale: 1,
      duration: 40,
      ease: "sine.out"
    }, 8)
    
    // Долгая пауза с элементами на месте (30-60%)
    .to(".title-1", {
      scale: 1,
      duration: 60,
      ease: "none"
    }, 50)
    
    // Очень медленное исчезновение первого заголовка (60-80%)
    .to(".title-1", {
      y: "-30vh",
      opacity: 0,
      scale: 0.9,
      duration: 40,
      ease: "sine.in"
    }, 120)
    
    // Первые иконки медленно уходят вверх (65-85%)
    .to(".icons-group-1", {
      y: "-40vh",
      opacity: 0,
      scale: 0.8,
      duration: 40,
      ease: "sine.in"
    }, 130)
    
    // Второй заголовок медленно появляется (75-95%)
    .to(".title-2", {
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 40,
      ease: "sine.out"
    }, 150)
    
    // Вторые иконки медленно поднимаются (80-100%)
    .to(".icons-group-2", {
      y: "10vh",
      opacity: 1,
      scale: 1,
      duration: 40,
      ease: "sine.out"
    }, 160);

  // Очень медленный фоновый параллакс
  masterTL
    .to(".bg-parallax", {
      y: -100,
      scale: 1.05,
      duration: 200, // На всю длину
      ease: "none"
    }, 0);

  // Очень деликатный mouse parallax
  document.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    
    gsap.to(".bg-parallax", {
      x: mouseX * 8, // Уменьшенное движение
      y: mouseY * 5,
      duration: 3, // Медленнее
      ease: "sine.out"
    });
    
    // Минимальный параллакс для иконок
    gsap.to(".icons-group-1, .icons-group-2", {
      x: mouseX * 2,
      duration: 2,
      ease: "sine.out"
    });
  });

  // Refresh ScrollTrigger on window resize
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });

  console.log('Integrate animation initialized successfully');
}

// Make function globally available
window.initIntegrateAnimation = initIntegrateAnimation;

