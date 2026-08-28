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

  /* ============================================================
     Page preloader — fake progress then fade out
     ============================================================ */
  const preloader = document.getElementById("preloader");
  const preloaderBar = preloader ? preloader.querySelector(".preloader-bar span") : null;
  const preloaderPct = preloader ? preloader.querySelector(".preloader-pct") : null;

  function hidePreloader() {
    if (!preloader) return;
    preloader.classList.add("done");
    document.body.classList.remove("is-loading");
    // Let AOS/effect listeners start cleanly
    setTimeout(() => { if (preloader.parentNode) preloader.parentNode.removeChild(preloader); }, 700);
  }

  if (preloader) {
    document.body.classList.add("is-loading");
    let pct = 0;
    const ticker = setInterval(() => {
      pct = Math.min(pct + Math.floor(Math.random() * 18) + 6, 100);
      if (preloaderBar) preloaderBar.style.width = pct + "%";
      if (preloaderPct) preloaderPct.textContent = pct + "%";
      if (pct >= 100) {
        clearInterval(ticker);
        // Small pause so the 100% is visible, then fade out
        setTimeout(hidePreloader, 200);
      }
    }, 90);
    // Safety: never leave the loader up even if something hangs
    window.addEventListener("load", () => setTimeout(hidePreloader, 600));
  }

  /* ============================================================
     Scroll progress bar
     ============================================================ */
  const scrollProgress = document.getElementById("scrollProgress");
  function updateScrollProgress() {
    if (!scrollProgress) return;
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    scrollProgress.style.width = pct + "%";
  }
  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  updateScrollProgress();

  /* ============================================================
     Custom cursor (desktop + pointer devices only)
     ============================================================ */
  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");

  if (dot && ring && supportsHover && window.matchMedia("(pointer: fine)").matches) {
    document.body.classList.add("cursor-enabled");
    let mx = 0, my = 0, rx = 0, ry = 0;
    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + "px";
      dot.style.top = my + "px";
    });
    (function ringFollow() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      requestAnimationFrame(ringFollow);
    })();
    const hoverTargets = "a, button, .nav-link, .skill-card, .project-card, .cert-card, .timeline-content, .contact-card-link";
    document.querySelectorAll(hoverTargets).forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("is-hover"));
      el.addEventListener("mouseleave", () => ring.classList.remove("is-hover"));
    });
  }

  /* ============================================================
     Magnetic hover on hero CTA + contact buttons
     ============================================================ */
  if (supportsHover) {
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const relX = e.clientX - (r.left + r.width / 2);
        const relY = e.clientY - (r.top + r.height / 2);
        el.style.translate = `${relX * 0.25}px ${relY * 0.25}px`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.translate = "0px 0px";
      });
    });
  }

  /* ============================================================
     Scroll-reveal with stagger (cards that have no AOS attr)
     ============================================================ */
  const revealIt = (els, base = 0, step = 70) => {
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("reveal", "in-view"));
      return;
    }
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.style.setProperty("--d", (base + step * el.dataset.index) + "ms");
          el.classList.add("in-view");
          obs.unobserve(el);
        });
      },
      { threshold: 0.18 }
    );
    els.forEach((el, i) => {
      el.classList.add("reveal");
      el.dataset.index = i;
      io.observe(el);
    });
  };

  // Apply reveal to cards that aren't already individually animated by AOS.
  // (project-card / cert-card are wrapped in AOS columns, so they're covered.)
  revealIt(document.querySelectorAll(".timeline-item"), 0, 110);
  // Enable reveal on the visible core-dev tab on first load; re-stagger on tab switch
  const initialPane = document.getElementById("core-dev");
  if (initialPane) {
    const cards = initialPane.querySelectorAll(".skill-card");
    cards.forEach((el, i) => {
      el.classList.add("reveal", "reveal-zoom");
      el.style.setProperty("--d", i * 60 + "ms");
    });
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("in-view");
            obs.unobserve(entry.target);
          });
        },
        { threshold: 0.2 }
      );
      cards.forEach((el) => io.observe(el));
    } else {
      cards.forEach((el) => el.classList.add("in-view"));
    }
  }
  function triggerPaneReveal(pane) {
    if (!pane) return;
    const cards = pane.querySelectorAll(".skill-card");
    cards.forEach((el, i) => {
      el.classList.add("reveal");
      el.style.setProperty("--d", i * 60 + "ms");
      void el.offsetWidth; // restart reflow so transition runs each tab switch
      el.classList.add("in-view");
    });
  }
  if (window.bootstrap) {
    document.querySelectorAll(".skills-tabs-container [data-bs-toggle='pill']").forEach((tab) => {
      tab.addEventListener("shown.bs.tab", () => {
        triggerPaneReveal(document.querySelector(tab.getAttribute("data-bs-target")));
      });
    });
  }

  /* ============================================================
     Enhance tilt cards: add the sweep + show class hooks
     ============================================================ */
  document.querySelectorAll(".project-card, .cert-card").forEach((el) => el.classList.add("sweep"));
})();
