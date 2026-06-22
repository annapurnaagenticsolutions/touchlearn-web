import React, { useEffect, useState } from 'react';
import { sfx } from '../engine';

interface CelebrationProps {
  show: boolean;
  message?: string;
  emoji?: string;
  onPlayAgain?: () => void;
  onBack?: () => void;
  useHindi?: boolean;
}

export const Celebration: React.FC<CelebrationProps> = ({
  show,
  message = 'Awesome!',
  emoji = '🎉',
  onPlayAgain,
  onBack,
  useHindi = false,
}) => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; emoji: string; rotation: number }[]>([]);

  useEffect(() => {
    if (show) {
      sfx.play('cheer');
      const newParticles = Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 60,
        emoji: ['⭐', '🌟', '✨', '🎊', '🎈', '💫'][Math.floor(Math.random() * 6)],
        rotation: Math.random() * 360,
      }));
      setParticles(newParticles);
      const timer = setTimeout(() => setParticles([]), 3000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0,0,0,0.3)',
      zIndex: 200,
      borderRadius: 'inherit',
    }}>
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: '32px',
            transform: `rotate(${p.rotation}deg)`,
            animation: 'celebrationFall 2s ease-out forwards',
          }}
        >
          {p.emoji}
        </div>
      ))}
      <div style={{
        fontSize: '80px',
        animation: 'bounce 0.8s ease-in-out',
      }}>
        {emoji}
      </div>
      <div style={{
        fontSize: '28px',
        fontWeight: '900',
        color: '#A6E3A1',
        marginTop: '12px',
        textAlign: 'center',
        textShadow: '0 2px 8px rgba(0,0,0,0.3)',
      }}>
        {message}
      </div>
      <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
        {onPlayAgain && (
          <button
            onClick={() => { sfx.play('click'); onPlayAgain(); }}
            className="glossy"
            style={{
              padding: '14px 28px',
              fontSize: '18px',
              fontWeight: '900',
              background: '#A6E3A1',
              border: '4px solid #94d68f',
              color: '#1E1E2E',
              borderRadius: '20px',
              cursor: 'pointer',
              boxShadow: '0 6px 0 #94d68f',
            }}
            onPointerDown={(e) => { e.currentTarget.style.transform = 'translateY(6px)'; e.currentTarget.style.boxShadow = '0 0 0 #94d68f'; }}
            onPointerUp={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 0 #94d68f'; }}
            onPointerLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 0 #94d68f'; }}
          >
            🔁 {useHindi ? 'Phir Khelo' : 'Play Again'}
          </button>
        )}
        {onBack && (
          <button
            onClick={() => { sfx.play('click'); onBack(); }}
            className="glossy"
            style={{
              padding: '14px 28px',
              fontSize: '18px',
              fontWeight: '900',
              background: '#89B4FA',
              border: '4px solid #74a8f7',
              color: '#1E1E2E',
              borderRadius: '20px',
              cursor: 'pointer',
              boxShadow: '0 6px 0 #74a8f7',
            }}
            onPointerDown={(e) => { e.currentTarget.style.transform = 'translateY(6px)'; e.currentTarget.style.boxShadow = '0 0 0 #74a8f7'; }}
            onPointerUp={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 0 #74a8f7'; }}
            onPointerLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 0 #74a8f7'; }}
          >
            🏠 {useHindi ? 'Menu' : 'Menu'}
          </button>
        )}
      </div>
    </div>
  );
};

export function triggerHaptic(pattern: number | number[] = 50) {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
}

const STARS_KEY = 'touchlearn_stars';

export function getStars(): number {
  try {
    return parseInt(localStorage.getItem(STARS_KEY) || '0', 10);
  } catch {
    return 0;
  }
}

export function addStars(count: number): number {
  const current = getStars();
  const newTotal = current + count;
  try {
    localStorage.setItem(STARS_KEY, String(newTotal));
  } catch { /* ignore */ }
  return newTotal;
}

export function getGameStars(gameId: string): number {
  try {
    const data = JSON.parse(localStorage.getItem('touchlearn_game_stars') || '{}');
    return data[gameId] || 0;
  } catch {
    return 0;
  }
}

export function setGameStars(gameId: string, count: number): void {
  try {
    const data = JSON.parse(localStorage.getItem('touchlearn_game_stars') || '{}');
    data[gameId] = Math.max(data[gameId] || 0, count);
    localStorage.setItem('touchlearn_game_stars', JSON.stringify(data));
  } catch { /* ignore */ }
}
