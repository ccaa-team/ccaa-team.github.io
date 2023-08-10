const colorToggle = document.getElementById("colorToggle");
  const canvas = document.getElementById("matrix-rain");
  const ctx = canvas.getContext("2d");

  let matrix = "abcdefghijklmnopqrstuvwxyz0123456789";
  matrix = matrix.split("");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const font_size = 16;
  const columns = canvas.width / font_size;
  const drops = [];

  for (let i = 0; i < columns; i++) {
    drops[i] = 1;
  }

  let fillColor = "#0F0";

  function generateContrastColor(background) {
    const lum = 0.2126 * parseInt(background.substr(1, 2), 16) +
                0.7152 * parseInt(background.substr(3, 2), 16) +
                0.0722 * parseInt(background.substr(5, 2), 16);
    return lum > 128 ? "#000" : "#FFF";
  }

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = fillColor;
    ctx.font = font_size + "px arial";

    for (let i = 0; i < drops.length; i++) {
      const text = matrix[Math.floor(Math.random() * matrix.length)];
      ctx.fillText(text, i * font_size, drops[i] * font_size);

      if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i]++;
    }
  }

  colorToggle.addEventListener("click", () => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    const contrastColor = generateContrastColor(randomColor);
    fillColor = randomColor;
    ctx.fillStyle = contrastColor;
  });