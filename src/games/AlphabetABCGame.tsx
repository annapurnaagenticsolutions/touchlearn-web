import React from 'react';
import { sfx, tts } from '../engine';

export const AlphabetABCGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

    const playLetter = (letter: string) => {
        sfx.play('bubble');
        tts.speak(letter, false); // Speak in English
    };

    return (
        <div style={{ padding: '20px', width: '100%', height: '100%', overflowY: 'auto' }}>
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
            <h1 style={{ textAlign: 'center', color: '#F9E2AF' }}>Alphabet ABCs</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
                {letters.map(letter => (
                    <div
                        key={letter}
                        onClick={() => playLetter(letter)}
                        style={{
                            width: '80px',
                            height: '80px',
                            backgroundColor: '#CBA6F7',
                            color: '#11111B',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '48px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                            userSelect: 'none'
                        }}
                    >
                        {letter}
                    </div>
                ))}
            </div>
        </div>
    );
};
