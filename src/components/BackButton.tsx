import React from 'react';
import { sfx } from '../engine';

interface BackButtonProps {
  onBack: () => void;
  label?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ onBack, label = 'Menu' }) => {
  const handlePress = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = 'translateY(6px)';
    e.currentTarget.style.boxShadow = '0 0 0 #FFB7B2';
  };
  const handleRelease = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 6px 0 #FFB7B2';
  };

  return (
    <button
      onClick={() => { sfx.play('click'); onBack(); }}
      onPointerDown={handlePress}
      onPointerUp={handleRelease}
      onPointerLeave={handleRelease}
      className="glossy"
      style={{
        fontSize: '20px',
        background: '#FF9AA2',
        border: '4px solid #FFB7B2',
        color: 'white',
        cursor: 'pointer',
        fontWeight: '900',
        padding: '12px 24px',
        borderRadius: '20px',
        boxShadow: '0 6px 0 #FFB7B2',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '16px',
        zIndex: 100,
        touchAction: 'manipulation',
        userSelect: 'none',
      }}
    >
      <span style={{ fontSize: '28px' }}>⬅️</span> {label}
    </button>
  );
};
