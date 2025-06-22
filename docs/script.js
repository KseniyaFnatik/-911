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

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(102, 126, 234, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        header.style.backdropFilter = 'none';
    }
});

// Cart functionality
let cartCount = 0;
const cartCountElement = document.querySelector('.cart-count');

document.querySelectorAll('.btn-primary').forEach(button => {
    if (button.textContent === 'В корзину') {
        button.addEventListener('click', function() {
            cartCount++;
            cartCountElement.textContent = cartCount;
            
            // Add animation to cart
            const cart = document.querySelector('.cart');
            cart.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cart.style.transform = 'scale(1)';
            }, 200);
            
            // Show notification
            showNotification('Товар добавлен в корзину!');
        });
    }
});

// Search functionality
const searchInput = document.querySelector('.search input');
const searchButton = document.querySelector('.search button');

searchButton.addEventListener('click', function() {
    performSearch();
});

searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const query = searchInput.value.trim();
    if (query) {
        showNotification(`Поиск: "${query}" - функция в разработке`);
        searchInput.value = '';
    }
}

// Form submission
const contactForm = document.querySelector('.contact-form form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const message = this.querySelector('textarea').value;
    
    if (name && email && phone && message) {
        showNotification('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
        this.reset();
    } else {
        showNotification('Пожалуйста, заполните все поля формы.');
    }
});

// Notification system
function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #667eea;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .product-card, .service-card, .about-content, .contact-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Mobile menu toggle (for future mobile menu implementation)
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('active');
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Product card hover effects
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Tech grid animation
document.querySelectorAll('.tech-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const target = parseInt(statNumber.textContent);
            animateCounter(statNumber, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add smooth reveal animation for sections
const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    section.classList.add('reveal-section');
    revealObserver.observe(section);
});

// Add CSS for reveal animation
const style = document.createElement('style');
style.textContent = `
    .reveal-section {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .reveal-section.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .notification {
        animation: slideIn 0.3s ease;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(400px);
        }
        to {
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Burger menu functionality (только для header)
const headerBurger = document.querySelector('header .burger');
const headerNav = document.querySelector('header .nav');

if (headerBurger && headerNav) {
    headerBurger.addEventListener('click', function() {
        headerBurger.classList.toggle('active');
        headerNav.classList.toggle('active');
        // Блокировка скролла при открытом меню
        if (headerNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Закрытие меню по клику на ссылку
    headerNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                headerBurger.classList.remove('active');
                headerNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
}

// Переход на страницу корзины по клику на иконку корзины (шапка и футер)
document.querySelectorAll('.cart').forEach(cartIcon => {
    cartIcon.addEventListener('click', function(e) {
        // Не срабатывает, если клик по счетчику (span.cart-count)
        if (e.target.classList.contains('cart-count')) return;
        window.location.href = 'cart.html';
    });
});

// Слайдер команды (главная страница)
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.team-slider-track');
    const slides = document.querySelectorAll('.team-slide');
    const prevBtn = document.querySelector('.team-slider-prev');
    const nextBtn = document.querySelector('.team-slider-next');
    if (!track || !slides.length || !prevBtn || !nextBtn) return;

    let current = 0;

    function getSlidesPerView() {
        if (window.innerWidth <= 600) return 1;
        if (window.innerWidth <= 900) return 2;
        return 3;
    }

    function updateSlider() {
        const slidesPerView = getSlidesPerView();
        let slideWidth, gap;
        const slider = document.querySelector('.team-slider');
        if (window.innerWidth <= 600) {
            slideWidth = slider.offsetWidth * 0.9;
            gap = 10;
        } else if (window.innerWidth <= 900) {
            slideWidth = 260;
            gap = 20;
        } else {
            slideWidth = 320;
            gap = 20;
        }
        slides.forEach(slide => {
            slide.style.width = slideWidth + 'px';
        });
        const maxCurrent = Math.max(0, slides.length - slidesPerView);
        if (current > maxCurrent) current = maxCurrent;
        if (current < 0) current = 0;
        const totalWidth = slides.length * slideWidth + (slides.length - 1) * gap;
        const visibleWidth = slider.offsetWidth;
        const maxTranslate = Math.max(0, totalWidth - visibleWidth);
        let translate = current * (slideWidth + gap);
        if (translate > maxTranslate) translate = maxTranslate;
        // Если все слайды помещаются в контейнер, не смещаем
        if (totalWidth <= visibleWidth) {
            track.style.transform = 'translateX(0)';
        } else {
            track.style.transform = `translateX(${-translate}px)`;
        }
        // Управление состоянием стрелок
        if (current <= 0) {
            prevBtn.classList.add('disabled');
        } else {
            prevBtn.classList.remove('disabled');
        }
        if (current >= maxCurrent) {
            nextBtn.classList.add('disabled');
        } else {
            nextBtn.classList.remove('disabled');
        }
    }

    prevBtn.addEventListener('click', () => {
        if (prevBtn.classList.contains('disabled')) return;
        if (current > 0) {
            current--;
            updateSlider();
        }
    });
    nextBtn.addEventListener('click', () => {
        if (nextBtn.classList.contains('disabled')) return;
        const slidesPerView = getSlidesPerView();
        const maxCurrent = Math.max(0, slides.length - slidesPerView);
        if (current < maxCurrent) {
            current++;
            updateSlider();
        }
    });
    window.addEventListener('resize', updateSlider);
    updateSlider();
}); 