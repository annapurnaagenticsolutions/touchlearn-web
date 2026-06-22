import React, { useState, useEffect } from 'react';
import { sfx, tts } from '../engine';

export const ConnectDotsGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    // Dot positions (x, y in grid coordinates 0-4) and their labels
    const dotSets = [
        // Star shape
        {
            dots: [
                { x: 2, y: 0, label: "1" }, { x: 3, y: 2, label: "2" }, { x: 4, y: 4, label: "3" },
                { x: 2, y: 3, label: "4" }, { x: 0, y: 4, label: "5" }, { x: 1, y: 2, label: "6" }
            ],
            emoji: "⭐",
            name: "Star"
        },
        // Heart shape
        {
            dots: [
                { x: 2, y: 1, label: "1" }, { x: 3, y: 0, label: "2" }, { x: 4, y: 1, label: "3" },
                { x: 4, y: 2, label: "4" }, { x: 2, y: 4, label: "5" }, { x: 0, y: 2, label: "6" },
                { x: 0, y: 1, label: "7" }, { x: 1, y: 0, label: "8" }
            ],
            emoji: "❤️",
            name: "Heart"
        },
        // Arrow shape
        {
            dots: [
                { x: 0, y: 2, label: "1" }, { x: 1, y: 2, label: "2" }, { x: 2, y: 2, label: "3" },
                { x: 3, y: 1, label: "4" }, { x: 3, y: 2, label: "5" }, { x: 3, y: 3, label: "6" }
            ],
            emoji: "➡️",
            name: "Arrow"
        }
    ];

    const [shapeIndex, setShapeIndex] = useState(0);
    const [connected, setConnected] = useState(0);
    const [won, setWon] = useState(false);

    const currentSet = dotSets[shapeIndex];
    const gridSize = 5;
    const cellSize = 56;

    useEffect(() => {
        setConnected(0);
        setWon(false);
    }, [shapeIndex]);

    useEffect(() => {
        if (connected >= currentSet.dots.length) {
            setTimeout(() => {
                setWon(true);
                sfx.play('win');
                tts.speak(`Look! It's a ${currentSet.name}! Amazing!`, false);
            }, 300);
        }
    }, [connected, currentSet]);

    const handleDotClick = (idx: number) => {
        if (idx === connected) {
            setConnected(c => c + 1);
            sfx.play('correct');
            tts.speak(`${currentSet.dots[idx].label}!`, false);
        } else if (idx > connected) {
            sfx.play('buzz');
        }
    };

    const handleNextShape = () => {
        setShapeIndex(prev => (prev + 1) % dotSets.length);
        sfx.play('click');
    };

    return (
        <div style={{ padding: '20px', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                <button 
                    onClick={() => { sfx.play('click'); onBack(); }}
                    style={{ fontSize: '24px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
                >
                    ← Back
                </button>
            </div>

            <h1 style={{ color: '#CBA6F7', fontSize: '24px', marginTop: '10px' }}>🔢 Connect the Dots</h1>
            
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', marginTop: '16px' }}>
                {dotSets.map((set, i) => (
                    <button
                        key={i}
                        onClick={() => { setShapeIndex(i); sfx.play('click'); }}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '8px',
                            background: 'transparent',
                            border: `2px solid ${shapeIndex === i ? '#89B4FA' : '#9399B2'}`,
                            color: shapeIndex === i ? '#89B4FA' : '#9399B2',
                            cursor: 'pointer'
                        }}
                    >
                        {set.name}
                    </button>
                ))}
            </div>

            {won ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '32px', animation: 'fadeIn 0.5s' }}>
                    <span style={{ fontSize: '72px' }}>{currentSet.emoji}</span>
                    <p style={{ color: '#A6E3A1', fontSize: '20px', fontWeight: 'bold' }}>Great! Picture completed.</p>
                    <button 
                        onClick={handleNextShape}
                        style={{
                            marginTop: '16px',
                            border: '2px solid #A6E3A1',
                            backgroundColor: 'transparent',
                            color: '#A6E3A1',
                            padding: '12px 24px',
                            borderRadius: '24px',
                            fontSize: '16px',
                            cursor: 'pointer'
                        }}
                    >
                        Draw More
                    </button>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <p style={{ color: '#F9E2AF', fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
                        Tap dot {connected + 1}!
                    </p>

                    <div style={{ 
                        position: 'relative', 
                        width: `${cellSize * gridSize}px`, 
                        height: `${cellSize * gridSize}px`,
                        marginTop: '24px'
                    }}>
                        {/* Draw connecting lines conceptually using cells */}
                        {connected > 0 && Array.from({ length: Math.min(connected, currentSet.dots.length - 1) }).map((_, i) => {
                            const p1 = currentSet.dots[i];
                            const p2 = currentSet.dots[i + 1];
                            const midX = (p1.x + p2.x) / 2;
                            const midY = (p1.y + p2.y) / 2;
                            return (
                                <div key={`line-${i}`} style={{
                                    position: 'absolute',
                                    left: `${midX * cellSize + cellSize / 4}px`,
                                    top: `${midY * cellSize + cellSize / 4}px`,
                                    width: `${cellSize / 2}px`,
                                    height: `${cellSize / 2}px`,
                                    backgroundColor: 'rgba(137, 180, 250, 0.3)',
                                    borderRadius: '50%'
                                }} />
                            );
                        })}

                        {/* Draw dots */}
                        {currentSet.dots.map((dot, idx) => {
                            const isNext = idx === connected;
                            const isDone = idx < connected;
                            
                            let bgColor = '#313244';
                            if (isDone) bgColor = '#A6E3A1';
                            else if (isNext) bgColor = '#89B4FA';

                            return (
                                <div
                                    key={idx}
                                    onClick={() => handleDotClick(idx)}
                                    style={{
                                        position: 'absolute',
                                        left: `${dot.x * cellSize + 4}px`,
                                        top: `${dot.y * cellSize + 4}px`,
                                        width: `${cellSize - 8}px`,
                                        height: `${cellSize - 8}px`,
                                        backgroundColor: bgColor,
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: isNext ? 'pointer' : 'default',
                                        transform: isNext ? 'scale(1.2)' : 'scale(1)',
                                        transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                    }}
                                >
                                    <span style={{ 
                                        color: (isDone || isNext) ? '#1E1E2E' : '#CDD6F4',
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        userSelect: 'none'
                                    }}>
                                        {dot.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <p style={{ color: '#9399B2', fontSize: '14px', marginTop: '32px' }}>Goal: {currentSet.dots.length - 1} connects</p>
        </div>
    );
};
