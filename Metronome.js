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

        this.interval = null;
        this.intervalDuration = MINUTE_IN_MILLISECONDS / this.min;
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

    togglePlayButton () {
            const classList = Array.from(this.playNode.classList);
            const playClass = 'fa-play';
            const pauseClass = 'fa-pause';
            
            if (this.contains(classList, playClass)) {
                this.playNode.classList.remove(playClass);
                this.playNode.classList.add(pauseClass);
            } else {
                this.playNode.classList.remove(pauseClass);
                this.playNode.classList.add(playClass);
            }

    }

    toggleMetronome () {
        this.toggleAnimation();
        this.toggleSound();
        this.togglePlayButton();
    }

    init () {
        this.sliderNode.max = this.max;
        this.sliderNode.min = this.sliderNode.value = this.bpmNode.innerText = this.min;

        this.playNode.addEventListener('click', () => this.toggleMetronome());
        this.sliderNode.addEventListener('input', () => {
            if (this.interval) this.toggleMetronome();
            this.updateBPM();
        });
    }
}
