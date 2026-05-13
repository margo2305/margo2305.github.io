document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        if (themeIcon) {
            themeIcon.textContent = newTheme === 'dark' ? 'Light' : 'Dark';
        }
    };

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (themeIcon) {
            themeIcon.textContent = savedTheme === 'dark' ? 'Light' : 'Dark';
        }
    }
});