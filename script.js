// Smooth Scroll
document.addEventListener("click", (e) => {
  const link = e.target.closest('a[href^="#"]');

  if (!link) return;

  e.preventDefault();

  document.querySelector(link.getAttribute("href"))?.scrollIntoView({
    behavior: "smooth",
  });
});

// Active Navigation
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  const currentSection = [...sections]
    .reverse()
    .find((section) => window.scrollY >= section.offsetTop - 150);

  if (!currentSection) return;

  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${currentSection.id}`,
    );
  });
});

// Typing Effect
const text = "Medapati Veerendra Reddy";
const typingText = document.getElementById("typing-text");

let index = 0;
let deleting = false;

function typeEffect() {
  typingText.textContent = text.slice(0, index);

  if (!deleting) {
    index++;

    if (index > text.length) {
      deleting = true;
      return setTimeout(typeEffect, 1500);
    }
  } else {
    index--;

    if (index < 0) {
      deleting = false;
      index = 0;
    }
  }

  setTimeout(typeEffect, deleting ? 60 : 120);
}

typeEffect();

// Project Animation
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);
    });
  },
  {
    threshold: 0.2,
  },
);

document
  .querySelectorAll(".project-card")
  .forEach((card) => observer.observe(card));

// Contact Form
const form = document.querySelector(".contact-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) throw new Error();

    alert("Message sent successfully!");
    form.reset();
  } catch {
    alert("Failed to send message. Please try again.");
  }
});
