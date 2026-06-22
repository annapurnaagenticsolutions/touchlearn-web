import React, { useState, useEffect } from 'react';
import { sfx, tts } from '../engine';

export const SlidingPuzzleGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [useHindi, setUseHindi] = useState(false);
    const [gridSize, setGridSize] = useState(3);
    const [theme, setTheme] = useState("Animals");
    
    const [tiles, setTiles] = useState<number[]>([]);
    const [emptyIndex, setEmptyIndex] = useState(0);
    const [moves, setMoves] = useState(0);
    const [won, setWon] = useState(false);
    const [showPreview, setShowPreview] = useState(true);
    const [gameKey, setGameKey] = useState(0);

    const themeNames: Record<string, { en: string, hi: string }> = {
        "Animals": { en: "Animals", hi: "Janwar" },
        "Birds": { en: "Birds", hi: "Panchhi" },
        "Dinosaurs": { en: "Dinosaurs", hi: "Dinosaur" },
        "Vehicles": { en: "Vehicles", hi: "Gaadi" },
        "Fruits": { en: "Fruits", hi: "Fal" }
    };
    const themes = ["Animals", "Birds", "Dinosaurs", "Vehicles", "Fruits"];
    const themeEmojis: Record<string, string[]> = {
        "Animals": ["🐘", "🦁", "🐯", "🦓", "🦒", "🐼", "🐨", "🦘", "🦏", "🦛", "🐊", "🦍", "🐆", "🦌", "🦩", "🦚", "🦜", "🦢", "🦉", "🦅", "🐧", "🦆", "🦃", "🐓", "🐿️"],
        "Birds": ["🦅", "🦉", "🦜", "🦚", "🦩", "🐧", "🦆", "🦢", "🕊️", "🐦", "🦃", "🐓", "🦤", "🦅", "🦉", "🦜", "🦚", "🦩", "🐧", "🦆", "🦢", "🕊️", "🐦", "🦃", "🐓"],
        "Dinosaurs": ["🦖", "🦕", "🐊", "🦎", "🐢", "🦖", "🦕", "🐊", "🦎", "🐢", "🦖", "🦕", "🐊", "🦎", "🐢", "🦖", "🦕", "🐊", "🦎", "🐢", "🦖", "🦕", "🐊", "🦎", "🐢"],
        "Vehicles": ["🚗", "🚕", "🚙", "🚌", "🚎", "🏎️", "🚓", "🚑", "🚒", "🚐", "🚚", "🚛", "🚜", "🛵", "🏍️", "🚲", "🚂", "🚆", "🚊", "🚁", "🛩️", "✈️", "🚀", "🛸", "🚢"],
        "Fruits": ["🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🫐", "🍈", "🍒", "🍑", "🍍", "🥝", "🥥", "🍅", "🥑", "🍏", "🫒", "🍐", "🍊", "🍎", "🫐", "🍓", "🍉"]
    };

    const emojis = themeEmojis[theme];
    const totalTiles = gridSize * gridSize;

    useEffect(() => {
        if (!showPreview && !won && tiles.length === 0) {
            const solvable = generateSolvablePuzzle(gridSize);
            setTiles(solvable);
            setEmptyIndex(solvable.indexOf(totalTiles - 1));
            setMoves(0);
            setWon(false);
        }
        if (showPreview) {
            const timer = setTimeout(() => setShowPreview(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [showPreview, gameKey, gridSize, won, tiles.length, totalTiles]);

    useEffect(() => {
        if (tiles.length > 0 && isSolved(tiles)) {
            setTimeout(() => {
                setWon(true);
                sfx.play('correct');
                tts.speak(useHindi ? `Badhai ho! Puzzle solve ho gaya! ${moves} moves mein!` : `Congratulations! Puzzle solved in ${moves} moves!`, false);
            }, 300);
        }
    }, [tiles, moves, useHindi]);

    const handleTileClick = (index: number) => {
        if (isAdjacent(index, emptyIndex, gridSize)) {
            const newTiles = [...tiles];
            newTiles[emptyIndex] = newTiles[index];
            newTiles[index] = totalTiles - 1;
            setTiles(newTiles);
            setEmptyIndex(index);
            setMoves(m => m + 1);
            sfx.play('pop');
        } else {
            sfx.play('pop'); // buzz
        }
    };

    const targetMoves = gridSize === 3 ? 15 : gridSize === 4 ? 30 : 60;

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

            <h1 style={{ color: '#CBA6F7', fontSize: '24px', margin: '10px 0 4px' }}>
                {useHindi ? "🧩 Sliding Puzzle" : "🧩 Sliding Puzzle"}
            </h1>

            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', maxWidth: '100%', padding: '4px' }}>
                {themes.map(t => (
                    <button
                        key={t}
                        onClick={() => { setTheme(t); setGameKey(k => k + 1); setShowPreview(true); setTiles([]); sfx.play('click'); }}
                        style={{
                            padding: '6px 10px', borderRadius: '12px', whiteSpace: 'nowrap',
                            background: theme === t ? '#89B4FA' : '#313244',
                            color: theme === t ? '#1E1E2E' : '#CDD6F4',
                            fontWeight: theme === t ? 'bold' : 'normal',
                            border: 'none', cursor: 'pointer'
                        }}
                    >
                        {useHindi ? themeNames[t].hi : themeNames[t].en}
                    </button>
                ))}
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                {[3, 4, 5].map(size => (
                    <button
                        key={size}
                        onClick={() => { setGridSize(size); setGameKey(k => k + 1); setShowPreview(true); setTiles([]); sfx.play('click'); }}
                        style={{
                            padding: '6px 12px', borderRadius: '8px',
                            background: 'transparent', cursor: 'pointer',
                            border: `2px solid ${gridSize === size ? '#89B4FA' : '#9399B2'}`,
                            color: gridSize === size ? '#89B4FA' : '#9399B2'
                        }}
                    >
                        {size}x{size}
                    </button>
                ))}
            </div>

            <p style={{ color: '#9399B2', fontSize: '14px', marginTop: '8px' }}>
                {useHindi ? `Moves: ${moves}` : `Moves: ${moves}`}
            </p>
            <p style={{ color: '#9399B2', fontSize: '12px', marginBottom: '8px' }}>
                {useHindi ? `Lakshya: ${targetMoves} moves ya kam` : `Goal: ${targetMoves} moves or less`}
            </p>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {showPreview ? (
                    <div style={{
                        padding: '16px', backgroundColor: '#1E1E2E', borderRadius: '12px',
                        display: 'flex', flexDirection: 'column', alignItems: 'center'
                    }}>
                        <span style={{ fontSize: '48px' }}>👀</span>
                        <span style={{ color: '#F9E2AF', fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}>
                            {useHindi ? "Dhyan se dekho!" : "Look carefully!"}
                        </span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {Array.from({ length: gridSize }).map((_, r) => (
                                <div key={r} style={{ display: 'flex', gap: '4px' }}>
                                    {Array.from({ length: gridSize }).map((_, c) => {
                                        const idx = r * gridSize + c;
                                        return (
                                            <div key={c} style={{ width: '40px', height: '40px', backgroundColor: '#313244', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <span style={{ fontSize: '20px' }}>{emojis[idx]}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : won ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <span style={{ fontSize: '64px' }}>🏆</span>
                        <p style={{ color: '#A6E3A1', fontSize: '18px', fontWeight: 'bold' }}>
                            {useHindi ? `Kamaal! ${moves} moves!` : `Amazing! ${moves} moves!`}
                        </p>
                        <button
                            onClick={() => { setGameKey(k => k + 1); setShowPreview(true); setTiles([]); setWon(false); sfx.play('click'); }}
                            style={{ border: '2px solid #CBA6F7', color: '#CBA6F7', background: 'transparent', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', marginTop: '12px' }}
                        >
                            {useHindi ? "Phir Khelo" : "Play Again"}
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {Array.from({ length: gridSize }).map((_, r) => (
                            <div key={r} style={{ display: 'flex', gap: '4px' }}>
                                {Array.from({ length: gridSize }).map((_, c) => {
                                    const index = r * gridSize + c;
                                    const tileValue = tiles[index] !== undefined ? tiles[index] : index;
                                    const isEmpty = tileValue === totalTiles - 1;
                                    const tileSize = gridSize === 3 ? 70 : gridSize === 4 ? 54 : 44;

                                    return (
                                        <div
                                            key={c}
                                            onClick={() => !isEmpty && handleTileClick(index)}
                                            style={{
                                                width: `${tileSize}px`, height: `${tileSize}px`,
                                                backgroundColor: isEmpty ? '#1E1E2E' : '#45475A',
                                                borderRadius: '8px',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                cursor: isEmpty ? 'default' : 'pointer',
                                                transition: 'background-color 0.2s'
                                            }}
                                        >
                                            {!isEmpty && (
                                                <span style={{ fontSize: `${tileSize / 2}px` }}>
                                                    {tileValue < emojis.length ? emojis[tileValue] : tileValue}
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

            <button
                onClick={() => { setGameKey(k => k + 1); setShowPreview(true); setTiles([]); setWon(false); sfx.play('click'); tts.speak(useHindi ? "Naya puzzle! Taiyaar ho jao!" : "New puzzle! Get ready!", false); }}
                style={{ border: '2px solid #F9E2AF', color: '#F9E2AF', background: 'transparent', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', margin: '16px 0' }}
            >
                {useHindi ? "🔄 Naya Puzzle" : "🔄 New Puzzle"}
            </button>
        </div>
    );
};

function isAdjacent(index1: number, index2: number, gridSize: number): boolean {
    const r1 = Math.floor(index1 / gridSize);
    const c1 = index1 % gridSize;
    const r2 = Math.floor(index2 / gridSize);
    const c2 = index2 % gridSize;
    return (Math.abs(r1 - r2) + Math.abs(c1 - c2)) === 1;
}

function generateSolvablePuzzle(gridSize: number): number[] {
    const total = gridSize * gridSize;
    const tiles = Array.from({ length: total }, (_, i) => i);
    let empty = total - 1;

    for (let i = 0; i < gridSize * 25; i++) {
        const neighbors = getNeighbors(empty, gridSize);
        if (neighbors.length > 0) {
            const swapWith = neighbors[Math.floor(Math.random() * neighbors.length)];
            tiles[empty] = tiles[swapWith];
            tiles[swapWith] = total - 1;
            empty = swapWith;
        }
    }
    return tiles;
}

function getNeighbors(index: number, gridSize: number): number[] {
    const neighbors = [];
    const r = Math.floor(index / gridSize);
    const c = index % gridSize;
    if (r > 0) neighbors.push(index - gridSize);
    if (r < gridSize - 1) neighbors.push(index + gridSize);
    if (c > 0) neighbors.push(index - 1);
    if (c < gridSize - 1) neighbors.push(index + 1);
    return neighbors;
}

function isSolved(tiles: number[]): boolean {
    return tiles.every((val, i) => val === i);
}
