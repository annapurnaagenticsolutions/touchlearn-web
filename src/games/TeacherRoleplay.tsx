import React, { useState } from 'react';
import { sfx, tts } from '../engine';

interface TeacherRoleplayProps {
  onBack: () => void;
}

const lessons = [
  { symbol: "अ", english: "A", hindi: "Swar A" },
  { symbol: "क", english: "Ka", hindi: "Vyanjan Ka" },
  { symbol: "1", english: "One", hindi: "Ek" },
  { symbol: "△", english: "Triangle", hindi: "Tribhuj" },
  { symbol: "🥭", english: "Mango", hindi: "Aam" },
  { symbol: "🐱", english: "Cat", hindi: "Billi" }
];

const chalkColors = [
  { color: '#CDD6F4', name: 'White' },
  { color: '#F38BA8', name: 'Pink' },
  { color: '#89B4FA', name: 'Blue' },
  { color: '#A6E3A1', name: 'Green' },
  { color: '#F9E2AF', name: 'Yellow' }
];

const TeacherRoleplay: React.FC<TeacherRoleplayProps> = ({ onBack }) => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [drawn, setDrawn] = useState(false);
  const [chalkColor, setChalkColor] = useState(chalkColors[0].color);

  const current = lessons[currentLesson];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#1E1E2E',
      color: '#CDD6F4',
      padding: '24px',
      boxSizing: 'border-box',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
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
      </div>

      <div style={{
        fontSize: '22px',
        fontWeight: 'bold',
        color: '#A6E3A1',
        marginTop: '16px'
      }}>
        👩‍🏫 Teacher
      </div>

      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          height: '220px',
          backgroundColor: '#2D5A27',
          borderRadius: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          marginTop: '16px',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
          userSelect: 'none'
        }}
        onClick={() => {
          if (!drawn) {
            setDrawn(true);
            sfx.play('magic');
          } else {
            sfx.play('pop');
          }
          tts.speak(`${current.english}! This is ${current.english}!`, false);
        }}
      >
        {drawn ? (
          <div style={{ fontSize: '96px', fontWeight: 'bold', color: chalkColor }}>
            {current.symbol}
          </div>
        ) : (
          <div style={{ fontSize: '18px', color: '#CDD6F4' }}>Tap to write!</div>
        )}
      </div>

      <div style={{ height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '12px' }}>
        {drawn && (
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#F9E2AF' }}>
            {current.hindi} = {current.english}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
        {chalkColors.map((c) => (
          <div
            key={c.name}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: c.color,
              border: `3px solid ${chalkColor === c.color ? 'white' : 'transparent'}`,
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
            onClick={() => {
              setChalkColor(c.color);
              sfx.play('pop');
            }}
          />
        ))}
      </div>

      <button
        onClick={() => {
          setCurrentLesson((prev) => (prev + 1) % lessons.length);
          setDrawn(false);
          sfx.play('click');
        }}
        style={{
          marginTop: '24px',
          padding: '12px 24px',
          backgroundColor: 'transparent',
          border: '2px solid #A6E3A1',
          color: '#A6E3A1',
          borderRadius: '12px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        Next Lesson 📖
      </button>
    </div>
  );
};

export { TeacherRoleplay };
