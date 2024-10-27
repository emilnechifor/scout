document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;
    const slideInterval = 5000; // Change image every 5 seconds

    function showSlide(index) {
        slides.forEach((slide, idx) => {
            slide.classList.remove('active');
            if (idx === index) slide.classList.add('active');
        });
        updateIndicators(index);
    }

    function updateIndicators(index) {
        indicators.forEach(indicator => indicator.classList.remove('active'));
        indicators[index].classList.add('active');
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    // Initialize slider
    showSlide(currentIndex);

    // Auto slide
    let slideTimer = setInterval(nextSlide, slideInterval);

    // Mouse and Touch events
    document.querySelector('.slider-container').addEventListener('click', function(e) {
        // Prevent clicks on indicators from triggering the slider change
        if (!e.target.classList.contains('indicator')) {
            clearInterval(slideTimer);
            nextSlide();
            slideTimer = setInterval(nextSlide, slideInterval);
        }
    });

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    document.querySelector('.slider').addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.querySelector('.slider').addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleGesture();
    });

    function handleGesture() {
        if (touchStartX < touchEndX) {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        } else if (touchStartX > touchEndX) {
            nextSlide();
        }
    }

    // Indicator click events
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            clearInterval(slideTimer);
            showSlide(index);
            slideTimer = setInterval(nextSlide, slideInterval);
        });
    });
});