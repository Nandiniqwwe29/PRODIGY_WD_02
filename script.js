let startTime = 0;
let updatedTime = 0;
let difference = 0;
let timerID;
let running = false;
let laps = [];

function startStop() {
    if (running) {
        clearInterval(timerID);
        document.getElementById('startStopBtn').textContent = 'Start';
    } else {
        startTime = new Date().getTime() - difference;
        timerID = setInterval(updateDisplay, 10);
        document.getElementById('startStopBtn').textContent = 'Stop';
    }
    running = !running;
}

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    document.getElementById('display').textContent =
        `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 2)}`;
}

function pad(num, size = 2) {
    let s = "0000" + num;
    return s.substr(s.length - size);
}

function reset() {
    clearInterval(timerID);
    running = false;
    difference = 0;
    laps = [];
    document.getElementById('display').textContent = '00:00:00.00';
    document.getElementById('startStopBtn').textContent = 'Start';
    document.getElementById('laps').innerHTML = '';
}

function recordLap() {
    if (running) {
        const lapTime = document.getElementById('display').textContent;
        laps.push(lapTime);
        const lapList = document.getElementById('laps');
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapList.appendChild(lapItem);
    }
}

// Debugging information
console.log('Script loaded successfully.');
document.addEventListener('DOMContentLoaded', () => {
    console.log('Document loaded successfully.');
    console.log('Initial display time:', document.getElementById('display').textContent);
});
