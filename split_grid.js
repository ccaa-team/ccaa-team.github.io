const members = document.querySelectorAll('.member');
const regularGrid = document.querySelector('.regular-grid');

members.forEach((member, index) => {
    const rowIndex = Math.floor(index / 3);
    const colIndex = index % 3;
    member.style.gridRow = `span 1`;
    member.style.gridColumn = `span 1`;
    member.style.gridRowStart = rowIndex + 1;
    member.style.gridColumnStart = colIndex + 1;
});

regularGrid.style.gridAutoRows = 'auto';