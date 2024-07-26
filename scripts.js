document.addEventListener("DOMContentLoaded", function() {
    function createHalftone(imageSrc) {
        const sourceCanvas = document.getElementById('sourceCanvas');
        const halftoneCanvas = document.getElementById('halftoneCanvas');
        const sourceCtx = sourceCanvas.getContext('2d');
        const halftoneCtx = halftoneCanvas.getContext('2d');

        const img = new Image();
        img.crossOrigin = "Anonymous"; // Allow cross-origin if applicable
        img.src = imageSrc;
        img.onload = () => {
            sourceCanvas.width = img.width;
            sourceCanvas.height = img.height;
            sourceCtx.drawImage(img, 0, 0);

            halftoneCanvas.width = img.width;
            halftoneCanvas.height = img.height;

            const imageData = sourceCtx.getImageData(0, 0, img.width, img.height);
            const data = imageData.data;

            // Halftone effect variables
            const dotSize = 6; // Adjust this value to match the circles in your headline text
            const resolution = 10; // Adjust this value if needed
            const width = img.width;
            const height = img.height;
            const blueColor = "#000AFF"; // Your design's blue color

            halftoneCtx.clearRect(0, 0, width, height);

            for (let y = 0; y < height; y += resolution) {
                for (let x = 0; x < width; x += resolution) {
                    const index = (y * width + x) * 4;
                    const gray = (data[index] + data[index + 1] + data[index + 2]) / 3;
                    const radius = (1 - gray / 255) * dotSize;

                    halftoneCtx.beginPath();
                    halftoneCtx.arc(x, y, radius, 0, Math.PI * 2);
                    halftoneCtx.fillStyle = blueColor;
                    halftoneCtx.fill();
                }
            }
        };

        img.onerror = () => {
            console.error('Error loading the image. Please check the path and try again.');
        };
    }

    // Use the function with an example image
    createHalftone('assets/grad-bw.jpg');

    // Text effect function
    function applyTextEffect(elementId) {
        const element = document.getElementById(elementId);
        const words = element.innerText.split(' ');
        element.innerText = '';

        words.forEach(word => {
            const wordSpan = document.createElement('span');
            word.split('').forEach(letter => {
                const letterSpan = document.createElement('span');
                letterSpan.innerText = letter;
                const randomOffset = Math.floor(Math.random() * 80) - 40; // Random offset between -40 and 40 pixels
                letterSpan.style.display = 'inline-block';
                letterSpan.style.position = 'relative';
                letterSpan.style.top = `${randomOffset}px`;
                wordSpan.appendChild(letterSpan);
            });
            const spaceSpan = document.createElement('span');
            spaceSpan.innerText = ' ';
            wordSpan.appendChild(spaceSpan);

            element.appendChild(wordSpan);
            const lineBreak = document.createElement('br');
            element.appendChild(lineBreak);
        });
    }

    // Check if the screen width is greater than 600px
    if (window.innerWidth > 600) {
        // Apply text effect to header and footer if screen width is greater than 600px
        applyTextEffect('header-text');
        applyTextEffect('footer-text');
    }

    // Function to update time
    function updateTime() {
        const californiaTimeElement = document.getElementById('california-time');
        const nycTimeElement = document.getElementById('nyc-time');

        if (californiaTimeElement && nycTimeElement) {
            const now = new Date();
            const options = { hour: '2-digit', minute: '2-digit', hour12: false };

            const californiaTime = now.toLocaleTimeString('en-US', { ...options, timeZone: 'America/Los_Angeles' });
            const nycTime = now.toLocaleTimeString('en-US', { ...options, timeZone: 'America/New_York' });

            californiaTimeElement.innerText = `LA ${californiaTime}`;
            nycTimeElement.innerText = `NYC ${nycTime}`;
        }
    }

    // Initial time update
    updateTime();

    // Update time every second
    setInterval(updateTime, 1000);
});
