let current = 0;

const viewer = document.getElementById("viewer");
const videoPlayer = document.getElementById("videoPlayer");
const audioPlayer = document.getElementById("audioPlayer");

function loadStep(index) {
  const step = flow[index];
  if (!step) return;

  // Reset views
  viewer.classList.add("hidden");
  videoPlayer.classList.add("hidden");
  videoPlayer.pause();

  // Figma screen
  if (step.type === "figma") {
    viewer.src = step.url;
    viewer.classList.remove("hidden");

    if (step.audio) {
      audioPlayer.src = step.audio;
      audioPlayer.play().catch(() => {
        console.log("Audio play blocked (requires user interaction).");
      });
    }

  // Video reward screen
  } else if (step.type === "video") {
    videoPlayer.src = step.url;
    videoPlayer.classList.remove("hidden");
    videoPlayer.play().catch(() => {
      console.log("Video play blocked (requires user interaction).");
    });
  }
}

// Tap anywhere to go to the next screen
document.body.addEventListener("click", () => {
  current++;
  loadStep(current);
});

// Load the first step on page load
window.onload = () => loadStep(current);