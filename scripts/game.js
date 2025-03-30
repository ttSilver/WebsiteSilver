document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('intro-canvas');
    if (!canvas) {
      console.warn("Canvas not found!");
      return;
    }
    
    canvas.style.display = 'none';

    // 2D-Kontext anlegen
    const ctx = canvas.getContext('2d');

    // Einfacher Text & Emoji-Array
    const text = "AINWORKS INITIATING...";
    const emojis = [];
  
    /**
     * Zeichnet den Intro-Text und alle Emojis neu.
     */
    function drawIntro() { 
      
      // Canvas leeren
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.save(); // Speichert den aktuellen Zustand
  
      // AINWORKS-Text
      ctx.fillStyle = '#ffffff';
      ctx.font = '30px VT323';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      // Zentriert den Text
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  
      // Emojis größer zeichnen
      emojis.forEach(({ symbol, x, y, size }) => {
        ctx.font = `${size}px sans-serif`;
        ctx.fillText(symbol, x, y);
      });
      
      ctx.restore(); // Stellt den vorherigen Zustand wieder her
    }
  
    // Falls Darkmode schon aktiv ist, einmal zeichnen
    if (document.body.classList.contains('dark-mode')) {
      drawIntro();
    }

    const observer = new MutationObserver(() => {
      if (document.body.classList.contains('dark-mode')) {
        canvas.style.display = 'block';
        drawIntro();
      } else {
        canvas.style.display = 'none';
      }
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  
    /**
     * Wenn du Darkmode beim Klick auf .btn-start aktivierst und den Text
     * dann erst anzeigen willst, kannst du so etwas ergänzen:
     */
    const startButton = document.querySelector('.btn-start');
    if (startButton) {
      startButton.addEventListener('click', () => {
        if (document.body.classList.contains('dark-mode')) {
          canvas.style.display = 'block';
          drawIntro();
        }
      });
    }
  
    // ------ LINKER BUTTON (Emoji) ------
    // Holen wir uns den Button mit dem Emoji
    const leftButton = document.querySelector('.left-button');
    if (leftButton) {
      leftButton.addEventListener('click', () => {
        // Nimm den aktuellen Text (bzw. Emoji) des Buttons
        const emojiChar = leftButton.textContent.trim();
        // Wähle eine zufällige Stelle im Canvas
        const randomX = Math.random() * canvas.width;
        const randomY = Math.random() * canvas.height;
        const randomSize = 20 + Math.random() * 60; // zwischen 20px und 80px
  
        // Speichere das Emoji + Koordinaten
        emojis.push({ symbol: emojiChar, x: randomX, y: randomY, size: randomSize });
        // Neu zeichnen
        drawIntro();
      });
    }
  });