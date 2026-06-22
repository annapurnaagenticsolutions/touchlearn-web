import React, { useState, useEffect, useRef } from 'react';
import { sfx, tts } from '../engine';
import { BackButton } from '../components/BackButton';
import { Celebration, triggerHaptic, addStars, setGameStars } from '../components/Celebration';

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
                addStars(3);
                setGameStars('memorymatch', 3);
            }, 500);
            return () => clearTimeout(t);
        }
    }, [matched.length, cards.length]);

    const handleCardClick = (index: number) => {
        if (isChecking.current) return;
        if (flipped.includes(index) || matched.includes(index)) return;

        sfx.play('pop');
        triggerHaptic(20);
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
                    triggerHaptic([30, 30, 30]);
                    setMatched(prev => [...prev, first, second]);
                }
                setFlipped([]);
                isChecking.current = false;
            }, 1200);
        }
    };

    return (
        <div style={{ padding: '20px', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', boxSizing: 'border-box', position: 'relative' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <BackButton onBack={onBack} />
                <div style={{
                    background: 'rgba(255,255,255,0.9)',
                    borderRadius: '20px',
                    padding: '6px 16px',
                    fontSize: '18px',
                    fontWeight: '900',
                    color: '#CBA6F7',
                }}>
                    🎯 {matched.length / 2} / {cards.length / 2}
                </div>
            </div>

            <h1 style={{ color: '#CBA6F7', margin: '0 0 16px 0', fontSize: '28px', fontWeight: '900' }}>🧩 Memory Match</h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                justifyContent: 'center',
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
                                width: '100px',
                                height: '100px',
                                backgroundColor: bg,
                                borderRadius: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: (isFlipped || isMatched) ? 'default' : 'pointer',
                                userSelect: 'none',
                                transform: isMatched ? 'scale(0.95)' : 'scale(1)',
                                transition: 'transform 0.2s, background-color 0.2s',
                                touchAction: 'manipulation',
                                boxShadow: isFlipped && !isMatched ? '0 0 15px rgba(137,180,250,0.5)' : 'none',
                            }}
                        >
                            {showFront ? (
                                <span style={{ fontSize: '48px' }}>{card.emoji}</span>
                            ) : (
                                <span style={{ fontSize: '36px', color: '#89B4FA' }}>❓</span>
                            )}
                        </div>
                    );
                })}
            </div>

            <Celebration
                show={showWin}
                message="All pairs matched!"
                emoji="🧩"
                onPlayAgain={initGame}
                onBack={onBack}
            />
        </div>
    );
};
