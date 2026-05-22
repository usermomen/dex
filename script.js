// ============================================================
// MEMO - Main JavaScript (Enhanced)
// ============================================================

// 1. Current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// 2. Navbar scroll effect
const navbar = document.getElementById('navbar');
window.onscroll = () => {
    navbar.classList[window.scrollY > 50 ? 'add' : 'remove']('scrolled');
};

// 3. Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
if (hamburger) {
    hamburger.onclick = () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    };
}

// 4. Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.onclick = () => {
        hamburger?.classList.remove('active');
        navLinks?.classList.remove('active');
    };
});

// 5. Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// 6. Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const checkReveal = () => {
    reveals.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.classList.add('active');
        }
    });
};
window.addEventListener('load', checkReveal);
window.addEventListener('scroll', checkReveal);

// 7. Active link tracking
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');
const setActive = () => {
    let current = '';
    const scrollPos = window.scrollY + 150;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
            current = section.getAttribute('id');
        }
    });
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === current) {
            item.classList.add('active');
        }
    });
};
window.addEventListener('scroll', setActive);
window.addEventListener('load', setActive);

// 8. Form handling with Formspree
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

if (form) {
    form.onsubmit = async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const msg = document.getElementById('message').value.trim();
        
        // Frontend validation
        if (!name || !email || !msg) {
            alert('Please fill all required fields (Name, Email, Message)');
            return false;
        }
        if (!email.includes('@') || !email.includes('.')) {
            alert('Please enter a valid email address');
            return false;
        }
        
        // Submit to Formspree
        const formData = new FormData(form);
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            
            if (response.ok) {
                successMsg.style.display = 'block';
                form.reset();
                setTimeout(() => {
                    successMsg.style.display = 'none';
                }, 5000);
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            alert('Network error. Please try again.');
        }
    };
}