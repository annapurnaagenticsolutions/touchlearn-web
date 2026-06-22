import React, { useState, useEffect } from 'react';
import { sfx, tts } from '../engine';

interface BalloonData {
    id: number;
    xOffset: number;
    yOffset: number;
    emoji: string;
    color: string;
}

const colors = [
    { emoji: "🎈", name: "Red", hex: "#F38BA8" },
    { emoji: "🎈", name: "Blue", hex: "#89B4FA" },
    { emoji: "🎈", name: "Green", hex: "#A6E3A1" },
    { emoji: "🎈", name: "Yellow", hex: "#F9E2AF" },
    { emoji: "🎈", name: "Purple", hex: "#CBA6F7" },
    { emoji: "🎈", name: "Orange", hex: "#FAB387" },
    { emoji: "🎈", name: "Pink", hex: "#F38BA8" },
    { emoji: "🎈", name: "Sky", hex: "#89B4FA" }
];

const generateBalloons = (): BalloonData[] => {
    return Array.from({ length: 8 }).map((_, index) => {
        const c = colors[index];
        return {
            id: Date.now() + index,
            xOffset: (index % 4) * 80 + (Math.random() * 30 - 15),
            yOffset: Math.floor(index / 4) * 80 + (Math.random() * 30 - 15),
            emoji: c.emoji,
            color: c.name
        };
    });
};

export const BalloonPopGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [balloons, setBalloons] = useState<BalloonData[]>(generateBalloons());
    const [popped, setPopped] = useState(0);

    useEffect(() => {
        if (balloons.length === 0) {
            const t = setTimeout(() => {
                setBalloons(generateBalloons());
                setPopped(0);
            }, 800);
            return () => clearTimeout(t);
        }
    }, [balloons.length]);

    const handlePop = (id: number, color: string) => {
        setBalloons(prev => prev.filter(b => b.id !== id));
        setPopped(p => p + 1);
        sfx.play('pop');
        tts.speak(`${color} balloon popped! Pop!`, false);
    };

    const handleNewBalloons = () => {
        setBalloons(generateBalloons());
        setPopped(0);
        tts.speak("New balloons! Pop them!", false);
    };

    return (
        <div style={{ padding: '20px', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                <button 
                    onClick={() => { sfx.play('click'); onBack(); }}
                    style={{ fontSize: '24px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
                >
                    ← Back
                </button>
            </div>

            <h1 style={{ color: '#F38BA8', fontSize: '24px', marginTop: '10px' }}>🎈 Balloon Pop</h1>
            <p style={{ color: '#9399B2', fontSize: '16px' }}>Popped: {popped}</p>

            <div style={{
                width: '100%',
                maxWidth: '400px',
                height: '340px',
                backgroundColor: '#87CEEB', // Sky blue background
                borderRadius: '20px',
                position: 'relative',
                marginTop: '16px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {balloons.length === 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeIn 0.5s' }}>
                        <span style={{ fontSize: '64px' }}>🎉</span>
                        <span style={{ color: '#A6E3A1', fontSize: '18px', fontWeight: 'bold' }}>All popped!</span>
                    </div>
                ) : (
                    balloons.map(b => (
                        <div
                            key={b.id}
                            onClick={() => handlePop(b.id, b.color)}
                            style={{
                                position: 'absolute',
                                left: `${b.xOffset + 40}px`,
                                top: `${b.yOffset + 40}px`,
                                fontSize: '44px',
                                cursor: 'pointer',
                                transition: 'transform 0.1s, opacity 0.2s',
                                userSelect: 'none'
                            }}
                        >
                            {b.emoji}
                        </div>
                    ))
                )}
            </div>

            <button 
                onClick={handleNewBalloons}
                style={{
                    marginTop: '24px',
                    border: '2px solid #F38BA8',
                    backgroundColor: 'transparent',
                    color: '#F38BA8',
                    padding: '12px 24px',
                    borderRadius: '24px',
                    fontSize: '16px',
                    cursor: 'pointer'
                }}
            >
                🎈 New Balloons
            </button>
        </div>
    );
};
