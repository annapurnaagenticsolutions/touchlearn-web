import React, { useState } from 'react';
import { sfx, tts } from '../engine';

interface SortingFunGameProps {
  onBack: () => void;
}

const BOXES = [
  { en: "Red", hi: "Laal", color: "#F38BA8", validEmojis: ["🔴", "🍓", "❤️"] },
  { en: "Blue", hi: "Neela", color: "#89B4FA", validEmojis: ["🔵", "💧", "🌊"] },
  { en: "Green", hi: "Hara", color: "#A6E3A1", validEmojis: ["🟢", "🌿", "🐢"] }
];

const generateSortItems = () => {
  const allItems = [
    "🔴", "🔵", "🟢",
    "🍓", "💧", "🌿",
    "❤️", "🌊", "🐢"
  ];
  return allItems.sort(() => Math.random() - 0.5);
};

function getBoxBgColor(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const SortingFunGame: React.FC<SortingFunGameProps> = ({ onBack }) => {
  const [useHindi, setUseHindi] = useState(false);
  const [items, setItems] = useState<string[]>(generateSortItems());
  const [sorted, setSorted] = useState<Record<string, string[]>>({});
  const [message, setMessage] = useState("");

  const handleBoxClick = (en: string, hi: string, validEmojis: string[]) => {
    if (items.length === 0) return;

    const item = items[0];
    if (validEmojis.includes(item)) {
      setSorted(prev => ({
        ...prev,
        [en]: [...(prev[en] || []), item]
      }));

      const newItems = items.slice(1);
      setItems(newItems);

      const msg = useHindi ? `${hi} mein sahi!` : `Right in ${en}!`;
      sfx.play('correct');
      tts.speak(msg, false);

      const totalSorted = Object.values(sorted).flat().length + 1;
      if (totalSorted === 9) {
        setMessage(useHindi ? "⭐ Sab sahi! Badhai ho!" : "⭐ All sorted! Great job!");
        sfx.play('win');
        tts.speak(useHindi ? "Sab sahi kiya! Kamaal hai!" : "All sorted! Amazing!", false);
      }
    } else {
      const msg = useHindi ? "Galat dibba! Phir se dekho!" : "Wrong box! Try again!";
      sfx.play('buzz');
      tts.speak(msg, false);
    }
  };

  const handleReset = () => {
    setItems(generateSortItems());
    setSorted({});
    setMessage("");
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#1E1E2E',
      color: '#CDD6F4',
      padding: '20px',
      fontFamily: 'sans-serif'
    }}>
      {/* Top Bar with Back Button and Lang Toggle */}
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', marginBottom: '20px' }}>
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
          onClick={() => {
            sfx.play('click');
            setUseHindi(!useHindi);
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#313244',
            color: '#CDD6F4',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          {useHindi ? 'English' : 'हिंदी'}
        </button>
      </div>

      <h1 style={{ fontSize: '22px', fontWeight: 'bold', color: '#CBA6F7', margin: '0 0 12px 0' }}>
        🔄 Sorting Fun
      </h1>
      
      <p style={{ fontSize: '14px', color: '#9399B2', margin: '0 0 16px 0' }}>
        {useHindi ? "Rang ke dibbe mein daalo!" : "Put in the color box!"}
      </p>

      {/* Sorting boxes */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {BOXES.map((box) => {
          const itemsInBox = sorted[box.en] || [];
          const isFull = itemsInBox.length >= 3;
          const bgColor = getBoxBgColor(box.color, isFull ? 0.3 : 0.15);

          return (
            <div
              key={box.en}
              onClick={() => handleBoxClick(box.en, box.hi, box.validEmojis)}
              style={{
                width: '100px',
                height: '100px',
                backgroundColor: bgColor,
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                border: isFull ? `2px solid ${box.color}` : '2px solid transparent',
                transition: 'all 0.2s ease-in-out'
              }}
            >
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: box.color, marginBottom: '8px' }}>
                {useHindi ? box.hi : box.en}
              </div>
              {itemsInBox.length > 0 && (
                <div style={{ display: 'flex', gap: '2px' }}>
                  {itemsInBox.map((emoji, idx) => (
                    <span key={idx} style={{ fontSize: '18px' }}>{emoji}</span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Items to sort */}
      <p style={{ fontSize: '14px', color: '#9399B2', margin: '16px 0 8px 0' }}>
        {useHindi ? "Tap karke sort karo:" : "Tap to sort:"}
      </p>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', minHeight: '48px' }}>
        {items.slice(0, 5).map((emoji, idx) => (
          <div
            key={idx + emoji}
            style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#313244',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              border: idx === 0 ? '2px solid #F9E2AF' : '2px solid transparent',
              transition: 'all 0.2s'
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      {message && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '12px 0' }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#A6E3A1', marginBottom: '12px' }}>
            {message}
          </div>
          <button
            onClick={() => {
              sfx.play('magic');
              handleReset();
            }}
            style={{
              padding: '10px 20px',
              backgroundColor: 'transparent',
              border: '2px solid #A6E3A1',
              color: '#A6E3A1',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            🔄 {useHindi ? "Phir Se" : "Again"}
          </button>
        </div>
      )}

      <div style={{
        backgroundColor: '#313244',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '400px',
        padding: '12px',
        marginTop: '16px',
        textAlign: 'center'
      }}>
        <p style={{ margin: 0, fontSize: '12px', color: '#F9E2AF', lineHeight: '1.4' }}>
          {useHindi
            ? "📖 Cheezon ko alag alag karna seekho! Same rang ek saath!"
            : "📖 Learn to group things! Same color goes together!"}
        </p>
      </div>
    </div>
  );
};
