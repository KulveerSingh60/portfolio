/* ============================================================
   Kulveer Singh — Portfolio  •  interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---------- AOS scroll animations ---------- */
  if (window.AOS) {
    AOS.init({ duration: 800, once: true, offset: 80, easing: "ease-out-cubic" });
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.querySelector(".footer p");
  // (year is hard-coded in markup; nothing to do)

  /* ---------- Navbar: shrink + background on scroll ---------- */
  const nav = document.getElementById("mainNav");
  const backTop = document.getElementById("backTop");

  // Active nav link (scroll spy)
  let sections = [];
  let navLinks = [];

  function spyActiveLink() {
    if (!sections.length || !navLinks.length) return;
    const pos = window.scrollY + 120;
    let current = sections[0] ? sections[0].id : "";
    for (const sec of sections) {
      if (pos >= sec.offsetTop) current = sec.id;
    }
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });
  }


  function onScroll() {
    const y = window.scrollY;
    if (nav) nav.classList.toggle("scrolled", y > 40);
    if (backTop) backTop.classList.toggle("show", y > 500);
    spyActiveLink();
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  // Initialize after we define spyActiveLink to avoid temporal dead-zone errors
  sections = Array.from(document.querySelectorAll("section[id], header[id]"));
  navLinks = Array.from(document.querySelectorAll(".glass-nav .nav-link"));
  onScroll();



  /* ---------- Close mobile menu on link click ---------- */
  const collapseEl = document.getElementById("navItems");
  navLinks.concat(Array.from(document.querySelectorAll(".navbar-brand"))).forEach((link) => {
    link.addEventListener("click", () => {
      if (collapseEl && collapseEl.classList.contains("show") && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(collapseEl).hide();
      }
    });
  });

  /* ---------- Typed text effect ---------- */
  const typedEl = document.getElementById("typed");
  if (typedEl) {
    const words = ["web applications", "clean interfaces", "with PHP & MySQL", "responsive UIs", "real-world apps"];
    let wi = 0, ci = 0, deleting = false;

    function tick() {
      const word = words[wi];
      typedEl.textContent = word.slice(0, ci);
      if (!deleting && ci < word.length) {
        ci++;
        setTimeout(tick, 90);
      } else if (deleting && ci > 0) {
        ci--;
        setTimeout(tick, 45);
      } else if (!deleting && ci === word.length) {
        deleting = true;
        setTimeout(tick, 1400);
      } else {
        deleting = false;
        wi = (wi + 1) % words.length;
        setTimeout(tick, 250);
      }
    }
    tick();
  }

  /* ---------- 3D tilt + shine for [data-tilt] ---------- */
  const tiltEls = document.querySelectorAll("[data-tilt]");
  const supportsHover = window.matchMedia("(hover: hover)").matches;

  if (supportsHover) {
    tiltEls.forEach((el) => {
      const MAX = 12; // degrees
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const rx = (0.5 - py) * MAX * 2;
        const ry = (px - 0.5) * MAX * 2;
        el.style.transform =
          `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-6px)`;
        el.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
        el.style.setProperty("--my", (py * 100).toFixed(1) + "%");
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "";
      });
    });
  }

  /* ---------- Animate skill bars + counters when visible ---------- */
  const bars = document.querySelectorAll(".bar");
  const counters = document.querySelectorAll(".counter");

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10) || 0;
    const dur = 1600;
    const start = performance.now();
    function step(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = Math.floor(eased * target).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString() + (target >= 40 ? "+" : "");
    }
    requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const t = entry.target;
          if (t.classList.contains("bar")) t.classList.add("animate");
          if (t.classList.contains("counter")) animateCounter(t);
          obs.unobserve(t);
        });
      },
      { threshold: 0.4 }
    );
    bars.forEach((b) => io.observe(b));
    counters.forEach((c) => io.observe(c));
  } else {
    bars.forEach((b) => b.classList.add("animate"));
    counters.forEach((c) => (c.textContent = c.dataset.target));
  }



  /* ---------- Subtle parallax on hero orbs ---------- */
  const orbs = document.querySelectorAll(".orb");
  if (supportsHover && orbs.length) {
    window.addEventListener("mousemove", (e) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;
      orbs.forEach((orb, i) => {
        const depth = (i + 1) * 14;
        orb.style.translate = `${cx * depth}px ${cy * depth}px`;
      });
    });
  }
})();
