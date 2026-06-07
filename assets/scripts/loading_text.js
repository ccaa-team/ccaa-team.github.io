const texts = ["CCAA", "CCAA LLC", "CCAA Team", "Communist Christians Against Alzheimers", "The ones feared."];
const loadingText = document.getElementById('desc');
const loadingCursor = document.getElementById('load-cursor');

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

let drawStarted = false;

function startDraw() {
    if (drawStarted) return;
    drawStarted = true;
    for (let i = 0; i < 100; i++) {
        draw()        
    }
    setInterval(draw, 35);
}

function typeWriter(i = random(0, texts.length), index = 0) {
    startDraw();
    if (index <= texts[i].length) {
        loadingText.textContent = "> " + texts[i].substr(0, index);
        loadingCursor.style.display = 'inline';
        setTimeout(() => {
            typeWriter(i, index + 1);
        }, 1000 / texts[i].length);
    } else {
        setTimeout(() => {
            loadingText.style.display = "none";
            loadingCursor.style.display = 'none';
            setTimeout(() => {
                loadingText.innerHTML = texts[i].split('').map(char => {
                    return `<span class="glitch">${char}</span>`;
                }).join('');

                document.querySelector('.container').style.opacity = 1;
                document.querySelector('.content').style.display = "block";
                canvas.style.display = "block";
            }, 200);
        }, 200);
    }
}

typeWriter();