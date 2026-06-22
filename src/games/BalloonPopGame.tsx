import React, { useState, useEffect } from 'react';
import { sfx, tts } from '../engine';

interface BalloonData {
    id: number;
    xOffset: number;
    yOffset: number;
    emoji: string;
    color: string;
    hueRotate: number;
}

const colors = [
    { emoji: "🎈", name: "Red", hueRotate: 0 },
    { emoji: "🎈", name: "Blue", hueRotate: 210 },
    { emoji: "🎈", name: "Green", hueRotate: 120 },
    { emoji: "🎈", name: "Yellow", hueRotate: 60 },
    { emoji: "🎈", name: "Purple", hueRotate: 280 },
    { emoji: "🎈", name: "Orange", hueRotate: 30 },
    { emoji: "🎈", name: "Pink", hueRotate: 320 },
    { emoji: "🎈", name: "Cyan", hueRotate: 180 }
];

const generateBalloons = (): BalloonData[] => {
    return Array.from({ length: 8 }).map((_, index) => {
        const c = colors[index];
        return {
            id: Date.now() + index,
            xOffset: (index % 4) * 80 + (Math.random() * 30 - 15),
            yOffset: Math.floor(index / 4) * 80 + (Math.random() * 30 - 15),
            emoji: c.emoji,
            color: c.name,
            hueRotate: c.hueRotate
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
            }, 1500); // Slowed from 800ms to 1500ms
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

            <h1 style={{ color: '#F38BA8', fontSize: '28px', marginTop: '10px', textShadow: '1px 1px 2px rgba(255,255,255,0.5)' }}>🎈 Balloon Pop</h1>
            <p style={{ color: '#1E1E2E', fontSize: '18px', fontWeight: 'bold' }}>Popped: {popped}</p>

            <div style={{
                width: '100%',
                maxWidth: '400px',
                height: '380px', // slightly taller for bigger balloons
                backgroundColor: '#87CEEB', // Sky blue background
                borderRadius: '20px',
                position: 'relative',
                marginTop: '16px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'inset 0 0 20px rgba(255,255,255,0.5)'
            }}>
                {balloons.length === 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeIn 0.5s' }}>
                        <span style={{ fontSize: '80px' }}>🎉</span>
                        <span style={{ color: '#A6E3A1', fontSize: '24px', fontWeight: 'bold', textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>All popped!</span>
                    </div>
                ) : (
                    balloons.map(b => (
                        <div
                            key={b.id}
                            className="glossy"
                            onPointerDown={(e) => { e.preventDefault(); handlePop(b.id, b.color); }}
                            style={{
                                position: 'absolute',
                                left: `${b.xOffset + 20}px`, // Adjusted for bigger balloon center
                                top: `${b.yOffset + 40}px`,
                                fontSize: '64px', // Bigger balloons!
                                cursor: 'pointer',
                                transition: 'transform 0.1s, opacity 0.2s',
                                userSelect: 'none',
                                filter: `hue-rotate(${b.hueRotate}deg)`
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
