import React, { useState } from 'react';
import { sfx, tts } from '../engine';

export const SeasonsGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [useHindi, setUseHindi] = useState(false);
    const [season, setSeason] = useState(0);

    const seasons = [
        { emoji: "🌸", nameEn: "Spring", nameHi: "Basant", factEn: "Flowers bloom!", factHi: "Phool khilte hain!", color: "#F38BA8" },
        { emoji: "☀️", nameEn: "Summer", nameHi: "Garmi", factEn: "Hot and sunny!", factHi: "Garmi aur dhoop!", color: "#F9E2AF" },
        { emoji: "🌧️", nameEn: "Monsoon", nameHi: "Baarish", factEn: "Rain and thunder!", factHi: "Baarish aur garaj!", color: "#89B4FA" },
        { emoji: "❄️", nameEn: "Winter", nameHi: "Sardi", factEn: "Cold and snowy!", factHi: "Thand aur barf!", color: "#CDD6F4" }
    ];

    const current = seasons[season];

    const changeSeason = (index: number) => {
        setSeason(index);
        sfx.play('click');
        const next = seasons[index];
        tts.speak(useHindi ? `${next.nameHi}! ${next.factHi}` : `${next.nameEn}! ${next.factEn}`, false);
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

            <h1 style={{ color: '#A6E3A1', fontSize: '24px', marginTop: '10px' }}>
                {useHindi ? "🏔️ Mausam" : "🏔️ Seasons"}
            </h1>

            <div style={{
                width: '100%', maxWidth: '400px', height: '240px',
                backgroundColor: `${current.color}26`, borderRadius: '20px',
                marginTop: '16px', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                transition: 'background-color 0.8s'
            }}>
                <span style={{ fontSize: '80px', animation: 'float 3s infinite ease-in-out' }}>
                    {current.emoji}
                </span>
                <span style={{ fontSize: '28px', fontWeight: 'bold', color: current.color, marginTop: '8px' }}>
                    {useHindi ? current.nameHi : current.nameEn}
                </span>
            </div>

            <p style={{ color: '#CDD6F4', fontSize: '18px', fontWeight: 'bold', marginTop: '16px' }}>
                {useHindi ? current.factHi : current.factEn}
            </p>
            <p style={{ color: '#9399B2', fontSize: '14px', margin: '4px 0 16px' }}>
                {useHindi ? "Mausam badalte hain!" : "Seasons change!"}
            </p>

            <div style={{ display: 'flex', gap: '8px' }}>
                {seasons.map((s, i) => (
                    <button
                        key={i}
                        onClick={() => changeSeason(i)}
                        style={{
                            width: '48px', height: '48px',
                            backgroundColor: season === i ? `${s.color}4D` : '#313244',
                            borderRadius: '12px', border: 'none',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', transition: 'background-color 0.3s'
                        }}
                    >
                        <span style={{ fontSize: '24px' }}>{s.emoji}</span>
                    </button>
                ))}
            </div>

            <p style={{ color: '#9399B2', fontSize: '14px', marginTop: '8px' }}>
                {useHindi ? "Mausam chuno!" : "Pick a season!"}
            </p>

            <div style={{ backgroundColor: '#313244', padding: '10px', borderRadius: '8px', marginTop: 'auto', width: '90%', maxWidth: '400px' }}>
                <p style={{ color: '#F9E2AF', fontSize: '12px', margin: 0 }}>
                    📖 {useHindi 
                        ? "Mausam ghoomte hain! Basant, Garmi, Baarish, Sardi — har saal!" 
                        : "Seasons go round! Spring, Summer, Monsoon, Winter — every year!"}
                </p>
            </div>
            
            <style>
                {`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }
                `}
            </style>
        </div>
    );
};
