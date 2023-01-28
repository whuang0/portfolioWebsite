const menuIcon = document.getElementById("menu-icon");
const menu = document.getElementById("menu");
const pages = document.getElementsByClassName("page");
const dots = document.getElementsByClassName("dot");

// Menu toggle function
menuIcon.addEventListener("click", function() {
  menu.classList.toggle("open");
});

// Change page function
for (let i = 0; i < dots.length; i++) {
  dots[i].addEventListener("click", function() {
    for (let j = 0; j < pages.length; j++) {
      pages[j].classList.remove("active");
    }
    pages[i].classList.add("active");
    for (let j = 0; j < dots.length; j++) {
      dots[j].classList.remove("active");
    }
    dots[i].classList.add("active");
  });
}