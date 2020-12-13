const MINUTE_IN_MILLISECONDS = 60000;

class Metronome {
    constructor (config) {
        this.min = config.min;
        this.max = config.max;
        this.audio = config.audio;

        this.pendulumNode = config.nodes.pendulum;
        this.weightNode = config.nodes.weight;
        this.bpmNode = config.nodes.bpm;
        this.sliderNode = config.nodes.slider;
        this.playNode = config.nodes.play;

        this.playClass = 'fa-play';
        this.pauseClass = 'fa-pause';

        this.interval = null;
        this.intervalDuration = MINUTE_IN_MILLISECONDS / this.min;

        // initialize metronome
        this.init();
    }

    // for some reason array.prototype.includes doesn't work on my firefox
    contains = (array, item) => array.indexOf(item) > -1;

    playAudio () {
        const audio = new Audio(this.audio); 
        audio.play(); 
    }

    updateBPM () {
        this.bpmNode.innerText = this.sliderNode.value;
        this.intervalDuration = MINUTE_IN_MILLISECONDS / this.sliderNode.value;
    }

    updateAnimationDuration () {
        this.pendulumNode.style.animationDuration = this.weightNode.style.animationDuration = `${this.intervalDuration * 2}ms`;
    }

    toggleAnimation () {
        this.updateAnimationDuration();
        this.pendulumNode.classList.toggle('animation');
        this.weightNode.classList.toggle('animation');
    }

    toggleSound () {
        if (!this.interval) {
            this.interval = setInterval(() => this.playAudio(), this.intervalDuration);
        } else {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    setPauseClass () {
        this.playNode.classList.remove(this.playClass);
        this.playNode.classList.add(this.pauseClass);
    }

    setPlayClass () {
        this.playNode.classList.remove(this.pauseClass);
        this.playNode.classList.add(this.playClass);
    }

    togglePlayButton () {
        const classList = Array.from(this.playNode.classList);
        this.contains(classList, this.playClass) ? this.setPauseClass() : this.setPlayClass();

    }

    toggleMetronome () {
        this.toggleAnimation();
        this.toggleSound();
        this.togglePlayButton();
    }

    handleInput () {
        if (this.interval) this.toggleMetronome();
        this.updateBPM();
    }

    init () {
        this.sliderNode.max = this.max;
        this.sliderNode.min = this.sliderNode.value = this.bpmNode.innerText = this.min;

        this.playNode.addEventListener('click', () => this.toggleMetronome());
        this.sliderNode.addEventListener('input', () => this.handleInput());
    }
}
