document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.querySelector('header button');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const target = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', target);
            localStorage.setItem('theme', target);
            themeBtn.innerText = target === 'dark' ? 'Light Mode' : 'Dark Mode';
        });
        const saved = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', saved);
        themeBtn.innerText = saved === 'dark' ? 'Light Mode' : 'Dark Mode';
    }

    const track = document.querySelector('.carousel-track');
    const nextBtn = document.querySelector('.nav-arrow');
    let offset = 0;

    nextBtn?.addEventListener('click', () => {
        const itemWidth = 265; // Ширина плашки + gap
        offset = (offset <= -530) ? 0 : offset - itemWidth;
        track.style.transform = translateX(${offset}px);
    });

    const copyBtn = document.querySelector('.about-section button:not(header button)');
    copyBtn?.addEventListener('click', () => {
        const codeText = document.querySelector('pre').innerText;
        navigator.clipboard.writeText(codeText).then(() => {
            const originalText = copyBtn.innerText;
            copyBtn.innerText = "Скопировано!";
            setTimeout(() => copyBtn.innerText = originalText, 2000);
        });
    });

    const runBtn = document.querySelector('.terminal-header button');
    const screen = document.querySelector('.terminal-screen');
    let interval = null;
    let step = 0;
    const lines = ["> MSI_System: Initializing...", "> Loading JSON: 1500 lines...", "> UTF-8 Validation: OK", "> Serialization: COMPLETE"];

    runBtn?.addEventListener('click', () => {
        if (interval) {
            clearInterval(interval);
            interval = null;
            runBtn.innerText = "Run";
            runBtn.classList.remove('btn-stop');
            screen.innerHTML += '<div style="color:red"> [HALTED] </div>';
        } else {
            runBtn.innerText = "Stop";
            runBtn.classList.add('btn-stop');
            screen.innerHTML = ""; step = 0;
            interval = setInterval(() => {
                if (step < lines.length) {
                    const p = document.createElement('div');
                    p.innerText = lines[step];
                    screen.appendChild(p);
                    step++;
                } else {
                    clearInterval(interval);
                    interval = null;
                    runBtn.innerText = "Run";
                    runBtn.classList.remove('btn-stop');
                }
            }, 800);
        }
    });
});
