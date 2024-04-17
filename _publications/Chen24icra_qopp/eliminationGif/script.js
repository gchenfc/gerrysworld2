let slideIndex = 1;
showSlides(slideIndex);

function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName("carousel-image");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slides[slideIndex-1].style.display = "block";

  if (slideIndex <= 1) {
    document.querySelector(".prev").style.display = "none";
  } else {
    document.querySelector(".prev").style.display = "block";
  }
  if (slideIndex >= slides.length) {
    document.querySelector(".next").style.display = "none";
  } else {
    document.querySelector(".next").style.display = "block";
  }
}

function changeSlide(n) {
  showSlides(slideIndex += n);
}
