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
                style={{ fontSize: '24px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', marginBottom: '20px' }}
            >
                ← Back
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
