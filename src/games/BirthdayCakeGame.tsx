import React, { useState } from 'react';
import { sfx, tts } from '../engine';

export const BirthdayCakeGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [useHindi, setUseHindi] = useState(false);
    const [toppings, setToppings] = useState<string[]>([]);
    const [candles, setCandles] = useState(0);
    const [blown, setBlown] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const toppingOptions = [
        { emoji: "🍓", nameEn: "Strawberry", nameHi: "Strawberry", color: "#F38BA8" },
        { emoji: "🍒", nameEn: "Cherry", nameHi: "Cherry", color: "#DC143C" },
        { emoji: "🍫", nameEn: "Chocolate", nameHi: "Chocolate", color: "#8B4513" },
        { emoji: "🍬", nameEn: "Candy", nameHi: "Candy", color: "#89B4FA" },
        { emoji: "🧁", nameEn: "Cream", nameHi: "Cream", color: "#CDD6F4" },
        { emoji: "✨", nameEn: "Sprinkles", nameHi: "Sprinkles", color: "#F9E2AF" }
    ];

    const blowCandles = () => {
        setBlown(true);
        setShowConfetti(true);
        sfx.play('correct'); // Replace cheer with generic win
        tts.speak(useHindi ? "Happy Birthday! Mubarak ho! Saal bhar khushiyan" : "Happy Birthday! Have a great year!", false);
    };

    const addCandle = () => {
        if (candles < 5) {
            setCandles(prev => prev + 1);
            sfx.play('click');
            tts.speak(useHindi ? `Ek aur candle! ${candles + 1} total` : `One more candle! ${candles + 1} total`, false);
        }
    };

    const newCake = () => {
        setToppings([]);
        setCandles(0);
        setBlown(false);
        setShowConfetti(false);
        sfx.play('click');
        tts.speak(useHindi ? "Naya cake! Decorate karo" : "New cake! Decorate it!", false);
    };

    const addTopping = (emoji: string, nameEn: string, nameHi: string) => {
        if (toppings.length < 6) {
            setToppings([...toppings, emoji]);
            sfx.play('pop');
            tts.speak(useHindi ? `${nameHi}! Swadisht` : `${nameEn}! Yummy!`, false);
        }
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

            <h1 style={{ color: '#F38BA8', fontSize: '24px', marginTop: '10px' }}>
                {useHindi ? "🎂 Janmdin Cake" : "🎂 Birthday Cake"}
            </h1>

            <div style={{
                width: '200px', height: '200px',
                backgroundColor: '#5C3A21', borderRadius: '20px',
                marginTop: '16px', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center'
            }}>
                {toppings.length > 0 && (
                    <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
                        {toppings.map((t, i) => (
                            <span key={i} style={{ fontSize: '24px' }}>{t}</span>
                        ))}
                    </div>
                )}
                
                <div style={{
                    width: '120px', height: '80px',
                    backgroundColor: '#FAB387', borderRadius: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <span style={{ fontSize: '48px' }}>🎂</span>
                </div>

                {candles > 0 ? (
                    <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                        {Array.from({ length: candles }).map((_, i) => (
                            <span key={i} style={{ fontSize: '20px', animation: blown ? 'none' : 'flicker 0.2s infinite alternate' }}>
                                {blown ? "🕯️" : "🔥"}
                            </span>
                        ))}
                    </div>
                ) : (
                    <div style={{ height: '20px', marginTop: '8px' }} />
                )}
            </div>

            <div style={{ height: '30px', margin: '12px 0' }}>
                {showConfetti && (
                    <span style={{ color: '#F9E2AF', fontSize: '20px', fontWeight: 'bold' }}>
                        {useHindi ? "🎉 Janmdin Mubarak! 🎉" : "🎉 Happy Birthday! 🎉"}
                    </span>
                )}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
                {!blown && candles > 0 ? (
                    <button
                        onClick={blowCandles}
                        style={{ border: '2px solid #F38BA8', color: '#F38BA8', background: 'transparent', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer' }}
                    >
                        {useHindi ? "Foonk! 💨" : "Blow! 💨"}
                    </button>
                ) : (
                    <button
                        onClick={addCandle}
                        style={{ border: '2px solid #F9E2AF', color: '#F9E2AF', background: 'transparent', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer' }}
                    >
                        {useHindi ? "Mombatti 🔥" : "Candle 🔥"}
                    </button>
                )}

                <button
                    onClick={newCake}
                    style={{ border: '2px solid #A6E3A1', color: '#A6E3A1', background: 'transparent', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer' }}
                >
                    {useHindi ? "Naya Cake 🍰" : "New Cake 🍰"}
                </button>
            </div>

            <p style={{ color: '#9399B2', fontSize: '13px', margin: '16px 0 6px' }}>
                {useHindi ? "Sajaavat ke cheezein chuno:" : "Tap toppings to decorate:"}
            </p>

            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {toppingOptions.map((opt, i) => (
                    <button
                        key={i}
                        onClick={() => addTopping(opt.emoji, opt.nameEn, opt.nameHi)}
                        style={{
                            width: '44px', height: '44px',
                            backgroundColor: `${opt.color}33`, borderRadius: '22px',
                            border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        <span style={{ fontSize: '22px' }}>{opt.emoji}</span>
                    </button>
                ))}
            </div>

            <div style={{ backgroundColor: '#313244', padding: '10px', borderRadius: '8px', marginTop: 'auto', width: '90%', maxWidth: '400px' }}>
                <p style={{ color: '#F9E2AF', fontSize: '12px', margin: 0 }}>
                    📖 {useHindi 
                        ? "Janmdin bade hone ka utsav hai! Har candle = ek saal bada!" 
                        : "Birthdays celebrate growing up! Each candle = one year older!"}
                </p>
            </div>

            <style>
                {`
                @keyframes flicker {
                    from { transform: scale(0.9); opacity: 0.8; }
                    to { transform: scale(1.1); opacity: 1; }
                }
                `}
            </style>
        </div>
    );
};
