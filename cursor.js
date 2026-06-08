(function(){
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  const follower = document.getElementById('cursorFollower');
  if (!follower) return;

  if (!follower.querySelector('.cursor-dot')) {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    follower.appendChild(dot);
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;

  let isActive = false;
  let isHovering = false;

  const smooth = 0.18;

  function animate() {
    followerX += (mouseX - followerX) * smooth;
    followerY += (mouseY - followerY) * smooth;

    follower.style.left = followerX + "px";
    follower.style.top = followerY + "px";

    requestAnimationFrame(animate);
  }
  animate();

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  document.addEventListener("mousedown", () => {
    isActive = true;
    update();
  });

  document.addEventListener("mouseup", () => {
    isActive = false;
    update();
  });

 document.addEventListener("mouseover", (e) => {
  const el = e.target;

  const style = window.getComputedStyle(el);

  if (style.cursor === "pointer") {
    follower.classList.add("hover");
  } else {
    follower.classList.remove("hover");
  }
});

  function update() {
    follower.classList.toggle("active", isActive);
    follower.classList.toggle("hover", isHovering);
  }
})();

(function () {

  if (document.getElementById('scrollBtn')) return;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <button id="scrollBtn" class="scroll-btn" aria-label="Scroll to top">
      
      <svg class="progress-ring" width="68" height="68" viewBox="0 0 68 68">
        <circle cx="34" cy="34" r="30" class="ring-bg" />
        <circle cx="34" cy="34" r="30" class="ring-fill" />
      </svg>

      <svg class="scroll-icon-svg" viewBox="0 0 24 24" fill="none">
        <path d="M9 18L15 12L9 6"
          class="greater-path"
          stroke="currentColor"
          stroke-width="2.8"
          stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>

    </button>
  `;

  document.body.appendChild(wrapper.firstElementChild);

  const btn = document.getElementById('scrollBtn');
  const ringFill = document.querySelector('.ring-fill');

  if (!btn || !ringFill) return;

  const RADIUS = 30;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  ringFill.style.strokeDasharray = CIRCUMFERENCE;
  ringFill.style.strokeDashoffset = CIRCUMFERENCE;

  function updateScrollProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    let progress = 0;
    if (docHeight > 0) {
      progress = Math.min(1, Math.max(0, scrollTop / docHeight));
    }

    const offset = CIRCUMFERENCE - (progress * CIRCUMFERENCE);
    ringFill.style.strokeDashoffset = offset;

    if (scrollTop > 150) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  }

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', updateScrollProgress);
  window.addEventListener('resize', updateScrollProgress);

  updateScrollProgress();

})();
