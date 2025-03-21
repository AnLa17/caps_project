let currentIndex = 0;
const slides = document.querySelectorAll('.slide');

function showNextSlide() {
  slides[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % slides.length; 
  slides[currentIndex].classList.add('active');
}

slides[currentIndex].classList.add('active');
setInterval(showNextSlide, 4500);

document.addEventListener('DOMContentLoaded', function() {
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptCookiesButton = document.getElementById('accept-cookies');

  // Funktion, um das Cookie zu setzen
  function setCookie(name, value, days) {
      let expires = "";
      if (days) {
          const date = new Date();
          date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
          expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  // Funktion, um das Cookie zu überprüfen
  function getCookie(name) {
      const nameEQ = name + "=";
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) === ' ') c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
  }

  // Zeigt das Banner an, wenn das Cookie nicht vorhanden ist
  if (!getCookie('cookieAccepted')) {
      cookieBanner.style.display = 'block';
  }

  // Ereignislistener für den Akzeptieren-Button
  acceptCookiesButton.addEventListener('click', function() {
      setCookie('cookieAccepted', 'true', 365); // Cookie für 1 Jahr setzen
      cookieBanner.style.display = 'none';
  });
});