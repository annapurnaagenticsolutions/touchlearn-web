import React, { useState, useEffect } from 'react';
import { sfx, tts } from '../engine';

export const JigsawPuzzleGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const pictures: Record<string, string[]> = {
        "House": ["🏠", "🚪", "🪟", "🌳", "☁️", "🌞"],
        "Car": ["🚗", "🔴", "🟡", "🟢", "🛣️", "🌳"],
        "Tree": ["🌳", "🍎", "🍊", "🐦", "☁️", "🌞"],
        "Fish": ["🐠", "🐟", "🦈", "🐙", "🌊", "🪸"],
        "Robot": ["🤖", "⚙️", "🔩", "💡", "📡", "🔋"]
    };
    const pictureNames = Object.keys(pictures);

    const [selectedPicture, setSelectedPicture] = useState("House");
    const [tiles, setTiles] = useState<string[]>([]);
    const [target, setTarget] = useState<string[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [moves, setMoves] = useState(0);
    const [won, setWon] = useState(false);

    useEffect(() => {
        const correct = pictures[selectedPicture];
        setTarget(correct);
        
        let shuffled = [...correct];
        while (JSON.stringify(shuffled) === JSON.stringify(correct)) {
            shuffled = shuffled.sort(() => Math.random() - 0.5);
        }
        
        setTiles(shuffled);
        setSelectedIndex(-1);
        setMoves(0);
        setWon(false);
    }, [selectedPicture]);

    useEffect(() => {
        if (tiles.length > 0 && JSON.stringify(tiles) === JSON.stringify(target)) {
            setTimeout(() => {
                setWon(true);
                sfx.play('win');
                tts.speak(`Congratulations! ${selectedPicture} puzzle complete in ${moves} moves!`, false);
            }, 300);
        }
    }, [tiles, target, moves, selectedPicture]);

    const handleTileClick = (index: number) => {
        if (won) return;

        if (selectedIndex === -1) {
            setSelectedIndex(index);
            sfx.play('click');
        } else if (selectedIndex === index) {
            setSelectedIndex(-1); // Deselect
        } else {
            // Swap
            const newTiles = [...tiles];
            const temp = newTiles[selectedIndex];
            newTiles[selectedIndex] = newTiles[index];
            newTiles[index] = temp;
            
            setTiles(newTiles);
            setSelectedIndex(-1);
            setMoves(m => m + 1);
            sfx.play('correct');
        }
    };

    const handleNextPuzzle = () => {
        const nextIdx = (pictureNames.indexOf(selectedPicture) + 1) % pictureNames.length;
        setSelectedPicture(pictureNames[nextIdx]);
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

            <h1 style={{ color: '#CBA6F7', fontSize: '24px', marginTop: '10px' }}>🧩 Jigsaw Puzzle</h1>
            
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', marginTop: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {pictureNames.map((name) => (
                    <button
                        key={name}
                        onClick={() => { setSelectedPicture(name); sfx.play('click'); }}
                        style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            background: 'transparent',
                            border: `2px solid ${selectedPicture === name ? '#89B4FA' : '#9399B2'}`,
                            color: selectedPicture === name ? '#89B4FA' : '#9399B2',
                            cursor: 'pointer'
                        }}
                    >
                        {name}
                    </button>
                ))}
            </div>

            <p style={{ color: '#9399B2', fontSize: '14px', margin: '4px' }}>Target:</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 44px)', gap: '4px', marginBottom: '16px' }}>
                {target.map((emoji, idx) => (
                    <div key={idx} style={{
                        width: '44px', height: '44px', backgroundColor: '#45475A', borderRadius: '6px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px'
                    }}>
                        {emoji}
                    </div>
                ))}
            </div>

            <p style={{ color: '#9399B2', fontSize: '14px', margin: '4px' }}>Moves: {moves}</p>

            {won ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '24px', animation: 'fadeIn 0.5s' }}>
                    <p style={{ color: '#A6E3A1', fontSize: '20px', fontWeight: 'bold' }}>Amazing! {moves} moves!</p>
                    <button 
                        onClick={handleNextPuzzle}
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
                        Play Again
                    </button>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 80px)', gap: '8px', marginTop: '16px' }}>
                    {tiles.map((emoji, index) => {
                        const isSelected = selectedIndex === index;
                        const isCorrect = emoji === target[index];
                        
                        let bgColor = '#313244';
                        if (isSelected) bgColor = 'rgba(137, 180, 250, 0.3)';
                        else if (isCorrect) bgColor = 'rgba(166, 227, 161, 0.3)';

                        return (
                            <div
                                key={index}
                                onClick={() => handleTileClick(index)}
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    backgroundColor: bgColor,
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '36px',
                                    cursor: 'pointer',
                                    transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                                    transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                }}
                            >
                                <span style={{ userSelect: 'none' }}>{emoji}</span>
                            </div>
                        );
                    })}
                </div>
            )}

            <p style={{ color: '#9399B2', fontSize: '14px', marginTop: '24px', textAlign: 'center' }}>
                Tap two tiles to swap them! Match the target picture on top!
            </p>
        </div>
    );
};
