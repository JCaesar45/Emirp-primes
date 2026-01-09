// Advanced JavaScript with cutting-edge features

// Initialize particles
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 20 + "s";
    particle.style.animationDuration = 15 + Math.random() * 10 + "s";
    particlesContainer.appendChild(particle);
  }
}

// Header scroll effect
function handleScroll() {
  const header = document.getElementById("header");
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

// Smooth scroll to section
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  section.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Toggle switch functionality
function setupToggle() {
  const toggle = document.getElementById("returnToggle");
  toggle.addEventListener("click", function () {
    this.classList.toggle("active");
  });
}

// Advanced emirp calculation functions
function isPrime(n) {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

function reverseNumber(n) {
  return parseInt(n.toString().split("").reverse().join(""));
}

function isEmirp(n) {
  if (!isPrime(n)) return false;
  const reversed = reverseNumber(n);
  return n !== reversed && isPrime(reversed);
}

function calculateEmirps() {
  const inputValue = document.getElementById("inputValue").value.trim();
  const returnAsArray = document
    .getElementById("returnToggle")
    .classList.contains("active");
  const resultsDisplay = document.getElementById("resultsDisplay");
  const loader = document.getElementById("loader");

  // Show loader
  loader.style.display = "block";
  resultsDisplay.innerHTML = "";

  // Simulate calculation delay for better UX
  setTimeout(() => {
    try {
      let result;

      // Check if input is a range
      if (inputValue.includes("[") && inputValue.includes("]")) {
        const range = JSON.parse(inputValue);
        if (Array.isArray(range) && range.length === 2) {
          result = emirps(range, returnAsArray);
        } else {
          throw new Error("Invalid range format");
        }
      } else {
        // Single number input
        const n = parseInt(inputValue);
        if (isNaN(n)) throw new Error("Invalid number input");
        result = emirps(n, returnAsArray);
      }

      displayResults(result, returnAsArray);
    } catch (error) {
      resultsDisplay.innerHTML = `<p style="color: var(--secondary-color);">Error: ${error.message}</p>`;
    } finally {
      loader.style.display = "none";
    }
  }, 500);
}

function emirps(input, returnAsArray = false) {
  // If input is a number (n), find first n emirps or nth emirp
  if (typeof input === "number") {
    const emirpList = [];
    let num = 13; // Start from the first emirp

    while (emirpList.length < input) {
      if (isEmirp(num)) {
        emirpList.push(num);
      }
      num++;
    }

    return returnAsArray ? emirpList : emirpList[input - 1];
  }

  // If input is an array [start, end], find emirps in range
  if (Array.isArray(input) && input.length === 2) {
    const [start, end] = input;
    const emirpList = [];

    for (let num = start; num <= end; num++) {
      if (isEmirp(num)) {
        emirpList.push(num);
      }
    }

    return returnAsArray ? emirpList : emirpList.length;
  }

  throw new Error("Invalid input format");
}

function displayResults(result, isArray) {
  const resultsDisplay = document.getElementById("resultsDisplay");

  if (isArray) {
    if (Array.isArray(result) && result.length > 0) {
      let html = `<div class="emirp-grid">`;
      result.forEach((emirp, index) => {
        html += `<div class="emirp-item" style="animation-delay: ${
          index * 0.05
        }s">${emirp}</div>`;
      });
      html += `</div>`;
      resultsDisplay.innerHTML = html;
    } else {
      resultsDisplay.innerHTML =
        '<p style="text-align: center; color: var(--text-secondary);">No emirps found in the given range</p>';
    }
  } else {
    resultsDisplay.innerHTML = `
                    <div style="text-align: center; padding: 2rem;">
                        <div style="font-size: 3rem; font-weight: 800; background: var(--gradient-1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                            ${result}
                        </div>
                        <p style="margin-top: 1rem; color: var(--text-secondary);">
                            ${Array.isArray(result) ? "Emirps found" : "Result"}
                        </p>
                    </div>
                `;
  }
}

// Add interactive effects to emirp items
function addInteractiveEffects() {
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("emirp-item")) {
      // Create ripple effect
      const ripple = document.createElement("div");
      ripple.style.position = "absolute";
      ripple.style.width = "20px";
      ripple.style.height = "20px";
      ripple.style.background = "rgba(255, 255, 255, 0.5)";
      ripple.style.borderRadius = "50%";
      ripple.style.transform = "translate(-50%, -50%)";
      ripple.style.pointerEvents = "none";
      ripple.style.animation = "ripple 0.6s ease-out";

      const rect = e.target.getBoundingClientRect();
      ripple.style.left = e.clientX - rect.left + "px";
      ripple.style.top = e.clientY - rect.top + "px";

      e.target.style.position = "relative";
      e.target.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);

      // Show reversed number
      const original = parseInt(e.target.textContent);
      const reversed = reverseNumber(original);
      e.target.setAttribute("data-reversed", reversed);
      e.target.style.transform = "scale(1.1) rotateY(180deg)";

      setTimeout(() => {
        e.target.textContent = reversed;
        e.target.style.background = "var(--gradient-3)";
      }, 150);

      setTimeout(() => {
        e.target.textContent = original;
        e.target.style.background = "var(--gradient-2)";
        e.target.style.transform = "scale(1) rotateY(0deg)";
      }, 1500);
    }
  });
}

// Add ripple animation
const style = document.createElement("style");
style.textContent = `
            @keyframes ripple {
                to {
                    width: 100px;
                    height: 100px;
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);

// Keyboard shortcuts
document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.key === "Enter") {
    calculateEmirps();
  }
  if (e.key === "Escape") {
    document.getElementById("inputValue").value = "";
    document.getElementById("resultsDisplay").innerHTML =
      '<p style="text-align: center; color: var(--text-secondary);">Click "Calculate Emirps" to see results</p>';
  }
});

// Initialize everything
document.addEventListener("DOMContentLoaded", function () {
  createParticles();
  setupToggle();
  addInteractiveEffects();

  // Add scroll event listener
  window.addEventListener("scroll", handleScroll);

  // Add input field enter key listener
  document
    .getElementById("inputValue")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        calculateEmirps();
      }
    });

  // Initial calculation
  setTimeout(() => calculateEmirps(), 1000);
});

// Advanced error handling
window.addEventListener("error", function (e) {
  console.error("Application error:", e.error);
  // You could show a user-friendly error message here
});

// Performance monitoring
if ("performance" in window) {
  window.addEventListener("load", function () {
    setTimeout(function () {
      const perfData = performance.getEntriesByType("navigation")[0];
      console.log(
        "Page load time:",
        perfData.loadEventEnd - perfData.loadEventStart,
        "ms"
      );
    }, 0);
  });
}
