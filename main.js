// 平滑滚动到锚点
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

// 导航栏切换功能（适用于移动端）
const toggleButton = document.querySelector('.navbar-toggle');
const navMenu = document.querySelector('.primary-nav__menu');

if (toggleButton && navMenu) {
    toggleButton.addEventListener('click', () => {
        const expanded = toggleButton.getAttribute('aria-expanded') === 'true' || false;
        toggleButton.setAttribute('aria-expanded', !expanded);
        navMenu.classList.toggle('is-visible');
    });
}

// 添加跳过导航的焦点样式
const skipLink = document.querySelector('.skip-link');
if (skipLink) {
    skipLink.addEventListener('focus', () => {
        skipLink.style.position = 'static';
    });
    skipLink.addEventListener('blur', () => {
        skipLink.style.position = 'absolute';
        skipLink.style.left = '-999px';
    });
}