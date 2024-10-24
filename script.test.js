/**
 * @jest-environment jsdom
 */

const SpeedReader = require('./script.js');

// Grouping all test cases together.
describe('Speed Reader App', () => {
    // Reset the DOM after each test.
    beforeEach(() => {
        document.body.innerHTML = `
        <div class="container">
            <input type="file" id="fileInput" accept=".txt">
            <div class="controls">
                <button id="startBtn" disabled>Start</button>
                <button id="pauseBtn" disabled>Pause</button>
                <button id="backBtn" disabled>Back</button>
                <button id="forwardBtn" disabled>Forward</button>
            </div>
            <div class="speed-control">
                <label for="speedSlider">Speed (ms):</label>
                <input type="range" id="speedSlider" min="100" max="1000" value="500">
                <span id="speedValue">500</span>
            </div>
            <div id="wordDisplay"></div>
        </div>
        `;

        SpeedReader.words = [];
        SpeedReader.currentIndex = 0;
        SpeedReader.isReading = false;
        SpeedReader.timeoutId = null;
        SpeedReader.speed = 500;
        SpeedReader.initialized = false;

        SpeedReader.initialize();
    });

    afterEach(() => {
        jest.clearAllTimers();
        document.body.innerHTML = '';
    });
});
