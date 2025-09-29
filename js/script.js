// Smooth scroll for navbar links
document.querySelectorAll('a.nav-link').forEach(link => {
    link.addEventListener('click', function(e){
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if(window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// Fade-in elements on scroll with stagger
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.1, rootMargin:"0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver(function(entries, observer){
    entries.forEach(entry => {
        if(!entry.isIntersecting) return;
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
    });
}, appearOptions);
faders.forEach(fader => appearOnScroll.observe(fader));

// Scroll to top on reload
window.onbeforeunload = function(){ window.scrollTo(0,0); };

// Filter projects
const filterBtns = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        // Staggered fade-in for filtered items
        let delay = 0.1; // starting delay in seconds
        projects.forEach(p => {
            if(filter === 'all' || p.classList.contains(filter)) {
                p.style.display='block';
                p.style.transitionDelay = `${delay}s`;
                delay += 0.1;
            } else {
                p.style.display='none';
            }
        });
    });
});
