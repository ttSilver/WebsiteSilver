const cursor = document.getElementById("emoji-cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

document.addEventListener("DOMContentLoaded", () => {
  // Slideshow logic
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  showSlide(currentSlide);
  setInterval(nextSlide, 4000);

  // Alle Links mit Hash-Zielen reagieren lassen
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = 'content-' + this.getAttribute('href').replace('#', '');
      document.querySelectorAll('.category-content').forEach(sec => sec.style.display = 'none');
      const target = document.getElementById(targetId);
      if (target) {
        // Set clicked rubrik block as active
        const clickedBlock = this.closest('.block');
        if (clickedBlock) {
          document.querySelectorAll('.block').forEach(b => b.classList.remove('active'));
          clickedBlock.classList.add('active');
        }

        if (targetId === 'content-flex') {
          const flexButtons = document.querySelectorAll('#flex-button-group button');
          const flexGrids = document.querySelectorAll('.flex-set');

          // Reset active button
          flexButtons.forEach((btn, index) => {
            btn.classList.toggle('active', index === 0);
          });

          // Reset visible image set
          flexGrids.forEach(grid => {
            grid.style.display = grid.getAttribute('data-set') === "1" ? 'grid' : 'none';
          });
        }

        if (targetId === 'content-silver') {
          const silverButtons = document.querySelectorAll('#silver-button-group button');
          const silverGrids = document.querySelectorAll('.silver-set');

          silverButtons.forEach((btn, index) => {
            btn.classList.toggle('active', index === 0);
          });

          silverGrids.forEach(grid => {
            grid.style.display = grid.getAttribute('data-set') === "1" ? 'grid' : 'none';
          });
        }

        target.style.display = 'block';
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Optional: Mark clicked category buttons as active
  document.querySelectorAll('.button-group button').forEach(button => {
    button.addEventListener('click', () => {
      const parentGroup = button.closest('.button-group');
      if (parentGroup) {
        parentGroup.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
      }
      button.classList.add('active');
    });
  });

  // Get existing emoji element
  const centerEmoji = document.getElementById('center-emoji');
  centerEmoji.style.display = 'none';

  // Emoji list
  const randomEmojis = ['🎯', '🔥', '💥', '🌈', '💣', '⚡', '🎮', '👾', '✨', '🌀'];

  // Handle button press (mobile + desktop)
  const leftButton = document.querySelector('.buttons .button:first-child');
  if (leftButton) {
    const showEmoji = (e) => {
      if (e.cancelable) e.preventDefault();
      const emoji = randomEmojis[Math.floor(Math.random() * randomEmojis.length)];
      centerEmoji.textContent = emoji;
      centerEmoji.style.display = 'block';
    };

    const hideEmoji = () => {
      centerEmoji.style.display = 'none';
    };

    leftButton.addEventListener('mousedown', showEmoji);
    leftButton.addEventListener("touchstart", showEmoji, { passive: true });
    document.addEventListener('mouseup', hideEmoji);
    document.addEventListener('touchend', hideEmoji);
  }

  const rightButton = document.querySelector(".buttons .button-a");
  const rpsEmojis = ['✂️', '🪨', '📄'];
  let rpsIndex = 0;

  if (rightButton) {
    rightButton.addEventListener("mousedown", (e) => {
      if (e.cancelable) e.preventDefault();
      const userEmoji = rpsEmojis[rpsIndex];
      centerEmoji.textContent = userEmoji;
      centerEmoji.style.display = 'block';

      setTimeout(() => {
        const opponentEmoji = rpsEmojis[Math.floor(Math.random() * rpsEmojis.length)];
        centerEmoji.textContent = `${userEmoji} vs ${opponentEmoji}`;
      }, 400);

      rpsIndex = (rpsIndex + 1) % rpsEmojis.length;
    });

    rightButton.addEventListener("touchstart", (e) => {
      if (e.cancelable) e.preventDefault();
      const userEmoji = rpsEmojis[rpsIndex];
      centerEmoji.textContent = `🧍 ${userEmoji}   vs   ${opponentEmoji} 🤖`;
      centerEmoji.style.display = 'block';

      setTimeout(() => {
        const opponentEmoji = rpsEmojis[Math.floor(Math.random() * rpsEmojis.length)];
        centerEmoji.textContent = `${userEmoji} vs ${opponentEmoji}`;
      }, 400);

      rpsIndex = (rpsIndex + 1) % rpsEmojis.length;
    });
  }
});