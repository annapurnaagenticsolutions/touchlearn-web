import React, { useState } from 'react';
import { sfx, tts } from '../engine';

export const BasicCategoriesGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [useHindi, setUseHindi] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const categories = [
        { id: 'colors', icon: "🔴", en: "Colors", hi: "Rang" },
        { id: 'shapes', icon: "⭐", en: "Shapes", hi: "Aakar" },
        { id: 'animals', icon: "🐶", en: "Animals", hi: "Janwar" },
        { id: 'hindi', icon: "अ", en: "Hindi Alphabet", hi: "Varnamala" },
        { id: 'numbers', icon: "🔢", en: "Numbers", hi: "Ginti" },
        { id: 'fruits', icon: "🍎", en: "Fruits", hi: "Fal" },
        { id: 'family', icon: "👨‍👩‍👧", en: "Family", hi: "Parivaar" },
        { id: 'body', icon: "👂", en: "Body Parts", hi: "Sharir ke Ang" },
        { id: 'emotions', icon: "😊", en: "Emotions", hi: "Bhavnayein" },
        { id: 'music', icon: "🎹", en: "Music Keys", hi: "Sangeet" },
        { id: 'peekaboo', icon: "🫣", en: "Peekaboo", hi: "Luka Chuppi" }
    ];

    return (
        <div style={{ padding: '20px', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
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

            {activeCategory === null ? (
                <>
                    <h1 style={{ color: '#B4BEFE', fontSize: '24px', marginBottom: '24px' }}>
                        {useHindi ? "📚 Buniyadi Baatein" : "📚 Basic Categories"}
                    </h1>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '16px', width: '100%', maxWidth: '600px' }}>
                        {categories.map(cat => (
                            <div
                                key={cat.id}
                                onClick={() => { sfx.play('click'); setActiveCategory(cat.id); }}
                                style={{
                                    backgroundColor: '#313244', borderRadius: '16px', padding: '20px',
                                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                                    cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
                                }}
                            >
                                <span style={{ fontSize: '40px' }}>{cat.icon}</span>
                                <span style={{ color: '#CDD6F4', fontSize: '14px', marginTop: '12px', fontWeight: 'bold', textAlign: 'center' }}>
                                    {useHindi ? cat.hi : cat.en}
                                </span>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div style={{ width: '100%', maxWidth: '600px' }}>
                    {activeCategory === 'colors' && <ColorsGrid useHindi={useHindi} />}
                    {activeCategory === 'shapes' && <ShapesGrid useHindi={useHindi} />}
                    {activeCategory === 'animals' && <AnimalsGrid useHindi={useHindi} />}
                    {activeCategory === 'hindi' && <HindiGrid useHindi={useHindi} />}
                    {activeCategory === 'numbers' && <NumbersGrid useHindi={useHindi} />}
                    {activeCategory === 'fruits' && <FruitsGrid useHindi={useHindi} />}
                    {activeCategory === 'family' && <FamilyGrid useHindi={useHindi} />}
                    {activeCategory === 'body' && <BodyPartsGrid useHindi={useHindi} />}
                    {activeCategory === 'emotions' && <EmotionsGrid useHindi={useHindi} />}
                    {activeCategory === 'music' && <MusicKeys useHindi={useHindi} />}
                    {activeCategory === 'peekaboo' && <PeekabooGame useHindi={useHindi} />}
                </div>
            )}
        </div>
    );
};

const GenericGrid = ({ items, useHindi }: { items: any[], useHindi: boolean }) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', width: '100%' }}>
        {items.map((item, i) => (
            <div
                key={i}
                onClick={() => {
                    sfx.play('click');
                    tts.speak(useHindi ? item.hi : item.en, false);
                }}
                style={{
                    backgroundColor: item.color || '#45475A', borderRadius: '16px', padding: '16px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
                }}
            >
                <span style={{ fontSize: '40px' }}>{item.icon}</span>
                <span style={{ color: '#1E1E2E', fontSize: '14px', marginTop: '8px', fontWeight: 'bold', textAlign: 'center' }}>
                    {useHindi ? item.hi : item.en}
                </span>
            </div>
        ))}
    </div>
);

const ColorsGrid = ({ useHindi }: { useHindi: boolean }) => {
    const colors = [
        { icon: "🔴", en: "Red", hi: "Laal", color: "#F38BA8" },
        { icon: "🟢", en: "Green", hi: "Hara", color: "#A6E3A1" },
        { icon: "🔵", en: "Blue", hi: "Neela", color: "#89B4FA" },
        { icon: "🟡", en: "Yellow", hi: "Peela", color: "#F9E2AF" },
        { icon: "🟠", en: "Orange", hi: "Narangi", color: "#FAB387" },
        { icon: "🟣", en: "Purple", hi: "Baingani", color: "#CBA6F7" },
        { icon: "⚫", en: "Black", hi: "Kala", color: "#45475A" },
        { icon: "⚪", en: "White", hi: "Safed", color: "#CDD6F4" },
        { icon: "🟤", en: "Brown", hi: "Bhoora", color: "#DCB483" },
        { icon: "🌸", en: "Pink", hi: "Gulabi", color: "#F38BA8" }
    ];
    return <GenericGrid items={colors} useHindi={useHindi} />;
};

const ShapesGrid = ({ useHindi }: { useHindi: boolean }) => {
    const shapes = [
        { icon: "⬛", en: "Square", hi: "Chaukor", color: "#89B4FA" },
        { icon: "⭕", en: "Circle", hi: "Gol", color: "#A6E3A1" },
        { icon: "🔺", en: "Triangle", hi: "Tribhuj", color: "#F9E2AF" },
        { icon: "⭐", en: "Star", hi: "Tara", color: "#FAB387" },
        { icon: "▬", en: "Rectangle", hi: "Ayat", color: "#B4BEFE" },
        { icon: "♦️", en: "Diamond", hi: "Heera", color: "#CBA6F7" }
    ];
    return <GenericGrid items={shapes} useHindi={useHindi} />;
};

const AnimalsGrid = ({ useHindi }: { useHindi: boolean }) => {
    const animals = [
        { icon: "🐻", en: "Bear", hi: "Bhalu", color: "#DCB483" },
        { icon: "🐱", en: "Cat", hi: "Billi", color: "#F9E2AF" },
        { icon: "🐶", en: "Dog", hi: "Kutta", color: "#DCB483" },
        { icon: "🦁", en: "Lion", hi: "Sher", color: "#FAB387" },
        { icon: "🐐", en: "Goat", hi: "Bakri", color: "#A6E3A1" },
        { icon: "🐔", en: "Hen", hi: "Murgi", color: "#F9E2AF" },
        { icon: "🐘", en: "Elephant", hi: "Hathi", color: "#DCB483" },
        { icon: "🐢", en: "Turtle", hi: "Kachhua", color: "#A6E3A1" },
        { icon: "🦊", en: "Fox", hi: "Lomdi", color: "#FAB387" },
        { icon: "🐒", en: "Monkey", hi: "Bandar", color: "#F9E2AF" },
        { icon: "🐅", en: "Tiger", hi: "Bagh", color: "#F38BA8" },
        { icon: "🐴", en: "Horse", hi: "Ghoda", color: "#89B4FA" }
    ];
    return <GenericGrid items={animals} useHindi={useHindi} />;
};

const HindiGrid = ({ useHindi }: { useHindi: boolean }) => {
    const letters = [
        { icon: "अ", en: "A", hi: "A", color: "#F38BA8" },
        { icon: "आ", en: "Aa", hi: "Aa", color: "#F38BA8" },
        { icon: "इ", en: "E", hi: "E", color: "#F38BA8" },
        { icon: "ई", en: "Ee", hi: "Ee", color: "#F38BA8" },
        { icon: "उ", en: "U", hi: "U", color: "#F38BA8" },
        { icon: "ऊ", en: "Oo", hi: "Oo", color: "#F38BA8" },
        { icon: "क", en: "Ka", hi: "Ka", color: "#89B4FA" },
        { icon: "ख", en: "Kha", hi: "Kha", color: "#89B4FA" },
        { icon: "ग", en: "Ga", hi: "Ga", color: "#89B4FA" },
        { icon: "घ", en: "Gha", hi: "Gha", color: "#89B4FA" },
        { icon: "च", en: "Cha", hi: "Cha", color: "#A6E3A1" },
        { icon: "छ", en: "Chha", hi: "Chha", color: "#A6E3A1" }
    ];
    return <GenericGrid items={letters} useHindi={useHindi} />;
};

const NumbersGrid = ({ useHindi }: { useHindi: boolean }) => {
    const hindiNames = [
        "Ek", "Do", "Teen", "Chaar", "Paanch", "Chhe", "Saat", "Aath", "Nau", "Das",
        "Gyarah", "Baarah", "Terah", "Chaudah", "Pandrah", "Solah", "Satrah", "Atharah", "Unnees", "Bees"
    ];
    const numbers = Array.from({ length: 20 }, (_, i) => ({
        icon: `${i + 1}`, en: `${i + 1}`, hi: hindiNames[i],
        color: (i < 5) ? "#F38BA8" : (i < 10) ? "#F9E2AF" : (i < 15) ? "#A6E3A1" : "#89B4FA"
    }));
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', width: '100%' }}>
            {numbers.map((item, i) => (
                <div key={i} onClick={() => { sfx.play('click'); tts.speak(useHindi ? item.hi : item.en, false); }}
                    style={{ backgroundColor: item.color, borderRadius: '12px', padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                    <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#1E1E2E' }}>{item.icon}</span>
                    <span style={{ color: '#1E1E2E', fontSize: '10px', marginTop: '4px', fontWeight: 'bold' }}>{useHindi ? item.hi : item.en}</span>
                </div>
            ))}
        </div>
    );
};

const FruitsGrid = ({ useHindi }: { useHindi: boolean }) => {
    const fruits = [
        { icon: "🥭", en: "Mango", hi: "Aam", color: "#A6E3A1" },
        { icon: "🍍", en: "Pineapple", hi: "Ananas", color: "#A6E3A1" },
        { icon: "🍌", en: "Banana", hi: "Kela", color: "#A6E3A1" },
        { icon: "🍓", en: "Strawberry", hi: "Strawberry", color: "#A6E3A1" },
        { icon: "🍉", en: "Watermelon", hi: "Tarbooz", color: "#A6E3A1" },
        { icon: "🍇", en: "Grapes", hi: "Angoor", color: "#A6E3A1" },
        { icon: "🍈", en: "Melon", hi: "Kharbooja", color: "#A6E3A1" },
        { icon: "🍎", en: "Apple", hi: "Seb", color: "#A6E3A1" },
        { icon: "🍊", en: "Orange", hi: "Narangi", color: "#A6E3A1" },
        { icon: "🍀", en: "Pomegranate", hi: "Anaar", color: "#A6E3A1" },
        { icon: "🍐", en: "Pear", hi: "Nashpati", color: "#A6E3A1" },
        { icon: "🍒", en: "Cherry", hi: "Cherry", color: "#A6E3A1" }
    ];
    return <GenericGrid items={fruits} useHindi={useHindi} />;
};

const FamilyGrid = ({ useHindi }: { useHindi: boolean }) => {
    const family = [
        { icon: "👩", en: "Mummy", hi: "Mummy", color: "#F9E2AF" },
        { icon: "👨", en: "Papa", hi: "Papa", color: "#F9E2AF" },
        { icon: "👵", en: "Dadi", hi: "Dadi", color: "#F9E2AF" },
        { icon: "👴", en: "Dada", hi: "Dada", color: "#F9E2AF" },
        { icon: "👧", en: "Didi", hi: "Didi", color: "#F9E2AF" },
        { icon: "👦", en: "Bhaiya", hi: "Bhaiya", color: "#F9E2AF" },
        { icon: "👶", en: "Baby", hi: "Baby", color: "#F9E2AF" },
        { icon: "👨‍👩‍👧", en: "Family", hi: "Parivaar", color: "#F9E2AF" },
        { icon: "🐱", en: "Pet", hi: "Paltu Janwar", color: "#F9E2AF" }
    ];
    return <GenericGrid items={family} useHindi={useHindi} />;
};

const BodyPartsGrid = ({ useHindi }: { useHindi: boolean }) => {
    const parts = [
        { icon: "👀", en: "Eyes", hi: "Aankhein", color: "#89B4FA" },
        { icon: "👂", en: "Ears", hi: "Kaann", color: "#89B4FA" },
        { icon: "👃", en: "Nose", hi: "Naak", color: "#89B4FA" },
        { icon: "👄", en: "Mouth", hi: "Mooh", color: "#89B4FA" },
        { icon: "👋", en: "Hand", hi: "Haath", color: "#89B4FA" },
        { icon: "🦵", en: "Leg", hi: "Paanv", color: "#89B4FA" },
        { icon: "👍", en: "Thumb", hi: "Angutha", color: "#89B4FA" },
        { icon: "💪", en: "Arm", hi: "Bazoo", color: "#89B4FA" },
        { icon: "👤", en: "Head", hi: "Sar", color: "#89B4FA" }
    ];
    return <GenericGrid items={parts} useHindi={useHindi} />;
};

const EmotionsGrid = ({ useHindi }: { useHindi: boolean }) => {
    const emotions = [
        { icon: "😀", en: "Happy", hi: "Khush", color: "#CBA6F7" },
        { icon: "😢", en: "Sad", hi: "Udaas", color: "#CBA6F7" },
        { icon: "😠", en: "Angry", hi: "Gussa", color: "#CBA6F7" },
        { icon: "😱", en: "Surprised", hi: "Hairaan", color: "#CBA6F7" },
        { icon: "😨", en: "Scared", hi: "Dara Hua", color: "#CBA6F7" },
        { icon: "😌", en: "Calm", hi: "Shant", color: "#CBA6F7" },
        { icon: "😜", en: "Silly", hi: "Shaitaan", color: "#CBA6F7" },
        { icon: "😍", en: "Loving", hi: "Pyar", color: "#CBA6F7" },
        { icon: "😴", en: "Sleepy", hi: "Neend", color: "#CBA6F7" }
    ];
    return <GenericGrid items={emotions} useHindi={useHindi} />;
};

const MusicKeys = ({ useHindi }: { useHindi: boolean }) => {
    const notes = [
        { n: "Do", c: "#F38BA8" }, { n: "Re", c: "#F9E2AF" }, { n: "Mi", c: "#A6E3A1" },
        { n: "Fa", c: "#89B4FA" }, { n: "Sol", c: "#B4BEFE" }, { n: "La", c: "#CBA6F7" }, { n: "Si", c: "#FAB387" }
    ];
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <div style={{ color: '#9399B2', marginBottom: '16px' }}>{useHindi ? "Bajao!" : "Tap to play!"}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                {notes.map(note => (
                    <div key={note.n} onClick={() => { tts.speak(note.n, false); }}
                        style={{
                            width: '72px', height: '120px', backgroundColor: note.c + '4D',
                            borderRadius: '16px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                            paddingBottom: '16px', cursor: 'pointer', border: `2px solid ${note.c}`
                        }}>
                        <span style={{ color: note.c, fontWeight: 'bold', fontSize: '24px' }}>{note.n}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const PeekabooGame = ({ useHindi }: { useHindi: boolean }) => {
    const rounds = [
        { icon: "🐱", en: "Cat", hi: "Billi" }, { icon: "🐶", en: "Dog", hi: "Kutta" },
        { icon: "🐻", en: "Bear", hi: "Bhalu" }, { icon: "🐐", en: "Goat", hi: "Bakri" },
        { icon: "🦁", en: "Lion", hi: "Sher" }
    ];
    const [idx, setIdx] = useState(0);
    const [revealed, setRevealed] = useState(false);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <div style={{ color: '#B4BEFE', fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
                {useHindi ? "Kahan hai?" : "Where is it?"}
            </div>
            <div
                onClick={() => {
                    if (!revealed) {
                        setRevealed(true);
                        tts.speak(useHindi ? rounds[idx].hi : rounds[idx].en, false);
                        setTimeout(() => {
                            setRevealed(false);
                            setIdx((idx + 1) % rounds.length);
                        }, 2000);
                    }
                }}
                style={{
                    width: '200px', height: '200px', backgroundColor: '#45475A',
                    borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                }}
            >
                {revealed ? (
                    <span style={{ fontSize: '96px', animation: 'pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>{rounds[idx].icon}</span>
                ) : (
                    <span style={{ fontSize: '72px' }}>❓</span>
                )}
            </div>
            <div style={{ color: '#9399B2', fontSize: '16px', marginTop: '24px' }}>
                {useHindi ? "Dabbe par tap karo!" : "Tap the box!"}
            </div>
            <style>
                {`
                    @keyframes pop {
                        0% { transform: scale(0.1); }
                        100% { transform: scale(1); }
                    }
                `}
            </style>
        </div>
    );
};
