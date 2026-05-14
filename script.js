document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle');
    const themeText = document.getElementById('theme-text');
    const body = document.body;

    const savedTheme = localStorage.getItem('site-theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (themeText) themeText.innerText = 'Light Mode';
    }

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
    
        localStorage.setItem('site-theme', isDark ? 'dark' : 'light');
        
        if (themeText) {
            themeText.innerText = isDark ? 'Light Mode' : 'Dark Mode';
        }
    });

    const track = document.getElementById('track');
    const prev = document.getElementById('prevBtn');
    const next = document.getElementById('nextBtn');
    let currentIndex = 0;

    if (track && next && prev) {
        const updateCarousel = () => {
            const itemWidth = document.querySelector('.video-item').offsetWidth + 20; 
            track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
            
            prev.style.display = currentIndex === 0 ? 'none' : 'block';
            const maxIndex = track.children.length - (window.innerWidth > 850 ? 3 : 1);
            next.style.display = currentIndex >= maxIndex ? 'none' : 'block';
        };

        next.addEventListener('click', () => {
            currentIndex++;
            updateCarousel();
        });

        prev.addEventListener('click', () => {
            currentIndex--;
            updateCarousel();
        });

        window.addEventListener('resize', updateCarousel);
    }

    const copyBtn = document.getElementById('copyBtn');
    const cppCode = document.getElementById('cppCode');
    const toast = document.getElementById('copyToast');

    if (copyBtn && cppCode) {
        copyBtn.addEventListener('click', () => {
            const text = cppCode.innerText;
            navigator.clipboard.writeText(text).then(() => {
                if (toast) {
                    toast.style.display = 'block';
                    setTimeout(() => { toast.style.display = 'none'; }, 2000);
                }
                const originalText = copyBtn.innerText;
                copyBtn.innerText = 'Done!';
                setTimeout(() => { copyBtn.innerText = originalText; }, 1500);
            });
        });
    }

    const runBtn = document.getElementById('runBtn');
    const stopBtn = document.getElementById('stopBtn');
    const termOutput = document.getElementById('termOutput');

    if (runBtn && stopBtn && termOutput) {
        runBtn.addEventListener('click', () => {
            termOutput.innerHTML = '<span class="prompt">guest@dev-env:~/json_project$ </span>';
            
            runBtn.style.display = 'none';
            stopBtn.style.display = 'inline-block';
            
            const addLine = (content, delay) => {
                return new Promise(resolve => {
                    setTimeout(() => {
                        const div = document.createElement('div');
                        div.innerHTML = content;
                        termOutput.appendChild(div);
                        resolve();
                    }, delay);
                });
            };

            addLine('<span style="color: #abb2bf;">[1/1] Compiling min_json.cpp...</span>', 400)
                .then(() => addLine('<span style="color: #98c379;">[OK] Executing binary...</span>', 600))
                .then(() => addLine(`<code style="color: #d19a66;">{
  "status": "success",
  "data": 200
}</code>`, 400));
        });

        stopBtn.addEventListener('click', () => {
            stopBtn.style.display = 'none';
            runBtn.style.display = 'inline-block';
            termOutput.innerHTML = '<span class="prompt">guest@dev-env:~/json_project$ </span>';
        });
    }
});
