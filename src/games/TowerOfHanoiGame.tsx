import React, { useState, useEffect } from 'react';
import { sfx, tts } from '../engine';

export const TowerOfHanoiGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [useHindi, setUseHindi] = useState(false);
    const [ringsCount, setRingsCount] = useState(3);
    const [pegs, setPegs] = useState<number[][]>([[], [], []]);
    const [selectedPeg, setSelectedPeg] = useState(-1);
    const [won, setWon] = useState(false);
    const [moves, setMoves] = useState(0);

    const ringColors = ["#F38BA8", "#FAB387", "#F9E2AF", "#A6E3A1", "#94E2D5"];

    useEffect(() => {
        // Initialize
        const initialPegs = [
            Array.from({ length: ringsCount }, (_, i) => ringsCount - 1 - i),
            [],
            []
        ];
        setPegs(initialPegs);
        setSelectedPeg(-1);
        setWon(false);
        setMoves(0);
    }, [ringsCount]);

    useEffect(() => {
        if (pegs[2].length === ringsCount && pegs[2].every((val, i) => val === ringsCount - 1 - i)) {
            setTimeout(() => {
                setWon(true);
                sfx.play('correct');
                tts.speak(useHindi ? `Badhai ho! Sab rings right side par! ${moves} moves!` : `Congratulations! All rings moved in ${moves} moves!`, false);
            }, 300);
        }
    }, [pegs, ringsCount, moves, useHindi]);

    const handlePegClick = (pegIndex: number) => {
        if (won) return;

        if (selectedPeg === -1) {
            if (pegs[pegIndex].length > 0) {
                setSelectedPeg(pegIndex);
                sfx.play('click');
            } else {
                sfx.play('pop'); // buzz replacement
            }
        } else if (selectedPeg === pegIndex) {
            setSelectedPeg(-1);
        } else {
            const sourcePeg = pegs[selectedPeg];
            const destPeg = pegs[pegIndex];
            
            if (sourcePeg.length > 0) {
                const ringToMove = sourcePeg[sourcePeg.length - 1];
                if (destPeg.length === 0 || destPeg[destPeg.length - 1] > ringToMove) {
                    const newPegs = pegs.map((p, i) => {
                        if (i === selectedPeg) return p.slice(0, -1);
                        if (i === pegIndex) return [...p, ringToMove];
                        return p;
                    });
                    setPegs(newPegs);
                    setSelectedPeg(-1);
                    setMoves(m => m + 1);
                    sfx.play('pop');
                } else {
                    sfx.play('pop'); // buzz replacement
                    tts.speak(useHindi ? "Badi ring chhoti par nahi!" : "Bigger ring cannot sit on smaller!", false);
                }
            }
        }
    };

    const optimalMoves = ringsCount === 2 ? 3 : ringsCount === 3 ? 7 : 15;

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
                🏗️ Tower of Hanoi
            </h1>

            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                {[2, 3, 4].map(count => (
                    <button
                        key={count}
                        onClick={() => { setRingsCount(count); sfx.play('click'); }}
                        style={{
                            padding: '8px 16px', borderRadius: '8px',
                            background: 'transparent', cursor: 'pointer',
                            border: `2px solid ${ringsCount === count ? '#89B4FA' : '#9399B2'}`,
                            color: ringsCount === count ? '#89B4FA' : '#9399B2'
                        }}
                    >
                        {count} Rings
                    </button>
                ))}
            </div>

            <p style={{ color: '#9399B2', fontSize: '14px', marginTop: '12px' }}>
                {useHindi ? `Moves: ${moves}` : `Moves: ${moves}`}
            </p>
            <p style={{ color: '#9399B2', fontSize: '12px', marginBottom: '16px' }}>
                {useHindi ? `Lakshya: ${optimalMoves} moves ya kam` : `Goal: ${optimalMoves} moves or less`}
            </p>

            {won ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '64px' }}>🏆</span>
                    <p style={{ color: '#A6E3A1', fontSize: '18px', fontWeight: 'bold' }}>
                        {useHindi ? `Kamaal! Sab rings utha di! ${moves} moves!` : `Amazing! All rings moved in ${moves} moves!`}
                    </p>
                    <button
                        onClick={() => { setRingsCount(ringsCount); sfx.play('click'); }} // trigger re-render
                        style={{ border: '2px solid #CBA6F7', color: '#CBA6F7', background: 'transparent', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', marginTop: '12px' }}
                    >
                        {useHindi ? "Phir Khelo" : "Play Again"}
                    </button>
                </div>
            ) : (
                <>
                    <p style={{ color: '#F9E2AF', fontSize: '12px', marginBottom: '16px' }}>
                        {useHindi ? "Peg chhunein → dusri peg chhunein → ring move!" : "Tap peg → tap another peg → ring moves!"}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', alignItems: 'flex-end', height: '220px' }}>
                        {pegs.map((pegRings, pegIndex) => (
                            <div
                                key={pegIndex}
                                onClick={() => handlePegClick(pegIndex)}
                                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', flex: 1 }}
                            >
                                <div style={{ 
                                    width: '6px', height: '140px', 
                                    backgroundColor: selectedPeg === pegIndex ? '#89B4FA' : '#45475A',
                                    borderRadius: '2px', position: 'relative', display: 'flex', flexDirection: 'column-reverse', alignItems: 'center'
                                }}>
                                    {pegRings.map((ringIdx, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                width: `${40 + (ringIdx + 1) * 20}px`,
                                                height: '24px',
                                                backgroundColor: ringColors[ringIdx] || '#89B4FA',
                                                borderRadius: '8px',
                                                margin: '1px 0',
                                                zIndex: 2
                                            }}
                                        />
                                    ))}
                                </div>
                                <div style={{ width: '90px', height: '6px', backgroundColor: selectedPeg === pegIndex ? '#89B4FA' : '#313244', borderRadius: '3px', marginTop: '4px' }} />
                                <span style={{ fontSize: '14px', fontWeight: 'bold', color: selectedPeg === pegIndex ? '#89B4FA' : '#9399B2', marginTop: '4px' }}>
                                    {['A', 'B', 'C'][pegIndex]}
                                </span>
                            </div>
                        ))}
                    </div>
                </>
            )}

            <p style={{ color: '#9399B2', fontSize: '12px', marginTop: 'auto' }}>
                {useHindi ? "Chhoti ring badi par baith sakti hai" : "Smaller ring can sit on larger ring"}
            </p>
        </div>
    );
};
