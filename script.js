document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeText = document.getElementById('theme-text');
    
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        if (themeText) {
            themeText.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
        }
        localStorage.setItem('theme', theme);
    };

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            applyTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
});

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeText = document.getElementById('theme-text');
    
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        if (themeText) {
            themeText.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
        }
        localStorage.setItem('theme', theme);
    };

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            applyTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    const track = document.getElementById('carousel-track');
    const nextBtn = document.getElementById('next-slide');
    let currentPos = 0;

    if (nextBtn && track) {
        nextBtn.addEventListener('click', () => {
            const itemWidth = track.firstElementChild.offsetWidth + 20;
            
            currentPos = (currentPos + 1) % 2; 
            
            track.style.transform = translateX(-${currentPos * itemWidth}px);
            
            nextBtn.textContent = currentPos === 0 ? '❯' : '❮';
        });
    }


    const terminal = document.getElementById('terminal-out');
    
    const phrases = [
        "[INFO] Initializing min_json_cpp analyzer...",
        "[OK] Detecting C++17 standard support",
        "[RUN] Validating UTF-8 sequences [0x09:50]...",
        "[WARN] Potential deep nesting found, switching to heap stack...",
        "[OK] Processing floating points via std::to_chars...",
        "[SUCCESS] Serialization complete: 1500 lines parsed.",
        "user@terminal:~/projects$ _"
    ];

    let lineIdx = 0;

    function runTerminal() {
        if (lineIdx < phrases.length && terminal) {
            const line = document.createElement('div');
            line.style.marginBottom = "8px";
            
            const currentText = phrases[lineIdx];
            if (currentText.includes("[OK]")) line.style.color = "#27c93f";
            if (currentText.includes("[WARN]")) line.style.color = "#ffbd2e";
            if (currentText.includes("[SUCCESS]")) line.style.color = "#00c6ff";
            
            line.textContent = currentText;
            terminal.appendChild(line);
            
            lineIdx++;
            
            let delay = Math.random() * 500 + 400; 
            if (lineIdx === 1) delay = 1200; // Пауза после старта

            setTimeout(runTerminal, delay);
        }
    }

    if (terminal) {
        runTerminal();
    }
});
