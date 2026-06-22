import React, { useState } from 'react';
import { sfx, tts } from '../engine';
import { BackButton } from '../components/BackButton';
import { triggerHaptic } from '../components/Celebration';

const LETTER_DATA: { letter: string; word: string; emoji: string }[] = [
    { letter: 'A', word: 'Apple', emoji: '🍎' },
    { letter: 'B', word: 'Ball', emoji: '⚽' },
    { letter: 'C', word: 'Cat', emoji: '🐱' },
    { letter: 'D', word: 'Dog', emoji: '🐶' },
    { letter: 'E', word: 'Elephant', emoji: '🐘' },
    { letter: 'F', word: 'Fish', emoji: '🐟' },
    { letter: 'G', word: 'Goat', emoji: '🐐' },
    { letter: 'H', word: 'Hat', emoji: '🎩' },
    { letter: 'I', word: 'Ice cream', emoji: '🍦' },
    { letter: 'J', word: 'Juice', emoji: '🧃' },
    { letter: 'K', word: 'Kite', emoji: '🪁' },
    { letter: 'L', word: 'Lion', emoji: '🦁' },
    { letter: 'M', word: 'Monkey', emoji: '🐵' },
    { letter: 'N', word: 'Nest', emoji: '🪺' },
    { letter: 'O', word: 'Orange', emoji: '🍊' },
    { letter: 'P', word: 'Penguin', emoji: '🐧' },
    { letter: 'Q', word: 'Queen', emoji: '👑' },
    { letter: 'R', word: 'Rabbit', emoji: '🐰' },
    { letter: 'S', word: 'Sun', emoji: '☀️' },
    { letter: 'T', word: 'Tiger', emoji: '🐯' },
    { letter: 'U', word: 'Umbrella', emoji: '☂️' },
    { letter: 'V', word: 'Van', emoji: '🚐' },
    { letter: 'W', word: 'Whale', emoji: '🐳' },
    { letter: 'X', word: 'Xylophone', emoji: '🎹' },
    { letter: 'Y', word: 'Yo-yo', emoji: '🪀' },
    { letter: 'Z', word: 'Zebra', emoji: '🦓' },
];

const LETTER_COLORS = [
    '#FFB5E8', '#B28DFF', '#85E3FF', '#AFF8DB', '#FFFFD1',
    '#FFC9DE', '#C7CEEA', '#B5EAD7', '#FFDAC1', '#E2F0CB',
];

export const AlphabetABCGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [activeLetter, setActiveLetter] = useState<number | null>(null);

    const playLetter = (index: number) => {
        const data = LETTER_DATA[index];
        sfx.play('bubble');
        triggerHaptic(20);
        setActiveLetter(index);
        tts.speak(`${data.letter}. ${data.letter} for ${data.word}`, false);
        setTimeout(() => setActiveLetter(null), 1500);
    };

    return (
        <div style={{ padding: '20px', width: '100%', height: '100%', overflowY: 'auto', boxSizing: 'border-box' }}>
            <BackButton onBack={onBack} />
            <h1 style={{ textAlign: 'center', color: '#F9E2AF', fontSize: '28px', fontWeight: '900', marginBottom: '20px' }}>
                🔤 Alphabet ABCs
            </h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', paddingBottom: '40px' }}>
                {LETTER_DATA.map((data, index) => {
                    const isActive = activeLetter === index;
                    return (
                        <div
                            key={data.letter}
                            onClick={() => playLetter(index)}
                            style={{
                                width: '110px',
                                height: '110px',
                                backgroundColor: isActive ? '#A6E3A1' : LETTER_COLORS[index % LETTER_COLORS.length],
                                color: '#1E1E2E',
                                borderRadius: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '48px',
                                fontWeight: '900',
                                cursor: 'pointer',
                                boxShadow: isActive
                                    ? '0 0 20px rgba(166,227,161,0.8), 0 4px 8px rgba(0,0,0,0.2)'
                                    : '0 6px 12px rgba(0,0,0,0.15)',
                                userSelect: 'none',
                                transition: 'all 0.2s',
                                transform: isActive ? 'scale(1.1)' : 'scale(1)',
                                touchAction: 'manipulation',
                            }}
                        >
                            <span>{data.letter}</span>
                            {isActive && (
                                <div style={{ fontSize: '14px', fontWeight: '700', marginTop: '4px' }}>
                                    {data.emoji} {data.word}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
