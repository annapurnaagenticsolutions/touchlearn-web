import React, { useState } from 'react';
import { sfx, tts } from '../engine';

export const ShadowMatchGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const rounds = [
        { emoji: "🐱", name: "Cat", options: ["🐱", "🐶", "🐯"] },
        { emoji: "🍍", name: "Pineapple", options: ["🍍", "🍓", "🍉"] },
        { emoji: "⬛", name: "Square", options: ["⬛", "⭕", "△"] },
        { emoji: "🔴", name: "Red", options: ["🔴", "🔵", "🟡"] },
        { emoji: "🦁", name: "Lion", options: ["🦁", "🐻", "🐐"] }
    ];

    const [currentRound, setCurrentRound] = useState(0);
    const [matched, setMatched] = useState(false);
    const [selected, setSelected] = useState(-1);
    const [wrong, setWrong] = useState(false);

    const round = rounds[currentRound];
    // Keep options consistent per round render
    const [options] = useState(() => [...round.options].sort(() => Math.random() - 0.5));

    const handleOptionClick = (index: number, emoji: string) => {
        if (matched || wrong) return;
        
        setSelected(index);
        if (emoji === round.emoji) {
            setMatched(true);
            sfx.play('correct');
            tts.speak(`Correct! Found the ${round.name} shadow!`, false);
        } else {
            setWrong(true);
            sfx.play('buzz');
            tts.speak(`Wrong! Match the shadow!`, false);
            setTimeout(() => {
                setWrong(false);
                setSelected(-1);
            }, 800);
        }
    };

    const nextRound = () => {
        setCurrentRound((prev) => (prev + 1) % rounds.length);
        setMatched(false);
        setWrong(false);
        setSelected(-1);
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
            
            <h1 style={{ color: '#45475A', fontSize: '24px', marginTop: '10px' }}>🎬 Shadow Match</h1>
            <p style={{ color: '#9399B2', fontSize: '18px', marginBottom: '20px' }}>Which one matches?</p>

            {/* Shadow Box */}
            <div style={{
                width: '120px',
                height: '120px',
                backgroundColor: '#1E1E2E',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '10px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
            }}>
                <span style={{ 
                    fontSize: '72px', 
                    filter: 'brightness(0) opacity(0.8)', // Makes it a perfect silhouette
                    userSelect: 'none'
                }}>
                    {round.emoji}
                </span>
            </div>
            <p style={{ color: '#9399B2', fontSize: '14px', marginBottom: '30px' }}>Shadow of {round.name}</p>

            {/* Options */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '30px' }}>
                {options.map((emoji, index) => {
                    const isCorrect = emoji === round.emoji;
                    const isSelected = selected === index;
                    
                    let bgColor = '#313244';
                    if (matched && isCorrect) bgColor = 'rgba(166, 227, 161, 0.3)';
                    if (wrong && isSelected) bgColor = 'rgba(243, 139, 168, 0.3)';

                    const transform = isSelected ? 'scale(0.9)' : 'scale(1)';

                    return (
                        <div
                            key={index}
                            onClick={() => handleOptionClick(index, emoji)}
                            style={{
                                width: '88px',
                                height: '88px',
                                backgroundColor: bgColor,
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '44px',
                                cursor: (matched || wrong) ? 'default' : 'pointer',
                                transition: 'all 0.2s ease',
                                transform: transform,
                                userSelect: 'none',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
                            }}
                        >
                            {emoji}
                        </div>
                    );
                })}
            </div>

            {matched && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeIn 0.5s' }}>
                    <p style={{ color: '#A6E3A1', fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>⭐ Matched!</p>
                    <button 
                        onClick={nextRound}
                        style={{
                            border: '2px solid #A6E3A1',
                            backgroundColor: 'transparent',
                            color: '#A6E3A1',
                            padding: '12px 24px',
                            borderRadius: '24px',
                            fontSize: '16px',
                            cursor: 'pointer'
                        }}
                    >
                        Next Shadow 🎬
                    </button>
                </div>
            )}

            <div style={{
                marginTop: 'auto',
                backgroundColor: '#313244',
                padding: '16px',
                borderRadius: '8px',
                width: '90%',
                textAlign: 'center'
            }}>
                <p style={{ color: '#F9E2AF', fontSize: '14px', margin: 0 }}>
                    📖 Shadows show the shape of things! Match the shadow to find the right object!
                </p>
            </div>
        </div>
    );
};
