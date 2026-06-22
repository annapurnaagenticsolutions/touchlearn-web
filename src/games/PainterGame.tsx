import React, { useState } from 'react';
import { sfx, tts } from '../engine';

interface PainterGameProps {
  onBack: () => void;
}

const SvgShape = ({ type, color, size = 48 }: { type: string; color: string; size?: number }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ color }}>
      {type === 'Square' && <rect width="80" height="80" x="10" y="10" fill="currentColor" />}
      {type === 'Circle' && <circle cx="50" cy="50" r="40" fill="currentColor" />}
      {type === 'Triangle' && <polygon points="50,15 90,85 10,85" fill="currentColor" />}
      {type === 'Star' && <polygon points="50,10 61,40 95,40 68,60 79,90 50,70 21,90 32,60 5,40 39,40" fill="currentColor" />}
    </svg>
  );
};

export const PainterGame: React.FC<PainterGameProps> = ({ onBack }) => {
  const [useHindi, setUseHindi] = useState(false);
  const [selectedColor, setSelectedColor] = useState<number>(-1);
  const [painted, setPainted] = useState<Array<{ shapeIndex: number; colorHex: string }>>([]);
  const [showMix, setShowMix] = useState<string>('');

  const primaryColors = [
    { hex: '#F38BA8', english: 'Red', hindi: 'Laal', emoji: '🔴' },
    { hex: '#89B4FA', english: 'Blue', hindi: 'Neela', emoji: '🔵' },
    { hex: '#F9E2AF', english: 'Yellow', hindi: 'Peela', emoji: '🟡' }
  ];

  const shapes = [
    { type: 'Square', english: 'Square', hindi: 'Chaukor', hex: '#89B4FA' },
    { type: 'Circle', english: 'Circle', hindi: 'Gol', hex: '#A6E3A1' },
    { type: 'Triangle', english: 'Triangle', hindi: 'Tribhuj', hex: '#F9E2AF' },
    { type: 'Star', english: 'Star', hindi: 'Tara', hex: '#FAB387' }
  ];

  const handleColorSelect = (index: number) => {
    sfx.play('click');
    const color = primaryColors[index];
    const prevColor = selectedColor;
    setSelectedColor(index);
    tts.speak(useHindi ? `${color.hindi} rang! ${color.english}` : `${color.english} color!`, false);
    
    if (prevColor === 0 && index === 1) setShowMix('🎨 Red + Blue = Purple (Baingani)');
    else if (prevColor === 1 && index === 2) setShowMix('🎨 Blue + Yellow = Green (Hara)');
    else if (prevColor === 2 && index === 0) setShowMix('🎨 Yellow + Red = Orange (Narangi)');
    else setShowMix(`🎨 ${color.english} paint selected`);
  };

  const handleShapeSelect = (index: number) => {
    sfx.play('pop');
    const shape = shapes[index];
    const paintColor = selectedColor >= 0 ? primaryColors[selectedColor].hex : shape.hex;
    
    if (!painted.find(p => p.shapeIndex === index)) {
      setPainted(prev => [...prev, { shapeIndex: index, colorHex: paintColor }]);
      tts.speak(useHindi ? `${shape.hindi} bana! ${shape.english}` : `${shape.english} shape!`, false);
    } else {
      tts.speak(useHindi ? 'Pehle se bana hua hai' : 'Already painted', false);
    }
  };

  return (
    <div style={{
      width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center',
      backgroundColor: '#1E1E2E', color: '#CDD6F4', padding: '16px', boxSizing: 'border-box', fontFamily: 'sans-serif'
    }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <button
          onClick={() => { sfx.play('click'); onBack(); }}
          style={{
            padding: '8px 16px', borderRadius: '8px', border: 'none',
            backgroundColor: '#45475A', color: '#CDD6F4', fontSize: '16px',
            cursor: 'pointer', fontWeight: 'bold'
          }}
        >
          ← Back
        </button>
        <button
          onClick={() => { sfx.play('click'); setUseHindi(!useHindi); }}
          style={{
            padding: '8px 16px', borderRadius: '8px', border: 'none',
            backgroundColor: '#313244', color: '#A6E3A1', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold'
          }}
        >
          {useHindi ? 'English' : 'हिंदी'}
        </button>
      </div>

      <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#F38BA8', margin: '0 0 16px 0', textAlign: 'center' }}>
        {useHindi ? '🎨 Rang Bharna' : '🎨 Painter Studio'}
      </h1>

      <div style={{
        width: '100%', maxWidth: '400px', height: '200px',
        backgroundColor: '#FAFAFA', borderRadius: '20px', border: '2px solid #45475A',
        display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px',
        flexWrap: 'wrap', gap: '12px', padding: '16px', boxSizing: 'border-box'
      }}>
        {painted.length === 0 ? (
          <span style={{ fontSize: '16px', color: '#9399B2', textAlign: 'center' }}>
            {useHindi ? 'Aakar par tap karke rang bharo!' : 'Tap shapes to paint!'}
          </span>
        ) : (
          painted.slice(0, 5).map((p, i) => (
            <SvgShape key={i} type={shapes[p.shapeIndex].type} color={p.colorHex} size={56} />
          ))
        )}
      </div>

      {showMix && (
        <div style={{
          backgroundColor: '#313244', borderRadius: '8px', padding: '8px 16px',
          color: '#F9E2AF', fontSize: '14px', marginBottom: '12px', textAlign: 'center'
        }}>
          {showMix}
        </div>
      )}

      <div style={{ color: '#9399B2', fontSize: '14px', marginBottom: '8px' }}>
        {useHindi ? 'Rang chuno:' : 'Pick color:'}
      </div>
      
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        {primaryColors.map((color, index) => (
          <button
            key={index}
            onClick={() => handleColorSelect(index)}
            style={{
              width: '56px', height: '56px', borderRadius: '28px',
              backgroundColor: color.hex, border: selectedColor === index ? '4px solid white' : 'none',
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              fontSize: '24px', cursor: 'pointer', padding: 0, outline: 'none',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)', transition: 'transform 0.1s'
            }}
          >
            {color.emoji}
          </button>
        ))}
      </div>

      <div style={{ color: '#9399B2', fontSize: '14px', marginBottom: '8px' }}>
        {useHindi ? 'Aakar par tap karke rang bharo:' : 'Tap shape to paint:'}
      </div>
      
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        {shapes.map((shape, index) => {
          const paintColor = selectedColor >= 0 ? primaryColors[selectedColor].hex : shape.hex;
          return (
            <button
              key={index}
              onClick={() => handleShapeSelect(index)}
              style={{
                width: '72px', height: '72px', borderRadius: '16px',
                backgroundColor: `${paintColor}33`,
                border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center',
                cursor: 'pointer', padding: 0, outline: 'none',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)', transition: 'transform 0.1s'
              }}
            >
              <SvgShape type={shape.type} color={paintColor} size={40} />
            </button>
          );
        })}
      </div>

      {painted.length === shapes.length && (
        <button
          onClick={() => {
            sfx.play('magic');
            setPainted([]);
            setSelectedColor(-1);
            setShowMix('');
          }}
          style={{
            marginTop: '8px', padding: '12px 24px', borderRadius: '12px',
            backgroundColor: 'transparent', border: '2px solid #A6E3A1', color: '#A6E3A1',
            fontSize: '16px', cursor: 'pointer', fontWeight: 'bold'
          }}
        >
          {useHindi ? 'Naya Canvas 🖌️' : 'New Canvas 🖌️'}
        </button>
      )}
    </div>
  );
};

export default PainterGame;
