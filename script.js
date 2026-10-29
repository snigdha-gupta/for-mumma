const PLAYLIST_URL = "https://open.spotify.com/playlist/7cwUrZZauU7wHY8S4zVrsH?si=522e430a7a4d4a77"; 

const scenes = ["scene-envelope", "scene-letter", "scene-gift", "scene-playlist"];
const envelope = document.getElementById("open-envelope");
const confettiLayer = document.getElementById("confetti-layer");

function showScene(sceneId) {
  scenes.forEach((id) => {
    const scene = document.getElementById(id);
    const isActive = id === sceneId;

    scene.hidden = !isActive;
    scene.classList.toggle("scene-active", isActive);
  });

  // Reset the envelope so it can be opened again.
  if (sceneId === "scene-envelope") {
    envelope.classList.remove("opening");
    envelope.disabled = false;
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

envelope.addEventListener("click", () => {
  envelope.classList.add("opening");
  envelope.disabled = true;

  window.setTimeout(() => {
    showScene("scene-letter");
  }, 650);
});

document.getElementById("reveal-gift").addEventListener("click", () => {
  showScene("scene-gift");
  launchConfetti();
});

document.getElementById("show-playlist").addEventListener("click", () => {
  document.getElementById("playlist-link").href = PLAYLIST_URL;
  showScene("scene-playlist");
});

document.querySelectorAll("[data-back]").forEach((button) => {
  button.addEventListener("click", () => showScene(button.dataset.back));
});

function launchConfetti() {
  confettiLayer.replaceChildren();
  const colors = ["#c87976", "#e4bd9d", "#9aa58a", "#d9b8a4", "#e7d8bd"];
  for (let i = 0; i < 48; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.animationDelay = `${Math.random() * 0.8}s`;
    piece.style.animationDuration = `${2 + Math.random() * 1.5}s`;
    piece.style.transform = `rotate(${Math.random() * 180}deg)`;
    if (i % 3 === 0) piece.style.borderRadius = "50%";
    confettiLayer.appendChild(piece);
  }
  window.setTimeout(() => confettiLayer.replaceChildren(), 4500);
}
