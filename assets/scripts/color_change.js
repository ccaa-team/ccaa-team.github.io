function changeMatrixColor() {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    const contrastColor = generateContrastColor(randomColor);
    fillColor = randomColor;
    ctx.fillStyle = contrastColor;
}

setInterval(changeMatrixColor, 20000);