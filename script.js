// Initialize AOS
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 1px 20px rgba(0, 0, 0, 0.05)';
    }
});

// Active nav link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Scroll to top functionality
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (name && email && message) {
        // Simulate form submission
        alert('Thank you for your message! I\'ll get back to you soon.');
        this.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Add some interactive hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Typing effect for hero text (alternative animation)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    element.style.opacity = '1';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero::before');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger hero animations
    setTimeout(() => {
        AOS.refresh();
    }, 100);
});

// Add intersection observer for additional animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add dynamic gradient animation to hero
let gradientPosition = 0;
setInterval(() => {
    gradientPosition += 1;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = `${gradientPosition}% 50%`;
    }
}, 100);

// Enhanced project card interactions
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.addEventListener('mouseenter', function() {
        // Add ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: rgba(37, 99, 235, 0.1);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    });
});

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
    
    .loaded .hero-content > * {
        animation-play-state: running;
    }
    
    .animate {
        animation: slideInUp 0.8s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Add easter egg - Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 10000);
    }
});

// Add rainbow animation
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);


const wordpressApiUrl = "https://api.rss2json.com/v1/api.json?rss_url=https://mlwithraman.wordpress.com/feed/";

fetch(wordpressApiUrl)
  .then(response => response.json())
  .then(data => {
    const blogContainer = document.getElementById("wordpress-blog-posts");

    data.items.slice(0, 3).forEach((post, index) => {
      const blogCard = document.createElement("div");
      blogCard.className = "col-lg-4 col-md-6";
      blogCard.setAttribute("data-aos", "fade-up");
      blogCard.setAttribute("data-aos-delay", `${(index + 1) * 100}`);

      const publishedDate = new Date(post.pubDate).toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      blogCard.innerHTML = `
        <div class="blog-card">
            <div class="blog-date">${publishedDate}</div>
            <h5>${post.title}</h5>
            <p>${stripHtml(post.description).substring(0, 120)}...</p>
            <a href="${post.link}" class="read-more" target="_blank">Read More <i class="fas fa-arrow-right"></i></a>
        </div>
      `;

      blogContainer.appendChild(blogCard);
    });
  })
  .catch(error => {
    console.error("Failed to load WordPress posts:", error);
  });

function stripHtml(html) {
  let div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}
