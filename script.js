document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle');
    const themeText = document.getElementById('theme-text');
    const body = document.body;

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            themeText.innerText = 'Light Mode';
        } else {
            themeText.innerText = 'Dark Mode';
        }
    });

    const track = document.getElementById('track');
    const prev = document.getElementById('prevBtn');
    const next = document.getElementById('nextBtn');
    let position = 0;

    if (track && next && prev) {
        next.addEventListener('click', () => {
            position -= 100; 
            track.style.transform = `translateX(${position}%)`;
            next.style.display = 'none';
            prev.style.display = 'block';
        });

        prev.addEventListener('click', () => {
            position += 100; 
            track.style.transform = `translateX(${position}%)`;
            prev.style.display = 'none';
            next.style.display = 'block';
        });
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
            runBtn.style.display = 'none';
            stopBtn.style.display = 'inline-block';
            
            const line1 = document.createElement('div');
            line1.innerHTML = '<span style="color: #abb2bf;">[1/1] Compiling min_json.cpp...</span>';
            termOutput.appendChild(line1);

            setTimeout(() => {
                const line2 = document.createElement('div');
                line2.innerHTML = '<span style="color: #98c379;">[OK] Executing binary...</span>';
                termOutput.appendChild(line2);
                
                const line3 = document.createElement('div');
                line3.style.marginTop = '5px';
                line3.innerHTML = `<code style="color: #d19a66;">{<br>&nbsp;&nbsp;"status": "success",<br>&nbsp;&nbsp;"data": 200<br>}</code>`;
                termOutput.appendChild(line3);
            }, 800);
        });

        stopBtn.addEventListener('click', () => {
            stopBtn.style.display = 'none';
            runBtn.style.display = 'inline-block';
            termOutput.innerHTML = '<span class="prompt">guest@dev-env:~/json_project$ </span>';
        });
    }
});
