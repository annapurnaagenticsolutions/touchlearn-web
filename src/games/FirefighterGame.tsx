import React, { useState } from 'react';
import { sfx, tts } from '../engine';

interface FirefighterGameProps {
  onBack: () => void;
}

const FireWindow: React.FC<{ isBurning: boolean; onExtinguish: () => void }> = ({ isBurning, onExtinguish }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    if (!isBurning) return;
    setIsPressed(true);
    onExtinguish();
    setTimeout(() => {
      setIsPressed(false);
    }, 150);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: '70px',
        height: '70px',
        transform: `scale(${isPressed ? 0.9 : 1})`,
        backgroundColor: isBurning ? '#3D1F1F' : '#1E3A2F',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: isBurning ? 'pointer' : 'default',
        transition: 'transform 0.1s ease-in-out',
      }}
    >
      <span style={{ fontSize: '32px' }}>
        {isBurning ? "🔥" : "✅"}
      </span>
    </div>
  );
};

export const FirefighterGame: React.FC<FirefighterGameProps> = ({ onBack }) => {
  const [fires, setFires] = useState<boolean[]>(Array(6).fill(true));
  const [waterLevel, setWaterLevel] = useState<number>(100);
  const [score, setScore] = useState<number>(0);

  const activeFires = fires.filter((isBurning) => isBurning).length;
  const allOut = activeFires === 0 && waterLevel > 0;

  const handleExtinguish = (index: number) => {
    if (waterLevel >= 15) {
      setWaterLevel((prev) => prev - 15);
      
      const newFires = [...fires];
      newFires[index] = false;
      setFires(newFires);
      setScore((prev) => prev + 10);
      sfx.play('pop');
      
      const newActiveFires = newFires.filter((isBurning) => isBurning).length;
      if (newActiveFires === 0) {
        sfx.play('correct');
        tts.speak("All safe! Great job firefighter!", false);
      } else {
        tts.speak("Fire extinguished!", false);
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100vh', backgroundColor: '#1E1E2E', padding: '20px', boxSizing: 'border-box', fontFamily: 'sans-serif' }}>
      {/* Header with Back Button */}
      <div style={{ display: 'flex', width: '100%', alignItems: 'center', marginBottom: '12px' }}>
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
        <div style={{ flex: 1, textAlign: 'center', marginRight: '80px' }}>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 'bold', color: '#F38BA8' }}>
            🚒 Firefighter
          </h1>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', marginBottom: '16px' }}>
        <span style={{ fontSize: '16px', color: '#F38BA8', fontWeight: 'bold' }}>🔥 {activeFires} fires</span>
        <span style={{ fontSize: '16px', color: '#89B4FA', fontWeight: 'bold' }}>💧 {waterLevel}%</span>
        <span style={{ fontSize: '16px', color: '#F9E2AF', fontWeight: 'bold' }}>⭐ {score}</span>
      </div>

      <div style={{
        width: '100%',
        maxWidth: '400px',
        height: '220px',
        backgroundColor: '#45475A',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '16px'
      }}>
        {allOut ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '64px' }}>🎉</span>
            <span style={{ fontSize: '18px', color: '#A6E3A1', marginTop: '12px', fontWeight: 'bold' }}>All safe!</span>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[0, 1].map(row => (
              <div key={row} style={{ display: 'flex', gap: '12px' }}>
                {[0, 1, 2].map(col => {
                  const index = row * 3 + col;
                  return (
                    <FireWindow
                      key={index}
                      isBurning={fires[index]}
                      onExtinguish={() => handleExtinguish(index)}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>

      {allOut ? (
        <button
          onClick={() => {
            setFires(Array(6).fill(true));
            setWaterLevel(100);
            setScore(0);
          }}
          style={{
            padding: '12px 24px',
            backgroundColor: 'transparent',
            border: '2px solid #A6E3A1',
            color: '#A6E3A1',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          New Mission 🚒
        </button>
      ) : waterLevel < 15 && activeFires > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px', color: '#F38BA8', fontWeight: 'bold' }}>Water empty! Refill needed.</span>
          <button
            onClick={() => setWaterLevel(100)}
            style={{
              padding: '12px 24px',
              backgroundColor: 'transparent',
              border: '2px solid #89B4FA',
              color: '#89B4FA',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Refill Water 💧
          </button>
        </div>
      ) : (
        <span style={{ fontSize: '14px', color: '#9399B2' }}>Tap fire to extinguish!</span>
      )}
    </div>
  );
};
