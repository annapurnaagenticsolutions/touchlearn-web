import React, { useState, useEffect } from 'react';
import { sfx, tts } from '../engine';

export const GrowingPlantGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [useHindi, setUseHindi] = useState(false);
    const [stage, setStage] = useState(0); // 0=seed, 1=sprout, 2=bud, 3=flower
    const [waterCount, setWaterCount] = useState(0);
    const [sunCount, setSunCount] = useState(0);
    const [showBloom, setShowBloom] = useState(false);

    const stages = [
        { emoji: "🌰", name: "Seed", hindi: "Beej", color: "#DCB483" },
        { emoji: "🌱", name: "Sprout", hindi: "Paudha", color: "#A6E3A1" },
        { emoji: "🌿", name: "Bud", hindi: "Kaliyaan", color: "#89B4FA" },
        { emoji: "🌸", name: "Flower", hindi: "Phool", color: "#F38BA8" }
    ];

    const current = stages[stage];

    useEffect(() => {
        if (showBloom) {
            const timer = setTimeout(() => setShowBloom(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [showBloom]);

    const handleWater = () => {
        if (stage < 3) {
            const newWater = waterCount + 1;
            setWaterCount(newWater);
            sfx.play('pop');
            tts.speak(useHindi ? "Paani diya! Sookh gaya tha" : "Water given! It was dry!", false);
            checkProgress(newWater, sunCount);
        }
    };

    const handleSun = () => {
        if (stage < 3) {
            const newSun = sunCount + 1;
            setSunCount(newSun);
            sfx.play('pop');
            tts.speak(useHindi ? "Dhoop mili! Sooraj ki roshni" : "Got sunshine! Sunlight!", false);
            checkProgress(waterCount, newSun);
        }
    };

    const checkProgress = (w: number, s: number) => {
        if (w >= 3 && s >= 3) {
            setStage(3);
            setShowBloom(true);
            sfx.play('correct'); // magic
            tts.speak(useHindi ? "Phool khil gaya! Dekho kitna sundar hai" : "Flower bloomed! So beautiful!", false);
        } else if (w >= 2 && s >= 2) {
            setStage(2);
            tts.speak(useHindi ? "Kaliyaan aa gayi! Jaldi phool khilega" : "Buds appeared! Flower soon!", false);
        } else if (w >= 1 && s >= 1) {
            setStage(1);
            tts.speak(useHindi ? "Paudha ug gaya! Chota sa hai abhi" : "Sprout grew! It is small now!", false);
        }
    };

    const resetPlant = () => {
        setStage(0);
        setWaterCount(0);
        setSunCount(0);
        setShowBloom(false);
        sfx.play('click');
        tts.speak(useHindi ? "Naya beej! Phir se ugao" : "New seed! Grow again!", false);
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
                {useHindi ? "🌱 Paudha Ugana" : "🌱 Growing Plant"}
            </h1>

            <div style={{
                width: '100%', maxWidth: '400px', height: '260px',
                backgroundColor: '#2D3B1F', borderRadius: '20px',
                marginTop: '16px', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center'
            }}>
                <span style={{ 
                    fontSize: '80px', 
                    transform: `scale(${stage >= 3 ? 1.3 : 1 + (stage * 0.15)})`,
                    transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}>
                    {current.emoji}
                </span>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: current.color, marginTop: '8px' }}>
                    {current.name}
                </span>
                <span style={{ fontSize: '12px', color: '#9399B2' }}>
                    ({current.hindi})
                </span>
            </div>

            <div style={{ display: 'flex', gap: '24px', marginTop: '16px' }}>
                <span style={{ color: '#89B4FA', fontSize: '18px' }}>💧 {waterCount}</span>
                <span style={{ color: '#F9E2AF', fontSize: '18px' }}>☀️ {sunCount}</span>
            </div>
            <p style={{ color: '#9399B2', fontSize: '12px', margin: '8px 0' }}>
                {useHindi 
                    ? `Paani: ${Math.min(waterCount, 3)}/3, Dhoop: ${Math.min(sunCount, 3)}/3`
                    : `Water: ${Math.min(waterCount, 3)}/3, Sun: ${Math.min(sunCount, 3)}/3`}
            </p>

            <div style={{ height: '24px' }}>
                {showBloom && (
                    <span style={{ color: '#F9E2AF', fontSize: '16px', fontWeight: 'bold' }}>
                        {useHindi ? "🎉 Phool khil gaya! Sundar!" : "🎉 Flower bloomed! Beautiful!"}
                    </span>
                )}
            </div>

            <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                <button
                    onClick={handleWater}
                    style={{ border: 'none', backgroundColor: '#313244', padding: '12px 24px', borderRadius: '16px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                    <span style={{ fontSize: '32px' }}>💧</span>
                    <span style={{ color: 'white', marginTop: '4px' }}>{useHindi ? "Paani" : "Water"}</span>
                </button>
                <button
                    onClick={handleSun}
                    style={{ border: 'none', backgroundColor: '#313244', padding: '12px 24px', borderRadius: '16px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                    <span style={{ fontSize: '32px' }}>☀️</span>
                    <span style={{ color: 'white', marginTop: '4px' }}>{useHindi ? "Dhoop" : "Sun"}</span>
                </button>
            </div>

            {stage >= 3 && (
                <button
                    onClick={resetPlant}
                    style={{ border: '2px solid #A6E3A1', color: '#A6E3A1', background: 'transparent', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', marginTop: '16px' }}
                >
                    {useHindi ? "Naya Beej 🌰" : "Plant New Seed 🌰"}
                </button>
            )}

            <div style={{ backgroundColor: '#313244', padding: '10px', borderRadius: '8px', marginTop: 'auto', width: '90%', maxWidth: '400px' }}>
                <p style={{ color: '#F9E2AF', fontSize: '12px', margin: 0 }}>
                    📖 {useHindi 
                        ? "Paudhe ko badhne ke liye paani aur dhoop chahiye! Pehle beej, phir paudha, phir kali, phir phool!" 
                        : "Plants need water and sun to grow! First seed, then sprout, then bud, then flower!"}
                </p>
            </div>
        </div>
    );
};
