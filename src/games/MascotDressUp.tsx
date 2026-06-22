import React, { useState } from 'react';
import { sfx, tts } from '../engine';

interface MascotDressUpProps {
  onBack: () => void;
}

const hairs = ["🎀", "👑", "🎩", "🧢", "🎓"];
const hairNames = ["Ribbon", "Crown", "Hat", "Cap", "Graduation"];

const dresses = ["#F38BA8", "#89B4FA", "#F9E2AF", "#A6E3A1", "#CBA6F7"];
const dressNames = ["Pink", "Blue", "Yellow", "Green", "Purple"];

const shoes = ["👠", "👟", "🩰", "🥾"];
const shoeNames = ["Heels", "Sneakers", "Ballet", "Boots"];

const skins = ["👧", "👧🏻", "👧🏼", "👧🏽", "👧🏾"];
const skinNames = ["Fair", "Light", "Medium", "Tan", "Dark"];

export const MascotDressUp: React.FC<MascotDressUpProps> = ({ onBack }) => {
  const [hairIndex, setHairIndex] = useState(0);
  const [dressIndex, setDressIndex] = useState(0);
  const [shoeIndex, setShoeIndex] = useState(0);
  const [skinIndex, setSkinIndex] = useState(0);

  const handleSelectHair = (index: number) => {
    setHairIndex(index);
    sfx.play('click');
    tts.speak(hairNames[index], false);
  };

  const handleSelectDress = (index: number) => {
    setDressIndex(index);
    sfx.play('click');
    tts.speak(`${dressNames[index]} dress`, false);
  };

  const handleSelectShoe = (index: number) => {
    setShoeIndex(index);
    sfx.play('click');
    tts.speak(shoeNames[index], false);
  };

  const handleSelectSkin = (index: number) => {
    setSkinIndex(index);
    sfx.play('click');
    tts.speak(skinNames[index], false);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#1e1e2e',
      color: '#cdd6f4',
      fontFamily: 'sans-serif',
      padding: '20px'
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
          Back
        </button>
      </div>

      <h1 style={{
        fontSize: '22px',
        fontWeight: 'bold',
        color: '#F38BA8',
        margin: '20px 0'
      }}>
        💇 Mascot Studio
      </h1>

      <div style={{
        width: '200px',
        height: '200px',
        backgroundColor: '#45475A',
        borderRadius: '24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          lineHeight: '1.2'
        }}>
          <div style={{ fontSize: '40px', marginBottom: '-10px', zIndex: 2 }}>{hairs[hairIndex]}</div>
          <div style={{ fontSize: '64px', marginBottom: '-5px', zIndex: 1 }}>{skins[skinIndex]}</div>
          <div style={{
            width: '60px',
            height: '40px',
            backgroundColor: dresses[dressIndex],
            borderRadius: '8px',
            marginBottom: '5px'
          }} />
          <div style={{ fontSize: '32px' }}>{shoes[shoeIndex]}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <MascotOptionRow
          label="Hair"
          items={hairs}
          selectedIndex={hairIndex}
          onSelect={handleSelectHair}
        />
        <MascotColorRow
          label="Dress"
          colors={dresses}
          selectedIndex={dressIndex}
          onSelect={handleSelectDress}
        />
        <MascotOptionRow
          label="Shoes"
          items={shoes}
          selectedIndex={shoeIndex}
          onSelect={handleSelectShoe}
        />
        <MascotOptionRow
          label="Skin"
          items={skins}
          selectedIndex={skinIndex}
          onSelect={handleSelectSkin}
        />
      </div>
    </div>
  );
};

const MascotOptionRow = ({ label, items, selectedIndex, onSelect }: { label: string, items: string[], selectedIndex: number, onSelect: (index: number) => void }) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div style={{ fontSize: '12px', color: '#9399B2', marginBottom: '4px' }}>{label}</div>
    <div style={{ display: 'flex', gap: '6px' }}>
      {items.map((item, index) => (
        <div
          key={index}
          onClick={() => onSelect(index)}
          style={{
            backgroundColor: index === selectedIndex ? '#89B4FA' : '#313244',
            borderRadius: '12px',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: '40px',
            minHeight: '40px'
          }}
        >
          <span style={{ fontSize: '24px' }}>{item}</span>
        </div>
      ))}
    </div>
  </div>
);

const MascotColorRow = ({ label, colors, selectedIndex, onSelect }: { label: string, colors: string[], selectedIndex: number, onSelect: (index: number) => void }) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div style={{ fontSize: '12px', color: '#9399B2', marginBottom: '4px' }}>{label}</div>
    <div style={{ display: 'flex', gap: '6px' }}>
      {colors.map((color, index) => (
        <div
          key={index}
          onClick={() => onSelect(index)}
          style={{
            backgroundColor: color,
            borderRadius: '12px',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            border: index === selectedIndex ? '3px solid white' : '3px solid transparent',
            boxSizing: 'border-box'
          }}
        />
      ))}
    </div>
  </div>
);
