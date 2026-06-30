
// Letter Content Sections precisely matching user input
const letterParts = [
  // SECTION 1
  `Before you, I had no reason to look forward to anything.
I just lived with whatever came my way.
But after you…
I started enjoying myself.
I started treating myself as someone special.
Because you made me feel that way.
I began noticing every little thing —
a song, a moment, a coincidence, a smile…
and somehow, all of them reminded me of you.
Every single one came from somewhere deep inside me.
You were never just a part of my life.
You were the reason I could feel my feelings fully.
You were the reason life felt beautiful —
not just within family…
but beyond it too.`,

  // SECTION 2
  `But something happened between us.
Something that was never in my hands.
And even then…
not even one percent of what I feel for you changed.
I accepted your decision.
I moved on from you.
But my feelings?
They never left.
They are still here.
And they will be, till the very end.
Because I dont no how to forget 
And there is no issue with that feelings 
when i remember i will be little more happier not sad and i dont feel like something i missed `,

  // SECTION 3
  `Please don't feel sad.


Don't carry any guilt.
Because even after all these years…
you are still the reason I know how to respect a girl.
You are the reason I know how to face a heartbreak with a calm face.
You are the reason I learned to smile in the toughest phases of life.
You are the reason I learned to find a way,
even when everything was against me.
You are the reason I discovered how much patience I truly have.
And I feel so lucky…
that I learned all of this so early in life.
It made me stronger than I ever imagined.
After all these years,
I am genuinely happy.
Happy that you played the most beautiful role in my life.

So please…
change how you see this.
Be happy.
Without any regrets.
Because all those reasons…

all of them lead to one thing —
You are tpr`
];

// Initialize global objects and state variables

let currentPartIndex = 0;
let isTyping = false;
let skipTyping = false;
let typeInterval = null;

// Generate twinkling stars in the background
function createStarfield() {
  const starfield = document.getElementById('starfield');
  const count = window.innerWidth < 768 ? 70 : 130;

  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';

    const size = Math.random() * 2 + 1; // size between 1px and 3px
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const delay = Math.random() * 6;
    const duration = Math.random() * 4 + 3; // duration 3s to 7s
    const opacity = Math.random() * 0.5 + 0.3;

    // Stagger color highlights
    const colorChance = Math.random();
    let glowColor = '#ffffff';
    if (colorChance < 0.15) glowColor = 'var(--gold-accent)'; // amber/gold twinkling star
    else if (colorChance < 0.30) glowColor = '#add8e6'; // soft ice blue star

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    star.style.setProperty('--delay', `${delay}s`);
    star.style.setProperty('--duration', `${duration}s`);
    star.style.setProperty('--base-opacity', opacity);
    star.style.setProperty('--star-glow', glowColor);

    if (glowColor !== '#ffffff') {
      star.style.backgroundColor = glowColor;
    }

    starfield.appendChild(star);
  }
}

