// Slider component
function slider() {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".btn-left");
  const btnRight = document.querySelector(".btn-right");
  const slider = document.querySelector(".slider");
  let curSlide = 0;
  const maxSlides = slides.length;

  //Change slide
  goToSlide(0);

  function goToSlide(slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  }

  // Next slide
  function nextSlide() {
    if (curSlide === maxSlides - 1) {
      curSlide = 0;
    } else {
      curSlide += 1;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  }

  // Previous slide

  function prevSlide() {
    if (curSlide === 0) {
      curSlide = maxSlides - 1;
    } else {
      curSlide -= 1;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  }

  btnRight.addEventListener("click", function (e) {
    e.preventDefault();
    nextSlide();
  });
  btnLeft.addEventListener("click", function (e) {
    e.preventDefault();
    prevSlide();
  });

  // Dots
  const dotContainer = document.querySelector(".dots");

  function createDots() {
    slides.forEach((s, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class='dots__dot dots__dot--active' data-slide='${i}'></button>`
      );
    });
  }

  function activateDot(slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  }

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });

  // Init function

  function init() {
    createDots();
    goToSlide(0);
    activateDot(0);
    mobileNav();
  }
  init();
}
slider();

// Mobile nav
function mobileNav() {
  const header = document.querySelector(".main-header");
  header.addEventListener("click", (e) => {
    const btn = e.target;
    if (
      btn.classList.contains("nav-icon") ||
      btn.classList.contains("nav-link")
    ) {
      header.classList.toggle("nav-open");
    }

    // Smooth scroll
    if (btn.classList.contains("nav-link")) {
      const href = btn.getAttribute("href");

      // Scroll to top
      if (href === "#") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
      // Scroll to page sections
      if (href !== "#" && href.startsWith("#")) {
        const section = document.querySelector(href);
        section.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  });
}

// Smooth scroll for older browsers
