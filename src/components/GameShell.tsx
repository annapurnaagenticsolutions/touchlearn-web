import React from 'react';
import { BackButton } from './BackButton';

interface GameShellProps {
  onBack: () => void;
  title?: string;
  titleColor?: string;
  rightAction?: React.ReactNode;
  children: React.ReactNode;
  scrollable?: boolean;
}

export const GameShell: React.FC<GameShellProps> = ({
  onBack,
  title,
  titleColor = '#F9E2AF',
  rightAction,
  children,
  scrollable = false,
}) => {
  return (
    <div style={{
      padding: '20px',
      width: '100%',
      height: '100%',
      overflowY: scrollable ? 'auto' : 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxSizing: 'border-box',
    }}>
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '8px',
      }}>
        <BackButton onBack={onBack} />
        {rightAction}
      </div>

      {title && (
        <h1 style={{
          textAlign: 'center',
          color: titleColor,
          fontSize: '28px',
          fontWeight: '900',
          margin: '4px 0 16px 0',
          textShadow: '0 2px 4px rgba(0,0,0,0.15)',
        }}>
          {title}
        </h1>
      )}

      <div style={{
        flex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {children}
      </div>
    </div>
  );
};

interface HindiToggleProps {
  useHindi: boolean;
  setUseHindi: (v: boolean) => void;
}

export const HindiToggle: React.FC<HindiToggleProps> = ({ useHindi, setUseHindi }) => (
  <button
    onClick={() => { import('../engine').then(({ sfx }) => sfx.play('click')); setUseHindi(!useHindi); }}
    style={{
      fontSize: '16px',
      background: '#313244',
      border: 'none',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '12px',
      cursor: 'pointer',
      fontWeight: '700',
    }}
  >
    {useHindi ? 'English' : 'हिंदी'}
  </button>
);
