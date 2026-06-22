// TouchLearn Web Engine
// Replaces Android's TtsHelper and SfxHelper

export class SfxEngine {
    private ctx: AudioContext | null = null;
    private enabled = true;

    private getCtx(): AudioContext | null {
        if (!this.ctx) {
            try {
                this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
            } catch {
                this.enabled = false;
                return null;
            }
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume().catch(() => {});
        }
        return this.ctx;
    }

    private tone(freq: number, duration: number, type: OscillatorType = 'sine', volume = 0.15, delay = 0) {
        const ctx = this.getCtx();
        if (!ctx || !this.enabled) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
        gain.gain.setValueAtTime(0, ctx.currentTime + delay);
        gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + delay + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + duration);
    }

    private sweep(startFreq: number, endFreq: number, duration: number, type: OscillatorType = 'sine', volume = 0.15) {
        const ctx = this.getCtx();
        if (!ctx || !this.enabled) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + duration);
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
    }

    play(sfxName: string) {
        switch (sfxName) {
            case 'pop':
                this.sweep(800, 200, 0.1, 'sine', 0.2);
                break;
            case 'bubble':
                this.sweep(400, 600, 0.15, 'sine', 0.12);
                break;
            case 'click':
                this.tone(600, 0.05, 'square', 0.1);
                break;
            case 'correct':
                this.tone(523, 0.1, 'sine', 0.15);
                this.tone(659, 0.1, 'sine', 0.15, 0.1);
                this.tone(784, 0.2, 'sine', 0.15, 0.2);
                break;
            case 'wrong':
                this.tone(200, 0.15, 'sawtooth', 0.12);
                this.tone(150, 0.2, 'sawtooth', 0.12, 0.1);
                break;
            case 'win':
            case 'cheer':
                this.tone(523, 0.1, 'sine', 0.15);
                this.tone(659, 0.1, 'sine', 0.15, 0.1);
                this.tone(784, 0.1, 'sine', 0.15, 0.2);
                this.tone(1047, 0.3, 'sine', 0.18, 0.3);
                break;
            case 'magic':
                this.sweep(200, 1200, 0.3, 'sine', 0.12);
                break;
            case 'whoosh':
                this.sweep(100, 400, 0.2, 'sawtooth', 0.08);
                break;
            case 'buzz':
                this.tone(100, 0.3, 'square', 0.1);
                break;
            default:
                this.tone(440, 0.1, 'sine', 0.1);
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
