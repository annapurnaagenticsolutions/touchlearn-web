import React, { useState, useEffect } from 'react';
import { sfx, tts } from '../engine';
import { BackButton } from '../components/BackButton';
import { Celebration, triggerHaptic, addStars, setGameStars } from '../components/Celebration';

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
    const [showWin, setShowWin] = useState(false);

    useEffect(() => {
        if (balloons.length === 0 && !showWin) {
            const t = setTimeout(() => {
                setShowWin(true);
                addStars(2);
                setGameStars('balloonpop', 2);
            }, 800);
            return () => clearTimeout(t);
        }
    }, [balloons.length, showWin]);

    const handlePop = (id: number, color: string) => {
        setBalloons(prev => prev.filter(b => b.id !== id));
        setPopped(p => p + 1);
        sfx.play('pop');
        triggerHaptic(30);
        tts.speak(`${color} balloon popped! Pop!`, false);
    };

    const handleNewBalloons = () => {
        setBalloons(generateBalloons());
        setPopped(0);
        setShowWin(false);
        tts.speak("New balloons! Pop them!", false);
    };

    return (
        <div style={{ padding: '20px', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', boxSizing: 'border-box' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <BackButton onBack={onBack} />
                <div style={{
                    background: 'rgba(255,255,255,0.9)',
                    borderRadius: '20px',
                    padding: '6px 16px',
                    fontSize: '18px',
                    fontWeight: '900',
                    color: '#F38BA8',
                }}>
                    🎈 {popped}
                </div>
            </div>

            <h1 style={{ color: '#F38BA8', fontSize: '28px', fontWeight: '900', marginTop: '10px', textShadow: '1px 1px 2px rgba(255,255,255,0.5)' }}>🎈 Balloon Pop</h1>

            <div style={{
                width: '100%',
                maxWidth: '400px',
                height: '380px',
                backgroundColor: '#87CEEB',
                borderRadius: '20px',
                position: 'relative',
                marginTop: '16px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'inset 0 0 20px rgba(255,255,255,0.5)'
            }}>
                {balloons.length === 0 && !showWin ? (
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
                                left: `${b.xOffset + 20}px`,
                                top: `${b.yOffset + 40}px`,
                                fontSize: '64px',
                                cursor: 'pointer',
                                transition: 'transform 0.1s, opacity 0.2s',
                                userSelect: 'none',
                                filter: `hue-rotate(${b.hueRotate}deg)`,
                                touchAction: 'none',
                            }}
                        >
                            {b.emoji}
                        </div>
                    ))
                )}
            </div>

            <button
                onClick={handleNewBalloons}
                className="glossy"
                style={{
                    marginTop: '24px',
                    border: '4px solid #F38BA8',
                    backgroundColor: '#FFDAC1',
                    color: '#1E1E2E',
                    padding: '12px 28px',
                    borderRadius: '20px',
                    fontSize: '18px',
                    fontWeight: '900',
                    cursor: 'pointer',
                    boxShadow: '0 6px 0 #F38BA8',
                }}
                onPointerDown={(e) => { e.currentTarget.style.transform = 'translateY(6px)'; e.currentTarget.style.boxShadow = '0 0 0 #F38BA8'; }}
                onPointerUp={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 0 #F38BA8'; }}
                onPointerLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 0 #F38BA8'; }}
            >
                🎈 New Balloons
            </button>

            <Celebration
                show={showWin}
                message="All balloons popped!"
                emoji="🎈"
                onPlayAgain={handleNewBalloons}
                onBack={onBack}
            />
        </div>
    );
};
