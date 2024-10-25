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

        SpeedReader.fileInput = document.getElementById('fileInput');
        SpeedReader.startBtn = document.getElementById('startBtn');
        SpeedReader.pauseBtn = document.getElementById('pauseBtn');
        SpeedReader.backBtn = document.getElementById('backBtn');
        SpeedReader.forwardBtn = document.getElementById('forwardBtn');
        SpeedReader.speedSlider = document.getElementById('speedSlider');
        SpeedReader.wordDisplay = document.getElementById('wordDisplay');
        SpeedReader.speedValue = document.getElementById('speedValue');

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

    test('Initial button states should be disabled', () => {
        expect(SpeedReader.startBtn.disabled).toBe(true);
        expect(SpeedReader.pauseBtn.disabled).toBe(true);
        expect(SpeedReader.backBtn.disabled).toBe(true);
        expect(SpeedReader.forwardBtn.disabled).toBe(true);
    });

    // "done" parameter is a function provided by Jest for asynchronous tests. Ensures that Jest waits for the asynchronous operations to finish before it moves on to the next test.
    test('handleFileUpload', (done) => {
        // The File class creates a new File object representing a simulated file.
        const file = new File(['Mock file content'], 'mockFile.txt');
        // Creating a mock event that will be passed to handleFileUpload().
        const event = {
            target: {
                files: [file],
            },
        };

        // Creating a mock of FileReader().
        const mockFileReader = {
            // onload will be set to a function in handleFileUpload().
            onload: null,
            readAsText(file) {
                // To prevent warning of "'file' is defined but never used".
                console.log(`Reading file: ${file.name}`);
                // setTimeout() is mimicking how the real FileReader.onload() works, which is asynchronous.
                setTimeout(() => {
                    this.onload({ target: { result: 'Mock file content' } });
                }, 0);
            },
        };

        // Replacing the built-in FileReader() with a mock object that it will return instead.
        global.FileReader = jest.fn(() => mockFileReader);

        SpeedReader.handleFileUpload(event);

        // Since we are mocking the asynchronous onload() we must wait for that to finish. When multiple setTimeout() calls are used, the second one will only run after the first on has finished executing.
        setTimeout(() => {
            try {
                expect(SpeedReader.startBtn.disabled).toBe(false);
                expect(SpeedReader.pauseBtn.disabled).toBe(true);
                expect(SpeedReader.backBtn.disabled).toBe(false);
                expect(SpeedReader.forwardBtn.disabled).toBe(false);
                expect(SpeedReader.words).toEqual(['Mock', 'file', 'content']);
                expect(SpeedReader.currentIndex).toBe(0);
                expect(SpeedReader.wordDisplay.textContent).toBe('');
                done();
            } catch (error) {
                done(error);
            }
        }, 0);
    });
});
