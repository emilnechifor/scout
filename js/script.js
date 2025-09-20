document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;
    const slideInterval = 5000; // Change image every 5 seconds
    const navLinks = document.querySelectorAll(".main-nav a");
    const sections = document.querySelectorAll(".content-section");

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

    document.querySelector('.slider-container').addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.querySelector('.slider-container').addEventListener('touchend', function(e) {
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

    // Initially show only the 'about' section
    showSection('about');

    // Listen for click events on navigation links
    navLinks.forEach(link => {
        
            
            const href = link.getAttribute('href');
            if (href === "../index.html") {
                //showSection("home");
            } else {
                link.addEventListener("click", function(event) {
                    event.preventDefault();
                    const targetId = href.trim().replace(/^#/, '');
                    showSection(targetId);
                 });
            }
    });
    
    function showSection(sectionId) {
        // Trim any extra space and remove leading '#' if present
        sectionId = sectionId.trim().replace(/^#/, '');

        // If sectionId is empty, exit function or show default
        if (!sectionId) {
            console.error("Section ID is empty or invalid.");
            return;  // Exit if no valid ID
        }

        // Hide all sections
        sections.forEach(section => {
            section.style.display = 'none';
        });

        // Find and show the selected section
        const sectionToShow = document.querySelector(`.content-section.${sectionId}`);
        if (sectionToShow) {
            sectionToShow.style.display = 'block';
        } else {
            console.error(`Section with ID '${sectionId}' not found.`);
            // Optionally, show a default section here
            // document.querySelector('.default-section').style.display = 'block';
        }
    }
});

window.onscroll = function() {myStickyFunction()};

var navbar = document.querySelector(".main-nav");
var sticky = navbar.offsetTop;

let stickyOffset = navbar.offsetTop;
function myStickyFunction() {
    if (window.pageYOffset >= stickyOffset) {
        navbar.classList.add("sticky");
        // Optionally, force layout recalculation to avoid jumps
        void navbar.offsetWidth;
    } else {
        navbar.classList.remove("sticky");
    }
}
