/* ================= HERO TYPING EFFECT ================= */
const texts = [
  "Not just marks, but mindset",
  "Discover careers that fit you",
  "Plan your future with clarity"
];

let textIndex = 0;
let charIndex = 0;

setInterval(() => {
  const typingEl = document.getElementById("typing");
  if (!typingEl) return;

  typingEl.textContent = texts[textIndex].slice(0, ++charIndex);

  if (charIndex > texts[textIndex].length) {
    charIndex = 0;
    textIndex = (textIndex + 1) % texts.length;
  }
}, 100);

/* ================= CAREER DATABASE ================= */
const CAREERS = [
  {
    name: "Data Analyst",
    domain: "TECH",
    roadmap: [
      "Improve Maths & Statistics",
      "Learn Excel, SQL, Python",
      "Build data projects",
      "Internships & analytics jobs"
    ]
  },
  {
    name: "Cyber Security Analyst",
    domain: "TECH",
    roadmap: [
      "Networking basics",
      "Linux & security fundamentals",
      "Ethical hacking tools",
      "Security certifications"
    ]
  },
  {
    name: "UI/UX Designer",
    domain: "CREATIVE",
    roadmap: [
      "Design principles",
      "Figma / Adobe XD",
      "UX research",
      "Strong portfolio"
    ]
  },
  {
    name: "Digital Marketer",
    domain: "BUSINESS",
    roadmap: [
      "SEO & social media",
      "Ad campaigns",
      "Analytics tools",
      "Freelancing or agency work"
    ]
  },
  {
    name: "Psychologist",
    domain: "PEOPLE",
    roadmap: [
      "Study human behavior",
      "Psychology degree",
      "Internships",
      "Practice or research"
    ]
  },
  {
    name: "Environmental Scientist",
    domain: "SCIENCE",
    roadmap: [
      "Focus on biology & science",
      "Environmental studies degree",
      "Field research",
      "Policy / NGO work"
    ]
  }
];

/* ================= MAIN ANALYZER ================= */
function analyze() {
  const subject = document.getElementById("subject").value;
  const interest = document.getElementById("interest").value;
  const thinking = document.getElementById("thinking").value;

  let score = {
    TECH: 0,
    CREATIVE: 0,
    BUSINESS: 0,
    PEOPLE: 0,
    SCIENCE: 0
  };

  /* SUBJECT */
  if (["Mathematics", "Computer Science"].includes(subject)) score.TECH += 40;
  if (subject === "Arts") score.CREATIVE += 40;
  if (subject === "Biology") score.SCIENCE += 40;

  /* INTEREST */
  if (interest === "Problem Solving") score.TECH += 30;
  if (interest === "Creativity") score.CREATIVE += 30;
  if (interest === "Business") score.BUSINESS += 30;
  if (interest === "Helping People") score.PEOPLE += 30;

  /* THINKING STYLE */
  if (thinking === "Logical") score.TECH += 20;
  if (thinking === "Creative") score.CREATIVE += 20;
  if (thinking === "Analytical") score.BUSINESS += 20;
  if (thinking === "Communicative") score.PEOPLE += 20;

  /* RANK CAREERS */
  const ranked = CAREERS
    .map(career => ({
      ...career,
      fit: score[career.domain]
    }))
    .sort((a, b) => b.fit - a.fit);

  /* DOM ELEMENTS */
  const resultsSection = document.querySelector(".results");
  const cards = document.getElementById("cards");
  const roadmapBox = document.getElementById("roadmap");

  /* CLEAR OLD CONTENT */
  cards.innerHTML = "";
  roadmapBox.innerHTML = "";

  /* SAFETY CHECK */
  if (ranked[0].fit === 0) {
    cards.innerHTML = `
      <p style="color:#64748b;">
        Please change your subject or interest to get better career suggestions.
      </p>
    `;
    resultsSection.classList.add("show");
    resultsSection.scrollIntoView({ behavior: "smooth" });
    return;
  }

  /* SHOW RESULTS SECTION */
  resultsSection.classList.add("show");

  /* SHOW TOP 3 CAREERS */
  ranked.slice(0, 3).forEach(c => {
    cards.innerHTML += `
      <div class="card">
        <img src="images/career.png" alt="Career">
        <h3>${c.name}</h3>

        <div class="fit-bar">
          <div class="fit-fill" style="width:${Math.min(c.fit,100)}%"></div>
        </div>

        <p><strong>Fit Score:</strong> ${c.fit}%</p>
      </div>
    `;
  });

  /* SHOW ROADMAP FOR BEST CAREER */
  const best = ranked[0];
  roadmapBox.innerHTML = `
    <h3>${best.name} – Career Roadmap</h3>
    <ul>
      ${best.roadmap.map(step => `<li>${step}</li>`).join("")}
    </ul>
  `;

  /* SCROLL TO RESULTS */
  resultsSection.scrollIntoView({ behavior: "smooth" });
}

/* ================= SMOOTH SCROLL TO FORM ================= */
function scrollToTest() {
  document.getElementById("test")
    .scrollIntoView({ behavior: "smooth" });
}

/* ================= SCROLL REVEAL ANIMATION ================= */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".module, .results")
  .forEach(el => observer.observe(el));
