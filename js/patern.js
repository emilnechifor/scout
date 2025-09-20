const paternimg = [
    [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0],
    [0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0],
    [0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0] 
];
function createPatternRows() {
    const container = document.querySelector('.pattern-container');
    paternimg.forEach((row, index) => {
        const div = document.createElement('div');
        div.className = 'pattern-row';
        div.dataset.row = (index + 1).toString(); // Set data-row attribute
        container.appendChild(div);
    });

    // Update grid-template-rows to match the number of rows
    container.style.gridTemplateRows = `repeat(${paternimg.length}, var(--dot-size))`;
}
function setDynamicBackgrounds() {
    const dotSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--dot-size'));
    const rows = document.querySelectorAll('.pattern-row');

    rows.forEach((row, rowIndex) => {
        let svgContent = `
            <svg width="${20 * dotSize}" height="${dotSize}" viewBox="0 0 ${20 * dotSize} ${dotSize}" xmlns="http://www.w3.org/2000/svg">
                <rect width="${20 * dotSize}" height="${dotSize}" fill="${getComputedStyle(document.documentElement).getPropertyValue('--background-color')}" />
        `;

        paternimg[rowIndex].forEach((dot, dotIndex) => {
            if (dot !== 0) {
                const color = dot === 1 ? 'red' : 'red';
                svgContent += `<rect x="${dotIndex * dotSize}" width="${dotSize}" height="${dotSize}" fill="${color}"/>`;
            }
        });

        svgContent += '</svg>';

        const svgDataUri = encodeURIComponent(svgContent)
            .replace(/'/g, "%27")
            .replace(/"/g, "%22");
        row.style.backgroundImage = `url("data:image/svg+xml;charset=utf-8,${svgDataUri}")`;
    });
}
document.addEventListener('DOMContentLoaded', () => {
    createPatternRows();
    setDynamicBackgrounds();
});
// Optionally, listen for changes to --dot-size if you plan to change it dynamically
/*             const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
        if (entry.target === document.documentElement) {
            setDynamicBackground();
        }
    }
});
resizeObserver.observe(document.documentElement); */
