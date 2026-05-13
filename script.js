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

    const copyBtn = document.getElementById('copy-btn');
    const codeBlock = document.getElementById('cpp-code');

    if (copyBtn && codeBlock) {
        copyBtn.addEventListener('click', () => {
            const textToCopy = codeBlock.textContent.trim();
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = copyBtn.textContent;
                copyBtn.textContent = "Скопировано! ✓";
                copyBtn.classList.add('success');
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                    copyBtn.classList.remove('success');
                }, 2000);
            });
        });
    }

    const terminal = document.getElementById('terminal-out');
    const runBtn = document.getElementById('run-term');
    const stopBtn = document.getElementById('stop-term');

    let termInterval = null;
    let lineIdx = 0;

    const phrases = [
        "[INFO] Initializing min_json_cpp analyzer...",
        "[OK] Detecting C++17 standard support",
        "[RUN] Validating UTF-8 sequences [0x09:50]...",
        "[WARN] Potential deep nesting found, switching to heap stack...",
        "[OK] Processing floating points via std::to_chars...",
        "[SUCCESS] Serialization complete: 1500 lines parsed.",
        "user@terminal:~/projects$ _"
    ];

    function addTerminalLine() {
        if (lineIdx < phrases.length && terminal) {
            const line = document.createElement('div');
            line.style.marginBottom = "8px";
            
            const currentText = phrases[lineIdx];
            if (currentText.includes("[OK]")) line.style.color = "#27c93f";
            if (currentText.includes("[WARN]")) line.style.color = "#ffbd2e";
            if (currentText.includes("[SUCCESS]")) line.style.color = "#00c6ff";
            
            line.textContent = currentText;
            terminal.appendChild(line);
            terminal.scrollTop = terminal.scrollHeight;
            lineIdx++;
        } else {
            resetTerminalUI();
        }
    }

    function resetTerminalUI() {
        clearInterval(termInterval);
        termInterval = null;
        if (runBtn) {
            runBtn.classList.remove('active');
            runBtn.disabled = false;
        }
    }

    if (runBtn && stopBtn && terminal) {
        runBtn.addEventListener('click', () => {
            if (termInterval) return;


if (lineIdx >= phrases.length) {
                terminal.innerHTML = '';
                lineIdx = 0;
            }

            runBtn.classList.add('active');
            runBtn.disabled = true;

            const placeholder = terminal.querySelector('.terminal-placeholder');
            if (placeholder) placeholder.remove();

            termInterval = setInterval(addTerminalLine, 800);
        });

        stopBtn.addEventListener('click', () => {
            if (termInterval) {
                resetTerminalUI();
                const stopMsg = document.createElement('div');
                stopMsg.style.color = "#ff5f56";
                stopMsg.style.fontWeight = "bold";
                stopMsg.textContent = "[HALT] Execution stopped by user.";
                terminal.appendChild(stopMsg);
            }
        });
    }
});
