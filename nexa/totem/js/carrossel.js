const imgs = document.getElementById("img");
const img = document.querySelectorAll("#img img");

let idx = 0;
function carrossel() {
  idx++;
  if (idx > img.length - 1) {
    idx = 0;
  }
  // imgs.style.transform = `translateX(${-idx * 281}px)`;
  imgs.style.transform = `translateX(${-idx * img[idx].clientWidth}px)`;
}

setInterval(carrossel, 5000);
