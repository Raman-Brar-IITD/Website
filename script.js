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

// --- Main script to fetch and display Hashnode articles ---

// Function to fetch articles from the Hashnode API
async function getArticles() {
    const HASHNODE_HOST = 'mlwithbrar.hashnode.dev'; 
    const query = `
        query GetPublicationPosts($host: String!) {
          publication(host: $host) {
            posts(first: 3) {
              edges {
                node {
                  title
                  brief
                  url
                  publishedAt
                }
              }
            }
          }
        }
    `;

    try {
        const response = await fetch('https://gql.hashnode.com/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query,
                variables: { host: HASHNODE_HOST },
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.errors) {
            console.error("GraphQL Errors:", data.errors);
            throw new Error("Error fetching posts from Hashnode.");
        }

        return data.data.publication.posts.edges;
    } catch (error) {
        console.error("Error fetching articles:", error);
        const blogContainer = document.getElementById('blog-posts-container');
        blogContainer.innerHTML = `<p style="color: red; text-align: center; width: 100%;">Failed to load articles. Please try again later.</p>`;
        return []; 
    }
}

// Main function to orchestrate fetching and displaying
async function displayArticles() {
    const blogContainer = document.getElementById('blog-posts-container');
    const articles = await getArticles();

    if (articles && articles.length > 0) {
        blogContainer.innerHTML = ''; // Clear any previous content
        articles.forEach((post, index) => {
            const { title, brief, url, publishedAt } = post.node;
            
            const blogCard = document.createElement("div");
            blogCard.className = "col-lg-4 col-md-6";
            blogCard.setAttribute("data-aos", "fade-up");
            blogCard.setAttribute("data-aos-delay", `${(index + 1) * 100}`);

            const publishedDate = new Date(publishedAt).toLocaleDateString("en-US", {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            // This structure matches your style.css for .blog-card
            blogCard.innerHTML = `
              <div class="blog-card">
                  <h5>${title}</h5>
                  <p>${brief}</p>
                  <a href="${url}" class="read-more" target="_blank">Read More <i class="fas fa-arrow-right"></i></a>
              </div>
            `;
            
            blogContainer.appendChild(blogCard);
        });
        
        // Refresh AOS to apply animations to the newly added cards
        setTimeout(() => AOS.refresh(), 100);

    } else if (articles) { 
       blogContainer.innerHTML = `<p style="text-align: center; width: 100%;">No articles found.</p>`;
    }
}

// Run the script once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', displayArticles);