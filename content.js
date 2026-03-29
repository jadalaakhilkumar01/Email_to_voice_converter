function createVoiceButtons() {
  // Avoid duplicate buttons
  if (document.getElementById("emailVoiceBtn")) return;

  // Create container for vertical alignment
  const container = document.createElement("div");
  container.id = "voiceControlContainer";
  container.style.position = "fixed";
  container.style.bottom = "20px";
  container.style.right = "20px";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "10px";
  container.style.zIndex = "9999";

  // Create Start Button
  const startBtn = document.createElement("button");
  startBtn.id = "emailVoiceBtn";
  startBtn.textContent = "🔊 Read Email";
  startBtn.style.padding = "10px 15px";
  startBtn.style.background = "#03dac5";
  startBtn.style.color = "#000";
  startBtn.style.border = "none";
  startBtn.style.borderRadius = "10px";
  startBtn.style.fontWeight = "bold";
  startBtn.style.cursor = "pointer";

  // Create Pause Button
  const pauseBtn = document.createElement("button");
  pauseBtn.id = "pauseVoiceBtn";
  pauseBtn.textContent = "⏸ Pause";
  pauseBtn.style.padding = "10px 15px";
  pauseBtn.style.background = "#ffb300";
  pauseBtn.style.color = "#000";
  pauseBtn.style.border = "none";
  pauseBtn.style.borderRadius = "10px";
  pauseBtn.style.fontWeight = "bold";
  pauseBtn.style.cursor = "pointer";

  // Create Stop Button
  const stopBtn = document.createElement("button");
  stopBtn.id = "stopVoiceBtn";
  stopBtn.textContent = "⏹ Stop";
  stopBtn.style.padding = "10px 15px";
  stopBtn.style.background = "#ff5252";
  stopBtn.style.color = "#fff";
  stopBtn.style.border = "none";
  stopBtn.style.borderRadius = "10px";
  stopBtn.style.fontWeight = "bold";
  stopBtn.style.cursor = "pointer";

  // Add buttons to container
  container.appendChild(startBtn);
  container.appendChild(pauseBtn);
  container.appendChild(stopBtn);
  document.body.appendChild(container);

  let speech;

  // Start Button
  startBtn.addEventListener("click", () => {
    const selectors = [".a3s.aiL", ".a3s", ".ii.gt", ".adn.ads"];
    let emailContent = "";
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (el && el.innerText.trim().length > 0) {
        emailContent = el.innerText.trim();
        break;
      }
    }

    if (!emailContent) {
      alert("⚠️ No email content found. Try opening the email fully.");
      return;
    }

    window.speechSynthesis.cancel();
    speech = new SpeechSynthesisUtterance(emailContent);
    speech.lang = "en-US";
    speech.pitch = 1;
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
  });

  // Pause Button
  pauseBtn.addEventListener("click", () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      pauseBtn.textContent = "▶ Resume";
      pauseBtn.style.background = "#4caf50";
    } else if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      pauseBtn.textContent = "⏸ Pause";
      pauseBtn.style.background = "#ffb300";
    }
  });

  // Stop Button
  stopBtn.addEventListener("click", () => {
    window.speechSynthesis.cancel();
    pauseBtn.textContent = "⏸ Pause";
    pauseBtn.style.background = "#ffb300";
  });
}

// Keep watching Gmail for updates
const observer = new MutationObserver(() => {
  createVoiceButtons();
});
observer.observe(document.body, { childList: true, subtree: true });

// Initial run
createVoiceButtons();
