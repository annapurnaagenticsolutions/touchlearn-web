import React, { useState, useEffect } from 'react';
import { sfx, tts } from '../engine';

export const BabyAnimalsGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [useHindi, setUseHindi] = useState(false);
    const [currentPair, setCurrentPair] = useState(0);
    const [matched, setMatched] = useState(false);
    const [selected, setSelected] = useState(-1);
    const [message, setMessage] = useState("");
    const [mamas, setMamas] = useState<any[]>([]);

    const pairs = [
        { baby: { emoji: "🐄", nameEn: "Calf", nameHi: "Bachhra" }, mama: { emoji: "🐄", nameEn: "Cow", nameHi: "Gai" } },
        { baby: { emoji: "🦁", nameEn: "Cub", nameHi: "Sher ka bachha" }, mama: { emoji: "🦁", nameEn: "Lion", nameHi: "Sher" } },
        { baby: { emoji: "🐶", nameEn: "Puppy", nameHi: "Kutte ka bachha" }, mama: { emoji: "🐶", nameEn: "Dog", nameHi: "Kutta" } },
        { baby: { emoji: "🐱", nameEn: "Kitten", nameHi: "Billi ka bachha" }, mama: { emoji: "🐱", nameEn: "Cat", nameHi: "Billi" } },
        { baby: { emoji: "🐘", nameEn: "Baby Elephant", nameHi: "Hathi ka bachha" }, mama: { emoji: "🐘", nameEn: "Elephant", nameHi: "Hathi" } },
        { baby: { emoji: "🐑", nameEn: "Lamb", nameHi: "Bhed ka bachha" }, mama: { emoji: "🐑", nameEn: "Sheep", nameHi: "Bhed" } },
        { baby: { emoji: "🐔", nameEn: "Chick", nameHi: "Murgi ka bachha" }, mama: { emoji: "🐔", nameEn: "Hen", nameHi: "Murgi" } },
        { baby: { emoji: "🐷", nameEn: "Piglet", nameHi: "Soor ka bachha" }, mama: { emoji: "🐷", nameEn: "Pig", nameHi: "Soor" } },
        { baby: { emoji: "🦊", nameEn: "Kit", nameHi: "Lomdi ka bachha" }, mama: { emoji: "🦊", nameEn: "Fox", nameHi: "Lomdi" } },
        { baby: { emoji: "🐯", nameEn: "Cub", nameHi: "Bagh ka bachha" }, mama: { emoji: "🐯", nameEn: "Tiger", nameHi: "Bagh" } }
    ];

    const currentBaby = pairs[currentPair].baby;
    const correctMama = pairs[currentPair].mama;

    useEffect(() => {
        const otherMama = pairs[(currentPair + 1) % pairs.length].mama;
        const opts = [correctMama, otherMama].sort(() => Math.random() - 0.5);
        setMamas(opts);
    }, [currentPair]);

    const handleMamaClick = (index: number, mamaInfo: any) => {
        if (matched) return;
        setSelected(index);

        if (mamaInfo.nameEn === correctMama.nameEn) {
            setMatched(true);
            setMessage(useHindi ? `⭐ Sahi! ${mamaInfo.nameHi} mama hai!` : `⭐ Right! ${mamaInfo.nameEn} is mama!`);
            tts.speak(useHindi ? `Sahi! ${mamaInfo.nameHi} mummy hai! Pyar se` : `Correct! ${mamaInfo.nameEn} is the mama!`, false);
            sfx.play('correct');
        } else {
            setMessage(useHindi ? "😢 Phir se koshish karo!" : "😢 Try again!");
            tts.speak(useHindi ? "Phir se koshish karo" : "Try again!", false);
            sfx.play('pop');
            setTimeout(() => {
                setSelected(-1);
                setMessage("");
            }, 800);
        }
    };

    const nextPair = () => {
        setCurrentPair(prev => (prev + 1) % pairs.length);
        setMatched(false);
        setSelected(-1);
        setMessage("");
        sfx.play('click');
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

            <h1 style={{ color: '#F38BA8', fontSize: '24px', marginTop: '10px' }}>
                {useHindi ? "🐾 Baby & Mama" : "🐾 Baby & Mama"}
            </h1>
            <p style={{ color: '#9399B2', fontSize: '14px', margin: '4px 0 16px' }}>
                {useHindi ? "Kaun hai mama?" : "Who is the mama?"}
            </p>

            <div style={{
                width: '120px', height: '120px',
                backgroundColor: '#45475A', borderRadius: '24px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
            }}>
                <span style={{ fontSize: '64px' }}>{currentBaby.emoji}</span>
                <span style={{ fontSize: '14px', color: '#CDD6F4' }}>
                    {useHindi ? `Baby ${currentBaby.nameHi}` : `Baby ${currentBaby.nameEn}`}
                </span>
            </div>

            <p style={{ color: '#F9E2AF', fontSize: '18px', margin: '16px 0' }}>
                {useHindi ? "💕 Mama dhoondo!" : "💕 Find Mama!"}
            </p>

            <div style={{ display: 'flex', gap: '16px' }}>
                {mamas.map((mamaInfo, index) => {
                    const isCorrect = mamaInfo.nameEn === correctMama.nameEn;
                    const isSelected = selected === index;
                    let bgColor = '#313244';
                    if (matched && isCorrect) bgColor = 'rgba(166, 227, 161, 0.3)';
                    else if (isSelected && !isCorrect) bgColor = 'rgba(243, 139, 168, 0.3)';

                    return (
                        <button
                            key={index}
                            onClick={() => handleMamaClick(index, mamaInfo)}
                            style={{
                                width: '100px', height: '100px',
                                backgroundColor: bgColor, borderRadius: '20px',
                                border: 'none', cursor: matched ? 'default' : 'pointer',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                transform: isSelected ? 'scale(0.9)' : 'scale(1)',
                                transition: 'transform 0.2s, background-color 0.2s'
                            }}
                        >
                            <span style={{ fontSize: '48px' }}>{mamaInfo.emoji}</span>
                            <span style={{ fontSize: '12px', color: '#9399B2', marginTop: '4px' }}>
                                {useHindi ? mamaInfo.nameHi : mamaInfo.nameEn}
                            </span>
                        </button>
                    );
                })}
            </div>

            <div style={{ height: '30px', marginTop: '16px' }}>
                {message && (
                    <span style={{ fontSize: '16px', color: message.includes('Right') || message.includes('Sahi') ? '#A6E3A1' : '#F38BA8' }}>
                        {message}
                    </span>
                )}
            </div>

            {matched && (
                <button
                    onClick={nextPair}
                    style={{ border: '2px solid #A6E3A1', color: '#A6E3A1', background: 'transparent', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', marginTop: '12px' }}
                >
                    {useHindi ? "Agla Joda 🐾" : "Next Pair 🐾"}
                </button>
            )}

            <div style={{ backgroundColor: '#313244', padding: '10px', borderRadius: '8px', marginTop: 'auto', width: '90%', maxWidth: '400px' }}>
                <p style={{ color: '#F9E2AF', fontSize: '12px', margin: 0 }}>
                    📖 {useHindi 
                        ? "Sab bachche bade hote hain! Bachhra gaay banta hai. Bachha sher banta hai!" 
                        : "All baby animals grow up! A calf becomes a cow. A cub becomes a lion!"}
                </p>
            </div>
        </div>
    );
};
