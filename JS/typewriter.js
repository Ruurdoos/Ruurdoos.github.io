// Typewriter effect for hero text, line by line
window.addEventListener('DOMContentLoaded', () => {
    const lines = document.querySelectorAll('.typewriter-line');
    let lineIndex = 0;

    function typeLine(line, text, i, cb, pauseAtArr, speed, finalPause) {
        if (i <= text.length) {
            line.innerHTML = text.slice(0, i) + '<span class="typewriter-cursor">|</span>';
            // Spezialpausen an mehreren Stellen
            if (pauseAtArr && pauseAtArr.includes(i)) {
                setTimeout(() => typeLine(line, text, i + 1, cb, pauseAtArr, speed, finalPause), 2000); // 3 Sekunden Pause
            } else {
                setTimeout(() => typeLine(line, text, i + 1, cb, pauseAtArr, speed, finalPause), speed);
            }
        } else {
            // Wenn finalPause gesetzt ist, Cursor 10 Sekunden blinken lassen
            if (finalPause) {
                line.innerHTML = text + '<span class="typewriter-cursor">|</span>';
                setTimeout(() => {
                    line.innerHTML = text; // Cursor entfernen
                    setTimeout(cb, 0);
                }, 10000); // 10 Sekunden
            } else {
                line.innerHTML = text; // Remove cursor after line is done
                setTimeout(cb, 600); // nach Zeile etwas mehr Pause
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
                speed = 90; // Erste Zeile langsamer
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
