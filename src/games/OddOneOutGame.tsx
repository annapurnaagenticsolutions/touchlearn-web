import { useState, useEffect } from 'react';
import { sfx, tts } from '../engine';

interface Props {
  onBack: () => void;
}

interface Item {
  emoji: string;
  name: string;
  hindi: string;
}

interface OddOneRound {
  common: Item;
  odd: Item;
  oddPosition: number;
}

const ALL_SETS: [Item, Item][] = [
  [{ emoji: "🐱", name: "Cat", hindi: "Billi" }, { emoji: "🐶", name: "Dog", hindi: "Kutta" }],
  [{ emoji: "🍍", name: "Pineapple", hindi: "Ananas" }, { emoji: "🍓", name: "Strawberry", hindi: "Strawberry" }],
  [{ emoji: "⬛", name: "Square", hindi: "Chaukor" }, { emoji: "⭕", name: "Circle", hindi: "Gol" }],
  [{ emoji: "🔴", name: "Red", hindi: "Laal" }, { emoji: "🔵", name: "Blue", hindi: "Neela" }],
  [{ emoji: "🐻", name: "Bear", hindi: "Bhalu" }, { emoji: "🦁", name: "Lion", hindi: "Sher" }],
  [{ emoji: "☀️", name: "Sun", hindi: "Sooraj" }, { emoji: "🌙", name: "Moon", hindi: "Chaand" }]
];

function generateRounds(): OddOneRound[] {
  const shuffledSets = [...ALL_SETS].sort(() => Math.random() - 0.5);
  return shuffledSets.map(([common, odd]) => ({
    common,
    odd,
    oddPosition: Math.floor(Math.random() * 6)
  }));
}

export const OddOneOutGame: React.FC<Props> = ({ onBack }) => {
  const [useHindi, setUseHindi] = useState(false);
  const [rounds, setRounds] = useState<OddOneRound[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [selected, setSelected] = useState<number>(-1);
  const [correct, setCorrect] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setRounds(generateRounds());
  }, []);

  useEffect(() => {
    if (wrong && selected !== -1) {
      const timer = setTimeout(() => {
        setWrong(false);
        setSelected(-1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [wrong, selected]);

  if (rounds.length === 0) return null;

  const round = rounds[currentRound];
  const { common, odd } = round;

  const items = Array(6).fill(null).map((_, index) => {
    if (index === round.oddPosition) return odd;
    return common;
  });

  const handleItemClick = (index: number, isCorrect: boolean, itemName: string, hindi: string) => {
    if (correct || wrong) return;

    setSelected(index);
    if (isCorrect) {
      setCorrect(true);
      setScore((s) => s + 1);
      sfx.play('correct');
      tts.speak(useHindi ? `Sahi! Yeh alag hai! ${hindi}` : `Correct! This is different! ${itemName}`, false);
    } else {
      setWrong(true);
      sfx.play('pop'); // pop used as generic error buzz sound fallback
      tts.speak(useHindi ? "Phir se dekho! Same hi hai" : "Look again! They are the same!", false);
    }
  };

  const nextRound = () => {
    sfx.play('click');
    setCorrect(false);
    setWrong(false);
    setSelected(-1);
    
    if (currentRound + 1 >= rounds.length) {
      setRounds(generateRounds());
      setCurrentRound(0);
    } else {
      setCurrentRound(currentRound + 1);
    }
  };

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      backgroundColor: '#1E1E2E',
      color: '#CDD6F4',
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative'
    }}>
      <style>
        {`
          @keyframes odd_shake {
            0% { transform: translateX(0); }
            20% { transform: translateX(-5px); }
            40% { transform: translateX(5px); }
            60% { transform: translateX(-5px); }
            80% { transform: translateX(5px); }
            100% { transform: translateX(0); }
          }
        `}
      </style>

      {/* Top Bar */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '16px', boxSizing: 'border-box' }}>
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
          onClick={() => { sfx.play('click'); setUseHindi(!useHindi); }}
          style={{
            padding: '8px 16px',
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

      {/* Main Content */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, padding: '20px', width: '100%', maxWidth: '600px', boxSizing: 'border-box' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 'bold', color: '#89B4FA', margin: '0 0 8px 0', textAlign: 'center' }}>
          {useHindi ? "🔍 Alag Wala Dhoondo" : "🔍 Find the Odd One"}
        </h1>
        <p style={{ fontSize: '16px', color: '#F9E2AF', margin: '0 0 12px 0' }}>
          Score: {score}
        </p>
        <p style={{ fontSize: '16px', color: '#9399B2', margin: '0 0 20px 0', textAlign: 'center' }}>
          {useHindi ? "Jo alag hai use dhoondo!" : "Find the different one!"}
        </p>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 80px)',
          gap: '10px',
          marginBottom: '30px'
        }}>
          {items.map((item, index) => {
            const isSelected = selected === index;
            const isCorrectPosition = index === round.oddPosition;

            let bgColor = '#313244';
            if (correct && isCorrectPosition) bgColor = 'rgba(166, 227, 161, 0.3)';
            else if (wrong && isSelected) bgColor = 'rgba(243, 139, 168, 0.3)';

            const scale = isSelected && !wrong ? 0.9 : 1.0;
            const isShaking = wrong && isSelected;

            return (
              <div
                key={index}
                onClick={() => handleItemClick(index, isCorrectPosition, item.name, item.hindi)}
                style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: bgColor,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '40px',
                  cursor: (correct || wrong) ? 'default' : 'pointer',
                  transform: `scale(${scale})`,
                  transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  animation: isShaking ? 'odd_shake 0.4s ease-in-out' : 'none',
                  userSelect: 'none'
                }}
              >
                {item.emoji}
              </div>
            );
          })}
        </div>

        {correct && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
            <p style={{ fontSize: '18px', color: '#A6E3A1', margin: '0 0 12px 0' }}>
              {useHindi ? "⭐ Kamaal ki nazar!" : "⭐ Great eye!"}
            </p>
            <button
              onClick={nextRound}
              style={{
                padding: '10px 20px',
                backgroundColor: 'transparent',
                color: '#A6E3A1',
                border: '2px solid #A6E3A1',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              {useHindi ? "Aage ➜" : "Next ➜"}
            </button>
          </div>
        )}

        <div style={{
          backgroundColor: '#313244',
          borderRadius: '8px',
          width: '100%',
          padding: '12px',
          boxSizing: 'border-box',
          marginTop: 'auto'
        }}>
          <p style={{ fontSize: '14px', color: '#F9E2AF', margin: 0, textAlign: 'center', lineHeight: '1.4' }}>
            {useHindi
              ? "📖 Dhyan se dekhna farq dhoondhne mein madad karta hai! Isse observation kehte hain!"
              : "📖 Looking carefully helps us find differences! This is called observation!"}
          </p>
        </div>
      </div>
    </div>
  );
}
