// TouchLearn Web Engine
// Replaces Android's TtsHelper and SfxHelper

export class SfxEngine {
    private sounds: { [key: string]: HTMLAudioElement } = {};

    constructor() {
        const soundFiles = [
            'bubble', 'buzz', 'cheer', 'click', 'correct',
            'magic', 'pop', 'whoosh', 'win', 'wrong'
        ];

        soundFiles.forEach(sfx => {
            const audio = new Audio(`/sfx/sfx_${sfx}.mp3`);
            audio.preload = 'auto';
            this.sounds[sfx] = audio;
        });
    }

    play(sfxName: string) {
        const audio = this.sounds[sfxName];
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => console.error(`Error playing ${sfxName}:`, e));
        }
    }
}

export class TtsEngine {
    private synth = window.speechSynthesis;
    private hindiVoice: SpeechSynthesisVoice | null = null;
    private englishVoice: SpeechSynthesisVoice | null = null;

    constructor() {
        this.loadVoices();
        // Voices often load asynchronously in some browsers
        if (this.synth.onvoiceschanged !== undefined) {
            this.synth.onvoiceschanged = this.loadVoices.bind(this);
        }
    }

    private loadVoices() {
        const voices = this.synth.getVoices();
        this.hindiVoice = voices.find(v => v.lang === 'hi-IN') || voices.find(v => v.lang.startsWith('hi')) || null;
        this.englishVoice = voices.find(v => v.lang === 'en-US') || voices.find(v => v.lang.startsWith('en')) || null;
    }

    speak(text: string, useHindi: boolean = true) {
        this.synth.cancel(); // Stop current speech
        const utterance = new SpeechSynthesisUtterance(text);
        
        if (useHindi && this.hindiVoice) {
            utterance.voice = this.hindiVoice;
            utterance.lang = 'hi-IN';
        } else if (!useHindi && this.englishVoice) {
            utterance.voice = this.englishVoice;
            utterance.lang = 'en-US';
        }
        
        // Slightly slower and higher pitch for kids
        utterance.rate = 0.9;
        utterance.pitch = 1.1;

        this.synth.speak(utterance);
    }

    stop() {
        this.synth.cancel();
    }
}

export const sfx = new SfxEngine();
export const tts = new TtsEngine();
