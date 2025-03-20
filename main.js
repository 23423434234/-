// main.js

// 平滑滚动到锚点链接
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // 计算偏移量（如果您有固定标题）
            const headerOffset = document.querySelector('.primary-nav').offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition - headerOffset;


            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // 将焦点设置到目标元素（为了可访问性）
            targetElement.focus();

             // 如果目标元素是标题，您可能还需要添加：
            if (targetElement.tagName.startsWith('H')) {
              targetElement.setAttribute('tabindex', '-1'); // 使其可聚焦
            }
        }
    });
});

// 移动导航切换
const toggleButton = document.querySelector('.navbar-toggle');
const navMenu = document.querySelector('.primary-nav__menu');

if (toggleButton && navMenu) {
    toggleButton.addEventListener('click', () => {
        const expanded = toggleButton.getAttribute('aria-expanded') === 'true' || false;
        toggleButton.setAttribute('aria-expanded', !expanded);
        navMenu.classList.toggle('is-visible');
    });

    // 单击链接时关闭移动菜单
      navMenu.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {  // 检查单击的元素是否是链接
          navMenu.classList.remove('is-visible');
          toggleButton.setAttribute('aria-expanded', 'false');
        }
    });
}

// 跳过链接功能
const skipLink = document.querySelector('.skip-link');
if (skipLink) {
    skipLink.addEventListener('focus', () => {
        skipLink.style.position = 'fixed'; // 聚焦时将其设为固定定位
        skipLink.style.left = '10px';
        skipLink.style.top = '10px';
    });
}

// 下拉菜单切换（为了键盘的可访问性）
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
  toggle.addEventListener('click', function(event) {
    event.preventDefault(); // 防止默认链接行为
    const dropdownMenu = this.nextElementSibling; // 获取关联的下拉菜单

    // 切换下拉菜单的可见性
     const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
    dropdownMenu.style.display = isExpanded ? 'none' : 'block';

     // 关闭其他打开的下拉菜单（可选）
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        if (menu !== dropdownMenu) {
          menu.style.display = 'none';
        }
      });

  });
});

// 在外部单击时关闭下拉菜单
document.addEventListener('click', function(event) {
    if (!event.target.closest('.dropdown')) {  // 检查单击是否在下拉菜单之外
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.style.display = 'none'; // 隐藏所有下拉菜单
        const toggle = menu.previousElementSibling;
        if(toggle && toggle.classList.contains('dropdown-toggle')) {
          toggle.setAttribute('aria-expanded', 'false');
        }

      });
    }
});