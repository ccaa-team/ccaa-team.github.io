document.addEventListener('DOMContentLoaded', function() {
    const members = Array.from(document.querySelectorAll('.member'));
    const regularGrid = document.querySelector('.regular-grid');

    function updateGridLayout() {
        const containerWidth = regularGrid.clientWidth; // Use clientWidth here
        const minMemberWidth = 300;
        const gap = 10;

        const membersPerRow = Math.max(1,Math.min(3, Math.floor((containerWidth + gap) / (minMemberWidth + gap))));

        members.forEach((member, index) => {
            const row = Math.floor(index / membersPerRow);
            const col = index % membersPerRow;
            member.style.gridRow = `${row + 1} / span 1`;
            member.style.gridColumn = `${col + 1} / span 1`;
        });
    }

    function waitForVisibility() {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateGridLayout();
                    observer.disconnect();
                }
            });
        });

        observer.observe(regularGrid);
    }

    waitForVisibility();

    window.addEventListener('resize', () => {
        updateGridLayout();
    });
});