// Custom line-by-line, word-paced typewriter engine
function startTypewriter(container, text, onComplete) {
  isTyping = true;
  skipTyping = false;
  container.innerHTML = '';

  // Create animated text cursor
  const cursor = document.createElement('span');
  cursor.className = 'cursor';

  // Parse sections by double newlines into blocks (paragraphs)
  const paragraphs = text.split('\n\n');
  let currentParagraphIdx = 0;

  // Set up skip callback
  const mainPaper = document.getElementById('letter-container');
  const skipHandler = () => {
    if (isTyping && !skipTyping) {
      skipTyping = true;
    }
  };
  mainPaper.addEventListener('click', skipHandler);

  function typeParagraph() {
    if (currentParagraphIdx >= paragraphs.length || skipTyping) {
      if (skipTyping) {
        renderInstant(container, paragraphs);
      }
      container.appendChild(cursor);
      cursor.classList.remove('hidden');
      isTyping = false;
      mainPaper.removeEventListener('click', skipHandler);
      if (onComplete) onComplete();
      return;
    }

    const blockText = paragraphs[currentParagraphIdx];

    // Check if the paragraph is the horizontal divider '---'
    if (blockText.trim() === '---') {
      const hr = document.createElement('hr');
      hr.className = 'letter-divider';
      container.appendChild(hr);
      currentParagraphIdx++;
      setTimeout(typeParagraph, 800);
      return;
    }

    const p = document.createElement('p');
    container.appendChild(p);
    p.appendChild(cursor);

    let charIndex = 0;

    function typeChar() {
      if (skipTyping) {
        typeParagraph();
        return;
      }

      if (charIndex >= blockText.length) {
        // Paragraph finished typing
        currentParagraphIdx++;
        setTimeout(typeParagraph, 600); // delay before next paragraph
        return;
      }

      const char = blockText[charIndex];

      if (char === '\n') {
        const br = document.createElement('br');
        p.insertBefore(br, cursor);
      } else {
        const textNode = document.createTextNode(char);
        p.insertBefore(textNode, cursor);
      }

      charIndex++;

      // Calculate dynamic pacing delays
      let delay = 35;
      if (char === ' ') delay = 75; // pause between words
      else if (['.', '?', '!'].includes(char)) delay = 750; // reflection pause
      else if ([',', '—', '…'].includes(char)) delay = 450; // soft pause

      typeInterval = setTimeout(typeChar, delay);

      // Keep scroll anchored to bottom during active typewriter
      const scrollWrapper = document.getElementById('letter-content');
      scrollWrapper.scrollTop = scrollWrapper.scrollHeight;
    }

    typeChar();
  }

  typeParagraph();
}

// Instant completion renderer
function renderInstant(container, paragraphs) {
  if (typeInterval) clearTimeout(typeInterval);
  container.innerHTML = '';

  paragraphs.forEach(block => {
    if (block.trim() === '---') {
      const hr = document.createElement('hr');
      hr.className = 'letter-divider';
      container.appendChild(hr);
    } else {
      const p = document.createElement('p');
      p.innerHTML = block.replace(/\n/g, '<br>');
      container.appendChild(p);
    }
  });
}

// Romantic golden petal shower generator
function startPetalShower() {
  const container = document.body;
  const petalCount = 45;

  for (let i = 0; i < petalCount; i++) {
    createSinglePetal(container);
  }
}

function createSinglePetal(parent) {
  const petal = document.createElement('div');
  petal.className = 'climax-petal';

  const size = Math.random() * 8 + 8; // 8px to 16px
  const startX = Math.random() * 100; // 0% to 100% viewport width
  const delay = Math.random() * 10; // delay up to 10s for slow onset
  const duration = Math.random() * 6 + 6; // 6s to 12s fall time
  const drift = (Math.random() * 180 - 90) + 'px'; // horizontal wind drift
  const rotate = (Math.random() * 720 - 360) + 'deg'; // random rotation

  petal.style.width = `${size}px`;
  petal.style.height = `${size * 0.7}px`;
  petal.style.left = `${startX}%`;
  petal.style.animationDelay = `${delay}s`;
  petal.style.setProperty('--fall-duration', `${duration}s`);
  petal.style.setProperty('--wind-drift', drift);
  petal.style.setProperty('--rotation', rotate);

  // Randomize styling variant
  if (Math.random() < 0.25) {
    petal.style.background = 'linear-gradient(135deg, var(--gold-accent), #ffffff)';
    petal.style.boxShadow = '0 0 12px rgba(255, 255, 255, 0.65)';
  }

  parent.appendChild(petal);
}

function stopPetalShower() {
  const petals = document.querySelectorAll('.climax-petal');
  petals.forEach(p => p.remove());
}



