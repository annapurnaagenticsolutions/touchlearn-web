import React, { useState } from 'react';
import { sfx, tts } from '../engine';

interface DoctorRoleplayProps {
  onBack: () => void;
}

const tools = [
  { emoji: "🌡️", nameEn: "Thermometer", factEn: "Normal temperature is 37 degrees" },
  { emoji: "🩹", nameEn: "Bandage", factEn: "Bandage protects skin" },
  { emoji: "💊", nameEn: "Medicine", factEn: "Medicine fights germs" },
  { emoji: "🩺", nameEn: "Stethoscope", factEn: "Heart beats 100 times a minute" }
];

const DoctorRoleplay: React.FC<DoctorRoleplayProps> = ({ onBack }) => {
  const [treated, setTreated] = useState<Set<string>>(new Set());
  const [teddyState, setTeddyState] = useState<'sick' | 'checking' | 'treating' | 'better'>('sick');

  const handleToolClick = (tool: typeof tools[0]) => {
    if (treated.has(tool.nameEn) || teddyState === 'checking' || teddyState === 'treating') return;

    sfx.play('click');
    setTeddyState('checking');
    tts.speak(`${tool.nameEn}! ${tool.factEn}`, false);

    setTimeout(() => {
      setTeddyState('treating');
      setTimeout(() => {
        setTreated(prev => {
          const next = new Set(prev);
          next.add(tool.nameEn);
          
          if (next.size === tools.length) {
            setTeddyState('better');
            sfx.play('correct');
            tts.speak("Teddy is better! Great job doctor!", false);
          } else {
            setTeddyState('sick');
          }
          return next;
        });
      }, 800);
    }, 800);
  };

  const handleNewPatient = () => {
    sfx.play('click');
    setTreated(new Set());
    setTeddyState('sick');
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#1e1e2e',
      padding: '20px',
      color: '#cdd6f4',
      fontFamily: 'sans-serif',
      boxSizing: 'border-box'
    }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
        <button
          onClick={() => {
            sfx.play('click');
            onBack();
          }}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#313244',
            color: '#cdd6f4',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          ← Back
        </button>
      </div>

      <div style={{
        fontSize: '22px',
        fontWeight: 'bold',
        color: '#F38BA8',
        marginTop: '10px'
      }}>
        🩺 Doctor
      </div>

      <div style={{ height: '16px' }} />

      <div style={{
        width: '100%',
        maxWidth: '400px',
        height: '180px',
        backgroundColor: '#45475A',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}>
        {teddyState === 'sick' && (
          <>
            <div style={{ fontSize: '80px' }}>🧸</div>
            <div style={{ fontSize: '16px', color: '#F38BA8', marginTop: '8px' }}>Teddy is sick!</div>
          </>
        )}
        {teddyState === 'checking' && (
          <>
            <div style={{ fontSize: '80px' }}>🧸</div>
            <div style={{ fontSize: '16px', color: '#F9E2AF', marginTop: '8px' }}>Checking...</div>
          </>
        )}
        {teddyState === 'treating' && (
          <>
            <div style={{ fontSize: '80px' }}>🧸</div>
            <div style={{ fontSize: '16px', color: '#89B4FA', marginTop: '8px' }}>Getting better!</div>
          </>
        )}
        {teddyState === 'better' && (
          <>
            <div style={{ fontSize: '80px' }}>🧸</div>
            <div style={{ fontSize: '18px', color: '#A6E3A1', marginTop: '8px' }}>All better!</div>
            <div style={{ fontSize: '32px' }}>❤️</div>
          </>
        )}
      </div>

      <div style={{ height: '16px' }} />

      <div style={{ fontSize: '14px', color: '#9399B2' }}>
        {treated.size} / {tools.length} treatments done
      </div>

      <div style={{ height: '12px' }} />

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {tools.map(tool => {
          const isDone = treated.has(tool.nameEn);
          return (
            <div
              key={tool.nameEn}
              onClick={() => handleToolClick(tool)}
              style={{
                width: '72px',
                height: '72px',
                backgroundColor: isDone ? 'rgba(166, 227, 161, 0.3)' : '#313244',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: (isDone || teddyState === 'checking' || teddyState === 'treating') ? 'default' : 'pointer',
                opacity: isDone ? 0.6 : 1,
                transition: 'background-color 0.2s'
              }}
            >
              <div style={{ fontSize: '36px' }}>{tool.emoji}</div>
            </div>
          );
        })}
      </div>

      {treated.size === tools.length && (
        <>
          <div style={{ height: '16px' }} />
          <button
            onClick={handleNewPatient}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: 'transparent',
              color: '#A6E3A1',
              border: '2px solid #A6E3A1',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            New Patient 🧸
          </button>
        </>
      )}
    </div>
  );
};

export { DoctorRoleplay };
