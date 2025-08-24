// --- AOS INITIALIZATION ---
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true
});

// --- NAVBAR SCROLL EFFECT (Updated for dark theme) ---
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.9)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.9)';
    }
});

// --- TYPEWRITER EFFECT ---
const words = ["I build interpretable, ethical, and scalable machine learning solutions.", "I empower businesses and drive innovation through data."];
let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;

function type() {
    currentWord = words[i];
    const typewriterElement = document.getElementById("typewriter");
    if (isDeleting) {
        typewriterElement.textContent = currentWord.substring(0, j - 1);
        j--;
        if (j === 0) {
            isDeleting = false;
            i++;
            if (i === words.length) {
                i = 0;
            }
        }
    } else {
        typewriterElement.textContent = currentWord.substring(0, j + 1);
        j++;
        if (j === currentWord.length) {
            isDeleting = true;
            setTimeout(type, 2000); // Pause at end of word
            return;
        }
    }
    setTimeout(type, 50); // Typing speed
}
// Start typing effect only after the rest of the page loads
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById("typewriter")) {
        type();
    }
    displayArticles();
});

// --- HASHNODE ARTICLES FETCHING (No change needed) ---
async function getArticles() {
    // ... your existing getArticles function ...
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

async function displayArticles() {
    const blogContainer = document.getElementById('blog-posts-container');
    const articles = await getArticles();

    if (articles && articles.length > 0) {
        blogContainer.innerHTML = '';
        articles.forEach((post, index) => {
            const { title, brief, url } = post.node;
            
            const blogCardHTML = `
              <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="${(index + 1) * 100}">
                <div class="blog-card">
                    <h5>${title}</h5>
                    <p>${brief}</p>
                    <a href="${url}" class="read-more" target="_blank">Read More <i class="fas fa-arrow-right"></i></a>
                </div>
              </div>
            `;
            blogContainer.innerHTML += blogCardHTML;
        });
        
        setTimeout(() => AOS.refresh(), 100);

    } else if (articles) { 
       blogContainer.innerHTML = `<p style="text-align: center; width: 100%;">No articles found.</p>`;
    }
}