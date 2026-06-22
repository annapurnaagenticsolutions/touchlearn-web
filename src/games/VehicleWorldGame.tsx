import React, { useState } from 'react';
import { sfx, tts } from '../engine';

export const VehicleWorldGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [useHindi, setUseHindi] = useState(false);
    const [selected, setSelected] = useState(-1);

    const vehicles = [
        { emoji: "🚗", nameEn: "Car", nameHi: "Gaadi", soundEn: "Vroom vroom!", soundHi: "Gaadi chalti hai!", color: "#F38BA8" },
        { emoji: "🚆", nameEn: "Train", nameHi: "Train", soundEn: "Choo choo!", soundHi: "Train chalti hai!", color: "#89B4FA" },
        { emoji: "✈️", nameEn: "Plane", nameHi: "Hawai Jahaaz", soundEn: "Whoosh! Up in the sky!", soundHi: "Aasmaan mein uddta hai!", color: "#A6E3A1" },
        { emoji: "🚤", nameEn: "Boat", nameHi: "Nauka", soundEn: "Splash! On the water!", soundHi: "Paani par chalti hai!", color: "#F9E2AF" },
        { emoji: "🚀", nameEn: "Rocket", nameHi: "Rocket", soundEn: "Blast off! To space!", soundHi: "Aasmaan mein jaata hai!", color: "#CBA6F7" },
        { emoji: "🚲", nameEn: "Bicycle", nameHi: "Cycle", soundEn: "Ring ring! Pedal fast!", soundHi: "Pedal maar ke chalti hai!", color: "#FAB387" }
    ];

    const handleSelect = (index: number) => {
        if (selected !== -1) return;
        
        setSelected(index);
        sfx.play('click');
        const v = vehicles[index];
        tts.speak(useHindi ? `${v.nameHi}! ${v.soundHi}` : `${v.nameEn}! ${v.soundEn}`, false);
        
        setTimeout(() => {
            setSelected(-1);
        }, 400);
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
                {useHindi ? "🚗 Gaadi Duniya" : "🚗 Vehicle World"}
            </h1>

            <p style={{ color: '#9399B2', fontSize: '14px', margin: '12px 0 16px' }}>
                {useHindi ? "Gaadi chuno!" : "Pick a vehicle!"}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    {vehicles.slice(0, 3).map((v, i) => {
                        const index = i;
                        const isSelected = selected === index;
                        return (
                            <button
                                key={index}
                                onClick={() => handleSelect(index)}
                                style={{
                                    width: '88px', height: '88px',
                                    backgroundColor: `${v.color}33`, borderRadius: '16px', border: 'none',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                                    transition: 'transform 0.2s', cursor: 'pointer'
                                }}
                            >
                                <span style={{ fontSize: '44px' }}>{v.emoji}</span>
                            </button>
                        );
                    })}
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    {vehicles.slice(3, 6).map((v, i) => {
                        const index = i + 3;
                        const isSelected = selected === index;
                        return (
                            <button
                                key={index}
                                onClick={() => handleSelect(index)}
                                style={{
                                    width: '88px', height: '88px',
                                    backgroundColor: `${v.color}33`, borderRadius: '16px', border: 'none',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                                    transition: 'transform 0.2s', cursor: 'pointer'
                                }}
                            >
                                <span style={{ fontSize: '44px' }}>{v.emoji}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div style={{ backgroundColor: '#313244', padding: '10px', borderRadius: '8px', marginTop: 'auto', width: '90%', maxWidth: '400px' }}>
                <p style={{ color: '#F9E2AF', fontSize: '12px', margin: 0 }}>
                    📖 {useHindi 
                        ? "Har gaadi alag tareeke se chalti hai! Hawa mein, paani par, sadak par!" 
                        : "Every vehicle moves differently! In the air, on water, on the road!"}
                </p>
            </div>
        </div>
    );
};
