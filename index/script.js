let currentIndex = 0;
const slides = document.querySelectorAll('.slide');

function showNextSlide() {
  slides[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % slides.length; // Geht zur nächsten Folie
  slides[currentIndex].classList.add('active');
}

// Startet die Slideshow mit einem Intervall von 3 Sekunden
slides[currentIndex].classList.add('active');
setInterval(showNextSlide, 3000);
