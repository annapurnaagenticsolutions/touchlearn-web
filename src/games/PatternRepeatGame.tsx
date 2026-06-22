import React, { useState, useEffect } from 'react';
import { sfx, tts } from '../engine';

interface Props {
  onBack: () => void;
}

const patterns = [
  [{ emoji: "🔴", color: "#F38BA8" }, { emoji: "🔵", color: "#89B4FA" }],
  [{ emoji: "⬛", color: "#89B4FA" }, { emoji: "⭕", color: "#A6E3A1" }],
  [{ emoji: "🐱", color: "#F9E2AF" }, { emoji: "🐶", color: "#DCB483" }],
  [{ emoji: "☀️", color: "#F9E2AF" }, { emoji: "🌙", color: "#89B4FA" }]
];

const correctSequence = [0, 1, 0, 1];

export const PatternRepeatGame: React.FC<Props> = ({ onBack }) => {
  const [currentPattern, setCurrentPattern] = useState(0);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [showResult, setShowResult] = useState("");
  const [activeSlot, setActiveSlot] = useState<number>(-1);
  const [isPlayingSequence, setIsPlayingSequence] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const pattern = patterns[currentPattern];

  const playSequence = async () => {
    setIsPlayingSequence(true);
    setUserSequence([]);
    setShowResult("");
    setIsSuccess(false);
    setIsFailed(false);

    await new Promise(resolve => setTimeout(resolve, 800));

    for (let i = 0; i < correctSequence.length; i++) {
      sfx.play('pop');
      setActiveSlot(i);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setActiveSlot(-1);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    setIsPlayingSequence(false);
  };

  useEffect(() => {
    playSequence();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPattern]);

  const handleTap = (index: number) => {
    if (isPlayingSequence || isSuccess || isFailed || userSequence.length >= 4) return;

    sfx.play('click');
    const newUserSequence = [...userSequence, index];
    setUserSequence(newUserSequence);

    const currentIndex = newUserSequence.length - 1;
    if (newUserSequence[currentIndex] !== correctSequence[currentIndex]) {
      setIsFailed(true);
      setShowResult("😢 Try again!");
      sfx.play('pop');
      tts.speak("Pattern wrong! Look again!", false);
      
      setTimeout(() => {
        playSequence();
      }, 1500);
      return;
    }

    if (newUserSequence.length === 4) {
      setShowResult("⭐ Perfect pattern!");
      setIsSuccess(true);
      sfx.play('correct');
      tts.speak("Correct! Pattern repeated! Well done!", false);
    }
  };

  const nextPattern = () => {
    setCurrentPattern((prev) => (prev + 1) % patterns.length);
    tts.speak("New pattern! Watch and repeat!", false);
  };

  return (
    <div style={{
      backgroundColor: '#1E1E2E',
      color: '#CDD6F4',
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      boxSizing: 'border-box',
      fontFamily: 'sans-serif',
      position: 'relative'
    }}>
      <button 
        onClick={onBack}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          backgroundColor: '#313244',
          color: '#CDD6F4',
          border: 'none',
          borderRadius: '8px',
          padding: '10px 15px',
          fontSize: '16px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        ← Back
      </button>

      <div style={{ marginTop: '40px', fontSize: '22px', fontWeight: 'bold', color: '#CBA6F7' }}>
        🔢 Pattern Repeat
      </div>
      
      <div style={{ fontSize: '14px', color: '#9399B2', marginTop: '12px' }}>
        What comes next?
      </div>

      <div style={{
        backgroundColor: '#45475A',
        borderRadius: '16px',
        width: '90%',
        maxWidth: '400px',
        padding: '16px',
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        marginTop: '16px',
        boxSizing: 'border-box'
      }}>
        {correctSequence.map((patternIndex, index) => {
          const isFilled = index < userSequence.length;
          
          let itemToDisplay;
          if (isPlayingSequence) {
             itemToDisplay = pattern[patternIndex];
          } else {
             if (isFilled) {
               itemToDisplay = pattern[userSequence[index]];
             } else {
               itemToDisplay = null;
             }
          }
          
          let isActive = false;
          if (isPlayingSequence) {
            isActive = activeSlot === index;
          } else {
            isActive = isFilled;
          }

          const defaultColor = '#313244';
          const displayColor = itemToDisplay ? (isActive ? itemToDisplay.color : itemToDisplay.color + '4D') : defaultColor; 
          const scale = (isPlayingSequence && activeSlot === index) ? 1.1 : 1;
          
          return (
            <div key={index} style={{
              backgroundColor: displayColor,
              borderRadius: '12px',
              width: '56px',
              height: '56px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              transform: `scale(${scale})`,
              transition: 'all 0.2s ease-in-out',
              boxShadow: (isPlayingSequence && activeSlot === index) ? `0 0 12px ${itemToDisplay?.color}` : 'none',
              opacity: itemToDisplay ? 1 : 0.5
            }}>
              {itemToDisplay ? itemToDisplay.emoji : '❓'}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '24px', fontSize: '16px', color: '#CDD6F4' }}>
        {isPlayingSequence ? "Watch carefully..." : "Your turn!"}
      </div>

      <div style={{ display: 'flex', gap: '20px', marginTop: '16px' }}>
        {pattern.map((item, index) => {
          return (
            <button
              key={index}
              onClick={() => handleTap(index)}
              disabled={isPlayingSequence || isSuccess || isFailed || userSequence.length >= 4}
              style={{
                backgroundColor: item.color + '4D',
                border: `2px solid ${item.color}80`,
                borderRadius: '50%',
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '40px',
                cursor: (isPlayingSequence || isSuccess || isFailed) ? 'not-allowed' : 'pointer',
                transition: 'all 0.1s',
                opacity: (isPlayingSequence || isSuccess || isFailed) ? 0.6 : 1
              }}
              onPointerDown={(e) => {
                if (!isPlayingSequence && !isSuccess && !isFailed) {
                  e.currentTarget.style.transform = 'scale(0.9)';
                  e.currentTarget.style.backgroundColor = item.color;
                }
              }}
              onPointerUp={(e) => {
                if (!isPlayingSequence && !isSuccess && !isFailed) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = item.color + '4D';
                }
              }}
              onPointerLeave={(e) => {
                if (!isPlayingSequence && !isSuccess && !isFailed) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = item.color + '4D';
                }
              }}
            >
              {item.emoji}
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: '20px', height: '40px', display: 'flex', alignItems: 'center' }}>
        {showResult && (
          <div style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: isSuccess ? '#A6E3A1' : '#F38BA8'
          }}>
            {showResult}
          </div>
        )}
      </div>

      {isSuccess && (
        <button
          onClick={nextPattern}
          style={{
            marginTop: '10px',
            backgroundColor: 'transparent',
            color: '#A6E3A1',
            border: '2px solid #A6E3A1',
            borderRadius: '24px',
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Next Pattern 🔢
        </button>
      )}

      <div style={{
        marginTop: '30px',
        backgroundColor: '#313244',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '400px',
        padding: '12px',
        color: '#F9E2AF',
        fontSize: '12px',
        textAlign: 'center',
        boxSizing: 'border-box'
      }}>
        📖 Patterns repeat! Red, Blue, Red, Blue — can you do the same?
      </div>
    </div>
  );
};
