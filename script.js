const SpeedReader = {
    words: [],
    currentIndex: 0,
    isReading: false,
    timeoutId: null,
    speed: 500,
    initialized: false,

    fileInput: document.getElementById('fileInput'),
    startBtn: document.getElementById('startBtn'),
    pauseBtn: document.getElementById('pauseBtn'),
    backBtn: document.getElementById('backBtn'),
    forwardBtn: document.getElementById('forwardBtn'),
    speedSlider: document.getElementById('speedSlider'),
    wordDisplay: document.getElementById('wordDisplay'),
    speedValue: document.getElementById('speedValue'),

    displayNextWord() {
        this.currentIndex++;
        if (this.currentIndex < this.words.length) {
            this.displayWord();
        }
    },

    displayWord() {
        this.wordDisplay.textContent = this.words[this.currentIndex];
    },

    handleFileUpload(event) {
        // event.target.files returns a list so we are grabbing the first file on that list.
        const file = event.target.files[0];

        if (file) {
            // FileReader() is used to asynchronously read the contents of the file.
            const reader = new FileReader();

            // onload is used to define a function that will be executed when readAsText() has successfully completed.
            reader.onload = (e) => {
                // Contains the text from the files as as string. "\s is a regular expression for any whitespace character, which includes spaces, tabs, and newlines. "+" means "\s+" matches one or more whitespace characters. The two forward slashes just tell JavaScript that what's between them is a regular expression.
                this.words = e.target.result.split(/\s+/);
                this.currentIndex = 0;
                this.updateButtonStates();
            };
            // Read the contents as plain text.
            reader.readAsText(file);
        }
    },

    initialize() {
        this.fileInput.addEventListener('change', (event) =>
            this.handleFileUpload(event)
        );
        this.startBtn.addEventListener('click', () => this.startReading());
        this.pauseBtn.addEventListener('click', () => this.pauseReading());
        this.backBtn.addEventListener('click', () => this.moveWord(-1));
        this.forwardBtn.addEventListener('click', () => this.moveWord(1));
        this.speedSlider.addEventListener('input', () => this.updateSpeed());
    },

    moveWord(direction) {
        // Math.max and Math.min prevent out-of-bounds error when navigating through the words.
        this.currentIndex = Math.max(
            0,
            Math.min(this.words.length - 1, this.currentIndex + direction)
        );
        this.displayWord();
    },

    pauseReading() {
        this.isReading = false;
        clearTimeout(this.timeoutId);
        this.updateButtonStates();
    },

    scheduleTick() {
        // Cancel timer that was previously established by setTimeout()
        clearTimeout(this.timeoutId);
        if (this.isReading) {
            // setTimeout() executes the piece of code after a designated delay (this.speed).
            this.timeoutId = setTimeout(() => {
                this.displayNextWord();

                if (this.currentIndex < this.words.length) {
                    this.scheduleTick();
                } else {
                    this.pauseReading();
                    this.startBtn.disabled = false;
                }
            }, this.speed);
        }
    },

    startReading() {
        // If we are at the last word, loop back to the beginning.
        if (this.currentIndex >= this.words.length) {
            this.currentIndex = 0;
        }
        this.isReading = true;
        this.displayWord();
        this.scheduleTick();
        this.updateButtonStates();
    },

    updateButtonStates() {
        this.startBtn.disabled = this.isReading || this.words.length === 0;
        this.pauseBtn.disabled = !this.isReading;
        this.backBtn.disabled = this.isReading || this.words.length === 0;
        this.forwardBtn.disabled = this.isReading || this.words.length === 0;
        this.speedSlider.disabled = this.isReading;
    },

    updateSpeed() {
        this.speed = parseInt(this.speedSlider.value);
        this.speedValue.textContent = this.speed;
    },
};

// Initialize if on a browser environment.
if (typeof window !== 'undefined') {
    // SpeedReader.initialize() is triggered when the HTML document has been completely loaded and parsed (ensures all elements in the document are available for manipulation).
    document.addEventListener('DOMContentLoaded', () =>
        SpeedReader.initialize()
    );
}

// // Checking whether the code is running in a Node.js environment or a CommonJS module environment.
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SpeedReader;
}
