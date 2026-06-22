import React, { useState } from 'react';
import { sfx, tts } from '../engine';

export const OppositesGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [useHindi, setUseHindi] = useState(false);
    const [currentPair, setCurrentPair] = useState(0);
    const [selected, setSelected] = useState(-1);
    const [showResult, setShowResult] = useState(false);

    const pairs = [
        { emoji1: "🔥", emoji2: "❄️", concept: "Hot and Cold", hindi1: "Garam", hindi2: "Thanda", fact: "Ek garam ek thanda!" },
        { emoji1: "🐶", emoji2: "🐱", concept: "Dog and Cat", hindi1: "Kutta", hindi2: "Billi", fact: "Alag alag jaanwar!" },
        { emoji1: "⬅️", emoji2: "➡️", concept: "Left and Right", hindi1: "Baayein", hindi2: "Daayein", fact: "Do alag dishaayein!" },
        { emoji1: "🌅", emoji2: "🌙", concept: "Day and Night", hindi1: "Din", hindi2: "Raat", fact: "Sooraj aur chaand!" },
        { emoji1: "⬆️", emoji2: "⬇️", concept: "Up and Down", hindi1: "Upar", hindi2: "Neeche", fact: "Ek upar ek neeche!" },
        { emoji1: "⚪", emoji2: "⚫", concept: "White and Black", hindi1: "Safed", hindi2: "Kala", fact: "Alag alag rang!" }
    ];

    const pair = pairs[currentPair];

    const handleSelect = (index: number, hindi: string) => {
        if (showResult) return;
        setSelected(index);
        sfx.play('pop');
        tts.speak(useHindi ? `${hindi}! Dusra bhi chuno` : `${hindi}! Tap the other one too`, false);
        
        setTimeout(() => {
            setShowResult(true);
            sfx.play('correct');
            tts.speak(useHindi ? `${pair.fact} Dono alag alag hain!` : `${pair.concept}. They are different!`, false);
        }, 300);
    };

    const nextPair = () => {
        setCurrentPair((currentPair + 1) % pairs.length);
        setSelected(-1);
        setShowResult(false);
        sfx.play('click');
    };

    return (
        <div style={{ padding: '20px', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <button 
                    onClick={() => { sfx.play('click'); onBack(); }}
                    style={{ fontSize: '24px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
                >
                    ← Back
                </button>
                <button 
                    onClick={() => { sfx.play('click'); setUseHindi(!useHindi); }}
                    style={{ fontSize: '16px', background: '#313244', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}
                >
                    {useHindi ? 'English' : 'हिंदी'}
                </button>
            </div>

            <h1 style={{ color: '#89B4FA', fontSize: '24px', marginTop: '10px' }}>
                {useHindi ? "🔄 Vipreet" : "🔄 Opposites"}
            </h1>

            <p style={{ color: '#9399B2', fontSize: '16px', margin: '16px 0' }}>
                {useHindi ? `${pair.hindi1} aur ${pair.hindi2}` : pair.concept}
            </p>

            <div style={{ display: 'flex', gap: '24px' }}>
                {[
                    { emoji: pair.emoji1, hindi: pair.hindi1 },
                    { emoji: pair.emoji2, hindi: pair.hindi2 }
                ].map((item, index) => {
                    const isSelected = selected === index;
                    return (
                        <div
                            key={index}
                            onClick={() => handleSelect(index, item.hindi)}
                            style={{
                                width: '120px', height: '120px',
                                backgroundColor: isSelected ? 'rgba(137, 180, 250, 0.3)' : '#313244',
                                borderRadius: '20px', cursor: showResult ? 'default' : 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                                transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.3s'
                            }}
                        >
                            <span style={{ fontSize: '64px' }}>{item.emoji}</span>
                        </div>
                    );
                })}
            </div>

            <div style={{ height: '120px', marginTop: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {showResult && (
                    <>
                        <span style={{ color: '#A6E3A1', fontSize: '18px', fontWeight: 'bold' }}>
                            ⭐ {useHindi ? "Vipreet!" : "Opposites!"}
                        </span>
                        <span style={{ color: '#F9E2AF', fontSize: '14px', margin: '8px 0 16px' }}>
                            {pair.fact}
                        </span>
                        <button
                            onClick={nextPair}
                            style={{ border: '2px solid #89B4FA', color: '#89B4FA', background: 'transparent', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer' }}
                        >
                            Next Pair 🔄
                        </button>
                    </>
                )}
            </div>

            <div style={{ backgroundColor: '#313244', padding: '10px', borderRadius: '8px', marginTop: 'auto', width: '90%', maxWidth: '400px' }}>
                <p style={{ color: '#F9E2AF', fontSize: '12px', margin: 0 }}>
                    📖 {useHindi 
                        ? "Vipreet cheezein alag hoti hain! Garam–thanda, bada–chhota, upar–neeche!" 
                        : "Opposites are things that are different! Hot and cold, big and small, up and down!"}
                </p>
            </div>
        </div>
    );
};
