document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        
        if (body.classList.contains('dark-theme')) {
            themeToggle.innerText = 'Light Mode';
        } else {
            themeToggle.innerText = 'Dark Mode';
        }
    });

    const track = document.getElementById('carouselTrack');
    const nextBtn = document.getElementById('nextBtn');

    if (nextBtn && track) {
        nextBtn.addEventListener('click', () => {
            const cardWidth = track.querySelector('.work-card').offsetWidth + 20;
            
            if (track.scrollLeft + track.offsetWidth >= track.scrollWidth - 10) {
                track.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                track.scrollBy({ left: cardWidth, behavior: 'smooth' });
            }
        });
    }

    const copyBtn = document.getElementById('copyCodeBtn');
    const codeBlock = document.getElementById('cppCode');

    copyBtn.addEventListener('click', () => {
        const text = codeBlock.innerText;
        navigator.clipboard.writeText(text).then(() => {
            const originalText = copyBtn.innerText;
            copyBtn.innerText = 'Скопировано!';
            copyBtn.style.background = '#2e7d32'; 
            
            setTimeout(() => {
                copyBtn.innerText = originalText;
                copyBtn.style.background = ''; 
            }, 2000);
        });
    });

    const runBtn = document.getElementById('runBtn');
    const terminalOutput = document.getElementById('terminalOutput');

    runBtn.addEventListener('click', () => {
        terminalOutput.innerHTML = '<div class="line">C:\\Users\\JSON> g++ main.cpp -o solution</div>';
        
        setTimeout(() => {
            terminalOutput.innerHTML += '<div class="line">Компиляция... [##########] 100%</div>';
        }, 600);

        setTimeout(() => {
            terminalOutput.innerHTML += '<div class="line" style="color: #fff;">Running executable...</div>';
            terminalOutput.innerHTML += '<div class="line" style="color: #00ff41;">Serialized: {"title":"JSON in C++", "pages":1500, "author":"P. Novikov"}</div>';
            terminalOutput.innerHTML += '<div class="line">C:\\Users\\Margarita> <span class="cursor">_</span></div>';
        }, 1500);
    });
});
