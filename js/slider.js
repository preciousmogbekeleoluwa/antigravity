/**
 * JOY LUXURY FURNITURE — CINEMATIC HERO SLIDER ENGINE
 * Slider Revolution-inspired features:
 * - Ken Burns resets & dynamic scale
 * - Timeline progress line synchronization
 * - Staggered text layer entrance
 * - Pause on hover & user interaction
 * - Touch swipe support
 * - Reduced motion detection
 */

document.addEventListener('DOMContentLoaded', () => {
  const sliderSection = document.querySelector('.hero-slider-section');
  if (!sliderSection) return;

  const slides = sliderSection.querySelectorAll('.hero-slide');
  const totalSlides = slides.length;
  if (totalSlides === 0) return;

  const prevBtn = sliderSection.querySelector('.slider-arrow-prev');
  const nextBtn = sliderSection.querySelector('.slider-arrow-next');
  const counterCurrent = sliderSection.querySelector('.slider-counter-current');
  const counterTotal = sliderSection.querySelector('.slider-counter-total');
  const progressBar = sliderSection.querySelector('.slider-progress-bar');
  const indicatorDots = sliderSection.querySelectorAll('.slider-dot');

  let currentIndex = 0;
  let slideDuration = 7000; // 7 seconds per slide
  let isPaused = false;
  let slideInterval = null;
  let progressAnimation = null;
  let startTime = 0;
  let elapsedBeforePause = 0;

  // Initialize total counter display
  if (counterTotal) {
    counterTotal.textContent = String(totalSlides).padStart(2, '0');
  }

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * Update active slide state
   */
  function goToSlide(index, direction = 'next') {
    if (index === currentIndex && slides[index].classList.contains('is-active')) return;

    // Reset current active slide
    slides.forEach((slide, idx) => {
      slide.classList.remove('is-active');
      const bg = slide.querySelector('.slide-bg-image');
      if (bg && !prefersReducedMotion) {
        // Reset scale momentarily so Ken Burns can re-trigger on return
        bg.style.transition = 'none';
        bg.style.transform = 'scale(1.0)';
        void bg.offsetWidth; // Force reflow
        bg.style.transition = '';
      }
    });

    // Update currentIndex
    currentIndex = (index + totalSlides) % totalSlides;

    // Activate new slide
    const activeSlide = slides[currentIndex];
    activeSlide.classList.add('is-active');

    // Trigger Ken Burns
    const activeBg = activeSlide.querySelector('.slide-bg-image');
    if (activeBg && !prefersReducedMotion) {
      activeBg.style.transform = 'scale(1.09)';
    }

    // Update Counter
    if (counterCurrent) {
      counterCurrent.textContent = String(currentIndex + 1).padStart(2, '0');
    }

    // Update Indicators
    indicatorDots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.add('is-active');
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.classList.remove('is-active');
        dot.removeAttribute('aria-current');
      }
    });

    // Restart timer and progress bar
    resetSlideTimer();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1, 'next');
  }

  function prevSlide() {
    goToSlide(currentIndex - 1, 'prev');
  }

  /**
   * Animation Frame Timeline Progress Bar
   */
  function startProgress() {
    if (prefersReducedMotion) return;
    cancelAnimationFrame(progressAnimation);
    startTime = performance.now() - elapsedBeforePause;

    function step(now) {
      if (isPaused) return;

      const elapsed = now - startTime;
      const progressPercent = Math.min((elapsed / slideDuration) * 100, 100);

      if (progressBar) {
        progressBar.style.width = `${progressPercent}%`;
      }

      if (elapsed < slideDuration) {
        progressAnimation = requestAnimationFrame(step);
      } else {
        elapsedBeforePause = 0;
        nextSlide();
      }
    }

    progressAnimation = requestAnimationFrame(step);
  }

  function resetSlideTimer() {
    cancelAnimationFrame(progressAnimation);
    elapsedBeforePause = 0;
    if (progressBar) {
      progressBar.style.width = '0%';
    }
    if (!isPaused) {
      startProgress();
    }
  }

  function pauseSlider() {
    if (isPaused) return;
    isPaused = true;
    cancelAnimationFrame(progressAnimation);
    elapsedBeforePause = performance.now() - startTime;
  }

  function resumeSlider() {
    if (!isPaused) return;
    isPaused = false;
    startProgress();
  }

  // Navigation Arrow clicks
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      nextSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      prevSlide();
    });
  }

  // Pagination Dot clicks
  indicatorDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const targetIndex = parseInt(dot.getAttribute('data-slide-index'), 10);
      if (!isNaN(targetIndex)) {
        goToSlide(targetIndex);
      }
    });
  });

  // Pause on hover
  sliderSection.addEventListener('mouseenter', pauseSlider);
  sliderSection.addEventListener('mouseleave', resumeSlider);

  // Keyboard navigation when slider has focus or document
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  });

  // Touch swipe gestures
  let touchStartX = 0;
  let touchEndX = 0;

  sliderSection.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    pauseSlider();
  }, { passive: true });

  sliderSection.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    resumeSlider();
  }, { passive: true });

  function handleSwipe() {
    const threshold = 50;
    if (touchEndX < touchStartX - threshold) {
      // Swiped Left
      nextSlide();
    } else if (touchEndX > touchStartX + threshold) {
      // Swiped Right
      prevSlide();
    }
  }

  // Initialize first slide
  goToSlide(0);
});
