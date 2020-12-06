const TICK_SOUND = 'tick.mp3';
const RANGE_MIN = 40;
const RANGE_MAX = 220;

const metronome = new Metronome({
    bpm: 120,
    min: RANGE_MIN,
    max: RANGE_MAX,
    audio: TICK_SOUND,
    nodes: {
        pendulum: document.getElementById('pendulum'),
        weight: document.getElementById('weight'),
        bpm: document.getElementById('bpm'),
        slider: document.getElementById('slider'),
        minus: document.getElementById('slider-btn-minus'),
        plus: document.getElementById('slider-btn-plus'),
        play: document.getElementById('play-button')
    }
});

metronome.init();
