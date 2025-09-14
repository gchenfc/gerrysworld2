/**
 * Example usage:
 * 
 * First include the .css, e.g.
stylesheets: ["/css/blogPost.css", "/css/simpleCarousel.css"]
 * 
<script src="/scripts/simple_carousel.js" async></script>
<div class="carousel" id="myCarousel" aria-roledescription="carousel" data-delay="1.8">
  <div class="track">
    <img src="https://lh3.googleusercontent.com/pw/AP1GczNlCel9UanjkhqHovr3aXZJHMaUXsl53RBq5qYfdc7LAeZRDJvj0jInGOrpx7-aGP_yRYBPiVPTQcnGntN6XCJeuKMk1WkBDfJ0LTA1TrXZamv9Tvlx=w1920-h1080" alt="finished product">
    <img src="https://lh3.googleusercontent.com/pw/AP1GczM88Wx4VfV3dFGijGdAty0naSaygSGAMTNFxvNkhsANWzSGbxYsSXdeJ0GvYQgoFa2Ls-gtaT16qo83f3Xn-ZQZ2gAovtjUoWHIAtezZASdf_Q_E8Q-=w1920-h1080" alt="finished product">
    <img src="https://lh3.googleusercontent.com/pw/AP1GczPv-DS4Ej7nT2uD_o1eaFwjtzcZA5Y5xmBwhcn7SWS1z2Ugs1WUTgZosg--e0kLb4GPnfBkPMSdb3GV-TCwxTkgu6Rc3PN7p8I_tUVneOBk9e6fgVTX=w1920-h1080" alt="finished product">
    <img src="https://lh3.googleusercontent.com/pw/AP1GczMD5_V6ECSOkgHRoOmag8Risd9VrlUxzsgIZ3BGCKhZCJw9iHzeGEj3ta5rNPynIx20PnMoQv3MG6rrbkjeZa0IRjRrUtfP6WNkOADDiqzO8xDpTa7u=w1920-h1080" alt="finished product">
    <img src="https://lh3.googleusercontent.com/pw/AP1GczOAkVQV7_pQ_HAwG0pxDwlbZbQABtIlI4cJwPv3_BJng6p7x9aQMq2w18kaFvgjr3JZ35kPawUdxWVSWYDBRUijTupyv157l_ChIeW5ZL0YK5mw6QDa=w1920-h1080" alt="finished product">
    <img src="https://lh3.googleusercontent.com/pw/AP1GczOlyvtA5afial5R5j9J1J95j09UTWKoWN2BSIYLvViuiA4T3wuYqJoqZ-JSYv4oV5f8Kf5jjxK_a57d4Z_jsmu4CdUVWpsx0uq61h5wjhV6n-4mgKQK=w1920-h1080" alt="finished product">
    <img src="https://lh3.googleusercontent.com/pw/AP1GczOJuZeo-678hNj1KTEa6OUNEYrDkcdnP6VlkDl1CQU8mPvfrrXmzBF2SKzcAokJQCISkPDULZ_dbJ775NNh32i2B6nLGq802eFDNy1Gax9vx4KYEjAL=w1920-h1080" alt="finished product">
    <img src="https://lh3.googleusercontent.com/pw/AP1GczOGBDxWZPc23uqyAgqIL52vQPwLIaEzVPBjhqh1yQVAXHYmRlKxmNjkvtMsjH1zmlpF8zfKZuxYzQU0j9it6zKI5jSAycy0alelE6qqZz--G8QQafxA=w1920-h1080" alt="finished product">
    <img src="https://lh3.googleusercontent.com/pw/AP1GczPXggmznB3UrA4plB7oGQfEvz_hohsB-jDvqKhhl0gGjWfHU-DQQF5A-Sjk_qTV35HeIdv9T3sOBTf5EZwtV9JuWN43MZUVz2daopQmevzxOQ_ndbh2=w1920-h1080" alt="finished product">
  </div>

  <button class="nav prev" aria-label="Previous slide">‹</button>
  <button class="nav next" aria-label="Next slide">›</button>
  <div class="dots" aria-label="Slide indicators" role="tablist"></div>
</div>
 * 
 */
(function () {
  const root = document.getElementById("myCarousel");
  const track = root.querySelector(".track");
  const slides = Array.from(track.children);
  const prevBtn = root.querySelector(".prev");
  const nextBtn = root.querySelector(".next");
  const dotsWrap = root.querySelector(".dots");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const delay = parseFloat(root.getAttribute("data-delay")) || 3.0; // seconds

  let index = 0;
  let timer = null;
  const intervalMs = delay * 1000;
  console.log(`Carousel delay: ${delay}s, interval: ${intervalMs}ms`);

  // Build dots
  slides.forEach((_, i) => {
    const b = document.createElement("button");
    b.className = "dot";
    b.setAttribute("role", "tab");
    b.setAttribute("aria-label", `Go to slide ${i + 1}`);
    b.addEventListener("click", () => go(i, true));
    dotsWrap.appendChild(b);
  });

  function updateDots() {
    dotsWrap.querySelectorAll(".dot").forEach((d, i) => {
      if (i === index) d.setAttribute("aria-current", "true");
      else d.removeAttribute("aria-current");
    });
  }

  function go(i, user = false) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(${-index * 100}%)`;
    updateDots();
    if (user) restart(); // keep it snappy after manual nav
  }

  function next() { go(index + 1); }
  function prev() { go(index - 1); }

  prevBtn.addEventListener("click", () => prev());
  nextBtn.addEventListener("click", () => next());

  // Keyboard support
  root.tabIndex = 0; // make focusable
  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
  });

  // Auto-advance
  function start() {
    if (prefersReduced) return; // respect user preference
    stop();
    timer = setInterval(next, intervalMs);
  }
  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
  }
  function restart() { stop(); start(); }

  // Pause on hover/focus and when tab is hidden
  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  root.addEventListener("focusin", stop);
  root.addEventListener("focusout", start);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop(); else start();
  });

  // Initialize
  go(0);
  start();
})();
