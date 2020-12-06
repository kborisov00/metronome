const MINUTE_IN_MILLISECONDS = 60000;

class Metronome {
    constructor (config) {
        this.bpm = config.bpm;
        this.min = config.min;
        this.max = config.max;
        this.audio = config.audio;

        this.pendulumNode = config.nodes.pendulum;
        this.weightNode = config.nodes.weight;
        this.bpmNode = config.nodes.bpm;
        this.sliderNode = config.nodes.slider;
        this.minusNode = config.nodes.minus;
        this.plusNode = config.nodes.plus;
        this.playNode = config.nodes.play;

        this.interval = null;
        this.intervalDuration = MINUTE_IN_MILLISECONDS / this.bpm;
    }

    playAudio () {
        const audio = new Audio(this.audio); 
        audio.play(); 
    }

    updateAnimationDuration () {
        this.pendulumNode.style.animationDuration = this.weightNode.style.animationDuration = `${this.intervalDuration * 2}ms`;
    }

    toggleSound () {
        if (!this.interval) {
            this.interval = setInterval(() => this.playAudio(), this.intervalDuration);
        } else {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    toggleAnimation () {
        this.updateAnimationDuration();
        this.pendulumNode.classList.toggle('animation');
        this.weightNode.classList.toggle('animation');
    }

    toggleMetronome (e) {
        this.toggleAnimation();
        this.toggleSound();
        this.togglePlayButton(e);
    }

    // for some reason array.prototype.includes doesn't work on my firefox
    contains = (array, item) => array.indexOf(item) > -1;

    incrementBPM = () => {
        if (this.sliderNode.value < RANGE_MAX) {
            this.sliderNode.value++;
            +this.bpmNode.innerText++;
        }
    }

    decrementBPM = () => {
        if (this.sliderNode.value > RANGE_MIN) {
            this.sliderNode.value--;
            +this.bpmNode.innerText--;
        }
    }

    togglePlayButton = (e) => {
            const self = e.target;
            const classList = Array.from(self.classList);
            const playClass = 'fa-play';
            const pauseClass = 'fa-pause';
            
            if (this.contains(classList, playClass)) {
                self.classList.remove(playClass);
                self.classList.add(pauseClass);
            } else {
                self.classList.remove(pauseClass);
                self.classList.add(playClass);
            }

    }

    updateBPM = () => this.bpmNode.innerText = this.sliderNode.value;

    init () {
        this.sliderNode.max = this.max;
        this.sliderNode.min = this.sliderNode.value = this.bpmNode.innerText = this.min;

        this.playNode.addEventListener('click', (e) => this.toggleMetronome(e));
        this.plusNode.addEventListener('click', () => this.incrementBPM());
        this.minusNode.addEventListener('click', () => this.decrementBPM());
        this.sliderNode.addEventListener('input', () => this.updateBPM());
    }
}