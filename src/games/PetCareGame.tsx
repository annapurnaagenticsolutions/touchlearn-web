import React, { useState, useEffect } from 'react';
import { sfx, tts } from '../engine';

export const PetCareGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [useHindi, setUseHindi] = useState(false);
    const [hunger, setHunger] = useState(80);
    const [energy, setEnergy] = useState(60);
    const [cleanliness, setCleanliness] = useState(70);
    const [lastAction, setLastAction] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setHunger(h => Math.min(100, h + 5));
            setEnergy(e => Math.max(0, e - 3));
            setCleanliness(c => Math.max(0, c - 4));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    let mood = { state: "ok", emoji: "🐶", labelEn: "Okay", labelHi: "Theek" };
    if (hunger > 70) mood = { state: "hungry", emoji: "😢", labelEn: "Hungry", labelHi: "Bhooka" };
    else if (energy < 30) mood = { state: "tired", emoji: "😪", labelEn: "Tired", labelHi: "Thaka" };
    else if (cleanliness < 30) mood = { state: "dirty", emoji: "🤢", labelEn: "Dirty", labelHi: "Ganda" };
    else if (hunger < 30 && energy > 60 && cleanliness > 60) mood = { state: "happy", emoji: "😊", labelEn: "Happy", labelHi: "Khush" };

    const handleFeed = () => {
        setHunger(prev => Math.max(0, prev - 40));
        setLastAction("feed");
        sfx.play('correct');
        tts.speak(useHindi ? "Yummy! Bhookh mit gayi" : "Yummy! Hunger down", false);
    };

    const handleWalk = () => {
        setEnergy(prev => Math.max(0, prev - 30));
        setHunger(prev => Math.min(100, prev + 15));
        setLastAction("walk");
        sfx.play('pop');
        tts.speak(useHindi ? "Tehelne chale! Mazaa aa raha hai" : "Going for a walk! Having fun!", false);
    };

    const handleBathe = () => {
        setCleanliness(prev => Math.min(100, prev + 40));
        setEnergy(prev => Math.max(0, prev - 10));
        setLastAction("bathe");
        sfx.play('correct');
        tts.speak(useHindi ? "Snaan kar liya! Saaf aur sundar" : "Bath done! Clean and pretty!", false);
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

            <h1 style={{ color: '#DCB483', fontSize: '24px', marginTop: '10px' }}>
                {useHindi ? "🐾 Paltoo Dekhbhal" : "🐾 Pet Care"}
            </h1>

            <div style={{
                width: '160px', height: '160px',
                backgroundColor: '#45475A', borderRadius: '24px',
                marginTop: '16px', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center'
            }}>
                <span style={{ fontSize: '80px' }}>{mood.emoji}</span>
                <span style={{ color: '#9399B2', fontSize: '16px' }}>
                    {useHindi ? mood.labelHi : mood.labelEn}
                </span>
            </div>

            <div style={{ width: '90%', maxWidth: '400px', marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ width: '80px', color: 'white' }}>{useHindi ? "🌾 Bhookh" : "🌾 Hunger"}</span>
                    <div style={{ flex: 1, backgroundColor: '#313244', height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
                        <div style={{ width: `${hunger}%`, backgroundColor: '#F38BA8', height: '100%', transition: 'width 0.3s' }} />
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ width: '80px', color: 'white' }}>{useHindi ? "⚡ Urja" : "⚡ Energy"}</span>
                    <div style={{ flex: 1, backgroundColor: '#313244', height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
                        <div style={{ width: `${energy}%`, backgroundColor: '#F9E2AF', height: '100%', transition: 'width 0.3s' }} />
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ width: '80px', color: 'white' }}>{useHindi ? "🛁 Safai" : "🛁 Clean"}</span>
                    <div style={{ flex: 1, backgroundColor: '#313244', height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
                        <div style={{ width: `${cleanliness}%`, backgroundColor: '#89B4FA', height: '100%', transition: 'width 0.3s' }} />
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button
                    onClick={handleFeed}
                    style={{ border: 'none', backgroundColor: '#313244', padding: '12px', borderRadius: '16px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                    <span style={{ fontSize: '32px' }}>🍔</span>
                    <span style={{ color: 'white', marginTop: '4px' }}>{useHindi ? "Khana" : "Feed"}</span>
                </button>
                <button
                    onClick={handleWalk}
                    style={{ border: 'none', backgroundColor: '#313244', padding: '12px', borderRadius: '16px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                    <span style={{ fontSize: '32px' }}>🏃</span>
                    <span style={{ color: 'white', marginTop: '4px' }}>{useHindi ? "Tehlo" : "Walk"}</span>
                </button>
                <button
                    onClick={handleBathe}
                    style={{ border: 'none', backgroundColor: '#313244', padding: '12px', borderRadius: '16px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                    <span style={{ fontSize: '32px' }}>🧽</span>
                    <span style={{ color: 'white', marginTop: '4px' }}>{useHindi ? "Snaan" : "Bathe"}</span>
                </button>
            </div>

            <div style={{ marginTop: '16px', height: '24px' }}>
                {lastAction && (
                    <span style={{ color: '#A6E3A1', fontSize: '16px' }}>
                        {lastAction === 'feed' ? (useHindi ? "🍔 Khilaya!" : "🍔 Fed!") :
                         lastAction === 'walk' ? (useHindi ? "🏃 Tehla!" : "🏃 Walked!") :
                         lastAction === 'bathe' ? (useHindi ? "🧽 Saaf!" : "🧽 Clean!") : ""}
                    </span>
                )}
            </div>
        </div>
    );
};
