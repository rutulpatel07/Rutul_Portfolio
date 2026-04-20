const portfolioData = {
  profile: {
    name: "Rutul Patel",
    brand: "rutulpatel",
    eyebrow: "Full-Stack Developer • Problem Solver • Builder",
    role: "Building modern web products with clean UI and strong backend foundations",
    summary:
      "I design and develop performant, user-focused applications with modern frontend stacks, scalable APIs, and production-ready deployment workflows.",
    about:
      "I am a developer focused on building practical and high-quality digital products. I enjoy turning ideas into polished experiences, improving performance, and shipping reliable solutions that create real impact.",
    yearsBuilding: "2+",
    location: "India",
    locationMapUrl: "https://maps.google.com/?q=India",
    email: "rutul@example.com",
  },
  social: [
    { label: "GitHub", icon: "github", url: "https://github.com/rutulpatel07" },
    { label: "LinkedIn", icon: "linkedin", url: "#" },
    { label: "X", icon: "twitter", url: "#" },
    { label: "Email", icon: "mail", url: "mailto:rutul@example.com" },
  ],
  experiences: [
    {
      role: "Freelance Developer",
      company: "Self-Employed",
      period: "2024 — Present",
      points: [
        "Delivered portfolio and business websites with responsive design and SEO-friendly structure.",
        "Implemented reusable UI systems and faster deployment flow for iterative releases.",
      ],
    },
    {
      role: "Web Development Projects",
      company: "Independent",
      period: "2023 — 2024",
      points: [
        "Built multiple full-stack apps with authentication, APIs, and clean dashboard UI.",
        "Focused on maintainable code structure, accessibility, and production stability.",
      ],
    },
  ],
  projects: [
    {
      title: "Portfolio Website",
      description: "Cyberpunk-inspired one-page personal portfolio with dynamic sections.",
      tech: ["HTML", "CSS", "JavaScript"],
      links: [{ label: "Repository", url: "https://github.com/rutulpatel07/Rutul_Portfolio" }],
    },
    {
      title: "Project Showcase",
      description: "A customizable gallery page for projects with tags, links, and responsive cards.",
      tech: ["JavaScript", "Responsive UI", "UI/UX"],
      links: [{ label: "Add Demo Link", url: "#" }],
    },
  ],
  skills: [
    { title: "Frontend", items: ["HTML5", "CSS3", "JavaScript", "Responsive Design"] },
    { title: "Backend", items: ["Node.js", "REST APIs", "Database Basics"] },
    { title: "Tools", items: ["Git", "GitHub", "Vercel", "VS Code"] },
    { title: "Core", items: ["Problem Solving", "Performance", "Clean Code"] },
  ],
};

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function createCard(title, meta, content, className = "") {
  const card = document.createElement("article");
  card.className = `card ${className}`.trim();
  card.innerHTML = `
    <h3>${title}</h3>
    ${meta ? `<p class="meta">${meta}</p>` : ""}
    ${content}
  `;
  return card;
}

function renderExperience() {
  const container = document.getElementById("experience-list");
  if (!container) return;
  container.innerHTML = "";

  portfolioData.experiences.forEach((item) => {
    const points = item.points.map((point) => `<li>${point}</li>`).join("");
    const card = createCard(
      item.role,
      `${item.company} • ${item.period}`,
      `<ul class="bullet-list">${points}</ul>`
    );
    container.appendChild(card);
  });
}

function renderProjects() {
  const container = document.getElementById("projects-grid");
  if (!container) return;
  container.innerHTML = "";

  portfolioData.projects.forEach((project) => {
    const tech = project.tech.map((item) => `<span class="tech-chip">${item}</span>`).join("");
    const links = project.links
      .map((link) => `<a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label}</a>`)
      .join("");
    const card = createCard(
      project.title,
      "",
      `<p class="description">${project.description}</p>
       <div class="tech-list">${tech}</div>
       <div class="project-links">${links}</div>`
    );
    container.appendChild(card);
  });
}

function renderSkills() {
  const container = document.getElementById("skills-grid");
  if (!container) return;
  container.innerHTML = "";

  portfolioData.skills.forEach((group) => {
    const items = group.items.map((item) => `<span class="tech-chip">${item}</span>`).join("");
    const card = createCard(group.title, "", `<div class="tech-list">${items}</div>`, "skills-block");
    container.appendChild(card);
  });
}

function renderSocial() {
  const container = document.getElementById("social-links");
  if (!container) return;
  container.innerHTML = "";

  portfolioData.social.forEach((item) => {
    const link = document.createElement("a");
    link.className = "social-link";
    link.href = item.url;
    if (item.url.startsWith("http")) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
    link.innerHTML = `<i data-lucide="${item.icon}"></i><span>${item.label}</span>`;
    container.appendChild(link);
  });
}

function hydrateProfile() {
  const { profile, projects, skills } = portfolioData;
  setText("brand-name", profile.brand);
  setText("hero-eyebrow", profile.eyebrow);
  setText("hero-name", profile.name);
  setText("hero-role", profile.role);
  setText("hero-summary", profile.summary);
  setText("about-summary", profile.about);
  setText("years-experience", profile.yearsBuilding);
  setText("projects-count", `${projects.length}+`);
  setText("skills-count", `${skills.reduce((sum, group) => sum + group.items.length, 0)}+`);
  setText("email-text", profile.email);
  setText("location-text", profile.location);
  setText("footer-year", String(new Date().getFullYear()));
  setText("footer-name", profile.name);

  const emailLink = document.getElementById("email-link");
  if (emailLink) emailLink.href = `mailto:${profile.email}`;
  const locationLink = document.getElementById("location-link");
  if (locationLink) locationLink.href = profile.locationMapUrl;
}

function setupNavigation() {
  const toggleButton = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const linkItems = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("main section[id]");

  if (toggleButton && navLinks) {
    toggleButton.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      toggleButton.setAttribute("aria-expanded", String(isOpen));
    });
  }

  linkItems.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks?.classList.remove("open");
      toggleButton?.setAttribute("aria-expanded", "false");
    });
  });

  const onScroll = () => {
    let currentId = "";
    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        currentId = section.id;
      }
    });

    linkItems.forEach((link) => {
      const sectionId = link.getAttribute("href")?.replace("#", "");
      link.classList.toggle("active", sectionId === currentId);
    });
  };

  window.addEventListener("scroll", onScroll);
  onScroll();
}

function setupParallax() {
  const glows = document.querySelectorAll(".glow");
  document.addEventListener("mousemove", (event) => {
    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;
    glows.forEach((glow, index) => {
      const speed = (index + 1) * 8;
      glow.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  hydrateProfile();
  renderExperience();
  renderProjects();
  renderSkills();
  renderSocial();
  setupNavigation();
  setupParallax();
  lucide.createIcons();
});
