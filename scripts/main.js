    document.addEventListener("DOMContentLoaded", () => {
        
      // Auto-scale canvas for high DPI displays
      const canvas = document.getElementById('intro-canvas');
      let ctx = null;
      const text = "AINWORKS INITIATING...";
      const drawnEmojis = [];
      if (canvas) {
        ctx = canvas.getContext('2d');
      }
      if (canvas) {
        const size = Math.min(window.innerWidth, window.innerHeight);
        canvas.width = size;
        canvas.height = size;
        canvas.style.width = size + 'px';
        canvas.style.height = size + 'px';
        ctx = canvas.getContext('2d');
      }
      const passwordOverlay = document.getElementById('password-overlay');
      
     document.querySelector('.btn-select').addEventListener('click', () => {
        passwordOverlay.style.display = 'flex';
        document.getElementById('digit-1').focus();
      }); 

      const correctKey = "555-3215";
      const audioFiles = [
        "audio/sound2.mp3",
        "audio/sound3.mp3",
        "audio/sound4.mp3",
        "audio/sound5.mp3",
        "audio/sound6.mp3",
        "audio/sound7.mp3"
      ];
      let audioEffect = new Audio();

      document.getElementById('password-submit').addEventListener('click', () => {
        const digits = [];
        for (let i = 1; i <= 7; i++) {
          digits.push(document.getElementById(`digit-${i}`).value.trim());
        }
        const enteredKey = `${digits.slice(0,3).join('')}-${digits.slice(3).join('')}`;
              for (let i = 1; i <= 7; i++) {
                document.getElementById(`digit-${i}`).value = '';
              }
              if (enteredKey === correctKey) {
        passwordOverlay.style.display = 'none';
        const feedback = document.getElementById('key-feedback');
        feedback.textContent = 'KEY ACCEPTED!';
        feedback.classList.add('success');
        feedback.style.display = 'block';
        setTimeout(() => {
          feedback.style.display = 'none';
          feedback.classList.remove('success');
        }, 1500);
      } else {
        passwordOverlay.style.display = 'none';
        const feedback = document.getElementById('key-feedback');
        for (let i = 1; i <= 7; i++) {
          document.getElementById(`digit-${i}`).value = '';
        }
        feedback.textContent = 'WRONG KEY';
        feedback.classList.remove('success');
        feedback.style.display = 'block';
        setTimeout(() => {
          feedback.style.display = 'none';
        }, 1500);
      }
      });

      document.getElementById('password-cancel').addEventListener('click', () => {
        passwordOverlay.style.display = 'none';
      });

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

      // Navigation verarbeiten
      document.querySelectorAll('.block').forEach((block, index) => {
        block.addEventListener('click', function() {
          document.querySelectorAll('.block').forEach(b => b.classList.remove('active'));
          this.classList.add('active');
          
          const targetId = 'content-' + this.getAttribute('data-target');
          document.querySelectorAll('.category-content').forEach(sec => sec.style.display = 'none');
          const target = document.getElementById(targetId);
          if (target) {
            target.style.display = 'block';
            document.querySelector('.divider').scrollIntoView({ behavior: 'smooth' });
    
            if (targetId === 'content-flex') {
              const flexButtons = document.querySelectorAll('#flex-button-group button');
              const flexGrids = document.querySelectorAll('.flex-set');
    
              flexButtons.forEach(btn => btn.classList.remove('active'));
              flexButtons[0]?.classList.add('active');
    
              flexGrids.forEach(grid => {
                grid.style.display = 'none';
              });
              const activeFlex = document.querySelector('.flex-set[data-set="1"]');
              if (activeFlex) activeFlex.style.display = 'grid';
            }
            
            if (targetId === 'content-housing') {
              const housingButtons = document.querySelectorAll('#housing-button-group button');
              const housingGrids = document.querySelectorAll('.housing-set');
    
              housingButtons.forEach(btn => btn.classList.remove('active'));
              housingButtons[0]?.classList.add('active');
    
              housingGrids.forEach(grid => {
                grid.style.display = 'none';
              });
              const activeHousing = document.querySelector('.housing-set[data-set="1"]');
              if (activeHousing) activeHousing.style.display = 'grid';
            }
            
            if (targetId === 'content-silver') {
              const silverButtons = document.querySelectorAll('#silver-button-group button');
              const silverGrids = document.querySelectorAll('.silver-set');
    
              silverButtons.forEach(btn => btn.classList.remove('active'));
              silverButtons[0]?.classList.add('active');
    
              silverGrids.forEach(grid => {
                grid.style.display = 'none';
              });
              const activeSilver = document.querySelector('.silver-set[data-set="1"]');
              if (activeSilver) activeSilver.style.display = 'grid';
            }
            
            if (targetId === 'content-docking') {
              const dockingGrids = document.querySelectorAll('.docking-set');
              dockingGrids.forEach(grid => {
                grid.style.display = 'grid';
              });
            }
          }
        });
      });

      // Rubrik-Button-Interaktion
      document.querySelectorAll('.rubrik-button').forEach(button => {
        button.addEventListener('click', (e) => {
          e.stopPropagation();
          document.querySelectorAll('.block').forEach(b => b.classList.remove('active'));
          button.closest('.block').classList.add('active');
        });
      });

      // Buttons in FLEX verarbeiten
      document.querySelectorAll('#flex-button-group button').forEach(button => {
        button.addEventListener('click', () => {
          const setId = button.getAttribute('data-set');
          document.querySelectorAll('.flex-set').forEach(grid => {
            grid.style.display = (grid.getAttribute('data-set') === setId) ? 'grid' : 'none';
          });

          const flexButtons = document.querySelectorAll('#flex-button-group button');
          flexButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
        });
      });

      // Buttons in HOUSING verarbeiten
      document.querySelectorAll('#housing-button-group button').forEach(button => {
        button.addEventListener('click', () => {
          const setId = button.getAttribute('data-set');
          document.querySelectorAll('.housing-set').forEach(grid => {
            grid.style.display = (grid.getAttribute('data-set') === setId) ? 'grid' : 'none';
          });
 
          const housingButtons = document.querySelectorAll('#housing-button-group button');
          housingButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
        });
      });

      // Buttons in SILVER verarbeiten
      document.querySelectorAll('#silver-button-group button').forEach(button => {
        button.addEventListener('click', () => {
          const setId = button.getAttribute('data-set');
          document.querySelectorAll('.silver-set').forEach(grid => {
            grid.style.display = (grid.getAttribute('data-set') === setId) ? 'grid' : 'none';
          });

          const silverButtons = document.querySelectorAll('#silver-button-group button');
          silverButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
        });
      });

      const emoji = document.getElementById("center-emoji");
      const leftButton = document.querySelector(".left-button");
      const dpad = document.querySelector('.dpad');

      const randomEmojis = ['🐉','💾','🍓','💳', '🦖','🩸', '🍫','🛒','🧇','🦧','🧀','🧈','🫳','🪰','🍄','🤌','🪈','📟','🈂️','🪦','🌋'];
      const rpsEmojis = ['✂️', '🪨', '📄'];
      const runningEmojis = {
       /* left: '◀',
        right: '▶',
        */up: '',
        down: ''
      };

      let rpsIndex = 0;

      const rightButton = document.querySelector(".button-a");

      function handleRightPress(e) {
        if (e.cancelable) e.preventDefault();
        const randomFile = audioFiles[Math.floor(Math.random() * audioFiles.length)];
        audioEffect.src = randomFile;
        audioEffect.currentTime = 0;
        audioEffect.play();
      }

      rightButton.addEventListener("mousedown", handleRightPress);
      rightButton.addEventListener("touchstart", handleRightPress);

      // Universal handlers
      function showEmoji(text) {
        emoji.textContent = text;
        emoji.style.display = "block";
      }

      function hideEmoji() {
        emoji.style.display = "none";
      }

      document.getElementById('password-cancel').addEventListener('click', () => {
        passwordOverlay.style.display = 'none';
      });

      //start Button 
      document.querySelector('.btn-start').addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const startSound = document.getElementById('start-sound');
        startSound.currentTime = 0;
        startSound.play();
        if (document.body.classList.contains('dark-mode')) {
          drawIntro();
        }
      });

      // Left Button
      function handleLeftPress(e) {
        e.preventDefault();
        const emojiChar = randomEmojis[Math.floor(Math.random() * randomEmojis.length)];
        showEmoji(emojiChar);
      
        if (canvas && ctx) {
          const rect = canvas.getBoundingClientRect();
          const x = Math.random() * rect.width;
          const y = Math.random() * rect.height;
          const size = 20 + Math.random() * 60;
          drawnEmojis.push({ symbol: emojiChar, x, y, size });
          drawIntro();
        }
      }

      leftButton.addEventListener("mousedown", handleLeftPress);
      leftButton.addEventListener("touchstart", handleLeftPress);
      document.addEventListener("mouseup", hideEmoji);
      document.addEventListener("touchend", hideEmoji);
      
      // D-pad Navigation (links/rechts für Rubriken, oben/unten für Subrubriken)
      const blocks = document.querySelectorAll('.block');
      let currentRubrik = 0;
      
      function updateRubrik(index) {
          currentRubrik = index;
          document.querySelectorAll('.block').forEach(b => b.classList.remove('active'));
          blocks[index].classList.add('active');
          const targetId = 'content-' + blocks[index].getAttribute('data-target');
          document.querySelectorAll('.category-content').forEach(sec => sec.style.display = 'none');
          const target = document.getElementById(targetId);
          if (target) {
            target.style.display = 'block';
            document.querySelector('.divider').scrollIntoView({ behavior: 'smooth' });
            if (targetId === 'content-flex') {
              const flexButtons = document.querySelectorAll('#flex-button-group button');
              const flexGrids = document.querySelectorAll('.flex-set');
              flexButtons.forEach(btn => btn.classList.remove('active'));
              flexButtons[0]?.classList.add('active');
              flexGrids.forEach(grid => {
                grid.style.display = 'none';
              });
              const activeFlex = document.querySelector('.flex-set[data-set="1"]');
              if (activeFlex) activeFlex.style.display = 'grid';
            }
            if (targetId === 'content-housing') {
              const housingButtons = document.querySelectorAll('#housing-button-group button');
              const housingGrids = document.querySelectorAll('.housing-set');
              housingButtons.forEach(btn => btn.classList.remove('active'));
              housingButtons[0]?.classList.add('active');
              housingGrids.forEach(grid => {
                grid.style.display = 'none';
              });
              const activeHousing = document.querySelector('.housing-set[data-set="1"]');
              if (activeHousing) activeHousing.style.display = 'grid';
            }
            if (targetId === 'content-silver') {
              const silverButtons = document.querySelectorAll('#silver-button-group button');
              const silverGrids = document.querySelectorAll('.silver-set');
              silverButtons.forEach(btn => btn.classList.remove('active'));
              silverButtons[0]?.classList.add('active');
              silverGrids.forEach(grid => {
                grid.style.display = 'none';
              });
              const activeSilver = document.querySelector('.silver-set[data-set="1"]');
              if (activeSilver) activeSilver.style.display = 'grid';
            }
          }
        }
      
      function handleDpadPress(e) {
        e.preventDefault();
        const bounds = dpad.getBoundingClientRect();
        const x = (e.touches ? e.touches[0].clientX : e.clientX) - bounds.left;
        const y = (e.touches ? e.touches[0].clientY : e.clientY) - bounds.top;
      
        const centerX = bounds.width / 2;
        const centerY = bounds.height / 2;
      
        const dx = x - centerX;
        const dy = y - centerY;
      
        let direction;
        if (Math.abs(dx) > Math.abs(dy)) {
          direction = dx < 0 ? 'left' : 'right';
        } else {
          direction = dy < 0 ? 'up' : 'down';
        }
      
        showEmoji(runningEmojis[direction]);
        
        if (direction === 'left' || direction === 'right') {
          currentRubrik = direction === 'right'
            ? (currentRubrik + 1) % blocks.length
            : (currentRubrik - 1 + blocks.length) % blocks.length;

          updateRubrik(currentRubrik);
          drawIntro();
        }
      
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
      }
      dpad.addEventListener("mousedown", handleDpadPress);
      dpad.addEventListener("touchstart", handleDpadPress);
      
      // Autofocus and auto-tab between password fields
      document.querySelectorAll('.password-input-group input').forEach((input, index, inputs) => {
        input.addEventListener('input', () => {
          if (input.value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
          }
        });
      
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Backspace' && input.value === '' && index > 0) {
            inputs[index - 1].focus();
          }
        });
      });

      // drawIntro: Render centered, sharp intro text and drawn emojis on the canvas
      function drawIntro() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      
        ctx.save(); // Zustand speichern
      
        ctx.fillStyle = '	#0f380f';
        ctx.font = '30px VT323';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        // Zentrierter Text
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);
      
        // Emojis weiterhin zufällig im Canvas
        drawnEmojis.forEach(({ symbol, x, y, size }) => {
          ctx.font = `${size}px sans-serif`;
          ctx.fillText(symbol, x, y);
        });
      
        ctx.restore(); // Zustand wiederherstellen
      }
      drawIntro();

      // Burger-Menü aktivieren
      const burger = document.getElementById("burger-menu");
      const mobileNav = document.getElementById("mobile-nav");
      
      if (burger && mobileNav) {
        burger.addEventListener("click", () => {
          const isOpen = mobileNav.style.display === "flex";
          mobileNav.style.display = isOpen ? "none" : "flex";
        });
      
        document.querySelectorAll(".mobile-nav-list li").forEach(item => {
          item.addEventListener("click", () => {
            const targetId = 'content-' + item.getAttribute('data-target');
            document.querySelectorAll('.category-content').forEach(sec => sec.style.display = 'none');
            const target = document.getElementById(targetId);
            if (target) {
              target.style.display = 'block';
              document.querySelector('.divider')?.scrollIntoView({ behavior: 'smooth' });
              mobileNav.style.display = 'none';
            }
          });
        });
      }
    });
  