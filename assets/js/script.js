// Стоматология на Заславской-17 - JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Инициализация всех компонентов
    initMobileMenu();
    initSmoothScrolling();
    initScrollToTop();
    initActiveNavigation();
    initFormSubmission();
    initAnimations();
    initPhoneFormatting();
    
    console.log('Стоматология на Заславской-17 - сайт загружен');
});

// Мобильное меню
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            
            // Анимация иконки гамбургера
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (nav.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(6px, 6px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(6px, -6px)';
                } else {
                    span.style.transform = '';
                    span.style.opacity = '';
                }
            });
        });
        
        // Закрытие меню при клике на ссылку
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            });
        });
    }
}

// Плавная прокрутка
function initSmoothScrolling() {
    // Плавная прокрутка для всех внутренних ссылок
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Кнопка "Наверх"
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (scrollToTopBtn) {
        // Показать/скрыть кнопку при прокрутке
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        // Прокрутка наверх при клике
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Активная навигация
function initActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id], .hero[id]');
    
    function updateActiveNavigation() {
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavigation);
}

// Обработка форм
function initFormSubmission() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Валидация
            if (!validateForm(data)) {
                return;
            }
            
            // Симуляция отправки
            submitForm(data, form);
        });
    });
}

function validateForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Введите корректное имя');
    }
    
    if (!data.phone || !isValidPhone(data.phone)) {
        errors.push('Введите корректный номер телефона');
    }
    
    if (errors.length > 0) {
        showNotification('Ошибка: ' + errors.join(', '), 'error');
        return false;
    }
    
    return true;
}

function isValidPhone(phone) {
    const phoneRegex = /^\+?375\s?\(?(17|29|33|44|25)\)?\s?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function submitForm(data, form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Показываем состояние загрузки
    submitBtn.textContent = 'Отправляем...';
    submitBtn.disabled = true;
    
    // Симулируем отправку (в реальном проекте здесь был бы AJAX запрос)
    setTimeout(() => {
        console.log('Данные формы:', data);
        
        // Сброс формы
        form.reset();
        
        // Восстанавливаем кнопку
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Показываем уведомление
        showNotification('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в течение 15 минут.', 'success');
        
        // Аналитика (в реальном проекте)
        // gtag('event', 'form_submit', { 'event_category': 'engagement' });
        
    }, 1500);
}

// Уведомления
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Добавляем стили если их еще нет
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                max-width: 400px;
                padding: 1rem;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                z-index: 10000;
                animation: slideInRight 0.3s ease-out;
            }
            .notification-success {
                background: #d4edda;
                color: #155724;
                border: 1px solid #c3e6cb;
            }
            .notification-error {
                background: #f8d7da;
                color: #721c24;
                border: 1px solid #f5c6cb;
            }
            .notification-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
            }
            .notification-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                opacity: 0.7;
            }
            .notification-close:hover {
                opacity: 1;
            }
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Закрытие уведомления
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Автоудаление через 5 секунд
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Форматирование номера телефона
function initPhoneFormatting() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.startsWith('375')) {
                // Белорусский формат
                if (value.length >= 3) {
                    let formatted = '+375';
                    if (value.length > 3) {
                        formatted += ' (' + value.substring(3, 5);
                        if (value.length > 5) {
                            formatted += ') ' + value.substring(5, 8);
                            if (value.length > 8) {
                                formatted += '-' + value.substring(8, 10);
                                if (value.length > 10) {
                                    formatted += '-' + value.substring(10, 12);
                                }
                            }
                        }
                    }
                    e.target.value = formatted;
                }
            } else if (value.length > 0) {
                // Добавляем код страны автоматически
                e.target.value = '+375 ' + value;
            }
        });
        
        // Установка placeholder
        if (!input.placeholder) {
            input.placeholder = '+375 (29) 123-45-67';
        }
    });
}

// Анимации при появлении элементов
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами
    const animatedElements = document.querySelectorAll('.service-card, .about-feature, .contact-item');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Обработчики кликов для кнопок
document.addEventListener('click', function(e) {
    // Кнопка записи на прием
    if (e.target.classList.contains('appointment-btn') || 
        e.target.textContent.includes('Записаться')) {
        e.preventDefault();
        
        const contactsSection = document.getElementById('contacts');
        if (contactsSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = contactsSection.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Фокус на форме
            setTimeout(() => {
                const nameInput = document.getElementById('name');
                if (nameInput) {
                    nameInput.focus();
                }
            }, 800);
        }
    }
    
    // Кнопка "Наши услуги"
    if (e.target.textContent.includes('Наши услуги')) {
        e.preventDefault();
        
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = servicesSection.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // Кнопки "Подробнее" у услуг (пока неактивны)
    if (e.target.textContent === 'Подробнее') {
        e.preventDefault();
        showNotification('Эта функция будет доступна в ближайшее время. Для получения подробной информации свяжитесь с нами по телефону.', 'info');
    }
});

// Утилиты
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Автоматическая прокрутка вверх при смене страницы (компонент из требований)
function scrollToTopOnPageChange() {
    // Этот компонент будет полезен при добавлении других страниц
    // Пока реализуем для случая возврата к началу страницы
    window.addEventListener('beforeunload', function() {
        window.scrollTo(0, 0);
    });
}

scrollToTopOnPageChange();

// Обработка ошибок изображений
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        console.log('Ошибка загрузки изображения:', e.target.src);
        // Можно установить запасное изображение
        // e.target.src = 'assets/placeholder.jpg';
    }
}, true);

// Lazy loading для изображений (если браузер не поддерживает нативно)
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}