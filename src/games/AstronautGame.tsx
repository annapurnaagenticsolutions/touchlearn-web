import React, { useState } from 'react';
import { sfx, tts } from '../engine';

export const AstronautGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [useHindi, setUseHindi] = useState(false);
    const [launched, setLaunched] = useState(false);
    const [rocketY, setRocketY] = useState(0);
    const [currentPlanet, setCurrentPlanet] = useState(0);

    const planets = [
        { emoji: "🌙", nameEn: "Moon", nameHi: "Chaand", color: "#CDD6F4", 
          factHi: "Chaand pe hum chaal sakte hain! Kam gravity!", factEn: "We can walk on the Moon! Low gravity!" },
        { emoji: "🔴", nameEn: "Mars", nameHi: "Mangal", color: "#F38BA8", 
          factHi: "Mangal laal hai kyunki usmein loha hai!", factEn: "Mars looks red because it has iron!" },
        { emoji: "🪐", nameEn: "Saturn", nameHi: "Shani", color: "#F9E2AF", 
          factHi: "Shani ke chaaron taraf halke hain! Beautiful rings!", factEn: "Saturn has beautiful rings all around!" },
        { emoji: "🟠", nameEn: "Jupiter", nameHi: "Brihaspati", color: "#FAB387", 
          factHi: "Brihaspati sabse bada grah hai! Bada bhai!", factEn: "Jupiter is the biggest planet!" },
        { emoji: "🌍", nameEn: "Earth", nameHi: "Dharti", color: "#89B4FA", 
          factHi: "Dharti pe paani hai! Isliye zindagi hai!", factEn: "Earth has water — that’s why life exists!" }
    ];

    const planet = planets[currentPlanet];

    const launchRocket = () => {
        setRocketY(200);
        tts.speak(useHindi ? "3... 2... 1... Udaan!" : "3... 2... 1... Blast off!", false);
        sfx.play('correct'); // Optional generic sound
        
        setTimeout(() => {
            setLaunched(true);
            tts.speak(useHindi ? `Hum pahunch gaye! Yeh hai ${planet.nameHi}` : `We arrived! This is ${planet.nameEn}!`, false);
        }, 1600);
    };

    const nextPlanet = () => {
        const next = (currentPlanet + 1) % planets.length;
        setCurrentPlanet(next);
        const p = planets[next];
        tts.speak(useHindi ? `Agla: ${p.nameHi}` : `Next: ${p.nameEn}!`, false);
        sfx.play('click');
    };

    const landRocket = () => {
        setLaunched(false);
        setRocketY(0);
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

            <h1 style={{ color: '#89B4FA', fontSize: '24px', marginTop: '10px' }}>
                {useHindi ? "🚀 Antariksh Yatri" : "🚀 Space Explorer"}
            </h1>

            <div style={{
                width: '100%', maxWidth: '400px', height: '260px',
                backgroundColor: '#0D1117', borderRadius: '20px',
                marginTop: '16px', position: 'relative', overflow: 'hidden',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
            }}>
                {/* Stars Background */}
                {Array.from({ length: 12 }).map((_, i) => (
                    <span key={i} style={{
                        position: 'absolute',
                        left: `${(i * 37) % 300}px`,
                        top: `${(i * 23) % 200}px`,
                        fontSize: '10px',
                        color: 'rgba(255, 255, 255, 0.5)'
                    }}>✨</span>
                ))}

                {launched ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
                        <span style={{ fontSize: '80px' }}>{planet.emoji}</span>
                        <span style={{ fontSize: '24px', fontWeight: 'bold', color: planet.color, marginTop: '8px' }}>
                            {useHindi ? planet.nameHi : planet.nameEn}
                        </span>
                        <span style={{ fontSize: '14px', color: '#9399B2' }}>
                            ({useHindi ? planet.nameEn : planet.nameHi})
                        </span>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
                        <span style={{ 
                            fontSize: '72px', 
                            transform: `translateY(-${rocketY}px)`,
                            transition: 'transform 1.5s ease-in-out'
                        }}>🚀</span>
                        <span style={{ color: rocketY === 0 ? '#9399B2' : '#F9E2AF', fontSize: '16px', marginTop: '8px' }}>
                            {rocketY === 0 ? (useHindi ? "Taiyaar ho!" : "Ready to launch!") : "Zoom!"}
                        </span>
                    </div>
                )}
            </div>

            <div style={{ height: '24px' }} />

            {!launched ? (
                <button
                    onClick={launchRocket}
                    style={{ border: '2px solid #F9E2AF', color: '#F9E2AF', background: 'transparent', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', fontSize: '18px' }}
                >
                    {useHindi ? "Udaan! 🚀" : "Launch! 🚀"}
                </button>
            ) : (
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        onClick={nextPlanet}
                        style={{ border: '2px solid #89B4FA', color: '#89B4FA', background: 'transparent', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', fontSize: '16px' }}
                    >
                        {useHindi ? "Agla 🛸" : "Next 🛸"}
                    </button>
                    <button
                        onClick={landRocket}
                        style={{ border: '2px solid #F38BA8', color: '#F38BA8', background: 'transparent', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', fontSize: '16px' }}
                    >
                        {useHindi ? "Utarna 🌍" : "Land 🌍"}
                    </button>
                </div>
            )}

            <div style={{ backgroundColor: '#313244', padding: '12px', borderRadius: '12px', marginTop: '24px', width: '90%', maxWidth: '400px' }}>
                <p style={{ color: '#F9E2AF', fontSize: '13px', margin: 0 }}>
                    📖 {useHindi ? planet.factHi : planet.factEn}
                </p>
            </div>
        </div>
    );
};
