const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const btnArea = document.getElementById("btnArea");

const card = document.getElementById("card");
const celebrate = document.getElementById("celebrate");
const againBtn = document.getElementById("againBtn");

function moveNoButton() {
  const areaRect = btnArea.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const padding = 10;

  const maxX = areaRect.width - btnRect.width - padding;
  const maxY = areaRect.height - btnRect.height - padding;

  const randX = Math.floor(Math.random() * maxX) + padding;
  const randY = Math.floor(Math.random() * maxY) + padding;

  noBtn.style.left = `${randX}px`;
  noBtn.style.top = `${randY}px`;
}

// Desktop hover
noBtn.addEventListener("mouseenter", moveNoButton);

// Mobile tap
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
}, { passive: false });

// If clicked somehow
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  moveNoButton();
});

yesBtn.addEventListener("click", () => {
  card.classList.add("hidden");
  celebrate.classList.remove("hidden");

  // hearts confetti
  for (let i = 0; i < 25; i++) {
    const heart = document.createElement("div");
    heart.innerText = "💖";
    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "-20px";
    heart.style.fontSize = (Math.random() * 18 + 16) + "px";
    heart.style.animation = `fall ${Math.random() * 2 + 2}s linear forwards`;
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 4500);
  }
});

againBtn.addEventListener("click", () => {
  celebrate.classList.add("hidden");
  card.classList.remove("hidden");
});

const style = document.createElement("style");
style.innerHTML = `
@keyframes fall {
  to {
    transform: translateY(110vh) rotate(360deg);
    opacity: 0;
  }
}`;
document.head.appendChild(style);

moveNoButton();
