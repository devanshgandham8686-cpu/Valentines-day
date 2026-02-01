const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const btnArea = document.getElementById("btnArea");

const card = document.getElementById("card");
const celebrate = document.getElementById("celebrate");
const againBtn = document.getElementById("againBtn");
const hintText = document.getElementById("hintText");

// FRAME control
let frame = 1;

// Move No button inside the button area
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
  noBtn.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
}

// FRAME 1 → clicking No takes you to Frame 2
noBtn.addEventListener("click", (e) => {
  if (frame === 1) {
    e.preventDefault();
    frame = 2;
    hintText.innerText = "Try clicking No now 😈";
    noBtn.classList.add("runaway");
    moveNoButton();
  } else {
    // in frame 2 clicking No is not allowed
    e.preventDefault();
    moveNoButton();
  }
});

// FRAME 2 → hovering No runs away
noBtn.addEventListener("mouseenter", () => {
  if (frame === 2) moveNoButton();
});

// Mobile touch also runs away
noBtn.addEventListener("touchstart", (e) => {
  if (frame === 2) {
    e.preventDefault();
    moveNoButton();
  }
}, { passive: false });

// YES → Frame 3
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

// Replay
againBtn.addEventListener("click", () => {
  celebrate.classList.add("hidden");
  card.classList.remove("hidden");

  // reset to frame 1
  frame = 1;
  hintText.innerText = "";
  noBtn.classList.remove("runaway");

  // reset No position
  noBtn.style.left = "55%";
  noBtn.style.top = "90px";
  noBtn.style.transform = "none";
});

// falling hearts animation
const style = document.createElement("style");
style.innerHTML = `
@keyframes fall {
  to {
    transform: translateY(110vh) rotate(360deg);
    opacity: 0;
  }
}`;
document.head.appendChild(style);
