// Zeigt Emoji in der Mitte an
export function showEmoji(emoji) {
    const center = document.getElementById("center-emoji");
    if (center) {
      center.textContent = emoji;
      center.style.display = "block";
    }
  }
  
  // Versteckt Emoji
  export function hideEmoji() {
    const center = document.getElementById("center-emoji");
    if (center) center.style.display = "none";
  }
  
  // Spielt zufälligen Sound ab
  export function playRandomSound() {
    const sounds = [
      "audio/sound2.mp3",
      "audio/sound3.mp3",
      "audio/sound4.mp3",
      "audio/sound5.mp3",
      "audio/sound6.mp3"
    ];
    const src = sounds[Math.floor(Math.random() * sounds.length)];
    const audio = new Audio(src);
    audio.play();
  }