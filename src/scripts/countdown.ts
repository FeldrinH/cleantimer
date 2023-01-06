import * as chrono from 'chrono-node';
import { settings } from './settings';

const timeElement = document.getElementById('time')!;
const containerElement = document.getElementById('container')!;

// Setup countdown timer
function parseTime(time: string | null): number {
    if (!time) return Date.now();

    let results = chrono.parse(time);
    if (results.length === 0) {
        results = chrono.parse('in ' + time);
    }
    return results[0]?.date().getTime() || NaN;
}

const urlParams = new URLSearchParams(window.location.search)
const to = parseTime(urlParams.get('time'))
if (Number.isNaN(to)) {
    timeElement.textContent = '?:??:??';
    
    const errorMessage = `Invalid time: '${urlParams.get('time')}'`;
    setTimeout(() => alert(errorMessage), 100);
    throw errorMessage;
}

function formatTime(totalSeconds: number) {
    if (!settings.negative && totalSeconds < 0) {
        totalSeconds = 0;
    }
    const normalizedSeconds = Math.abs(totalSeconds);
    const hours = Math.floor(normalizedSeconds / 3600)
    const minutes = Math.floor((normalizedSeconds % 3600) / 60)
    const seconds = normalizedSeconds % 60
    return `${totalSeconds < 0 ? '-' : ''}${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

let secondsLeft: number;
let alarmActive = false;

function updateTime() {
    const desiredSecondsLeft = Math.ceil((to - Date.now()) / 1000);
    if (secondsLeft === desiredSecondsLeft) return;
    secondsLeft = desiredSecondsLeft;

    const timeStr = formatTime(secondsLeft);
    timeElement.textContent = timeStr;
    document.title = timeStr + ' | cleantimer'

    const desiredAlarmActive = secondsLeft <= 0;
    if (alarmActive == desiredAlarmActive) return;
    alarmActive = desiredAlarmActive;

    if (alarmActive) {
        containerElement.classList.add('alarm')
    } else {
        containerElement.classList.remove('alarm')
    }
    // TODO: Play audio
}

setInterval(updateTime, 500);
updateTime();
