import React, { useState, useEffect } from 'react';
import { sfx, tts } from '../engine';

interface DiffLevel {
  grid: string[];
  diffIndex: number;
  diffEmoji: string;
  name: string;
  hindiName: string;
}

const levels: DiffLevel[] = [
  { grid: ["🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐨"], diffIndex: 4, diffEmoji: "🦁", name: "Animals", hindiName: "Janwar" },
  { grid: ["🍎","🍐","🍊","🍋","🍌","🍉","🍇","🍓","🫐"], diffIndex: 2, diffEmoji: "🍍", name: "Fruits", hindiName: "Fal" },
  { grid: ["⚽","🏀","🏈","⚾","🎾","🏐","🏉","🎱","🏓"], diffIndex: 7, diffEmoji: "🏸", name: "Sports", hindiName: "Khel" },
  { grid: ["🚗","🚕","🚙","🚌","🚎","🏎️","🚓","🚑","🚒"], diffIndex: 5, diffEmoji: "🚜", name: "Vehicles", hindiName: "Gaadi" },
  { grid: ["🌳","🌲","🌴","🌵","🌿","☘️","🍀","🍁","🍂"], diffIndex: 1, diffEmoji: "🌻", name: "Nature", hindiName: "Prakriti" }
];

export const SpotDifferenceGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const useHindi = false; 
  const [levelIndex, setLevelIndex] = useState(0);
  const [found, setFound] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [score, setScore] = useState(0);
  const [gameKey, setGameKey] = useState(0);

  const level = levels[levelIndex];
  const leftGrid = level.grid;
  const rightGrid = leftGrid.map((emoji, i) => i === level.diffIndex ? level.diffEmoji : emoji);

  useEffect(() => {
    setFound(false);
    setWrong(false);
  }, [levelIndex, gameKey]);

  const handleCellClick = (index: number) => {
    if (index === level.diffIndex) {
      setFound(true);
      setWrong(false);
      setScore(s => s + 1);
      sfx.play('correct');
      const itemName = useHindi ? level.hindiName : level.name;
      tts.speak(useHindi ? `Sahi! ${itemName} mein alag tha!` : `Correct! Different in ${itemName}!`, false);
    } else {
      setWrong(true);
      sfx.play('pop');
      tts.speak(useHindi ? "Nahi! Phir se dekho!" : "No! Look again!", false);
    }
  };

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center',
      backgroundColor: '#1E1E2E', color: '#CDD6F4', padding: '16px', boxSizing: 'border-box', overflowY: 'auto',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', marginBottom: '8px' }}>
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
      </div>

      <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#CBA6F7', marginBottom: '8px' }}>
        {useHindi ? "🔍 Farq Dhoondo" : "🔍 Spot the Difference"}
      </div>

      <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {levels.map((lvl, i) => (
          <button
            key={i}
            onClick={() => {
              setLevelIndex(i);
              setGameKey(k => k + 1);
              sfx.play('click');
            }}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: `1px solid ${levelIndex === i ? '#89B4FA' : '#9399B2'}`,
              backgroundColor: levelIndex === i ? '#89B4FA22' : 'transparent',
              color: levelIndex === i ? '#89B4FA' : '#9399B2',
              cursor: 'pointer',
              fontWeight: levelIndex === i ? 'bold' : 'normal'
            }}
          >
            {useHindi ? lvl.hindiName : lvl.name}
          </button>
        ))}
      </div>

      <div style={{ fontSize: '14px', color: '#9399B2', marginBottom: '4px' }}>
        {useHindi ? "Lakshya: 1 farq" : "Goal: 1 difference"}
      </div>
      <div style={{ fontSize: '12px', color: '#9399B2', marginBottom: '12px' }}>
        Score: {score}
      </div>

      <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#F9E2AF', marginBottom: '16px', textAlign: 'center' }}>
        {useHindi ? "Dono grids mein alag emoji dhoondhein!" : "Find the different emoji between the two grids!"}
      </div>

      {found ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#313244', padding: '24px', borderRadius: '16px', marginTop: '16px' }}>
          <div style={{ fontSize: '24px', color: '#A6E3A1', marginBottom: '16px', fontWeight: 'bold' }}>
            {useHindi ? "Sahi! Farq mil gaya." : "Correct! Difference found."}
          </div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
            {['⭐','⭐','⭐'].map((star, i) => <span key={i} style={{ fontSize: '40px' }}>{star}</span>)}
          </div>
          <button
            onClick={() => {
              setLevelIndex((levelIndex + 1) % levels.length);
              setGameKey(k => k + 1);
              sfx.play('magic');
            }}
            style={{
              padding: '12px 24px', backgroundColor: '#89B4FA', color: '#1E1E2E', border: 'none',
              borderRadius: '24px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer'
            }}
          >
            {useHindi ? "Aur dhoondhein" : "Find More"}
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <EmojiGrid grid={leftGrid} isLeft={true} onCellClick={handleCellClick} />
          <EmojiGrid grid={rightGrid} isLeft={false} onCellClick={handleCellClick} />
        </div>
      )}

      {wrong && !found && (
        <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#F38BA8', marginTop: '24px' }}>
          {useHindi ? "❌ Galat! Wapas koshish karo!" : "❌ Wrong! Try again!"}
        </div>
      )}
    </div>
  );
};

const EmojiGrid = ({ grid, isLeft, onCellClick }: { grid: string[], isLeft: boolean, onCellClick: (i: number) => void }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#9399B2', marginBottom: '8px' }}>
        {isLeft ? 'A' : 'B'}
      </div>
      <div style={{ position: 'relative', width: '200px', height: '200px', backgroundColor: '#181825', borderRadius: '12px' }}>
        {grid.map((emoji, index) => {
          const row = Math.floor(index / 3);
          const col = index % 3;
          // Using absolute positioning to place the clickable differences
          return (
            <div
              key={index}
              onClick={() => onCellClick(index)}
              style={{
                position: 'absolute',
                top: `${row * 64 + 8}px`,
                left: `${col * 64 + 8}px`,
                width: '56px',
                height: '56px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                cursor: 'pointer',
                backgroundColor: '#313244',
                borderRadius: '8px',
                border: '2px solid #1E1E2E',
                boxSizing: 'border-box',
                userSelect: 'none',
                transition: 'transform 0.1s'
              }}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {emoji}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpotDifferenceGame;
