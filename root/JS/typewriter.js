window.addEventListener('DOMContentLoaded', () => {
    const lines = document.querySelectorAll('.typewriter-line');
    let lineIndex = 0;

    function typeLine(line, text, i, cb, pauseAtArr, speed, finalPause) {
        if (i <= text.length) {
            line.innerHTML = text.slice(0, i) + '<span class="typewriter-cursor">|</span>';
            if (pauseAtArr && pauseAtArr.includes(i)) {
                setTimeout(() => typeLine(line, text, i + 1, cb, pauseAtArr, speed, finalPause), 2000);
            } else {
                setTimeout(() => typeLine(line, text, i + 1, cb, pauseAtArr, speed, finalPause), speed);
            }
        } else {
            if (finalPause) {
                line.innerHTML = text + '<span class="typewriter-cursor">|</span>';
                setTimeout(() => {
                    line.innerHTML = text;
                    setTimeout(cb, 0);
                }, 10000);
            } else {
                line.innerHTML = text;
                setTimeout(cb, 600);
            }
        }
    }

    function typeNextLine() {
        if (lineIndex < lines.length) {
            const line = lines[lineIndex];
            const text = line.getAttribute('data-text');
            let pauseAtArr = null;
            let speed = 55;
            let finalPause = false;
            if (lineIndex === 0) {
                pauseAtArr = [13];
                speed = 90;
            }
            if (lineIndex === 1) pauseAtArr = [text.lastIndexOf('technology.') + 'technology.'.length];
            if (lineIndex === 2) finalPause = true;
            typeLine(line, text, 0, () => {
                lineIndex++;
                typeNextLine();
            }, pauseAtArr, speed, finalPause);
        }
    }

    typeNextLine();
});
