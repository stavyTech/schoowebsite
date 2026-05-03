document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
            mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
        });
    }

    // Smooth Scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple Animation on Scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply basic fade-in to sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });
});

// tesult checker///

const results = [
  {
    studentId: 1,
    session: "2025/2026",
    term: "First Term",
    subjects: [
      { subject: "Mathematics", ca: 18, exam: 72, total: 90, grade: "A" },
      { subject: "English", ca: 15, exam: 70, total: 85, grade: "A" },
      { subject: "Biology", ca: 17, exam: 68, total: 85, grade: "A" }
    ],
    totalScore: 260,
    average: 86.7,
    position: "2nd",
    teacherComment: "Excellent performance",
    principalComment: "Keep it up"
  }
];

// result finder function

function checkResult(studentId, session, term) {
  return results.find(
    result =>
      result.studentId == studentId &&
      result.session === session &&
      result.term === term
  );
}

window.print();

// add token or authentication to the result checker function//
const validPins = ["1234567890", "9876543210"];

// validation function for the result checker//
if (!validPins.includes(pin)) {
   alert("Invalid scratch card PIN");
   return;
}

// grades calculation function for the result checker//
function calculateGrade(score) {
   if (score >= 70) return "A";
   if (score >= 60) return "B";
   if (score >= 50) return "C";
   if (score >= 45) return "D";
   if (score >= 40) return "E";
   return "F";
}