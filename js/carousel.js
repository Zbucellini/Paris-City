document.addEventListener('DOMContentLoaded', function () {
  const track = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  let originalSlides = Array.from(track.children);
  const numOriginalSlides = originalSlides.length;
  let slides = Array.from(track.children);
  let currentIndex = 0;
  let slideWidth = slides[0].offsetWidth;
  let isCarouselActive = false;
  const setSlidePosition = () => {
    slideWidth = slides[0].offsetWidth;
    slides.forEach((slide, index) => {
      slide.style.left = `${slideWidth * index}px`;
    });
  };
  const goToSlide = (index, withTransition = true) => {
    if (!withTransition) {
      track.style.transition = 'none';
    } else {
      track.style.transition = 'transform 0.4s ease-in-out';
    }
    track.style.transform = `translateX(-${slideWidth * index}px)`;
    currentIndex = index;

    if (!withTransition) {
      requestAnimationFrame(() => {
        track.style.transition = 'transform 0.4s ease-in-out';
      });
    }
  };
  const initCarousel = () => {
    setSlidePosition();
    goToSlide(0, false);
    isCarouselActive = true;
  };
  const destroyCarousel = () => {
    goToSlide(0, false);
    track.style.transform = 'translateX(0)';
    track.style.transition = 'none';
    isCarouselActive = false;
  };
  const moveNext = () => {
    if (currentIndex < numOriginalSlides - 1) {
      goToSlide(currentIndex + 1, true);
    } else {
      goToSlide(0, true);
    }
  };
  const movePrev = () => {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1, true);
    } else {
      goToSlide(numOriginalSlides - 1, true);
    }
  };
  const handleResize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 769 && !isCarouselActive) {
      initCarousel();
    } else if (screenWidth < 769 && isCarouselActive) {
      destroyCarousel();
    }
  };
  handleResize();
  window.addEventListener('resize', handleResize);
  nextBtn.addEventListener('click', () => {
    if (isCarouselActive) {
      moveNext();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (isCarouselActive) {
      movePrev();
    }
  });
});
