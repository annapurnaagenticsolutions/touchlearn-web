import React, { useState, useEffect } from 'react';
import { sfx, tts } from '../engine';

interface FishData {
    id: number;
    xOffset: number;
    yOffset: number;
    emoji: string;
    colorName: string;
    colorNameHindi: string;
    caught: boolean;
}

export const FishingPondGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [useHindi, setUseHindi] = useState(false);
    const [fishes, setFishes] = useState<FishData[]>([]);
    const [caughtCount, setCaughtCount] = useState(0);
    const [aquarium, setAquarium] = useState<FishData[]>([]);

    const generateFishes = () => {
        const fishEmojis = [
            { emoji: "🐟", en: "Blue", hi: "Neeli" },
            { emoji: "🐠", en: "Yellow", hi: "Peeli" },
            { emoji: "🐡", en: "Red", hi: "Laal" },
            { emoji: "🧜‍♀️", en: "Green", hi: "Hari" },
            { emoji: "🐟", en: "Purple", hi: "Baingani" },
            { emoji: "🐠", en: "Orange", hi: "Narangi" }
        ];

        return Array.from({ length: 6 }).map((_, i) => ({
            id: Math.random(),
            xOffset: (i % 3) * 80 + (Math.random() * 40 - 20) + 40,
            yOffset: Math.floor(i / 3) * 90 + (Math.random() * 40 - 20) + 40,
            emoji: fishEmojis[i].emoji,
            colorName: fishEmojis[i].en,
            colorNameHindi: fishEmojis[i].hi,
            caught: false
        }));
    };

    useEffect(() => {
        setFishes(generateFishes());
    }, []);

    const catchFish = (fish: FishData) => {
        if (fish.caught) return;

        setFishes(fishes.map(f => f.id === fish.id ? { ...f, caught: true } : f));
        sfx.play('pop');
        
        setTimeout(() => {
            setFishes(prev => prev.filter(f => f.id !== fish.id));
            setCaughtCount(prev => prev + 1);
            setAquarium(prev => [...prev, fish]);

            const msg = useHindi
                ? `${fish.colorNameHindi} machli pakdi! Wah!`
                : `Caught a ${fish.colorName} fish! Wow!`;
            tts.speak(msg, false);
        }, 300);
    };

    const newFish = () => {
        setFishes(generateFishes());
        setCaughtCount(0);
        setAquarium([]);
        tts.speak(useHindi ? "Nayi machli! Pakdo!" : "New fish! Catch them!", false);
        sfx.play('click');
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

            <h1 style={{ color: '#89B4FA', fontSize: '24px', marginTop: '10px' }}>
                🎣 Fishing Pond
            </h1>
            <p style={{ color: '#9399B2', fontSize: '16px', margin: '4px 0 12px' }}>
                {useHindi ? `Pakde: ${caughtCount}` : `Caught: ${caughtCount}`}
            </p>

            <div style={{
                width: '100%', maxWidth: '400px', height: '300px',
                backgroundColor: '#1A3A5C', borderRadius: '20px',
                position: 'relative', overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                {fishes.length === 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <span style={{ fontSize: '64px' }}>🎉</span>
                        <span style={{ color: '#A6E3A1', fontSize: '18px', fontWeight: 'bold' }}>
                            {useHindi ? "Sab machli pakdi!" : "All caught!"}
                        </span>
                    </div>
                ) : (
                    fishes.map(fish => (
                        <div
                            key={fish.id}
                            onClick={() => catchFish(fish)}
                            style={{
                                position: 'absolute',
                                left: `${fish.xOffset}px`,
                                top: `${fish.yOffset}px`,
                                fontSize: '48px',
                                cursor: 'pointer',
                                transform: fish.caught ? 'scale(0.5)' : 'scale(1)',
                                opacity: fish.caught ? 0 : 1,
                                transition: 'transform 0.2s, opacity 0.3s'
                            }}
                        >
                            {fish.emoji}
                        </div>
                    ))
                )}
            </div>

            {aquarium.length > 0 && (
                <div style={{ backgroundColor: '#0A2540', padding: '12px', borderRadius: '16px', marginTop: '16px', width: '90%', maxWidth: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ color: '#89B4FA', fontSize: '16px', fontWeight: 'bold' }}>🧜‍♀️ Aquarium</span>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {aquarium.map((f, i) => (
                            <span key={i} style={{ fontSize: '28px' }}>{f.emoji}</span>
                        ))}
                    </div>
                </div>
            )}

            <button
                onClick={newFish}
                style={{ border: '2px solid #89B4FA', color: '#89B4FA', background: 'transparent', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', marginTop: '24px', fontSize: '16px' }}
            >
                🎣 {useHindi ? "Nayi Machli" : "New Fish"}
            </button>

            <div style={{ backgroundColor: '#313244', padding: '10px', borderRadius: '8px', marginTop: 'auto', width: '90%', maxWidth: '400px' }}>
                <p style={{ color: '#F9E2AF', fontSize: '12px', margin: 0 }}>
                    📖 {useHindi 
                        ? "Machli paani mein rehti hai! Unhe pakadna masti hai!" 
                        : "Fish live in water! Catching them is fun!"}
                </p>
            </div>
        </div>
    );
};
