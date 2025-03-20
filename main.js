// main.js

// 平滑滚动到锚点链接
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // 计算偏移量（如果有固定标题）
            const headerOffset = document.querySelector('.primary-nav').offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // 将焦点设置到目标元素
            targetElement.focus();

            // 如果目标元素是标题，添加 tabindex 属性
            if (targetElement.tagName.startsWith('H')) {
              targetElement.setAttribute('tabindex', '-1');
            }
        }
    });
});

// 移动端导航菜单切换
const toggleButton = document.querySelector('.navbar-toggle');
const navMenu = document.querySelector('.primary-nav__menu');

if (toggleButton && navMenu) {
    toggleButton.addEventListener('click', () => {
        const expanded = toggleButton.getAttribute('aria-expanded') === 'true' || false;
        toggleButton.setAttribute('aria-expanded', !expanded);
        navMenu.classList.toggle('is-visible');
    });

    // 单击链接时关闭移动端菜单
    navMenu.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
          navMenu.classList.remove('is-visible');
          toggleButton.setAttribute('aria-expanded', 'false');
        }
    });
}

// 跳过链接功能
const skipLink = document.querySelector('.skip-link');
if (skipLink) {
    skipLink.addEventListener('focus', () => {
        skipLink.style.position = 'fixed';
        skipLink.style.left = '10px';
        skipLink.style.top = '10px';
    });
}

// 下拉菜单切换（键盘可访问性）
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
  toggle.addEventListener('click', function(event) {
    event.preventDefault();
    const dropdownMenu = this.nextElementSibling;

    // 切换下拉菜单可见性
     const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
    dropdownMenu.style.display = isExpanded ? 'none' : 'block';

     // 关闭其他打开的下拉菜单
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        if (menu !== dropdownMenu) {
          menu.style.display = 'none';
           const toggle = menu.previousElementSibling;
            if(toggle && toggle.classList.contains('dropdown-toggle')) {
                toggle.setAttribute('aria-expanded', 'false');
            }
        }
      });
  });
});

// 在外部单击时关闭下拉菜单
document.addEventListener('click', function(event) {
    if (!event.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.style.display = 'none';
         const toggle = menu.previousElementSibling;
            if(toggle && toggle.classList.contains('dropdown-toggle')) {
                toggle.setAttribute('aria-expanded', 'false');
            }
      });
    }
});