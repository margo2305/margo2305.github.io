document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle');
    const themeText = document.getElementById('theme-text');
    const body = document.body;

    if (themeBtn) {
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
    }
    
    const track = document.getElementById('track');
    const prev = document.getElementById('prevBtn');
    const next = document.getElementById('nextBtn');
    const items = document.querySelectorAll('.video-item');
    let currentIndex = 0;

    if (track && next && prev && items.length > 0) {
        const updateCarousel = () => {
            const firstItem = items[0];
            const itemWidth = firstItem.offsetWidth + 20; 
            track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
            
            prev.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
            
            const visibleCount = window.innerWidth > 850 ? 3 : 1;
            const maxIndex = Math.max(0, items.length - visibleCount);
            
            next.style.visibility = currentIndex >= maxIndex ? 'hidden' : 'visible';
        };

        next.addEventListener('click', () => { 
            if (currentIndex < items.length - (window.innerWidth > 850 ? 3 : 1)) {
                currentIndex++; 
                updateCarousel(); 
            }
        });

        prev.addEventListener('click', () => { 
            if (currentIndex > 0) {
                currentIndex--; 
                updateCarousel(); 
            }
        });

        window.addEventListener('resize', updateCarousel);
        updateCarousel(); 
    }

    const copyBtn = document.getElementById('copyBtn');
    const toast = document.getElementById('copyToast');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const code = document.getElementById('cppCode').innerText;
            navigator.clipboard.writeText(code).then(() => {
                toast.style.display = 'block';
                copyBtn.innerText = 'Done!';
                setTimeout(() => {
                    toast.style.display = 'none';
                    copyBtn.innerText = 'Copy';
                }, 2000);
            });
        });
    }
    const runBtn = document.getElementById('runBtn');
    const stopBtn = document.getElementById('stopBtn');
    const termOutput = document.getElementById('termOutput');

    if (runBtn && stopBtn && termOutput) {
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

        runBtn.addEventListener('click', () => {
            termOutput.innerHTML = '<span class="prompt">guest@dev-env:~/json_project$ </span>';
            runBtn.style.display = 'none';
            stopBtn.style.display = 'inline-block';

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
