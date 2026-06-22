import { useState } from 'react';
import { sfx, tts } from '../engine';

const INSTRUMENTS = [
  { emoji: "🎸", name: "Guitar", fact: "Chhe taar, meethi awaaz", color: "#F38BA8" },
  { emoji: "🥁", name: "Dholak", fact: "Dholak — taal ka raja, shaadi mein bajta hai", color: "#FAB387" },
  { emoji: "🎹", name: "Piano", fact: "Piano — saat suron ki duniya", color: "#89B4FA" },
  { emoji: "🎺", name: "Trumpet", fact: "Trumpet — zor se bajta hai", color: "#F9E2AF" },
  { emoji: "🪕", name: "Sitar", fact: "Sitar — Hindustani sangeet ki shaan", color: "#A6E3A1" },
  { emoji: "🪘", name: "Tabla", fact: "Tabla — dug dug taal, classical music", color: "#CBA6F7" }
];

export const MusicianGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [pattern, setPattern] = useState<number[]>([]);
  const [userPattern, setUserPattern] = useState<number[]>([]);
  const [showResult, setShowResult] = useState<string>("");
  const [useHindi, setUseHindi] = useState<boolean>(false);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const newRhythm = async () => {
    sfx.play('click');
    const newPattern = Array.from({ length: 3 }, () => Math.floor(Math.random() * INSTRUMENTS.length));
    setPattern(newPattern);
    setUserPattern([]);
    setShowResult("");

    setTimeout(async () => {
      tts.speak(useHindi ? "Dekho aur repeat karo! Pattern suno" : "Watch and repeat! Listen to the pattern!", false);
      for (let i = 0; i < newPattern.length; i++) {
        await new Promise(r => setTimeout(r, 1200)); // wait between spoken instructions
        const inst = INSTRUMENTS[newPattern[i]];
        setPlayingIndex(newPattern[i]); // to highlight maybe
        tts.speak(inst.name, false);
        setTimeout(() => setPlayingIndex(null), 400);
      }
    }, 200);
  };

  const handlePlay = (index: number) => {
    sfx.play('pop');
    const inst = INSTRUMENTS[index];
    tts.speak(useHindi ? `${inst.name}! ${inst.fact}` : `${inst.name}!`, false);

    if (pattern.length > 0 && userPattern.length < pattern.length) {
      const newUserPattern = [...userPattern, index];
      setUserPattern(newUserPattern);

      if (newUserPattern.length === pattern.length) {
        // check if correct
        const isCorrect = newUserPattern.every((val, i) => val === pattern[i]);
        if (isCorrect) {
          setShowResult("⭐ Great rhythm!");
          tts.speak(useHindi ? "Kya taal hai! Badhai ho" : "Great rhythm! Well done!", false);
          sfx.play('correct');
          setTimeout(() => {
            setPattern([]);
            setUserPattern([]);
          }, 2000);
        } else {
          setShowResult("😢 Try again!");
          tts.speak(useHindi ? "Phir se koshish karo" : "Try again!", false);
          setUserPattern([]); // reset to try again
        }
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh', alignItems: 'center', backgroundColor: '#1E1E2E', padding: '20px', boxSizing: 'border-box' }}>
      {/* Header */}
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button 
                    onClick={() => { sfx.play('click'); onBack(); }}
                    style={{
                        fontSize: '20px', 
                        background: '#FF9AA2', 
                        border: '4px solid #FFB7B2', 
                        color: 'white', 
                        cursor: 'pointer', 
                        fontWeight: '900',
                        padding: '10px 20px',
                        borderRadius: '20px',
                        boxShadow: '0 6px 0 #FFB7B2',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '16px',
                        zIndex: 100
                    }}
                    className="glossy"
                    onPointerDown={(e) => { e.currentTarget.style.transform = 'translateY(6px)'; e.currentTarget.style.boxShadow = '0 0 0 #FFB7B2'; }}
                    onPointerUp={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 0 #FFB7B2'; }}
                    onPointerLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 0 #FFB7B2'; }}
                >
                    <span style={{ fontSize: '28px' }}>⬅️</span> Menu
                </button>
        <button
          onClick={() => { sfx.play('click'); setUseHindi(!useHindi); }}
          style={{
            padding: '10px 16px',
            backgroundColor: '#313244',
            color: '#CDD6F4',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          {useHindi ? 'English' : 'हिंदी'}
        </button>
      </div>

      <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#CBA6F7', margin: '0 0 16px 0', textAlign: 'center' }}>
        {useHindi ? "🎵 Sangeet Mandli" : "🎵 Musician Band"}
      </h1>

      <div style={{
        width: '100%',
        maxWidth: '400px',
        height: '140px',
        backgroundColor: '#45475A',
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '12px'
      }}>
        {pattern.length === 0 ? (
          <span style={{ fontSize: '18px', color: '#9399B2' }}>
            {useHindi ? "Sangeet shuru karo!" : "Start a jam!"}
          </span>
        ) : (
          <div style={{ display: 'flex', gap: '8px' }}>
            {pattern.map((pIndex, i) => (
              <span key={i} style={{ fontSize: '36px' }}>{INSTRUMENTS[pIndex].emoji}</span>
            ))}
          </div>
        )}
      </div>

      <div style={{ height: '30px', marginBottom: '8px' }}>
        {showResult && (
          <div style={{ fontSize: '18px', color: showResult.includes('Great') ? '#A6E3A1' : '#F38BA8', fontWeight: 'bold' }}>
            {showResult}
          </div>
        )}
      </div>

      <p style={{ fontSize: '16px', color: '#9399B2', marginBottom: '12px' }}>
        {useHindi ? "Bajane ke liye tap karo:" : "Tap to play:"}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          {[0, 1, 2].map(i => (
            <InstrumentPad key={i} index={i} instrument={INSTRUMENTS[i]} onPlay={() => handlePlay(i)} isPlaying={playingIndex === i} />
          ))}
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {[3, 4, 5].map(i => (
            <InstrumentPad key={i} index={i} instrument={INSTRUMENTS[i]} onPlay={() => handlePlay(i)} isPlaying={playingIndex === i} />
          ))}
        </div>
      </div>

      <button
        onClick={newRhythm}
        style={{
          padding: '12px 24px',
          backgroundColor: 'transparent',
          border: '2px solid #F9E2AF',
          color: '#F9E2AF',
          borderRadius: '12px',
          fontSize: '18px',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginTop: 'auto'
        }}
      >
        {useHindi ? "Naya Rhythm 🎶" : "New Rhythm 🎶"}
      </button>
    </div>
  );
}

function InstrumentPad({ instrument, onPlay, isPlaying }: { index: number, instrument: any, onPlay: () => void, isPlaying: boolean }) {
  const [pressed, setPressed] = useState(false);

  const handleClick = () => {
    setPressed(true);
    onPlay();
    setTimeout(() => setPressed(false), 150);
  };

  const scale = pressed || isPlaying ? 0.88 : 1;

  const hex2rgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: '80px',
        height: '80px',
        backgroundColor: hex2rgba(instrument.color, 0.2),
        borderRadius: '16px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        transform: `scale(${scale})`,
        transition: 'transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        border: `2px solid ${isPlaying ? instrument.color : 'transparent'}`
      }}
    >
      <span style={{ fontSize: '36px' }}>{instrument.emoji}</span>
    </div>
  );
}
