import React, { useState } from 'react';
import { sfx, tts } from '../engine';

export const MagicTricksGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [useHindi, setUseHindi] = useState(false);
    const [selectedMagician, setSelectedMagician] = useState(0);
    const [currentTrick, setCurrentTrick] = useState(0);
    const [trickState, setTrickState] = useState<'ready' | 'performing' | 'done'>('ready');

    const magicians = [
        { emoji: "🐒", name: "Monkey", hindi: "Bandar", color: "#DCB483" },
        { emoji: "🦖", name: "Dinosaur", hindi: "Dinosaur", color: "#A6E3A1" },
        { emoji: "🐶", name: "Dog", hindi: "Kutta", color: "#89B4FA" }
    ];

    const tricks = [
        { emoji: "🎩", name: "Hat Trick", hindi: "Topi ka jaadu", revealEmoji: "🐰", revealName: "Rabbit!", revealHindi: "Khargosh nikla!" },
        { emoji: "🪙", name: "Disappearing Coin", hindi: "Gayab kar do", revealEmoji: "✨", revealName: "Gone!", revealHindi: "Gayab ho gaya!" },
        { emoji: "🃏", name: "Card Flip", hindi: "Patta palat do", revealEmoji: "⭐", revealName: "Star!", revealHindi: "Tara nikla!" },
        { emoji: "🎭", name: "Mask Swap", hindi: "Chehra badal do", revealEmoji: "🐼", revealName: "Panda!", revealHindi: "Panda aa gaya!" },
        { emoji: "🪄", name: "Wand Wave", hindi: "Jadoo ki chhadi", revealEmoji: "🌟", revealName: "Sparkles!", revealHindi: "Chamak gaye taare!" },
        { emoji: "📦", name: "Magic Box", hindi: "Jadoo ka dibba", revealEmoji: "🎁", revealName: "Gift!", revealHindi: "Tohfa nikla!" }
    ];

    const mag = magicians[selectedMagician];
    const trick = tricks[currentTrick];

    const performMagic = () => {
        setTrickState('performing');
        sfx.play('magic');
        tts.speak(useHindi ? `Abracadabra! ${trick.hindi}` : `Abracadabra! ${trick.name}!`, false);
        
        setTimeout(() => {
            setTrickState('done');
            tts.speak(useHindi ? `${trick.revealHindi} Ta-da!` : `${trick.revealName} Ta-da!`, false);
        }, 800);
    };

    const nextTrick = () => {
        const next = (currentTrick + 1) % tricks.length;
        setCurrentTrick(next);
        setTrickState('ready');
        const nTrick = tricks[next];
        tts.speak(useHindi ? `Next trick: ${nTrick.name}! ${nTrick.hindi}` : `Next trick: ${nTrick.name}!`, false);
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
                {useHindi ? "✨ Jadoo Show" : "✨ Magic Show"}
            </h1>

            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                {magicians.map((m, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setSelectedMagician(index);
                            setTrickState('ready');
                            sfx.play('click');
                            tts.speak(useHindi ? `${m.name}! ${m.hindi} magician` : `${m.name} magician!`, false);
                        }}
                        style={{
                            width: '64px', height: '64px',
                            borderRadius: '16px', border: 'none',
                            backgroundColor: index === selectedMagician ? `${m.color}4D` : '#313244',
                            fontSize: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        {m.emoji}
                    </button>
                ))}
            </div>

            <p style={{ color: mag.color, fontSize: '14px', marginTop: '8px' }}>
                {useHindi ? `${mag.hindi} Jadoogar` : `${mag.name} Magician`}
            </p>

            <div 
                onClick={() => { 
                    if (trickState === 'ready') performMagic(); 
                    else if (trickState === 'done') setTrickState('ready');
                }}
                style={{
                width: '100%', maxWidth: '400px', height: '240px',
                backgroundColor: '#2D1B4E', borderRadius: '24px',
                marginTop: '16px', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
            }}>
                {trickState === 'ready' && (
                    <>
                        <span style={{ fontSize: '64px' }}>{mag.emoji}</span>
                        <span style={{ fontSize: '72px', marginTop: '12px' }}>{trick.emoji}</span>
                        <p style={{ color: '#9399B2', marginTop: '8px' }}>{useHindi ? "Jadoo dekhne ko tap karo!" : "Tap to magic!"}</p>
                    </>
                )}
                {trickState === 'performing' && (
                    <>
                        <span style={{ fontSize: '64px' }}>{mag.emoji}</span>
                        <span style={{ fontSize: '56px', marginTop: '12px', animation: 'pulse 0.3s infinite' }}>✨</span>
                        <p style={{ color: '#F9E2AF', marginTop: '8px' }}>Abracadabra!</p>
                    </>
                )}
                {trickState === 'done' && (
                    <>
                        <span style={{ fontSize: '64px' }}>{mag.emoji}</span>
                        <span style={{ fontSize: '80px', marginTop: '12px', animation: 'bounce 0.5s' }}>{trick.revealEmoji}</span>
                        <p style={{ color: '#A6E3A1', marginTop: '8px', fontWeight: 'bold' }}>Ta-da! {useHindi ? trick.revealHindi : trick.revealName}</p>
                    </>
                )}
            </div>

            <p style={{ color: '#CDD6F4', fontSize: '16px', marginTop: '16px' }}>
                {useHindi ? `${trick.hindi} — ${trick.name}` : `${trick.name} — ${trick.hindi}`}
            </p>

            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                {trickState === 'ready' ? (
                    <button
                        onClick={performMagic}
                        style={{ border: '2px solid #CBA6F7', color: '#CBA6F7', background: 'transparent', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer' }}
                    >
                        {useHindi ? "Jadoo! ✨" : "Magic! ✨"}
                    </button>
                ) : (
                    <button
                        onClick={() => setTrickState('ready')}
                        style={{ border: '2px solid #89B4FA', color: '#89B4FA', background: 'transparent', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer' }}
                    >
                        {useHindi ? "Dobara 🎩" : "Again 🎩"}
                    </button>
                )}

                <button
                    onClick={nextTrick}
                    style={{ border: '2px solid #F9E2AF', color: '#F9E2AF', background: 'transparent', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer' }}
                >
                    {useHindi ? "Agla Jadoo 🎬" : "Next Trick 🎬"}
                </button>
            </div>

            <div style={{ backgroundColor: '#313244', padding: '12px', borderRadius: '8px', marginTop: 'auto', width: '90%', maxWidth: '400px' }}>
                <p style={{ color: '#F9E2AF', fontSize: '12px', margin: 0 }}>
                    {useHindi ? "📖 Jadoo mein cheezein aa jaati, gayab ho jaati ya badal jaati hain! Jaise keeda se titli!" : "📖 Magic means things appear, disappear, or change! Like a caterpillar to butterfly!"}
                </p>
            </div>
        </div>
    );
};
