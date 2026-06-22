import React, { useState, useEffect } from 'react';
import { sfx, tts } from '../engine';
import { BackButton } from '../components/BackButton';
import { Celebration, triggerHaptic, addStars, setGameStars } from '../components/Celebration';

const WIN_SCORE = 20;

export const BubblePopGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [bubbles, setBubbles] = useState<{ id: number, x: number, y: number, color: string }[]>([]);
    const [score, setScore] = useState(0);
    const [showWin, setShowWin] = useState(false);

    useEffect(() => {
        tts.speak("Pop the bubbles! Tap to pop!", false);
        const interval = setInterval(() => {
            setBubbles(prev => {
                if (prev.length > 8) return prev;
                return [...prev, {
                    id: Date.now() + Math.random(),
                    x: Math.random() * 70 + 15,
                    y: 85,
                    color: ['#FFB5E8', '#B28DFF', '#85E3FF', '#AFF8DB', '#FFFFD1', '#FFC9DE'][Math.floor(Math.random() * 6)]
                }];
            });
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const moveInterval = setInterval(() => {
            setBubbles(prev => prev.map(b => ({ ...b, y: b.y - 1.2 })).filter(b => b.y > -15));
        }, 50);
        return () => clearInterval(moveInterval);
    }, []);

    useEffect(() => {
        if (score >= WIN_SCORE && !showWin) {
            setShowWin(true);
            addStars(3);
            setGameStars('bubblepop', 3);
        }
    }, [score, showWin]);

    const popBubble = (id: number) => {
        sfx.play('pop');
        triggerHaptic(30);
        setBubbles(prev => prev.filter(b => b.id !== id));
        setScore(s => s + 1);
    };

    const restart = () => {
        setScore(0);
        setShowWin(false);
        setBubbles([]);
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', padding: '20px', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <BackButton onBack={onBack} />
                <div style={{
                    background: 'rgba(255,255,255,0.9)',
                    borderRadius: '20px',
                    padding: '8px 20px',
                    fontSize: '22px',
                    fontWeight: '900',
                    color: '#F38BA8',
                }}>
                    🫧 {score} / {WIN_SCORE}
                </div>
            </div>

            {!showWin && bubbles.map(b => (
                <div
                    key={b.id}
                    className="glossy"
                    onPointerDown={(e) => { e.preventDefault(); popBubble(b.id); }}
                    style={{
                        position: 'absolute',
                        left: `${b.x}%`,
                        top: `${b.y}%`,
                        width: '120px',
                        height: '120px',
                        backgroundColor: b.color,
                        borderRadius: '50%',
                        opacity: 0.85,
                        boxShadow: 'inset -10px -10px 20px rgba(0,0,0,0.1), 0 0 15px rgba(255,255,255,0.5)',
                        cursor: 'pointer',
                        transition: 'top 0.08s linear',
                        touchAction: 'none',
                    }}
                />
            ))}

            <Celebration
                show={showWin}
                message="You popped them all!"
                emoji="🫧"
                onPlayAgain={restart}
                onBack={onBack}
            />
        </div>
    );
};