// Setup Envelope Interaction
document.addEventListener('DOMContentLoaded', () => {
  createStarfield();

  const envelopeWrapper = document.getElementById('envelope-wrapper');
  const envelope = document.getElementById('envelope');
  const paperContainer = document.getElementById('letter-container');
  const textBox = document.getElementById('text-box');
  const nextBtn = document.getElementById('next-btn');

  // Mute control setup
  const muteBtn = document.getElementById('mute-btn');
  const muteIcon = document.getElementById('mute-icon');
  let isMuted = false;

  // Audio setup
  const bgAudio = new Audio('New Project (1).mp3');
  bgAudio.volume = 0.6; // Gentle volume for background music

  // Custom looping behavior: first time full, then repeat leaving first 10s
  bgAudio.addEventListener('ended', () => {
    bgAudio.currentTime = 10;
    bgAudio.play().catch(error => {
      console.warn("Audio replay failed:", error);
    });
  });

  const unmutePath = "M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.85 14,18.7V20.77C18.07,19.86 21,16.28 21,12C21,7.72 18.07,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.77 16.5,12M3,9V15H7L12,20V4L7,9H3Z";
  const mutePath = "M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.44 16.63,19.78 17.7,18.9L20.73,21.93L22,20.66L12.34,11L4.27,3M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18.07,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.48,12.43 16.5,12.22 16.5,12Z";

  muteBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    bgAudio.muted = isMuted;

    // Update SVG icon path
    const path = muteIcon.querySelector('path');
    if (path) {
      path.setAttribute('d', isMuted ? mutePath : unmutePath);
    }

    // Accessibility label
    muteBtn.setAttribute('aria-label', isMuted ? 'Unmute Sound' : 'Mute Sound');
  });

  // --- Verification Gate Logic ---
  const gate = document.getElementById('verification-gate');
  const gateInput = document.getElementById('gate-input');
  const gateError = document.getElementById('gate-error');
  const gateContent = gate.querySelector('.gate-content');

  // Focus the input field on load
  if (gateInput) {
    setTimeout(() => gateInput.focus(), 300);
  }

  const gateForm = document.getElementById('gate-form');
  gateForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page reload
    const value = gateInput.value.trim().toLowerCase();

    if (value === 'tpr') {
      // Unlock
      gateError.classList.remove('show');
      gate.classList.add('unlocked');
      
      // Reveal envelope and mute button
      setTimeout(() => {
        envelopeWrapper.classList.remove('locked');
        muteBtn.classList.add('show');
      }, 300);
    } else {
      // Incorrect: show mysterious space message
      gateError.textContent = "This letter is traveling through the cosmos to find its true destination. It is not meant for you.";
      gateError.classList.add('show');

      // Shake animation feedback
      gateContent.classList.add('gate-shake');
      setTimeout(() => {
        gateContent.classList.remove('gate-shake');
      }, 500);

      // Clear input to allow typing again
      gateInput.value = '';
    }
  });

  // Refocus input if clicking the screen
  gate.addEventListener('click', () => {
    gateInput.focus();
  });

  // Tactile Drag-to-Open Wax Seal Setup
  const waxSeal = document.getElementById('wax-seal');
  let isDragging = false;
  let startY = 0;
  const dragThreshold = 80;

  // Open envelope trigger
  function openEnvelope() {
    if (envelope.classList.contains('open')) return;

    envelope.classList.add('open');

    // Play background audio
    bgAudio.play().catch(error => {
      console.warn("Audio playback was blocked or failed:", error);
    });

    // Slide out preview letter, then fade transition to the full paper
    setTimeout(() => {
      envelopeWrapper.classList.add('hidden');

      setTimeout(() => {
        paperContainer.classList.add('show');

        // Start typing Part 1
        setTimeout(() => {
          typeSection(0);
        }, 1000);

      }, 600);
    }, 1200);
  }

  // Pointer drag event handlers
  function startDrag(e) {
    if (envelope.classList.contains('open')) return;

    isDragging = true;
    startY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : e.clientY);
    waxSeal.classList.add('dragging');

    // Prevent default touch scroll or text highlight
    if (e.cancelable) e.preventDefault();
  }

  function dragMove(e) {
    if (!isDragging) return;

    const currentY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : e.clientY);
    let deltaY = currentY - startY;

    // Restrict to downward movement only
    if (deltaY < 0) deltaY = 0;
    // Cap displacement at 130px
    if (deltaY > 130) deltaY = 130;

    waxSeal.style.setProperty('--drag-y', `${deltaY}px`);

    // Give visual threshold feedback
    if (deltaY >= dragThreshold) {
      waxSeal.style.borderColor = 'var(--gold-glow)';
      waxSeal.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.7), inset 0 2px 5px rgba(255, 255, 255, 0.2)';
    } else {
      waxSeal.style.borderColor = '';
      waxSeal.style.boxShadow = '';
    }
  }

  function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    waxSeal.classList.remove('dragging');

    // Reset feedback styles
    waxSeal.style.borderColor = '';
    waxSeal.style.boxShadow = '';

    const currentDragY = parseFloat(waxSeal.style.getPropertyValue('--drag-y')) || 0;
    waxSeal.style.removeProperty('--drag-y');

    if (currentDragY >= dragThreshold) {
      openEnvelope();
    }
  }

  // Mouse drag listeners
  waxSeal.addEventListener('mousedown', startDrag);
  window.addEventListener('mousemove', dragMove);
  window.addEventListener('mouseup', endDrag);

  // Mobile touch drag listeners
  waxSeal.addEventListener('touchstart', startDrag, { passive: false });
  window.addEventListener('touchmove', dragMove, { passive: false });
  window.addEventListener('touchend', endDrag);

  // Function to crossfade space gradients (nebula-glow effect)
  function changeNebulaGlow(styleClass) {
    const layer1 = document.getElementById('nebula-1');
    const layer2 = document.getElementById('nebula-2');

    const activeLayer = layer1.classList.contains('active') ? layer1 : layer2;
    const inactiveLayer = activeLayer === layer1 ? layer2 : layer1;

    // Set new class on the hidden layer
    inactiveLayer.className = 'nebula-layer ' + styleClass;

    // Crossfade trigger
    inactiveLayer.classList.add('active');
    activeLayer.classList.remove('active');
  }

  // Function to type a specific section
  function typeSection(index) {
    if (index >= letterParts.length) return;

    // Shift space gradient based on visual/emotional pacing
    if (index === 0) {
      changeNebulaGlow('nebula-reflection');
    } else if (index === 1) {
      changeNebulaGlow('nebula-heartbreak');
    } else if (index === 2) {
      changeNebulaGlow('nebula-gratitude');
    }

    // Fade next button away during typing
    nextBtn.style.display = 'none';
    nextBtn.style.opacity = '0';

    startTypewriter(textBox, letterParts[index], () => {
      // Typing completed: reveal the transition button
      nextBtn.style.display = 'flex';

      // Update next button label
      if (index === letterParts.length - 1) {
        nextBtn.querySelector('.next-label').textContent = 'Read Climax';
      } else {
        nextBtn.querySelector('.next-label').textContent = 'Read Next';
      }
    });
  }

  // Handles transitions from letter reading to the climax screen
  function triggerClimaxReveal() {
    const paper = document.getElementById('letter-container');
    const climax = document.getElementById('climax-container');

    // Change background nebula back to the original deep space navy
    changeNebulaGlow('nebula-reflection');

    // Fade out paper
    paper.style.transition = 'opacity 2s ease, transform 2s ease';
    paper.style.opacity = '0';
    paper.style.transform = 'scale(0.9) translateY(-50px)';

    setTimeout(() => {
      paper.style.display = 'none';
      climax.style.display = 'flex';
      climax.style.opacity = '1';
      console.log("Climax revealed, reset-btn element:", document.getElementById('reset-btn'));
      startPetalShower();
    }, 2000);
  }

  // Next button click handler
  nextBtn.addEventListener('click', () => {
    if (isTyping) return;

    // Fade out current page text
    textBox.classList.add('fade-out');

    setTimeout(() => {
      currentPartIndex++;
      textBox.classList.remove('fade-out');

      if (currentPartIndex < letterParts.length) {
        typeSection(currentPartIndex);
      } else {
        // Climax Reveal
        triggerClimaxReveal();
      }
    }, 400);
  });

  // Repeat/Reset click handler (using delegation to support CSS animation reset via node cloning)
  document.addEventListener('click', (e) => {
    if (e.target && (e.target.id === 'reset-btn' || e.target.closest('#reset-btn'))) {
      const climax = document.getElementById('climax-container');

      // 1. Fade out climax container
      climax.style.opacity = '0';

      // Stop/remove the golden falling petals
      stopPetalShower();

      // Reset space background gradient
      changeNebulaGlow('nebula-reflection');

      // Stop and reset audio to 0 seconds so next playthrough starts from start
      bgAudio.pause();
      bgAudio.currentTime = 0;

      setTimeout(() => {
        climax.style.display = 'none';

        // Clone and replace reveal container to reset all CSS keyframe animations
        const revealContainer = climax.querySelector('.tpr-reveal-container');
        if (revealContainer) {
          const clone = revealContainer.cloneNode(true);
          revealContainer.parentNode.replaceChild(clone, revealContainer);
        }

        // 2. Reset envelope state
        envelope.classList.remove('open');
        envelopeWrapper.classList.remove('hidden');
        envelopeWrapper.style.opacity = '';
        envelopeWrapper.style.transform = '';

        // 3. Reset paper container (letter-container)
        paperContainer.style.display = 'flex';
        paperContainer.classList.remove('show');
        paperContainer.style.opacity = '';
        paperContainer.style.transform = '';

        // 4. Reset typing variables
        currentPartIndex = 0;
        isTyping = false;
        skipTyping = false;
        if (typeInterval) clearTimeout(typeInterval);
        textBox.innerHTML = '';
        nextBtn.style.display = 'none';
        nextBtn.style.opacity = '0';
      }, 1000); // Wait for the climax fade-out to finish
    }
  });

  // --- Interactive Floating Memories Engine ---
  let memories = [];
  let mouseX = -1000;
  let mouseY = -1000;

  // Track cursor coordinates
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouseX = -1000;
    mouseY = -1000;
  });

  // Mobile touch coordinates
  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      mouseX = e.touches[0].clientX;
      mouseY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    mouseX = -1000;
    mouseY = -1000;
  });

  function createFloatingMemories() {
    const container = document.getElementById('memories-container');
    if (!container) return;

    const count = window.innerWidth < 768 ? 12 : 25;
    memories = [];
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'memory-particle';

      const size = Math.random() * 20 + 15; // bokeh sizing 15px - 35px
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;

      el.style.width = `${size}px`;
      el.style.height = `${size}px`;

      const particle = {
        el: el,
        x: x,
        y: y,
        vx: 0,
        vy: 0,
        baseVx: Math.random() * 0.4 - 0.2, // slow sway drift
        baseVy: -(Math.random() * 0.5 + 0.4), // slow upward drift
        size: size
      };

      container.appendChild(el);
      memories.push(particle);
    }
  }

  function animateMemories() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    memories.forEach(p => {
      // Calculate distance from cursor
      const diffX = p.x - mouseX;
      const diffY = p.y - mouseY;
      const distance = Math.sqrt(diffX * diffX + diffY * diffY);
      const repelRadius = 150;

      if (distance < repelRadius) {
        const force = (repelRadius - distance) / repelRadius; // 0 to 1
        const strength = force * 2.5; // repelling speed multiplier
        
        p.vx += (diffX / (distance || 1)) * strength;
        p.vy += (diffY / (distance || 1)) * strength;
      }

      // Apply friction/damping
      p.vx *= 0.93;
      p.vy *= 0.93;

      // Update positions
      p.x += p.baseVx + p.vx;
      p.y += p.baseVy + p.vy;

      // Screen boundary wraps
      if (p.y < -50) {
        p.y = height + 30;
        p.x = Math.random() * width;
        p.vx = 0;
        p.vy = 0;
      }
      if (p.x < -50) p.x = width + 30;
      if (p.x > width + 50) p.x = -30;

      // Transform DOM
      p.el.style.transform = `translate3d(${p.x - p.size/2}px, ${p.y - p.size/2}px, 0)`;
    });

    requestAnimationFrame(animateMemories);
  }

  // Handle window resizing
  window.addEventListener('resize', () => {
    createFloatingMemories();
  });

  // Initialize and run the memories system
  createFloatingMemories();
  animateMemories();

  // Pause audio when switching tabs, resume when returning
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      bgAudio.pause();
    } else {
      // Resume only if the envelope has been opened and is currently open
      if (envelope.classList.contains('open')) {
        bgAudio.play().catch(error => {
          console.warn("Audio resume failed on tab switch:", error);
        });
      }
    }
  });
});
