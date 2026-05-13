document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle');
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
    };
    themeBtn?.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        applyTheme(current === 'dark' ? 'light' : 'dark');
    });
    applyTheme(localStorage.getItem('portfolio-theme') || 'light');

    const track = document.getElementById('carousel-track');
    const nextBtn = document.getElementById('next-slide');
    let index = 0;

    nextBtn?.addEventListener('click', () => {
        const items = document.querySelectorAll('.carousel-item');
        index = (index + 1) % items.length;
        const width = items[0].offsetWidth + 20;
        track.style.transform = translateX(-${index * width}px);
    });

    const copyBtn = document.getElementById('copy-btn');
    copyBtn?.addEventListener('click', () => {
        const code = document.querySelector('code').innerText;
        navigator.clipboard.writeText(code).then(() => {
            copyBtn.innerText = "Copied!";
            setTimeout(() => copyBtn.innerText = "Copy", 2000);
        });
    });

    const actionBtn = document.getElementById('term-action');
    const screen = document.getElementById('terminal-screen');
    let interval = null;
    let step = 0;
    const logs = ["> System Check...", "> Loading C++ JSON Parser...", "> Time: 01:44 - UTF8 OK", "> Time: 17:23 - Speed optimized", "> Done."];

    actionBtn?.addEventListener('click', () => {
        if (interval) {
            clearInterval(interval);
            interval = null;
            actionBtn.innerText = "Run";
            actionBtn.className = "term-btn-toggle btn-run";
            screen.innerHTML += <div style="color:red"> [HALTED] </div>;
        } else {
            actionBtn.innerText = "Stop";
            actionBtn.className = "term-btn-toggle btn-stop";
            if (step >= logs.length) { screen.innerHTML = ""; step = 0; }
            
            interval = setInterval(() => {
                if (step < logs.length) {
                    const line = document.createElement('div');
                    line.innerText = logs[step];
                    screen.appendChild(line);
                    step++;
                } else {
                    clearInterval(interval);
                    interval = null;
                    actionBtn.innerText = "Run";
                    actionBtn.className = "term-btn-toggle btn-run";
                }
            }, 800);
        }
    });
});
