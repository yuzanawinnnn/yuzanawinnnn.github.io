(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* =========================================================
     PROJECT DATA: edit projects here
     ========================================================= */
  const projects = [
    {
      id: "flask-marketplace",
      title: "Flask Marketplace Web App",
      category: "fullstack",
      categoryLabel: "Full-Stack & Web",
      icon: "fa-store",
      summary: "Full-stack peer-to-peer marketplace supporting authenticated item listings, wishlist likes and verified user reviews.",
      highlight: "Built modular Blueprint routing with relational foreign-key constraints to prevent duplicate likes and enforce review ownership.",
      stack: ["Python", "Flask", "SQLite / MySQL", "HTML5 / CSS3", "JavaScript"],
      overview: "A server-rendered, AJAX-enhanced marketplace structured around Flask Blueprints, session-based authentication and normalised relational tables.",
      decisions: [
        "Separated auth, product catalogue and review controllers into modular Flask Blueprints for maintainability.",
        "Designed composite unique constraints on user–item likes so the like toggle is idempotent.",
        "Implemented client-side fetch updates for likes and rating aggregation without full-page reloads."
      ],
      takeaway: "Role-protected CRUD endpoints, secure password hashing and paginated category filtering.",
      github: "https://github.com/yuzanawinnnn",
      live: ""
    },
    {
      id: "cat-adoption-db",
      title: "Cat Adoption Relational Database CLI",
      category: "ai-systems",
      categoryLabel: "AI & Systems",
      icon: "fa-database",
      summary: "Normalised 3NF shelter management system in Java and MySQL tracking adoptions, medical records and fee analytics.",
      highlight: "Eliminated shelter data anomalies through strict 3NF schema design and atomic JDBC transactions for multi-step adoption workflows.",
      stack: ["Java", "MySQL", "JDBC", "ER Modeling", "SQL Analytics"],
      overview: "A command-line data management application backed by a normalised MySQL schema and parameterised JDBC prepared statements.",
      decisions: [
        "Modelled entities (Cats, Adopters, MedicalLogs, AdoptionTransactions) to third normal form to eliminate update anomalies.",
        "Wrapped adoption status updates and fee ledger entries in explicit JDBC commit/rollback transaction blocks.",
        "Wrote aggregate SQL reporting queries for monthly adoption rates and breed/age fee analytics."
      ],
      takeaway: "SQL-injection-safe PreparedStatements, referential integrity triggers and an audited transaction history.",
      github: "https://github.com/yuzanawinnnn",
      live: ""
    },
    {
      id: "vr-heights-bridge",
      title: "VR Fear-of-Heights Bridge Experience",
      category: "xr-games",
      categoryLabel: "VR / XR & Games",
      icon: "fa-vr-cardboard",
      summary: "Immersive Unity XR exposure-therapy environment set in an atmospheric abandoned village, with physics-driven rope bridge traversal.",
      highlight: "Engineered configurable joint physics and spatial audio cues to balance realistic plank sway with comfortable VR locomotion.",
      stack: ["Unity XR", "C#", "Physics Joints", "Spatial Audio", "XR Interaction Toolkit"],
      overview: "A Unity XR simulation that gradually introduces elevation and dynamic suspension-bridge physics for acrophobia exposure scenarios.",
      decisions: [
        "Configured rigidbody chains and ConfigurableJoint spring-damper parameters so wooden planks flex realistically under footsteps.",
        "Integrated XR Interaction Toolkit locomotion with comfort vignette options to reduce motion sickness.",
        "Layered wind, creaking wood and height-responsive spatial audio to heighten presence."
      ],
      takeaway: "Real-time physics bridge simulation, modular environment lighting and comfort-first XR locomotion.",
      github: "https://github.com/yuzanawinnnn",
      live: ""
    },
    {
      id: "fine-dining-luxury-web",
      title: "Fine Dining & Luxury E-Commerce Front-Ends",
      category: "fullstack",
      categoryLabel: "Full-Stack & Web",
      icon: "fa-bag-shopping",
      summary: "A luxury fashion storefront replica and a fine dining website with product detail views, cart state and sliding hero menus.",
      highlight: "Responsive CSS Grid/Flexbox layouts and vanilla ES6+ state for shopping bag calculations and dynamic menu filtering.",
      stack: ["HTML5", "CSS3", "JavaScript (ES6+)", "Responsive Grid", "DOM State"],
      overview: "Two front-end builds demonstrating editorial typography, luxury merchandising and interactive client-side e-commerce workflows.",
      decisions: [
        "Built stateful shopping basket logic (quantity updates, subtotals, item removal) with modular ES6+ event delegation.",
        "Created hero sliders, customer review carousels and categorised menus for the fine dining site.",
        "Kept layouts fluid across mobile, tablet and desktop without heavy UI frameworks."
      ],
      takeaway: "Includes both the Fine Dining Restaurant site and the Versace E-Commerce Replica.",
      github: "https://github.com/yuzanawinnnn/Restaurant-Website",
      live: "https://yuzanawinnnn.github.io/Restaurant-Website/",
      extra: [
        { label: "Versace replica code", url: "https://github.com/yuzanawinnnn/Versace-ECommerce-Website", icon: "fa-brands fa-github" },
        { label: "Versace replica live", url: "https://yuzanawinnnn.github.io/Versace-ECommerce-Website/", icon: "fa-solid fa-arrow-up-right-from-square" }
      ]
    },
    {
      id: "tictactoe-kpop-hub",
      title: "Interactive Tic-Tac-Toe & K-Pop Fan Hub",
      category: "fullstack",
      categoryLabel: "Full-Stack & Web",
      icon: "fa-gamepad",
      summary: "A state-driven Tic-Tac-Toe web game paired with a media-rich, responsive Stray Kids fan showcase.",
      highlight: "Deterministic win-matrix evaluation and instant game-state reset alongside responsive multimedia gallery grids.",
      stack: ["JavaScript (ES6+)", "CSS Grid / Flexbox", "HTML5", "Game State Logic"],
      overview: "Two interactive front-end builds highlighting clean game-loop state management and high-contrast visual storytelling.",
      decisions: [
        "Modelled the board as a 9-cell array with declarative winning-combination checks and turn-indicator transitions.",
        "Structured the fan hub with CSS Grid album showcases, embedded media previews and responsive navigation.",
        "Sized touch targets and tuned contrast for comfortable mobile play and browsing."
      ],
      takeaway: "Zero-dependency game engine and responsive multimedia layout.",
      github: "https://github.com/yuzanawinnnn/Tic-Tac-Toe",
      live: "https://yuzanawinnnn.github.io/Tic-Tac-Toe/",
      extra: [
        { label: "Stray Kids hub code", url: "https://github.com/yuzanawinnnn/StrayKids", icon: "fa-brands fa-github" },
        { label: "Stray Kids hub live", url: "https://yuzanawinnnn.github.io/StrayKids/", icon: "fa-solid fa-arrow-up-right-from-square" }
      ]
    }
  ];

  /* ---------- Small helpers ---------- */
  const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const linkIcons = (p) => `
    ${p.github ? `<a href="${esc(p.github)}" target="_blank" rel="noopener" aria-label="${esc(p.title)} source code"><i class="fa-brands fa-github"></i></a>` : ""}
    ${p.live ? `<a href="${esc(p.live)}" target="_blank" rel="noopener" aria-label="${esc(p.title)} live demo"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>` : ""}`;

  /* ---------- Render project cards ---------- */
  const grid = document.getElementById("projectsGrid");

  const card = (p, i) => {
    const featured = i === 0;
    const main = `
      <div class="pcard__top">
        <span class="pcard__cat">${esc(p.categoryLabel)}</span>
        <span class="pcard__icon"><i class="fa-solid ${esc(p.icon)}"></i></span>
      </div>
      <h3>${esc(p.title)}</h3>
      <p class="pcard__summary">${esc(p.summary)}</p>
      <div class="pcard__highlight"><b>System highlight</b><p>${esc(p.highlight)}</p></div>
      <ul class="stack">${p.stack.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
      <div class="pcard__foot">
        <button type="button" class="pcard__details" data-id="${esc(p.id)}"><i class="fa-solid fa-diagram-project"></i> Architecture details</button>
        <div class="pcard__links">${linkIcons(p)}</div>
      </div>`;

    if (featured) {
      return `
        <article class="pcard pcard--featured" style="--i:0s">
          <div class="pcard__main">${main}</div>
          <div class="pcard__panel" aria-label="Key architectural decisions">
            <div class="pcard__panel-bar"><i></i><i></i><i></i>key-decisions.md</div>
            <ul class="decisions">${p.decisions.map((d) => `<li><i class="fa-solid fa-circle-check"></i><span>${esc(d)}</span></li>`).join("")}</ul>
          </div>
        </article>`;
    }
    return `<article class="pcard" style="--i:${(i * 0.08).toFixed(2)}s">${main}</article>`;
  };

  const render = (filter = "all") => {
    const list = filter === "all" ? projects : projects.filter((p) => p.category === filter);
    grid.innerHTML = list.map(card).join("");
  };
  render();

  document.querySelectorAll(".filter").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach((b) => {
        const on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", String(on));
      });
      render(btn.dataset.filter);
    });
  });

  /* ---------- Project details dialog ---------- */
  const modal = document.getElementById("projectModal");
  const modalBody = document.getElementById("modalBody");
  let lastTrigger = null;

  const openModal = (p) => {
    const links = [
      p.github && `<a class="btn btn--light" href="${esc(p.github)}" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> Source code</a>`,
      p.live && `<a class="btn btn--primary" href="${esc(p.live)}" target="_blank" rel="noopener"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live demo</a>`,
      ...(p.extra || []).map((x) => `<a class="btn btn--soft" href="${esc(x.url)}" target="_blank" rel="noopener"><i class="${esc(x.icon)}"></i> ${esc(x.label)}</a>`)
    ].filter(Boolean).join("");

    modalBody.innerHTML = `
      <span class="pcard__cat">${esc(p.categoryLabel)}</span>
      <h3 id="modalTitle">${esc(p.title)}</h3>
      <p class="modal__overview">${esc(p.overview)}</p>
      <h4>Key architectural decisions</h4>
      <ul class="decisions">${p.decisions.map((d) => `<li><i class="fa-solid fa-circle-check"></i><span>${esc(d)}</span></li>`).join("")}</ul>
      <div class="modal__takeaway"><b>Technical takeaway</b>${esc(p.takeaway)}</div>
      <h4>Tech stack</h4>
      <ul class="stack">${p.stack.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
      <div class="modal__links">${links}</div>`;
    modal.showModal();
    document.body.style.overflow = "hidden";
  };

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".pcard__details");
    if (!btn) return;
    const p = projects.find((x) => x.id === btn.dataset.id);
    if (p) { lastTrigger = btn; openModal(p); }
  });
  document.getElementById("modalClose").addEventListener("click", () => modal.close());
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });
  modal.addEventListener("close", () => {
    document.body.style.overflow = "";
    if (lastTrigger) lastTrigger.focus();
  });

  /* ---------- Copy email ---------- */
  const copyBtn = document.getElementById("copyEmail");
  const email = document.getElementById("emailText").textContent.trim();
  copyBtn.addEventListener("click", async () => {
    const label = copyBtn.querySelector("span");
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const t = document.createElement("textarea");
      t.value = email; t.style.position = "fixed"; t.style.opacity = "0";
      document.body.appendChild(t); t.select();
      try { document.execCommand("copy"); } catch { label.textContent = "Select & copy"; t.remove(); return; }
      t.remove();
    }
    label.textContent = "Copied!";
    copyBtn.classList.add("is-done");
    setTimeout(() => { label.textContent = "Copy"; copyBtn.classList.remove("is-done"); }, 2000);
  });

  /* ---------- Page load: hero entrance ---------- */
  const start = () => requestAnimationFrame(() => document.body.classList.add("is-loaded"));
  if (document.readyState === "complete") start();
  else window.addEventListener("load", start);

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Nav: scrolled state + mobile menu ---------- */
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");

  const setMenu = (open) => {
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  toggle.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
  document.addEventListener("click", (e) => { if (!nav.contains(e.target)) setMenu(false); });

  /* ---------- Active nav link ---------- */
  const links = [...menu.querySelectorAll('a[href^="#"]')];
  const sections = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => spy.observe(s));

  /* ---------- Scroll reveal ---------- */
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach((el) => {
    const siblings = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
    el.style.setProperty("--d", `${Math.min(siblings.indexOf(el), 5) * 0.1}s`);
  });
  const revealer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  reveals.forEach((el) => revealer.observe(el));

  /* ---------- Hero parallax (mouse + scroll) ---------- */
  const hero = document.querySelector(".hero");
  const objects = [...document.querySelectorAll(".obj")];
  let mx = 0, my = 0, sy = 0, ticking = false;

  const paint = () => {
    objects.forEach((o) => {
      const depth = parseFloat(o.dataset.depth) || 0;
      const speed = parseFloat(o.dataset.speed) || 0;
      o.style.setProperty("--px", `${mx * depth}px`);
      o.style.setProperty("--py", `${my * depth + sy * speed}px`);
    });
    ticking = false;
  };
  const queue = () => { if (!ticking) { ticking = true; requestAnimationFrame(paint); } };

  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    nav.classList.toggle("is-scrolled", y > 40);
    if (!reduceMotion && y < window.innerHeight * 1.2) { sy = y; queue(); }
  }, { passive: true });

  if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    hero.addEventListener("mousemove", (e) => {
      const r = hero.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width - 0.5;
      my = (e.clientY - r.top) / r.height - 0.5;
      queue();
    });
    hero.addEventListener("mouseleave", () => { mx = 0; my = 0; queue(); });
  }

  /* ---------- Rotating role (typewriter) ---------- */
  const rotator = document.getElementById("rotator");
  const roles = ["Cybersecurity Engineer", "AI & Full-Stack Developer"];
  if (rotator && !reduceMotion) {
    let i = 0, chars = roles[0].length, deleting = true;
    const tick = () => {
      if (deleting) {
        chars--;
        if (chars === 0) { deleting = false; i = (i + 1) % roles.length; }
      } else {
        chars++;
      }
      rotator.textContent = roles[i].slice(0, chars) || "​";
      let delay = deleting ? 45 : 85;
      if (!deleting && chars === roles[i].length) { deleting = true; delay = 2200; }
      setTimeout(tick, delay);
    };
    setTimeout(tick, 2600);
  }
})();
