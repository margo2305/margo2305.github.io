document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeText = document.getElementById('theme-text');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeText.innerText = 'Light Mode';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            themeText.innerText = 'Light Mode';
            localStorage.setItem('theme', 'dark');
        } else {
            themeText.innerText = 'Dark Mode';
            localStorage.setItem('theme', 'light');
        }
    });
});
