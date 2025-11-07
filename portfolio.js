// learning-experience.js
// TSOI Yan Yan's Neural Learning Matrix v10 – Fully Dynamic & Professional
// Converted from HTML → Pure JS + External CSS

document.addEventListener('DOMContentLoaded', () => {
    // === DYNAMIC HTML INJECTION ===
    document.documentElement.innerHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TSOI YAN YAN | NEURAL LEARNING MATRIX v10</title>
    <link rel="stylesheet" href="learning-experience.css">
    <script src="https://d3js.org/d3.v7.min.js"></script>
</head>
<body>
    <canvas id="matrix-bg"></canvas>

    <div class="container">
        <div class="legend-table">
            <h3>DATA LEGEND</h3>
            <table>
                <tr><td><span class="legend-circle" style="background:#FF6F61"></span>Elementary School</td></tr>
                <tr><td><span class="legend-circle" style="background:#6B7280"></span>Middle School</td></tr>
                <tr><td><span class="legend-circle" style="background:#10B981"></span>High School</td></tr>
                <tr><td><span class="legend-circle" style="background:#3B82F6"></span>College</td></tr>
                <tr><td><span class="legend-circle" style="background:#FBBF24"></span>Subjects & Skills</td></tr>
            </table>
        </div>

        <div class="controls">
            <h3>NEURAL CONTROLS</h3>
            <button id="zoomIn">ZOOM +</button>
            <button id="zoomOut">ZOOM -</button>
            <button id="resetView">RESET VIEW</button>
            <button id="fitToScreen">AUTO FIT</button>
        </div>

        <div class="zoom-info">
            SCALE: <span id="zoomLevel">100%</span>
        </div>

        <svg width="1000" height="750" id="main-svg" viewBox="0 0 1000 750">
            <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5"
                        markerWidth="12" markerHeight="12" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" class="arrowhead" />
                </marker>
            </defs>

            <text class="title" x="500" y="70">TSOI YAN YAN'S LEARNING EXPERIENCES</text>

            <!-- Main Nodes -->
            <circle class="main-node elementary" cx="500" cy="180" r="55" data-label="Elementary School"></circle>
            <circle class="main-node middle" cx="500" cy="320" r="55" data-label="Middle School"></circle>
            <circle class="main-node high" cx="500" cy="460" r="55" data-label="High School"></circle>
            <circle class="main-node college" cx="500" cy="600" r="55" data-label="College"></circle>

            <!-- Branch Nodes -->
            <circle class="branch-node" cx="380" cy="150" r="22" data-label="Children's Painting"></circle>
            <circle class="branch-node" cx="380" cy="190" r="22" data-label="Dancing"></circle>
            <circle class="branch-node" cx="620" cy="170" r="22" data-label="Singing"></circle>
            <circle class="branch-node" cx="380" cy="290" r="22" data-label="Latin Dance"></circle>
            <circle class="branch-node" cx="380" cy="330" r="22" data-label="Sketching"></circle>
            <circle class="branch-node" cx="620" cy="310" r="22" data-label="Watercolor"></circle>
            <circle class="branch-node" cx="380" cy="430" r="22" data-label="Micro-Film"></circle>
            <circle class="branch-node" cx="380" cy="470" r="22" data-label="Sculpture"></circle>
            <circle class="branch-node" cx="620" cy="450" r="22" data-label="Photography"></circle>
            <circle class="branch-node" cx="380" cy="560" r="22" data-label="Music"></circle>
            <circle class="branch-node" cx="380" cy="600" r="22" data-label="Programming"></circle>
            <circle class="branch-node" cx="380" cy="640" r="22" data-label="Computers"></circle>
            <circle class="branch-node" cx="620" cy="580" r="22" data-label="Documentaries"></circle>
            <circle class="branch-node" cx="620" cy="620" r="22" data-label="Micro-Films"></circle>

            <!-- Labels -->
            <text class="node-label" x="500" y="180">ELEMENTARY</text>
            <text class="node-label" x="500" y="320">MIDDLE</text>
            <text class="node-label" x="500" y="460">HIGH</text>
            <text class="node-label" x="500" y="600">COLLEGE</text>

            <text class="branch-label" x="380" y="150">PAINTING</text>
            <text class="branch-label" x="380" y="190">DANCING</text>
            <text class="branch-label" x="620" y="170">SINGING</text>
            <text class="branch-label" x="380" y="290">LATIN DANCE</text>
            <text class="branch-label" x="380" y="330">SKETCHING</text>
            <text class="branch-label" x="620" y="310">WATERCOLOR</text>
            <text class="branch-label" x="380" y="430">MICRO-FILM</text>
            <text class="branch-label" x="380" y="470">SCULPTURE</text>
            <text class="branch-label" x="620" y="450">PHOTOGRAPHY</text>
            <text class="branch-label" x="380" y="560">MUSIC</text>
            <text class="branch-label" x="380" y="600">PROGRAMMING</text>
            <text class="branch-label" x="380" y="640">COMPUTERS</text>
            <text class="branch-label" x="620" y="580">DOCUMENTARIES</text>
            <text class="branch-label" x="620" y="620">MICRO-FILMS</text>

            <!-- Links -->
            <path class="link" d="M500,235 L500,265" marker-end="url(#arrow)"></path>
            <path class="link" d="M500,375 L500,405" marker-end="url(#arrow)"></path>
            <path class="link" d="M500,515 L500,545" marker-end="url(#arrow)"></path>

            <path class="branch-link" d="M500,180 L380,150"></path>
            <path class="branch-link" d="M500,180 L380,190"></path>
            <path class="branch-link" d="M500,180 L620,170"></path>
            <path class="branch-link" d="M500,320 L380,290"></path>
            <path class="branch-link" d="M500,320 L380,330"></path>
            <path class="branch-link" d="M500,320 L620,310"></path>
            <path class="branch-link" d="M500,460 L380,430"></path>
            <path class="branch-link" d="M500,460 L380,470"></path>
            <path class="branch-link" d="M500,460 L620,450"></path>
            <path class="branch-link" d="M500,600 L380,560"></path>
            <path class="branch-link" d="M500,600 L380,600"></path>
            <path class="branch-link" d="M500,600 L380,640"></path>
            <path class="branch-link" d="M500,600 L620,580"></path>
            <path class="branch-link" d="M500,600 L620,620"></path>
        </svg>

        <div class="tooltip"></div>
    </div>
</body>
</html>`;

    // === DIGITAL RAIN BACKGROUND ===
    const canvas = document.getElementById('matrix-bg');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrixChars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const fontSize = 16;
    let columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function drawRain() {
        ctx.fillStyle = 'rgba(11, 12, 16, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0ff';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            ctx.fillText(char, x, y);

            if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }
    setInterval(drawRain, 35);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = canvas.width / fontSize;
    });

    // === ZOOM & PAN CONTROLS ===
    let scale = 1, translateX = 0, translateY = 0;
    const minScale = 0.3, maxScale = 6, zoomStep = 0.3;
    let isPanning = false, startX, startY, initialX, initialY;

    const svg = document.getElementById('main-svg');
    const zoomLevel = document.getElementById('zoomLevel');
    const tooltip = document.querySelector('.tooltip');

    function applyTransform() {
        svg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
        zoomLevel.textContent = `${Math.round(scale * 100)}%`;
    }

    function zoomIn() { if (scale < maxScale) { scale += zoomStep; applyTransform(); } }
    function zoomOut() { if (scale > minScale) { scale -= zoomStep; applyTransform(); } }
    function resetView() { scale = 1; translateX = 0; translateY = 0; applyTransform(); }
    function fitToScreen() { scale = 0.8; translateX = 50; translateY = 30; applyTransform(); }

    function startPan(e) { isPanning = true; startX = e.clientX; startY = e.clientY; initialX = translateX; initialY = translateY; svg.style.cursor = 'grabbing'; }
    function pan(e) {
        if (!isPanning) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        translateX = initialX + dx;
        translateY = initialY + dy;
        applyTransform();
    }
    function endPan() { isPanning = false; svg.style.cursor = 'grab'; }

    function handleWheel(e) {
        e.preventDefault();
        const rect = svg.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const delta = e.deltaY > 0 ? -zoomStep : zoomStep;
        const newScale = Math.max(minScale, Math.min(maxScale, scale + delta));
        if (newScale !== scale) {
            const factor = newScale / scale;
            translateX = mouseX - (mouseX - translateX) * factor;
            translateY = mouseY - (mouseY - translateY) * factor;
            scale = newScale;
            applyTransform();
        }
    }

    // Event Listeners
    document.getElementById('zoomIn').onclick = zoomIn;
    document.getElementById('zoomOut').onclick = zoomOut;
    document.getElementById('resetView').onclick = resetView;
    document.getElementById('fitToScreen').onclick = fitToScreen;

    svg.addEventListener('mousedown', startPan);
    document.addEventListener('mousemove', pan);
    document.addEventListener('mouseup', endPan);
    svg.addEventListener('wheel', handleWheel, { passive: false });

    // Tooltip
    document.querySelectorAll('.main-node, .branch-node').forEach(node => {
        node.addEventListener('mouseover', e => {
            tooltip.style.opacity = '1';
            tooltip.innerHTML = `<strong>${node.getAttribute('data-label')}</strong>`;
            tooltip.style.left = (e.pageX + 25) + 'px';
            tooltip.style.top = (e.pageY - 20) + 'px';
        });
        node.addEventListener('mouseout', () => tooltip.style.opacity = '0');
        node.addEventListener('mousemove', e => {
            tooltip.style.left = (e.pageX + 25) + 'px';
            tooltip.style.top = (e.pageY - 20) + 'px';
        });
    });

    applyTransform();
    fitToScreen();

    console.log("TSOI YAN YAN'S NEURAL LEARNING MATRIX v10 LOADED");
});