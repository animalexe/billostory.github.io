
const scenes = [
  {
    image: "mc donald.jpg",
    label: "🍟 THE SNACK MISSION",
    title: "A very important food mission.",
    text: "When delicious snacks are involved, Billo takes the job seriously. Well… mostly."
  },
  {
    image: "Bollo.jpg",
    label: "😻 THE MAIN CHARACTER",
    title: "Too cute to stay out of trouble.",
    text: "One curious look, two tiny paws, and somehow the whole room is Billo's playground."
  },
  {
    image: "billo home.JPG",
    label: "🏡 HOME SWEET HOME",
    title: "A little rest before the next adventure.",
    text: "Even the busiest little adventurers need a cozy place to recharge and dream big."
  }
];

const image = document.getElementById("adventureImage");
const label = document.getElementById("sceneLabel");
const title = document.getElementById("sceneTitle");
const text = document.getElementById("sceneText");
const number = document.getElementById("sceneNumber");
const countdown = document.getElementById("countdown");
const progress = document.querySelectorAll("#sceneProgress span");
const feature = document.getElementById("adventureFeature");

let currentScene = 0;
let secondsLeft = 8;
let timer;
let isPaused = false;

function showScene(index) {
  currentScene = (index + scenes.length) % scenes.length;
  const scene = scenes[currentScene];

  image.classList.add("changing");

  window.setTimeout(() => {
    image.src = scene.image;
    image.alt = scene.title;
    label.textContent = scene.label;
    title.textContent = scene.title;
    text.textContent = scene.text;
    number.textContent =
      `STORY ${String(currentScene + 1).padStart(2, "0")} / ${String(scenes.length).padStart(2, "0")}`;

    progress.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentScene);
    });

    image.classList.remove("changing");
  }, 180);

  resetCountdown();
}

function resetCountdown() {
  secondsLeft = 8;
  countdown.textContent = secondsLeft;
}

function startTimer() {
  window.clearInterval(timer);

  timer = window.setInterval(() => {
    if (isPaused || document.hidden) return;

    secondsLeft -= 1;
    countdown.textContent = secondsLeft;

    if (secondsLeft <= 0) {
      showScene(currentScene + 1);
    }
  }, 1000);
}

document.getElementById("nextScene").addEventListener("click", () => {
  showScene(currentScene + 1);
});

document.getElementById("prevScene").addEventListener("click", () => {
  showScene(currentScene - 1);
});

// Pause the automatic slideshow while the visitor interacts with it.
feature.addEventListener("mouseenter", () => {
  isPaused = true;
});

feature.addEventListener("mouseleave", () => {
  isPaused = false;
});

feature.addEventListener("focusin", () => {
  isPaused = true;
});

feature.addEventListener("focusout", (event) => {
  if (!feature.contains(event.relatedTarget)) {
    isPaused = false;
  }
});

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector(".navbar nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Reveal elements when they enter the screen.
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Start the 8-second story animation.
showScene(0);
startTimer();
