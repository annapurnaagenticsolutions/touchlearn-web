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
        }, 1500); // Slowed from 800ms
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const moveInterval = setInterval(() => {
            // Speed reduced to y - 0.5 every 100ms (5% height per second)
            setBubbles(prev => prev.map(b => ({ ...b, y: b.y - 0.5 })).filter(b => b.y > -20)); 
        }, 100);
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
            {bubbles.map(b => (
                <div
                    key={b.id}
                    className="glossy"
                    onPointerDown={(e) => { e.preventDefault(); popBubble(b.id); }}
                    style={{
                        position: 'absolute',
                        left: `${b.x}%`,
                        top: `${b.y}%`,
                        width: '100px', // Larger hit area
                        height: '100px',
                        backgroundColor: b.color,
                        borderRadius: '50%',
                        opacity: 0.9,
                        boxShadow: 'inset -10px -10px 20px rgba(0,0,0,0.1), 0 0 10px rgba(255,255,255,0.5)',
                        cursor: 'pointer',
                        transition: 'top 0.08s linear'
                    }}
                />
            ))}
        </div>
    );
};
