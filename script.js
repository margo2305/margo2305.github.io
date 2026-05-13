document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.querySelector('header button');
    themeBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
        themeBtn.innerText = isDark ? 'Dark Mode' : 'Light Mode';
    });

    const track = document.querySelector('.carousel-track');
    const btnNext = document.querySelector('.carousel-wrapper button');
    let offset = 0;

    btnNext.addEventListener('click', () => {
        offset = (offset <= -600) ? 0 : offset - 300;
        track.style.transform = translateX(${offset}px);
    });

    const copyBtn = document.querySelector('.about-section button'); // Кнопка "Копировать"
    copyBtn.addEventListener('click', () => {
        const code = document.querySelector('pre').innerText;
        navigator.clipboard.writeText(code);
        copyBtn.innerText = "Готово!";
        setTimeout(() => copyBtn.innerText = "Копировать", 2000);
    });

    const runBtn = document.querySelector('.terminal-bar button');
    const screen = document.querySelector('.terminal-screen');
    let timer = null;
    let i = 0;
    const lines = ["> Init...", "> Loading JSON...", "> Check UTF-8: OK", "> Success!"];

    runBtn.addEventListener('click', () => {
        if (timer) {
            clearInterval(timer);
            timer = null;
            runBtn.innerText = "Run";
            runBtn.classList.remove('stop');
        } else {
            runBtn.innerText = "Stop";
            runBtn.classList.add('stop');
            screen.innerHTML = ""; i = 0;
            timer = setInterval(() => {
                if (i < lines.length) {
                    screen.innerHTML += <div>${lines[i]}</div>;
                    i++;
                } else {
                    clearInterval(timer);
                    timer = null;
                    runBtn.innerText = "Run";
                    runBtn.classList.remove('stop');
                }
            }, 800);
        }
    });
});
