import React, { useState, useEffect } from 'react';
import { sfx, tts } from '../engine';

export const MazeRunnerGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    // 6x6 maze: 0=wall, 1=path, 2=start, 3=end
    const mazes = [
        // Maze 1: Simple straight path
        [
            0,0,0,0,0,0,
            2,1,1,1,1,0,
            0,0,0,0,1,0,
            0,1,1,1,1,0,
            0,1,0,0,0,0,
            0,1,1,1,1,3
        ],
        // Maze 2: Zigzag
        [
            2,1,0,0,0,0,
            0,1,1,1,0,0,
            0,0,0,1,1,0,
            0,1,1,1,0,0,
            0,1,0,1,1,0,
            0,0,0,0,1,3
        ],
        // Maze 3: Spiral-ish
        [
            2,1,1,1,0,0,
            0,0,0,1,0,0,
            0,1,1,1,1,0,
            0,1,0,0,1,0,
            0,1,1,1,1,0,
            0,0,0,0,1,3
        ]
    ];

    const gridSize = 6;
    const [mazeIndex, setMazeIndex] = useState(0);
    const [playerPos, setPlayerPos] = useState(-1);
    const [visited, setVisited] = useState<Set<number>>(new Set());
    const [won, setWon] = useState(false);

    useEffect(() => {
        const maze = mazes[mazeIndex];
        const startPos = maze.indexOf(2);
        setPlayerPos(startPos);
        setVisited(new Set([startPos]));
        setWon(false);
    }, [mazeIndex]);

    const handleCellClick = (index: number) => {
        if (won) return;
        const currentMaze = mazes[mazeIndex];
        const cell = currentMaze[index];
        if (cell === 0 || index === playerPos) return;

        const pRow = Math.floor(playerPos / gridSize);
        const pCol = playerPos % gridSize;
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;

        // Check if adjacent (Manhattan distance == 1)
        if (Math.abs(pRow - row) + Math.abs(pCol - col) === 1) {
            setPlayerPos(index);
            setVisited(prev => new Set(prev).add(index));
            sfx.play('click');

            if (cell === 3) {
                setWon(true);
                sfx.play('win');
                tts.speak("You made it home! Amazing!", false);
            }
        } else {
            sfx.play('buzz');
        }
    };

    const handleNextLevel = () => {
        setMazeIndex((prev) => (prev + 1) % mazes.length);
        sfx.play('click');
    };

    const currentMaze = mazes[mazeIndex];

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

            <h1 style={{ color: '#CBA6F7', fontSize: '24px', marginTop: '10px' }}>🐾 Maze Runner</h1>
            
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', marginTop: '16px' }}>
                {[1, 2, 3].map((num, i) => (
                    <button
                        key={i}
                        onClick={() => { setMazeIndex(i); sfx.play('click'); }}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '8px',
                            background: 'transparent',
                            border: `2px solid ${mazeIndex === i ? '#89B4FA' : '#9399B2'}`,
                            color: mazeIndex === i ? '#89B4FA' : '#9399B2',
                            cursor: 'pointer'
                        }}
                    >
                        Level {num}
                    </button>
                ))}
            </div>

            <p style={{ color: '#9399B2', fontSize: '14px', margin: '4px' }}>Goal: take 🐭 to 🏠</p>
            <p style={{ color: '#9399B2', fontSize: '14px', margin: '4px' }}>Steps: {visited.size}</p>

            {won ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '32px', animation: 'fadeIn 0.5s' }}>
                    <span style={{ fontSize: '72px' }}>🏠</span>
                    <p style={{ color: '#A6E3A1', fontSize: '20px', fontWeight: 'bold' }}>Home safe! Great job!</p>
                    <button 
                        onClick={handleNextLevel}
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
                        Next Level! 🐾
                    </button>
                </div>
            ) : (
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: `repeat(${gridSize}, 44px)`, 
                    gap: '2px',
                    marginTop: '24px'
                }}>
                    {currentMaze.map((cell, index) => {
                        const isPlayer = index === playerPos;
                        const isVisited = visited.has(index);
                        const isEnd = cell === 3;

                        let bgColor = '#1E1E2E'; // wall
                        if (isPlayer) bgColor = '#89B4FA';
                        else if (isEnd) bgColor = '#A6E3A1';
                        else if (isVisited) bgColor = '#45475A';
                        else if (cell === 1 || cell === 2) bgColor = '#313244';

                        return (
                            <div
                                key={index}
                                onClick={() => handleCellClick(index)}
                                style={{
                                    width: '44px',
                                    height: '44px',
                                    backgroundColor: bgColor,
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: (cell !== 0 && !isPlayer) ? 'pointer' : 'default',
                                    transform: isPlayer ? 'scale(1.15)' : 'scale(1)',
                                    transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                }}
                            >
                                {isPlayer && <span style={{ fontSize: '24px' }}>🐭</span>}
                                {isEnd && !isPlayer && <span style={{ fontSize: '24px' }}>🏠</span>}
                            </div>
                        );
                    })}
                </div>
            )}

            <p style={{ color: '#9399B2', fontSize: '14px', marginTop: '24px' }}>Tap adjacent cells to move!</p>
        </div>
    );
};
