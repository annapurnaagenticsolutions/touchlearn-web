import React, { useState } from 'react';
import { sfx, tts } from '../engine';

export const WaterCycleGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [useHindi, setUseHindi] = useState(false);
    const [stage, setStage] = useState(0);

    const stages = [
        { fromEmoji: "🔥", toEmoji: "⛅", nameEn: "Cloud", nameHi: "Baadal", fromEn: "Sun", toEn: "Cloud", fromHi: "Sooraj", toHi: "Baadal", factEn: "Warm air rises up!", factHi: "Garam hawa upar jaati hai!" },
        { fromEmoji: "⛅", toEmoji: "🌧️", nameEn: "Rain", nameHi: "Baarish", fromEn: "Cloud", toEn: "Rain", fromHi: "Baadal", toHi: "Baarish", factEn: "Cool air makes water fall!", factHi: "Thandi hawa se paani girta hai!" },
        { fromEmoji: "🌧️", toEmoji: "💧", nameEn: "River", nameHi: "Nadi", fromEn: "Rain", toEn: "River", fromHi: "Baarish", toHi: "Nadi", factEn: "Water gathers in rivers!", factHi: "Paani nadi mein jama hota hai!" },
        { fromEmoji: "💧", toEmoji: "🌊", nameEn: "Ocean", nameHi: "Samudra", fromEn: "River", toEn: "Ocean", fromHi: "Nadi", toHi: "Samudra", factEn: "All water meets in the ocean!", factHi: "Sab paani samudra mein milta hai!" },
        { fromEmoji: "🌊", toEmoji: "☁️", nameEn: "Evaporate", nameHi: "Udgam", fromEn: "Ocean", toEn: "Cloud", fromHi: "Samudra", toHi: "Baadal", factEn: "Sun heats water and it rises!", factHi: "Garam dhoop se paani udd jaata hai!" }
    ];

    const current = stages[stage];

    const nextStage = () => {
        const next = (stage + 1) % stages.length;
        setStage(next);
        sfx.play('click');
        tts.speak(useHindi ? stages[next].factHi : stages[next].factEn, false);
    };

    const restart = () => {
        setStage(0);
        sfx.play('click');
        tts.speak(useHindi ? "Cycle shuru! Phir se dekho" : "Cycle starts! Watch again!", false);
    };

    return (
        <div style={{ padding: '20px', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
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
                    style={{ fontSize: '16px', background: '#313244', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}
                >
                    {useHindi ? 'English' : 'हिंदी'}
                </button>
            </div>

            <h1 style={{ color: '#89B4FA', fontSize: '24px', marginTop: '10px' }}>
                {useHindi ? "💧 Jal Chakra" : "💧 Water Cycle"}
            </h1>

            <div style={{
                width: '100%', maxWidth: '400px', height: '260px',
                backgroundColor: '#1A3A5C', borderRadius: '20px',
                marginTop: '16px', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center'
            }}>
                <span style={{ fontSize: '60px' }}>☁️</span>
                
                <div style={{ height: '36px', transition: 'opacity 1s', opacity: stage === 1 ? 1 : 0 }}>
                    {stage === 1 && <span style={{ fontSize: '32px' }}>🌧️</span>}
                </div>

                <div style={{ height: '16px', width: '60%', transition: 'opacity 0.8s', opacity: stage === 2 ? 1 : 0, backgroundColor: '#4A9FD4', borderRadius: '8px', marginTop: stage === 2 ? 0 : '16px' }} />

                <div style={{ height: '24px', width: '80%', transition: 'opacity 0.8s', opacity: stage === 3 ? 1 : 0, backgroundColor: '#1E6091', borderRadius: '8px', marginTop: stage === 3 ? 0 : '24px' }} />

                <div style={{ display: 'flex', gap: '8px', transition: 'opacity 1s', opacity: stage === 4 ? 1 : 0 }}>
                    {stage === 4 && (
                        <>
                            <span style={{ fontSize: '24px' }}>☁️</span>
                            <span style={{ fontSize: '20px' }}>💨</span>
                        </>
                    )}
                </div>
            </div>

            <div style={{ marginTop: '12px', textAlign: 'center' }}>
                <span style={{ color: '#89B4FA', fontSize: '20px', fontWeight: 'bold' }}>
                    {useHindi ? current.nameHi : current.nameEn}
                </span>
                <p style={{ color: '#CDD6F4', fontSize: '14px', margin: '4px 0' }}>
                    {useHindi ? `${current.fromHi} → ${current.toHi}` : `${current.fromEn} → ${current.toEn}`}
                </p>
            </div>

            <div style={{ backgroundColor: '#313244', padding: '12px', borderRadius: '12px', width: '90%', maxWidth: '400px', marginTop: '12px' }}>
                <p style={{ color: '#F9E2AF', fontSize: '14px', margin: 0 }}>
                    📖 {useHindi ? current.factHi : current.factEn}
                </p>
            </div>

            <button
                onClick={nextStage}
                style={{ border: '2px solid #89B4FA', color: '#89B4FA', background: 'transparent', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', marginTop: '16px' }}
            >
                {useHindi ? "Agla Charan 🔄" : "Next Stage 🔄"}
            </button>

            <div style={{ height: '40px', marginTop: '8px' }}>
                {stage === 4 && (
                    <button
                        onClick={restart}
                        style={{ border: '2px solid #A6E3A1', color: '#A6E3A1', background: 'transparent', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer' }}
                    >
                        {useHindi ? "Phir Se Shuru 🔄" : "Restart Cycle 🔄"}
                    </button>
                )}
            </div>

            <div style={{ backgroundColor: '#313244', padding: '10px', borderRadius: '8px', marginTop: 'auto', width: '90%', maxWidth: '400px' }}>
                <p style={{ color: '#F9E2AF', fontSize: '12px', margin: 0 }}>
                    📖 {useHindi 
                        ? "Paani ghoomta rehta hai! Suraj paani ko garam karta hai → baadal bante hain → baarish hoti hai → nadiyan behati hain → samudra bharata hai → phir suraj garam karta hai!" 
                        : "Water goes round and round! Sun heats water → clouds form → rain falls → rivers flow → ocean collects → sun heats again!"}
                </p>
            </div>
        </div>
    );
};
