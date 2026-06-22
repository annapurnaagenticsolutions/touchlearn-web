import React, { useState, useEffect } from 'react';
import { sfx, tts } from '../engine';

export const ColorByNumberGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [useHindi, setUseHindi] = useState(false);
    const [patternIndex, setPatternIndex] = useState(0);
    const [selectedColor, setSelectedColor] = useState(1);
    const [filled, setFilled] = useState<Set<number>>(new Set());
    const [won, setWon] = useState(false);

    const patterns = [
        {
            numbers: [
                0,0,1,1,1,0,0,
                0,1,2,2,2,1,0,
                1,2,3,3,3,2,1,
                1,2,3,3,3,2,1,
                0,1,2,2,2,1,0,
                0,0,1,1,1,0,0
            ],
            revealEmoji: "❤️", name: "Heart", hindiName: "Dil"
        },
        {
            numbers: [
                0,0,1,1,0,0,0,
                0,1,2,2,1,0,0,
                1,2,3,3,2,1,0,
                1,2,3,3,2,1,0,
                0,1,2,2,1,0,0,
                0,0,1,1,0,0,0
            ],
            revealEmoji: "🍎", name: "Apple", hindiName: "Seb"
        },
        {
            numbers: [
                0,1,1,1,1,1,0,
                1,2,2,2,2,2,1,
                1,2,3,3,3,2,1,
                1,2,3,3,3,2,1,
                1,2,2,2,2,2,1,
                0,1,1,1,1,1,0
            ],
            revealEmoji: "🌸", name: "Flower", hindiName: "Phool"
        }
    ];

    const colors = [
        "#1E1E2E", // 0 = background
        "#F38BA8", // 1 = pink
        "#FAB387", // 2 = peach
        "#A6E3A1", // 3 = green
        "#89B4FA"  // 4 = blue
    ];

    const colorNamesEn = ["", "Pink", "Orange", "Green", "Blue"];
    const colorNamesHi = ["", "Gulabi", "Narangi", "Hara", "Neela"];

    const pattern = patterns[patternIndex];

    useEffect(() => {
        setFilled(new Set());
        setWon(false);
        setSelectedColor(1);
    }, [patternIndex]);

    useEffect(() => {
        const allColoredCount = pattern.numbers.filter(n => n !== 0).length;
        if (allColoredCount > 0 && filled.size === allColoredCount) {
            setTimeout(() => {
                setWon(true);
                sfx.play('correct'); // win
                const name = useHindi ? pattern.hindiName : pattern.name;
                tts.speak(useHindi ? `Dekho! Yeh hai ${name}! ` : `Look! It's a ${name}! `, false);
            }, 300);
        }
    }, [filled, pattern, useHindi]);

    const handleCellClick = (index: number, expectedColor: number) => {
        if (expectedColor === 0 || filled.has(index)) return;

        if (selectedColor === expectedColor) {
            const newFilled = new Set(filled);
            newFilled.add(index);
            setFilled(newFilled);
            sfx.play('pop');
            const name = useHindi ? colorNamesHi[selectedColor] : colorNamesEn[selectedColor];
            tts.speak(`${name}! ${expectedColor}!`, false);
        } else {
            sfx.play('pop'); // buzz replacement
            const correctName = useHindi ? colorNamesHi[expectedColor] : colorNamesEn[expectedColor];
            tts.speak(useHindi ? `Galat rang! ${correctName} chhunein!` : `Wrong color! Use ${correctName}!`, false);
        }
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

            <h1 style={{ color: '#CBA6F7', fontSize: '24px', marginTop: '10px' }}>
                {useHindi ? "🎨 Number se Rang" : "🎨 Color by Number"}
            </h1>

            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                {patterns.map((p, i) => (
                    <button
                        key={i}
                        onClick={() => { setPatternIndex(i); sfx.play('click'); }}
                        style={{
                            padding: '8px 16px', borderRadius: '8px',
                            background: 'transparent',
                            border: `2px solid ${patternIndex === i ? '#89B4FA' : '#9399B2'}`,
                            color: patternIndex === i ? '#89B4FA' : '#9399B2',
                            cursor: 'pointer'
                        }}
                    >
                        {useHindi ? p.hindiName : p.name}
                    </button>
                ))}
            </div>

            <p style={{ color: '#9399B2', fontSize: '14px', margin: '16px 0 8px' }}>
                {useHindi ? "Rang chhunein:" : "Pick a color:"}
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
                {[1, 2, 3, 4].map(cIdx => (
                    <button
                        key={cIdx}
                        onClick={() => {
                            setSelectedColor(cIdx);
                            sfx.play('click');
                            tts.speak(useHindi ? colorNamesHi[cIdx] : colorNamesEn[cIdx], false);
                        }}
                        style={{
                            width: '40px', height: '40px',
                            backgroundColor: colors[cIdx],
                            borderRadius: '8px', border: 'none',
                            transform: selectedColor === cIdx ? 'scale(1.2)' : 'scale(1)',
                            transition: 'transform 0.2s',
                            cursor: 'pointer'
                        }}
                    />
                ))}
            </div>

            <div style={{ marginTop: '24px' }}>
                {won ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <span style={{ fontSize: '80px', animation: 'bounce 1s' }}>{pattern.revealEmoji}</span>
                        <p style={{ color: '#A6E3A1', fontSize: '18px', fontWeight: 'bold' }}>
                            {useHindi ? `Kya sundar painting! ${pattern.revealEmoji}` : `Beautiful painting! ${pattern.revealEmoji}`}
                        </p>
                        <button
                            onClick={() => { setPatternIndex((patternIndex + 1) % patterns.length); sfx.play('click'); }}
                            style={{ border: '2px solid #CBA6F7', color: '#CBA6F7', background: 'transparent', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', marginTop: '12px' }}
                        >
                            {useHindi ? "Aur rang bharein!" : "Paint More!"}
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        {Array.from({ length: 6 }).map((_, row) => (
                            <div key={row} style={{ display: 'flex', gap: '2px' }}>
                                {Array.from({ length: 7 }).map((_, col) => {
                                    const index = row * 7 + col;
                                    const expectedColor = pattern.numbers[index] || 0;
                                    const isFilled = filled.has(index);
                                    const displayColor = isFilled ? colors[expectedColor] : colors[0];
                                    const showNumber = !isFilled && expectedColor !== 0;

                                    return (
                                        <div
                                            key={col}
                                            onClick={() => handleCellClick(index, expectedColor)}
                                            style={{
                                                width: '38px', height: '38px',
                                                backgroundColor: displayColor,
                                                borderRadius: '4px',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                cursor: expectedColor !== 0 && !isFilled ? 'pointer' : 'default'
                                            }}
                                        >
                                            {showNumber && (
                                                <span style={{ color: `${colors[expectedColor]}99`, fontWeight: 'bold', fontSize: '16px' }}>
                                                    {expectedColor}
                                                </span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <p style={{ color: '#9399B2', fontSize: '13px', marginTop: 'auto' }}>
                {useHindi ? "Sahi number par sahi rang bharein!" : "Fill matching cells with the right color!"}
            </p>
        </div>
    );
};
