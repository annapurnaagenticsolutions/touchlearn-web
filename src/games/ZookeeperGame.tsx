import React, { useState } from 'react';
import { sfx, tts } from '../engine';

interface AnimalInfo {
    emoji: string;
    nameEn: string;
    nameHi: string;
    factEn: string;
    factHi: string;
    color: string;
}

export const ZookeeperGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [useHindi, setUseHindi] = useState(false);
    
    const animals: AnimalInfo[] = [
        { emoji: "🐘", nameEn: "Elephant", nameHi: "Hathi", factEn: "Largest land animal, 2 tusks", factHi: "Sabse bada janwar, 2 hathi ke daant", color: "#DCB483" },
        { emoji: "🦒", nameEn: "Giraffe", nameHi: "Giraffe", factEn: "Longest neck animal", factHi: "Sabse lamba gardan wala", color: "#FAB387" },
        { emoji: "🦁", nameEn: "Lion", nameHi: "Sher", factEn: "King of the jungle, roars loud", factHi: "Jungle ka raja, zor se dahadta hai", color: "#F9E2AF" },
        { emoji: "🐧", nameEn: "Penguin", nameHi: "Penguin", factEn: "Lives in cold, cannot fly", factHi: "Thande ilaake mein rehta hai, udd nahi sakta", color: "#89B4FA" },
        { emoji: "🦍", nameEn: "Gorilla", nameHi: "Gorilla", factEn: "Strong and clever", factHi: "Takatwar aur chalaak", color: "#A6E3A1" }
    ];

    const [selectedAnimal, setSelectedAnimal] = useState(0);
    const [hunger, setHunger] = useState(50);
    const [clean, setClean] = useState(60);

    const info = animals[selectedAnimal];
    const displayName = useHindi ? info.nameHi : info.nameEn;
    const displayFact = useHindi ? info.factHi : info.factEn;

    const handleFeed = () => {
        setHunger(prev => Math.max(0, prev - 35));
        sfx.play('correct');
        tts.speak(useHindi ? `${displayName} ko khana diya! Maza aa gaya` : `Fed ${displayName}! Yum!`, false);
    };

    const handleBathe = () => {
        setClean(prev => Math.min(100, prev + 35));
        sfx.play('correct');
        tts.speak(useHindi ? `${displayName} ko nahaaya! Saaf ho gaya` : `Bathed ${displayName}! All clean!`, false);
    };

    const handlePet = () => {
        setHunger(prev => Math.min(100, prev + 5)); // Petting doesn't feed but increases hunger slightly in the original? Wait, original had hunger = (hunger+5).coerceAtMost(100). Yes.
        sfx.play('correct');
        tts.speak(useHindi ? `Pyar se sehlaaya! ${displayName} khush hai` : `Gently petted! ${displayName} is happy!`, false);
    };

    const selectAnimal = (index: number) => {
        setSelectedAnimal(index);
        setHunger(Math.floor(Math.random() * 41) + 40); // 40..80
        setClean(Math.floor(Math.random() * 41) + 40); // 40..80
        sfx.play('click');
        const aInfo = animals[index];
        const aName = useHindi ? aInfo.nameHi : aInfo.nameEn;
        const aFact = useHindi ? aInfo.factHi : aInfo.factEn;
        tts.speak(useHindi ? `${aName}! ${aFact}` : `${aName}!`, false);
    };

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

            <h1 style={{ color: '#A6E3A1', fontSize: '24px', marginTop: '10px' }}>
                {useHindi ? "🦁 Chidiya Ghar" : "🦁 Zookeeper"}
            </h1>

            <div style={{
                width: '100%', maxWidth: '400px', height: '200px',
                backgroundColor: '#45475A', borderRadius: '20px',
                marginTop: '16px', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center'
            }}>
                <span style={{ fontSize: '80px' }}>{info.emoji}</span>
                <span style={{ fontSize: '22px', fontWeight: 'bold', color: info.color }}>{displayName}</span>
            </div>

            <div style={{ backgroundColor: '#313244', padding: '12px', borderRadius: '12px', marginTop: '16px', width: '90%', maxWidth: '400px' }}>
                <p style={{ color: '#F9E2AF', fontSize: '14px', margin: 0 }}>
                    {useHindi ? "📖 Jante ho?" : "📖 Did you know?"}<br />
                    {displayFact}
                </p>
            </div>

            <div style={{ width: '90%', maxWidth: '400px', marginTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ color: 'white', width: '80px', fontSize: '14px' }}>{useHindi ? "🌾 Bhookh" : "🌾 Hunger"}</span>
                    <div style={{ flex: 1, backgroundColor: '#313244', height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
                        <div style={{ width: `${hunger}%`, backgroundColor: '#F38BA8', height: '100%', transition: 'width 0.3s' }} />
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: 'white', width: '80px', fontSize: '14px' }}>{useHindi ? "🧼 Saaf" : "🧼 Clean"}</span>
                    <div style={{ flex: 1, backgroundColor: '#313244', height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
                        <div style={{ width: `${clean}%`, backgroundColor: '#89B4FA', height: '100%', transition: 'width 0.3s' }} />
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button
                    onClick={handleFeed}
                    style={{ border: 'none', backgroundColor: '#313244', padding: '12px', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
                >
                    <span style={{ fontSize: '32px' }}>🌾</span>
                    <span style={{ color: 'white', marginTop: '4px' }}>Feed</span>
                </button>
                <button
                    onClick={handleBathe}
                    style={{ border: 'none', backgroundColor: '#313244', padding: '12px', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
                >
                    <span style={{ fontSize: '32px' }}>💧</span>
                    <span style={{ color: 'white', marginTop: '4px' }}>Bathe</span>
                </button>
                <button
                    onClick={handlePet}
                    style={{ border: 'none', backgroundColor: '#313244', padding: '12px', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
                >
                    <span style={{ fontSize: '32px' }}>🐾</span>
                    <span style={{ color: 'white', marginTop: '4px' }}>Pet</span>
                </button>
            </div>

            <p style={{ color: '#9399B2', fontSize: '14px', marginTop: '24px' }}>{useHindi ? "Jaanwar chuno:" : "Choose animal:"}</p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                {animals.map((a, index) => (
                    <button
                        key={index}
                        onClick={() => selectAnimal(index)}
                        style={{
                            width: '48px', height: '48px',
                            borderRadius: '12px', border: 'none',
                            backgroundColor: index === selectedAnimal ? `${a.color}4D` : '#313244',
                            fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        {a.emoji}
                    </button>
                ))}
            </div>
        </div>
    );
};
