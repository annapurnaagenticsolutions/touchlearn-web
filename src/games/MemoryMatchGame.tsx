import React, { useState, useEffect, useRef } from 'react';
import { sfx, tts } from '../engine';

interface CardPair {
    emoji: string;
    nameEn: string;
}

const basePairs: CardPair[] = [
    { emoji: "🍍", nameEn: "Pineapple" },
    { emoji: "🐱", nameEn: "Cat" },
    { emoji: "🟡", nameEn: "Yellow" },
    { emoji: "⭐", nameEn: "Star" },
    { emoji: "🍓", nameEn: "Strawberry" },
    { emoji: "🐶", nameEn: "Dog" }
];

const shuffleArray = <T,>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};

export const MemoryMatchGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [cards, setCards] = useState<CardPair[]>([]);
    const [flipped, setFlipped] = useState<number[]>([]);
    const [matched, setMatched] = useState<number[]>([]);
    const [showWin, setShowWin] = useState(false);
    const isChecking = useRef(false);

    const initGame = () => {
        const shuffledBase = shuffleArray(basePairs);
        const duplicated = [...shuffledBase, ...shuffledBase];
        setCards(shuffleArray(duplicated));
        setFlipped([]);
        setMatched([]);
        setShowWin(false);
        isChecking.current = false;
    };

    useEffect(() => {
        initGame();
    }, []);

    useEffect(() => {
        if (matched.length > 0 && matched.length === cards.length && cards.length > 0) {
            const t = setTimeout(() => {
                setShowWin(true);
                sfx.play('magic');
                tts.speak("Great job! All pairs matched!", false);
            }, 500);
            return () => clearTimeout(t);
        }
    }, [matched.length, cards.length]);

    const handleCardClick = (index: number) => {
        if (isChecking.current) return;
        if (flipped.includes(index) || matched.includes(index)) return;

        sfx.play('pop');
        const card = cards[index];
        tts.speak(card.nameEn, false);

        const newFlipped = [...flipped, index];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            isChecking.current = true;
            setTimeout(() => {
                const [first, second] = newFlipped;
                if (cards[first].emoji === cards[second].emoji) {
                    sfx.play('correct');
                    setMatched(prev => [...prev, first, second]);
                }
                setFlipped([]);
                isChecking.current = false;
            }, 1500);
        }
    };

    return (
        <div style={{ padding: '20px', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', boxSizing: 'border-box' }}>
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

            <h1 style={{ color: '#CBA6F7', margin: '0 0 8px 0' }}>🧩 Memory Match</h1>
            <div style={{ color: '#9399B2', fontSize: '16px', marginBottom: '4px' }}>Goal: {cards.length / 2} pairs</div>
            <div style={{ color: '#9399B2', fontSize: '14px', marginBottom: '16px' }}>Found: {matched.length / 2}</div>

            {showWin ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                    <div style={{ fontSize: '64px', marginBottom: '8px' }}>🎉</div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#A6E3A1', marginBottom: '16px', textAlign: 'center' }}>Awesome! All pairs matched.</div>
                    <button 
                        onClick={() => {
                            sfx.play('click');
                            initGame();
                        }}
                        style={{
                            padding: '12px 24px',
                            fontSize: '18px',
                            background: 'transparent',
                            border: '2px solid #89B4FA',
                            color: '#89B4FA',
                            borderRadius: '24px',
                            cursor: 'pointer'
                        }}
                    >
                        Play Again
                    </button>
                </div>
            ) : (
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(3, 1fr)', 
                    gap: '12px',
                    justifyContent: 'center'
                }}>
                    {cards.map((card, index) => {
                        const isFlipped = flipped.includes(index);
                        const isMatched = matched.includes(index);
                        const showFront = isFlipped || isMatched;

                        let bg = '#313244';
                        if (isMatched) bg = 'rgba(166, 227, 161, 0.3)';
                        else if (isFlipped) bg = '#45475A';

                        return (
                            <div
                                key={index}
                                onClick={() => handleCardClick(index)}
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    backgroundColor: bg,
                                    borderRadius: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: (isFlipped || isMatched) ? 'default' : 'pointer',
                                    userSelect: 'none',
                                    transform: isMatched ? 'scale(0.95)' : 'scale(1)',
                                    transition: 'transform 0.2s, background-color 0.2s'
                                }}
                            >
                                {showFront ? (
                                    <span style={{ fontSize: '40px' }}>{card.emoji}</span>
                                ) : (
                                    <span style={{ fontSize: '32px', color: '#89B4FA' }}>❓</span>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
