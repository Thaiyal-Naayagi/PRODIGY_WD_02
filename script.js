const stopWatch = document.getElementById('stopWatchDisplay');
const start = document.getElementById('start');
const pause = document.getElementById('pause');
const lap = document.getElementById('lap');
const reset = document.getElementById('reset');
const lapLists = document.getElementById('lists');

let startTime = 0;
let currentTime = 0;
let lapList = [];
let paused = true;
let interval;

function format(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor(time % 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
}

function work() {
        startTime = new Date().getTime() - currentTime;
        paused = false;
        interval = setInterval(() => {
            currentTime = new Date().getTime() - startTime;
            stopWatch.textContent = format(currentTime);
        }, 10);
}

function stop() {
    paused = true;
    clearInterval(interval);
}

function ret() {
    startTime = 0;
    currentTime = 0;
    paused = true;
    lapList = [];
    stopWatch.textContent = '00:00:00:000';
    lapLists.innerHTML = '';
}

function addLap() {
    const lapTime = currentTime;
    lapList.push(lapTime);
    const lapListItem = document.createElement('li');
    lapListItem.textContent = `Lap ${lapList.length}: ${format(lapTime)}`;
    lapLists.appendChild(lapListItem);
}

start.addEventListener('click', work);
pause.addEventListener('click', stop);
reset.addEventListener('click', ret);
lap.addEventListener('click', addLap);
