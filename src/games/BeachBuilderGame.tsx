import React, { useState, useEffect } from 'react';
import { sfx, tts } from '../engine';

export const BeachBuilderGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [useHindi, setUseHindi] = useState(false);
    const [stage, setStage] = useState(0);

    const stages = [
        { emoji: "🏖️", enName: "Sand", hiName: "Ret", enFact: "Tap sand to start!", hiFact: "Ret par tap karo!", color: "#F9E2AF" },
        { emoji: "🏰", enName: "Tower", hiName: "Minar", enFact: "Add a tower!", hiFact: "Minar lagao!", color: "#DCB483" },
        { emoji: "🚩", enName: "Flag", hiName: "Jhanda", enFact: "Put a flag!", hiFact: "Jhanda lagao!", color: "#F38BA8" },
        { emoji: "🐚", enName: "Shells", hiName: "Seep", enFact: "Decorate with shells!", hiFact: "Seep se sajaao!", color: "#89B4FA" },
        { emoji: "🌈", enName: "Castle", hiName: "Mahal", enFact: "Sandcastle ready!", hiFact: "Ret ka mahal taiyaar!", color: "#A6E3A1" }
    ];

    const current = stages[stage];
    const castleScale = stage >= 4 ? 1.2 : 0.8 + (stage * 0.1);

    useEffect(() => {
        if (stage === 4) {
            sfx.play('correct'); // Optional win sound
        }
    }, [stage]);

    const buildMore = () => {
        if (stage < 4) {
            setStage(stage + 1);
            sfx.play('click');
            const nextStage = stages[stage + 1];
            tts.speak(useHindi ? nextStage.hiFact : nextStage.enFact, false);
        }
    };

    const newCastle = () => {
        setStage(0);
        tts.speak(useHindi ? "Naya mahal! Phir se banao!" : "New castle! Build again!", false);
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

            <h1 style={{ color: '#F9E2AF', fontSize: '24px', marginTop: '10px' }}>
                {useHindi ? "🏖️ Ret Mahal" : "🏖️ Beach Builder"}
            </h1>

            <div style={{
                width: '100%', maxWidth: '400px', height: '240px',
                backgroundColor: '#87CEEB', borderRadius: '20px',
                marginTop: '16px', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center'
            }}>
                <span style={{ 
                    fontSize: '72px', 
                    transform: `scale(${castleScale})`, 
                    transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' 
                }}>
                    {current.emoji}
                </span>
                <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#1E1E2E', marginTop: '8px' }}>
                    {useHindi ? current.hiName : current.enName}
                </span>
            </div>

            <p style={{ color: current.color, fontSize: '18px', fontWeight: 'bold', margin: '16px 0' }}>
                {useHindi ? current.hiFact : current.enFact}
            </p>

            {stage < 4 ? (
                <button
                    onClick={buildMore}
                    style={{ border: `2px solid ${current.color}`, color: current.color, background: 'transparent', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', fontSize: '16px' }}
                >
                    🔨 {useHindi ? "Banate Jao" : "Build More"}
                </button>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#A6E3A1' }}>
                        🎉 {useHindi ? "Mahal taiyaar!" : "Castle ready!"}
                    </span>
                    <button
                        onClick={newCastle}
                        style={{ border: '2px solid #A6E3A1', color: '#A6E3A1', background: 'transparent', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', fontSize: '16px', marginTop: '12px' }}
                    >
                        🏖️ {useHindi ? "Naya Mahal" : "New Castle"}
                    </button>
                </div>
            )}

            <div style={{ backgroundColor: '#313244', padding: '12px', borderRadius: '8px', marginTop: 'auto', width: '90%', maxWidth: '400px' }}>
                <p style={{ color: '#F9E2AF', fontSize: '13px', margin: 0 }}>
                    📖 {useHindi 
                        ? "Ret se bana mahal! Samundar ke paas masti!" 
                        : "Build a castle from sand! Fun at the beach!"}
                </p>
            </div>
        </div>
    );
};
