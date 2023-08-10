const cursor_element = document.getElementById('cursor');
let isVisible = true;

function toggleCursor() {
  isVisible = !isVisible;
  cursor_element.style.visibility = isVisible ? 'visible' : 'hidden';
}

setInterval(toggleCursor, 500);