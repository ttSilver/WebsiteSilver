document.addEventListener("DOMContentLoaded", () => {
  // Slideshow
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
  }

  showSlide(currentSlide);
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 4000);

  // Rubrikenauswahl mit Scroll
  document.querySelectorAll('.block').forEach(block => {
    block.addEventListener('click', function() {
      document.querySelectorAll('.block').forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const targetId = 'content-' + this.getAttribute('data-target');
      document.querySelectorAll('.category-content').forEach(sec => sec.style.display = 'none');
      const target = document.getElementById(targetId);
      if (target) {
        target.style.display = 'block';
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Rubrik-Buttons (Subkategorien)
  document.querySelectorAll('.button-group button').forEach(button => {
    button.addEventListener('click', () => {
      const group = button.parentElement;
      group.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const targetSet = button.getAttribute('data-set');
      const imageGrids = group.parentElement.querySelectorAll('.image-grid');
      imageGrids.forEach(grid => {
        grid.style.display = grid.getAttribute('data-set') === targetSet ? 'grid' : 'none';
      });
    });
  });

  // Gameboy-Emoji-Steuerung (vereinfacht)
  const emoji = document.getElementById("center-emoji");
  const leftButton = document.querySelector(".button-b");
  const rightButton = document.querySelector(".button-a");
  const dpad = document.querySelector('.dpad');

  const randomEmojis = ['🪙','🐉','💾','🍓','🍋','🥊','💳','🍒','🦖','🔦','🩸','🍫','🎃','🛒','🧇','🦧','🧀','🧈','🫳','🪰','🍰','🍄','🤌','🪈','🪃','🈂️','🛖','🪦','🛢️'];
  const rpsEmojis = ['✂️', '🪨', '📄'];
  const runningEmojis = { left: '◀', right: '▶', up: '▲', down: '▼' };

  let rpsIndex = 0;

  function showEmoji(text) {
    emoji.textContent = text;
    emoji.style.display = "block";
  }

  function hideEmoji() {
    emoji.style.display = "none";
  }

  leftButton.addEventListener("mousedown", e => {
    e.preventDefault();
    showEmoji(randomEmojis[Math.floor(Math.random() * randomEmojis.length)]);
  });

  rightButton.addEventListener("mousedown", e => {
    e.preventDefault();
    const userEmoji = rpsEmojis[rpsIndex];
    showEmoji(userEmoji);
    rpsIndex = (rpsIndex + 1) % rpsEmojis.length;

    setTimeout(() => {
      const botEmoji = rpsEmojis[Math.floor(Math.random() * rpsEmojis.length)];
      showEmoji(`${userEmoji}\nvs\n${botEmoji}`);
    }, 500);
  });

  dpad.addEventListener("mousedown", e => {
    e.preventDefault();
    const bounds = dpad.getBoundingClientRect();
    const dx = e.clientX - bounds.left - bounds.width / 2;
    const dy = e.clientY - bounds.top - bounds.height / 2;

    const direction = Math.abs(dx) > Math.abs(dy)
      ? (dx < 0 ? 'left' : 'right')
      : (dy < 0 ? 'up' : 'down');

    showEmoji(runningEmojis[direction]);

    if (direction === 'up' || direction === 'down') {
      const activeSection = document.querySelector('.category-content[style*="block"]');
      const group = activeSection?.querySelector('.button-group');
      const buttons = group?.querySelectorAll('button');
      const activeBtn = group?.querySelector('button.active');
      if (buttons && activeBtn) {
        const index = Array.from(buttons).indexOf(activeBtn);
        let nextIndex = direction === 'down'
          ? (index + 1) % buttons.length
          : (index - 1 + buttons.length) % buttons.length;
        buttons[nextIndex].click();
      }
    }
  });

  document.addEventListener("mouseup", hideEmoji);
});