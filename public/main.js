/** @type {HTMLInputElement} */
const searchEl = document.querySelector(".search");

/** @type {NodeListOf<HTMLImageElement>} */
const images = document.querySelectorAll(".img img");

searchEl.addEventListener("keyup", (e) => {
  const searchValue = e.target.value.toLowerCase();
  images.forEach((image) => {
    if (searchValue === "") {
      image.parentElement.style.display = "block";
      return;
    }
    const imageCaption = image.getAttribute("alt").toLowerCase();
    if (imageCaption.includes(searchValue)) {
      image.parentElement.style.display = "block";
    } else {
      image.parentElement.style.display = "none";
    }
  });
});
