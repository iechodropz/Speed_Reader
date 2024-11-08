# Speed Reader

A lightweight web application that helps users read test faster. The app displays one word at a time at a customizable speed, helping users improve their reading speed while maintaining comprehension.

## Features

* Upload and read text files
* Adjustable reading speed (in milliseconds)
* Play/pause functionality
* Navigate words manually (forward/backward)

## Getting Started

### Prerequisites

No special prerequisites are required. The application runs in any modern web browser.

### Installation

1. Clone this repository or download the files:
   - `index.html`
   - `script.js`
   - `styles.css`
2. Open `index.html` in a web browser to start using the application.

## Usage

1. Open the application in your web browser.
2. Click "Choose File" to upload a text file
3. Use the controls to interact with the reader:
   - **Start**: Begin reading from the current position
   - **Pause**: Pause the reading
   - **Back**: Move to the previous word (available when paused)
   - **Forward**: Move to the next word (available when paused)
4. Adjust the reading speed using the slider (speed is in milliseconds between words)

## Technical Details

### Components

* **HTML**: Provides the structure and controls for the application
* **CSS**: Handles styling and responsive design
* **JavaScript**: Implements the core functionality through the `SpeedReader` object
