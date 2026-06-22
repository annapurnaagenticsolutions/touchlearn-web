import React, { useState, useEffect } from 'react';
import { sfx, tts } from '../engine';

export const MathScienceGames: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [useHindi, setUseHindi] = useState(false);
    const [subGame, setSubGame] = useState<string | null>(null);

    const menu = [
        { id: 'bird', icon: "🔒", titleEn: "Bird Math", titleHi: "Bird Math" },
        { id: 'train', icon: "🚂", titleEn: "Count Train", titleHi: "Train Ginti" },
        { id: 'daynight', icon: "🌇", titleEn: "Day & Night", titleHi: "Din aur Raat" },
        { id: 'weather', icon: "🌤️", titleEn: "Weather Lab", titleHi: "Mausam Lab" }
    ];

    return (
        <div style={{ padding: '20px', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <button 
                    onClick={() => { sfx.play('click'); if (subGame) setSubGame(null); else onBack(); }}
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

            {subGame === null ? (
                <>
                    <h1 style={{ color: '#F9E2AF', fontSize: '24px', margin: '20px 0' }}>
                        {useHindi ? "🔢 Math & Science" : "🔢 Math & Science"}
                    </h1>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
                        {menu.map(item => (
                            <div 
                                key={item.id}
                                onClick={() => { sfx.play('click'); setSubGame(item.id); }}
                                style={{
                                    backgroundColor: '#313244', width: '140px', height: '140px',
                                    borderRadius: '16px', display: 'flex', flexDirection: 'column',
                                    alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                                }}
                            >
                                <span style={{ fontSize: '48px' }}>{item.icon}</span>
                                <span style={{ color: '#CDD6F4', fontSize: '16px', marginTop: '12px', fontWeight: 'bold', textAlign: 'center' }}>
                                    {useHindi ? item.titleHi : item.titleEn}
                                </span>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', marginTop: '16px' }}>
                    {subGame === 'bird' && <BirdMathGame useHindi={useHindi} />}
                    {subGame === 'train' && <CountTrainGame useHindi={useHindi} />}
                    {subGame === 'daynight' && <DayNightGame useHindi={useHindi} />}
                    {subGame === 'weather' && <WeatherLabGame useHindi={useHindi} />}
                </div>
            )}
        </div>
    );
};

const BirdMathGame: React.FC<{ useHindi: boolean }> = ({ useHindi }) => {
    const [mode, setMode] = useState("Sub");
    const [lastEquation, setLastEquation] = useState(useHindi ? "Ginti khel: birds ke saath seekhen!" : "Math fun: learn with birds!");
    
    // Subtraction
    const [totalBirds, setTotalBirds] = useState(6);
    const [birds, setBirds] = useState<number[]>([0,1,2,3,4,5]);

    // Addition
    const [addA, setAddA] = useState(2);
    const [addB, setAddB] = useState(3);
    const [addPlaced, setAddPlaced] = useState(0);

    // Multiplication
    const [mulA, setMulA] = useState(2);
    const [mulB, setMulB] = useState(3);
    const [mulRevealed, setMulRevealed] = useState(0);

    // Division
    const [divGroups, setDivGroups] = useState(2);
    const [divTotal, setDivTotal] = useState(8);
    const [divPlaced, setDivPlaced] = useState(0);

    const resetSub = () => {
        const tb = Math.floor(Math.random() * 5) + 5;
        setTotalBirds(tb);
        setBirds(Array.from({length: tb}, (_, i) => i));
        setLastEquation(useHindi ? `${tb} pakshi. Nikaloge to kam honge.` : `${tb} birds. Take away to make less.`);
    };

    const resetAdd = () => {
        const a = Math.floor(Math.random() * 5) + 1;
        const b = Math.floor(Math.random() * 5) + 1;
        setAddA(a); setAddB(b); setAddPlaced(0);
        setLastEquation(`${a} + ${b} = ?`);
        tts.speak(useHindi ? `Jodna: ${a} mein ${b} aur jodo` : `Addition: add ${b} to ${a}`, false);
    };

    const resetMul = () => {
        const a = Math.floor(Math.random() * 3) + 2;
        const b = Math.floor(Math.random() * 3) + 2;
        setMulA(a); setMulB(b); setMulRevealed(0);
        setLastEquation(`${a} × ${b} = ?`);
        tts.speak(useHindi ? `Guna: ${a} samooh, har mein ${b}` : `Multiply: ${a} groups of ${b}`, false);
    };

    const resetDiv = () => {
        const groups = [2,3,4][Math.floor(Math.random() * 3)];
        const q = Math.floor(Math.random() * 3) + 2;
        const total = q * groups;
        setDivGroups(groups); setDivTotal(total); setDivPlaced(0);
        setLastEquation(`${total} ÷ ${groups} = ?`);
        tts.speak(useHindi ? `Bantna: ${total} ko ${groups} mein barabar baanto` : `Divide: share ${total} into ${groups} groups`, false);
    };

    useEffect(() => {
        if (mode === "Sub") resetSub();
        else if (mode === "Add") resetAdd();
        else if (mode === "Mul") resetMul();
        else if (mode === "Div") resetDiv();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <h2 style={{ color: '#F9E2AF', margin: '0 0 16px' }}>🔒 Bird Cage Math</h2>
            
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                {[
                    { m: "Add", label: "+" }, { m: "Sub", label: "-" },
                    { m: "Mul", label: "×" }, { m: "Div", label: "÷" }
                ].map(({ m, label }) => (
                    <button
                        key={m}
                        onClick={() => { sfx.play('click'); setMode(m); }}
                        style={{
                            padding: '8px 16px', borderRadius: '16px',
                            background: mode === m ? 'rgba(137, 180, 250, 0.2)' : '#313244',
                            color: mode === m ? '#89B4FA' : '#CDD6F4',
                            border: 'none', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold'
                        }}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <div style={{ background: '#45475A', padding: '16px', borderRadius: '16px', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#A6E3A1' }}>{lastEquation}</span>
            </div>

            <div style={{
                background: '#1E1E2E', borderRadius: '20px', width: '100%', maxWidth: '400px',
                height: '240px', marginTop: '16px', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', padding: '10px', overflow: 'hidden'
            }}>
                {mode === "Sub" && (
                    birds.length <= 0 ? (
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '64px' }}>🎉</div>
                            <div style={{ color: '#A6E3A1', fontSize: '18px' }}>{useHindi ? "Sab free!" : "All free!"}</div>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                            {birds.map(id => (
                                <span
                                    key={id}
                                    onClick={() => {
                                        const newBirds = birds.filter(b => b !== id);
                                        setBirds(newBirds);
                                        sfx.play('pop');
                                        const releasedCount = totalBirds - newBirds.length;
                                        setLastEquation(`${totalBirds} - ${releasedCount} = ${newBirds.length}`);
                                        tts.speak(useHindi ? `${totalBirds} mein se ${releasedCount} nikal gaye, ${newBirds.length} bache` : `${totalBirds} minus ${releasedCount} equals ${newBirds.length} left`, false);
                                        if (newBirds.length === 0) {
                                            setTimeout(() => {
                                                tts.speak(useHindi ? "Sab udd gaye! Naya khel" : "All flew away! New game", false);
                                                resetSub();
                                            }, 1500);
                                        }
                                    }}
                                    style={{ fontSize: '36px', cursor: 'pointer', padding: '4px', transition: 'transform 0.2s' }}
                                >
                                    🐦
                                </span>
                            ))}
                        </div>
                    )
                )}

                {mode === "Add" && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                            {Array.from({ length: addA + addPlaced }).map((_, i) => (
                                <span key={i} style={{ fontSize: '28px' }}>🐦</span>
                            ))}
                        </div>
                        {addB - addPlaced > 0 ? (
                            <div style={{ color: '#F9E2AF', marginTop: '16px' }}>
                                {useHindi ? `Aur ${addB - addPlaced} lao!` : `Bring ${addB - addPlaced} more!`}
                            </div>
                        ) : (
                            <div style={{ fontSize: '48px', marginTop: '8px' }}>🎉</div>
                        )}
                    </div>
                )}

                {mode === "Mul" && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                        {Array.from({ length: mulRevealed }).map((_, r) => (
                            <div key={r} style={{ display: 'flex', gap: '6px' }}>
                                {Array.from({ length: mulB }).map((_, c) => <span key={c} style={{ fontSize: '28px' }}>🐦</span>)}
                            </div>
                        ))}
                        {Array.from({ length: mulA - mulRevealed }).map((_, r) => (
                            <div key={r + mulRevealed} style={{ display: 'flex', gap: '6px', opacity: 0.3 }}>
                                {Array.from({ length: mulB }).map((_, c) => <span key={c} style={{ fontSize: '28px' }}>🐦</span>)}
                            </div>
                        ))}
                        {mulRevealed === mulA && <div style={{ fontSize: '48px' }}>🎉</div>}
                    </div>
                )}

                {mode === "Div" && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {Array.from({ length: divGroups }).map((_, nest) => {
                                const base = Math.floor(divPlaced / divGroups);
                                const extra = nest < (divPlaced % divGroups) ? 1 : 0;
                                const inNest = base + extra;
                                return (
                                    <div key={nest} style={{ background: '#313244', padding: '12px', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <span style={{ fontSize: '20px' }}>🌳</span>
                                        <div style={{ display: 'flex', gap: '4px', height: '24px' }}>
                                            {Array.from({ length: inNest }).map((_, i) => <span key={i} style={{ fontSize: '20px' }}>🐦</span>)}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        {divPlaced === divTotal && <div style={{ fontSize: '48px', marginTop: '16px' }}>🎉</div>}
                    </div>
                )}
            </div>

            <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
                {mode === "Add" && (
                    <button onClick={() => {
                        if (addPlaced < addB) {
                            const newPlaced = addPlaced + 1;
                            setAddPlaced(newPlaced);
                            const sum = addA + newPlaced;
                            setLastEquation(`${addA} + ${newPlaced} = ${sum}`);
                            sfx.play('correct');
                            if (newPlaced === addB) {
                                setTimeout(() => resetAdd(), 2000);
                            }
                        }
                    }} style={{ padding: '10px 20px', borderRadius: '8px', background: 'transparent', border: '2px solid #89B4FA', color: '#89B4FA', cursor: 'pointer' }}>
                        {useHindi ? "+1 lao" : "Add +1"}
                    </button>
                )}
                {mode === "Mul" && (
                    <button onClick={() => {
                        if (mulRevealed < mulA) {
                            const newRev = mulRevealed + 1;
                            setMulRevealed(newRev);
                            setLastEquation(`${newRev} × ${mulB} = ${newRev * mulB}`);
                            sfx.play('correct');
                            if (newRev === mulA) {
                                setTimeout(() => resetMul(), 2000);
                            }
                        }
                    }} style={{ padding: '10px 20px', borderRadius: '8px', background: 'transparent', border: '2px solid #89B4FA', color: '#89B4FA', cursor: 'pointer' }}>
                        {useHindi ? "Samooh dikhao" : "Show group"}
                    </button>
                )}
                {mode === "Div" && (
                    <button onClick={() => {
                        if (divPlaced < divTotal) {
                            const newPlaced = divPlaced + 1;
                            setDivPlaced(newPlaced);
                            sfx.play('correct');
                            if (newPlaced === divTotal) {
                                setLastEquation(`${divTotal} ÷ ${divGroups} = ${divTotal / divGroups}`);
                                setTimeout(() => resetDiv(), 2000);
                            }
                        }
                    }} style={{ padding: '10px 20px', borderRadius: '8px', background: 'transparent', border: '2px solid #89B4FA', color: '#89B4FA', cursor: 'pointer' }}>
                        {useHindi ? "Baanto" : "Share"}
                    </button>
                )}

                <button onClick={() => {
                    sfx.play('click');
                    if (mode === "Sub") resetSub();
                    else if (mode === "Add") resetAdd();
                    else if (mode === "Mul") resetMul();
                    else if (mode === "Div") resetDiv();
                }} style={{ padding: '10px 20px', borderRadius: '8px', background: 'transparent', border: '2px solid #A6E3A1', color: '#A6E3A1', cursor: 'pointer' }}>
                    {useHindi ? "Naya" : "New"}
                </button>
            </div>
        </div>
    );
};

const CountTrainGame: React.FC<{ useHindi: boolean }> = ({ useHindi }) => {
    const trains = [
        { count: 3, emoji: "🍓" },
        { count: 5, emoji: "🍍" },
        { count: 2, emoji: "🐱" },
        { count: 7, emoji: "⭐" },
        { count: 4, emoji: "🏆" }
    ];
    const [currentTrain, setCurrentTrain] = useState(0);
    const [revealed, setRevealed] = useState(false);

    const { count, emoji } = trains[currentTrain];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <h2 style={{ color: '#89B4FA', margin: '0 0 16px' }}>🚂 {useHindi ? "Train Ginti" : "Count Train"}</h2>

            <div style={{ background: '#45475A', borderRadius: '20px', width: '100%', maxWidth: '400px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '16px', justifyContent: 'center' }}>
                    {Array.from({ length: count }).map((_, i) => (
                        <span key={i} style={{ fontSize: '32px' }}>{emoji}</span>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '300px' }}>
                {[1, 2, 3, 4, 5, 6, 7].map(num => {
                    const isCorrect = num === count;
                    const isRevealedCorrect = revealed && isCorrect;
                    return (
                        <button
                            key={num}
                            onClick={() => {
                                if (!revealed) {
                                    setRevealed(true);
                                    if (isCorrect) {
                                        sfx.play('correct');
                                        tts.speak(useHindi ? `Sahi! ${count} ${emoji}` : `Correct! ${count}`, false);
                                    } else {
                                        sfx.play('pop'); // buzz equivalent
                                        tts.speak(useHindi ? "Dobara koshish karo!" : "Try again!", false);
                                    }
                                }
                            }}
                            style={{
                                width: '56px', height: '56px', borderRadius: '12px',
                                background: isRevealedCorrect ? '#A6E3A1' : '#313244',
                                color: isRevealedCorrect ? '#1E1E2E' : 'white',
                                fontSize: '24px', fontWeight: 'bold', border: 'none', cursor: 'pointer'
                            }}
                        >
                            {num}
                        </button>
                    )
                })}
            </div>

            {revealed && (
                <button
                    onClick={() => {
                        setCurrentTrain((currentTrain + 1) % trains.length);
                        setRevealed(false);
                        sfx.play('click');
                    }}
                    style={{ marginTop: '24px', padding: '12px 24px', borderRadius: '24px', background: 'transparent', border: '2px solid #89B4FA', color: '#89B4FA', fontSize: '16px', cursor: 'pointer' }}
                >
                    {useHindi ? "Agla Train ➔" : "Next Train ➔"}
                </button>
            )}
        </div>
    );
};

const DayNightGame: React.FC<{ useHindi: boolean }> = ({ useHindi }) => {
    const [isDay, setIsDay] = useState(true);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <h2 style={{ color: '#B4BEFE', margin: '0 0 16px' }}>🌇 {useHindi ? "Din aur Raat" : "Day & Night"}</h2>

            <div
                onClick={() => {
                    setIsDay(!isDay);
                    sfx.play('click');
                    tts.speak(!isDay ? (useHindi ? "Din ho gaya!" : "Daytime!") : (useHindi ? "Raat ho gayi!" : "Nighttime!"), false);
                }}
                style={{
                    width: '100%', maxWidth: '400px', height: '250px',
                    backgroundColor: isDay ? '#87CEEB' : '#1A1A3E',
                    borderRadius: '20px', position: 'relative', overflow: 'hidden', cursor: 'pointer',
                    transition: 'background-color 1s ease'
                }}
            >
                <div style={{
                    position: 'absolute', top: isDay ? '20px' : '300px', left: '50%', transform: 'translateX(-50%)',
                    fontSize: '64px', transition: 'top 1s ease'
                }}>☀️</div>
                <div style={{
                    position: 'absolute', top: !isDay ? '20px' : '300px', left: '50%', transform: 'translateX(-50%)',
                    fontSize: '56px', transition: 'top 1s ease'
                }}>🌙</div>
                {!isDay && (
                    <>
                        <div style={{ position: 'absolute', top: '40px', left: '20%', fontSize: '20px' }}>✨</div>
                        <div style={{ position: 'absolute', top: '60px', right: '20%', fontSize: '16px' }}>⭐</div>
                        <div style={{ position: 'absolute', top: '30px', right: '40%', fontSize: '18px' }}>✨</div>
                    </>
                )}
            </div>

            <div style={{ marginTop: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: isDay ? '#F9E2AF' : '#B4BEFE' }}>
                    {useHindi ? (isDay ? "Din hai! ☀️" : "Raat hai! 🌙") : (isDay ? "It's daytime! ☀️" : "It's nighttime! 🌙")}
                </div>
                <div style={{ color: '#9399B2', fontSize: '14px', marginTop: '8px' }}>
                    {useHindi ? "Aasmaan par tap karke badlo!" : "Tap the sky to change!"}
                </div>
            </div>

            <div style={{ background: '#45475A', borderRadius: '12px', width: '100%', maxWidth: '400px', padding: '16px', marginTop: '24px', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '32px', marginRight: '12px' }}>{isDay ? "🌾" : "😴"}</span>
                <span style={{ color: '#CDD6F4', fontSize: '14px' }}>
                    {useHindi ? (isDay ? "Sooraj dekh ke khilte hain phool" : "Raat mein so jaate hain") : (isDay ? "Flowers bloom in sunlight" : "We sleep at night")}
                </span>
            </div>
        </div>
    );
};

const WeatherLabGame: React.FC<{ useHindi: boolean }> = ({ useHindi }) => {
    const [wIndex, setWIndex] = useState(0);
    const weathers = [
        { emoji: "☀️", en: "Sunny", hi: "Dhoop", bg: "#87CEEB", fEn: "Sunlight gives us Vitamin D!", fHi: "Dhoop se Vitamin D milta hai!" },
        { emoji: "⛅", en: "Cloudy", hi: "Baadal", bg: "#7C9CB5", fEn: "Clouds bring water.", fHi: "Baadal paani leke aate hain!" },
        { emoji: "🌧️", en: "Rainy", hi: "Baarish", bg: "#5B7A8F", fEn: "Rain helps flowers bloom.", fHi: "Baarish se phool khilte hain!" },
        { emoji: "⚡", en: "Stormy", hi: "Toofaan", bg: "#4A4A6A", fEn: "Storms bring strong winds.", fHi: "Toofaan tez hawa leke aata hai!" },
        { emoji: "❄️", en: "Snowy", hi: "Barf", bg: "#E0F7FA", fEn: "Snow is very cold!", fHi: "Barf thandi hoti hai!" }
    ];
    const current = weathers[wIndex];

    const changeWeather = (idx?: number) => {
        const next = idx !== undefined ? idx : (wIndex + 1) % weathers.length;
        setWIndex(next);
        sfx.play('click');
        tts.speak(useHindi ? `${weathers[next].hi} mausam` : `${weathers[next].en} weather`, false);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <h2 style={{ color: '#89B4FA', margin: '0 0 16px' }}>🌤️ {useHindi ? "Mausam Lab" : "Weather Lab"}</h2>

            <div
                onClick={() => changeWeather()}
                style={{
                    width: '100%', maxWidth: '400px', height: '220px',
                    backgroundColor: current.bg, borderRadius: '20px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', transition: 'background-color 0.6s ease'
                }}
            >
                <span style={{ fontSize: '96px' }}>{current.emoji}</span>
                <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#1E1E2E', marginTop: '8px' }}>
                    {useHindi ? current.hi : current.en}
                </span>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                {weathers.map((_, i) => (
                    <div
                        key={i}
                        onClick={() => changeWeather(i)}
                        style={{
                            width: '16px', height: '16px', borderRadius: '50%',
                            backgroundColor: i === wIndex ? '#89B4FA' : '#45475A',
                            cursor: 'pointer'
                        }}
                    />
                ))}
            </div>

            <div style={{ color: '#9399B2', fontSize: '14px', marginTop: '12px' }}>
                {useHindi ? "Mausam badalne ke liye tap karo!" : "Tap to change weather!"}
            </div>

            <div style={{ background: '#45475A', borderRadius: '12px', width: '100%', maxWidth: '400px', padding: '16px', marginTop: '20px' }}>
                <span style={{ color: '#A6E3A1', fontSize: '14px' }}>
                    {useHindi ? current.fHi : current.fEn}
                </span>
            </div>
        </div>
    );
};
