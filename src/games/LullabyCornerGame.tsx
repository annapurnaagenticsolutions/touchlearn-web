import React, { useState } from 'react';
import { sfx, tts } from '../engine';

export const LullabyCornerGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [useHindi, setUseHindi] = useState(false);
    const [dimmed, setDimmed] = useState(false);
    const [showMoon, setShowMoon] = useState(true);
    const [starTapped, setStarTapped] = useState(-1);

    const handleStarTap = (i: number) => {
        setStarTapped(i);
        tts.speak(useHindi ? "Tara chamka! Twinkle twinkle little star" : "Star twinkles! Twinkle twinkle little star!", false);
        setTimeout(() => setStarTapped(-1), 500);
    };

    const toggleDim = () => {
        setDimmed(prev => !prev);
        if (!dimmed) {
            setShowMoon(true);
            tts.speak(useHindi ? "Raat ho gayi. So jaao. Shubh ratri" : "Nighttime. Go to sleep. Good night!", false);
        } else {
            tts.speak(useHindi ? "Din ho gaya! Utho aur khelo" : "Daytime! Wake up and play!", false);
        }
        sfx.play('click');
    };

    const toggleMoon = () => {
        setShowMoon(prev => !prev);
        if (!showMoon) {
            tts.speak(useHindi ? "Chaand dikhai diya!" : "Moon appeared!", false);
        } else {
            tts.speak(useHindi ? "Chaand chhup gaya!" : "Moon disappeared!", false);
        }
        sfx.play('click');
    };

    return (
        <div style={{ 
            padding: '20px', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center',
            backgroundColor: '#0D1117', transition: 'background-color 1.5s'
        }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', zIndex: 10 }}>
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
                    style={{ fontSize: '16px', background: '#1A1A3E', border: 'none', color: '#B4BEFE', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}
                >
                    {useHindi ? 'English' : 'हिंदी'}
                </button>
            </div>

            <h1 style={{ color: '#B4BEFE', fontSize: '24px', marginTop: '10px', zIndex: 10 }}>
                {useHindi ? "🌙 Lullaby Corner" : "🌙 Lullaby Corner"}
            </h1>

            <div style={{
                width: '100%', maxWidth: '400px', height: '280px',
                backgroundColor: dimmed ? 'rgba(26, 26, 62, 0.3)' : 'rgba(26, 26, 62, 1)',
                borderRadius: '20px', marginTop: '16px', position: 'relative', overflow: 'hidden',
                transition: 'background-color 1.5s'
            }}>
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                }}>
                    {showMoon ? (
                        <>
                            <span style={{ fontSize: '80px', animation: 'moonPulse 2s infinite alternate' }}>🌙</span>
                            <span style={{ color: '#9399B2', fontSize: '16px', marginTop: '8px' }}>{useHindi ? "Chaand" : "Moon"}</span>
                        </>
                    ) : (
                        <>
                            <span style={{ fontSize: '64px' }}>⭐</span>
                            <span style={{ color: '#9399B2', fontSize: '16px', marginTop: '8px' }}>{useHindi ? "Shubh ratri!" : "Good night!"}</span>
                        </>
                    )}
                </div>

                {Array.from({ length: 8 }).map((_, i) => {
                    const x = (i * 37 + 20) % 280;
                    const y = (i * 23 + 10) % 180;
                    const isTapped = starTapped === i;
                    const defaultOpacity = 0.6 + (i % 3) * 0.1;
                    
                    return (
                        <div
                            key={i}
                            onClick={() => handleStarTap(i)}
                            style={{
                                position: 'absolute',
                                left: `${x}px`, top: `${y}px`,
                                fontSize: `${12 + i % 8}px`,
                                opacity: isTapped ? 1 : defaultOpacity,
                                transition: 'opacity 0.3s',
                                cursor: 'pointer',
                                userSelect: 'none'
                            }}
                        >
                            {i % 2 === 0 ? "✨" : "⭐"}
                        </div>
                    );
                })}
            </div>

            <p style={{ color: '#9399B2', fontSize: '14px', marginTop: '16px', textAlign: 'center' }}>
                {dimmed 
                    ? (useHindi ? "😴 Shubh ratri! Aaram se so." : "😴 Good night, sleep tight!")
                    : (useHindi ? "🌟 Taare tap karo, chaand tap kar ke light dhimi" : "🌟 Tap stars, tap moon to dim")
                }
            </p>

            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button
                    onClick={toggleDim}
                    style={{ border: '2px solid #B4BEFE', color: '#B4BEFE', background: 'transparent', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer' }}
                >
                    {dimmed ? (useHindi ? "Utho ☀️" : "Wake Up ☀️") : (useHindi ? "Roshni dhimi karo 🌙" : "Dim Lights 🌙")}
                </button>
                <button
                    onClick={toggleMoon}
                    style={{ border: '2px solid #F9E2AF', color: '#F9E2AF', background: 'transparent', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer' }}
                >
                    {useHindi ? "Chaand 🌙" : "Moon 🌙"}
                </button>
            </div>

            <div style={{ backgroundColor: '#1E1E2E', padding: '12px', borderRadius: '8px', marginTop: '16px', width: '90%', maxWidth: '400px' }}>
                <p style={{ color: '#CDD6F4', fontSize: '13px', margin: 0, textAlign: 'center' }}>
                    {useHindi 
                        ? "📖 Twinkle twinkle little star, how I wonder what you are!"
                        : "📖 Twinkle twinkle little star, how I wonder what you are! Up above the world so high, like a diamond in the sky!"
                    }
                </p>
            </div>

            <p style={{ color: '#9399B2', fontSize: '12px', marginTop: '8px' }}>
                {useHindi ? "💤 Shant ho kar so jao. Shubh ratri!" : "💤 Calm down and sleep. Good night!"}
            </p>
            
            <style>
                {`
                @keyframes moonPulse {
                    0% { opacity: 0.8; transform: scale(0.95); }
                    100% { opacity: 1; transform: scale(1.05); }
                }
                `}
            </style>
        </div>
    );
};
