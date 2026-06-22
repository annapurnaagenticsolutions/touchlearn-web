import React, { useState, useEffect } from 'react';
import { sfx, tts } from '../engine';

export const BubblePopGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [bubbles, setBubbles] = useState<{ id: number, x: number, y: number, color: string }[]>([]);

    useEffect(() => {
        tts.speak("Pop the bubbles!", false);
        const interval = setInterval(() => {
            setBubbles(prev => {
                if (prev.length > 15) return prev; // Limit bubbles on screen
                return [...prev, {
                    id: Date.now(),
                    x: Math.random() * 80 + 10, // 10% to 90%
                    y: 100, // Start at bottom
                    color: ['#FFB5E8', '#B28DFF', '#85E3FF', '#AFF8DB', '#FFFFD1'][Math.floor(Math.random() * 5)]
                }];
            });
        }, 800);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const moveInterval = setInterval(() => {
            setBubbles(prev => prev.map(b => ({ ...b, y: b.y - 2 })).filter(b => b.y > -20));
        }, 50);
        return () => clearInterval(moveInterval);
    }, []);

    const popBubble = (id: number) => {
        sfx.play('pop');
        setBubbles(prev => prev.filter(b => b.id !== id));
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
            <button 
                onClick={() => { sfx.play('click'); onBack(); }}
                style={{ position: 'absolute', top: 20, left: 20, zIndex: 10, fontSize: '24px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
            >
                ← Back
            </button>
            {bubbles.map(b => (
                <div
                    key={b.id}
                    onClick={() => popBubble(b.id)}
                    style={{
                        position: 'absolute',
                        left: `${b.x}%`,
                        top: `${b.y}%`,
                        width: '60px',
                        height: '60px',
                        backgroundColor: b.color,
                        borderRadius: '50%',
                        opacity: 0.8,
                        boxShadow: 'inset -10px -10px 20px rgba(0,0,0,0.1), 0 0 10px rgba(255,255,255,0.5)',
                        cursor: 'pointer',
                        transition: 'top 0.05s linear'
                    }}
                />
            ))}
        </div>
    );
};
