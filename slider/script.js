const slider = document.querySelector(".slider");
const sliderImages = document.querySelectorAll(".slider img");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const closeBtn = document.getElementById("closeBtn");

let counter = 1;
let size = slider.clientWidth;
let container = document.querySelector(".slider-container");

slider.style.transform = "translateX(" + -size * counter + "px)";
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);
closeBtn.addEventListener("click", closeSlider);
document.addEventListener("transitionend", checkSlide);

slider.addEventListener("mouseover", function() {
  document.addEventListener("keydown", keySlide);
});

slider.addEventListener("mouseout", function() {
  document.removeEventListener("keydown", keySlide);
});

(function addEventsToImgs() {
  sliderImages.forEach(img => {
    img.addEventListener("click", expand, "once");
    img.style.position = "relative";
  });
})();

function closeSlider() {
  container.classList.remove("big");
  slider.classList.remove("big");
  closeBtn.style.display = "none";
  slider.style.transform = "translateX(" + -size * counter + "px)";
}

function expand() {
  size = container.clientWidth;
  slider.style.transform = "translateX(" + -1200 * counter + "px)";
  container.classList.add("big");
  slider.classList.add("big");
  closeBtn.style.display = "flex";
}

function keySlide(e) {
  switch (e.key) {
    case "ArrowRight":
      nextSlide();
      break;
    case "ArrowLeft":
      prevSlide();
      break;
  }
}

function nextSlide() {
  console.log(size);
  if (counter >= sliderImages.length - 1) return;
  if (slider.classList.contains("big")) {
    slider.style.transition = "transform 0.5s ease-in-out";
    counter++;
    slider.style.transform = "translateX(" + -1200 * counter + "px)";
  } else {
    slider.style.transition = "transform 0.5s ease-in-out";
    counter++;
    slider.style.transform = "translateX(" + -size * counter + "px)";
  }
}

function prevSlide() {
  if (counter <= 0) return;
  if (slider.classList.contains("big")) {
    slider.style.transition = "transform 0.5s ease-in-out";
    counter--;
    slider.style.transform = "translateX(" + -1200 * counter + "px)";
  } else {
    slider.style.transition = "transform 0.5s ease-in-out";
    counter--;
    slider.style.transform = "translateX(" + -size * counter + "px)";
  }
}

function checkSlide() {
  console.log(sliderImages[counter]);
  if (sliderImages[counter].id === "lastClone") {
    console.log(sliderImages[counter]);
    slider.style.transition = "none";
    counter = sliderImages.length - 2;
    if (slider.classList.contains("big")) {
      slider.style.transform = "translateX(" + -1200 * counter + "px)";
    } else {
      slider.style.transform = "translateX(" + -size * counter + "px)";
    }
  }
  if (sliderImages[counter].id === "firstClone") {
    slider.style.transition = "none";
    counter = sliderImages.length - counter;
    if (slider.classList.contains("big")) {
      slider.style.transform = "translateX(" + -1200 * counter + "px)";
    } else {
      slider.style.transform = "translateX(" + -size * counter + "px)";
    }
  }
}
