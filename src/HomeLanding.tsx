import React, { useState, useMemo } from 'react';
import { sfx } from './engine';
import { getStars } from './components/Celebration';

interface GameMeta {
    name: string;
    emoji: string;
    category: string;
}

const GAMES: GameMeta[] = [
    { name: "Bubble Pop", emoji: "🫧", category: "Tap & Pop" },
    { name: "Alphabet ABCs", emoji: "🔤", category: "Learn" },
    { name: "Animal Sounds", emoji: "🐮", category: "Learn" },
    { name: "Memory Match", emoji: "🃏", category: "Puzzles" },
    { name: "Odd One Out", emoji: "🔍", category: "Puzzles" },
    { name: "Shadow Match", emoji: "⬛", category: "Puzzles" },
    { name: "Spot Difference", emoji: "🧐", category: "Puzzles" },
    { name: "Pattern Repeat", emoji: "🎨", category: "Puzzles" },
    { name: "Maze Runner", emoji: "🐾", category: "Puzzles" },
    { name: "Sorting Fun", emoji: "🗂️", category: "Puzzles" },
    { name: "Connect Dots", emoji: "🔢", category: "Learn" },
    { name: "Jigsaw Puzzle", emoji: "🧩", category: "Puzzles" },
    { name: "Balloon Pop", emoji: "🎈", category: "Tap & Pop" },
    { name: "Doctor Roleplay", emoji: "🩺", category: "Roleplay" },
    { name: "Teacher Roleplay", emoji: "🧑‍🏫", category: "Roleplay" },
    { name: "Kitchen Roleplay", emoji: "🧑‍🍳", category: "Roleplay" },
    { name: "Zookeeper", emoji: "🦁", category: "Roleplay" },
    { name: "Firefighter", emoji: "🚒", category: "Roleplay" },
    { name: "Painter", emoji: "🖌️", category: "Creative" },
    { name: "Musician", emoji: "🎵", category: "Creative" },
    { name: "Mascot Dress-Up", emoji: "👗", category: "Creative" },
    { name: "Magic Tricks", emoji: "✨", category: "Creative" },
    { name: "Lullaby Corner", emoji: "🌙", category: "Creative" },
    { name: "Beach Builder", emoji: "🏖️", category: "Creative" },
    { name: "Birthday Cake", emoji: "🎂", category: "Creative" },
    { name: "Color By Number", emoji: "🖍️", category: "Learn" },
    { name: "Fishing Pond", emoji: "🎣", category: "Tap & Pop" },
    { name: "Growing Plant", emoji: "🌱", category: "Creative" },
    { name: "Opposites", emoji: "☯️", category: "Learn" },
    { name: "Pet Care", emoji: "🐕", category: "Roleplay" },
    { name: "Seasons", emoji: "🌤️", category: "Learn" },
    { name: "Tower Of Hanoi", emoji: "🏗️", category: "Puzzles" },
    { name: "Vehicle World", emoji: "🚗", category: "Learn" },
    { name: "Water Cycle", emoji: "💧", category: "Learn" },
    { name: "Astronaut", emoji: "🚀", category: "Roleplay" },
    { name: "Baby Animals", emoji: "🐥", category: "Learn" },
    { name: "Sliding Puzzle", emoji: "🧩", category: "Puzzles" },
    { name: "Basic Categories", emoji: "📚", category: "Learn" },
    { name: "Math & Science", emoji: "🔢", category: "Learn" },
];

const CATEGORY_COLORS: Record<string, string> = {
    "Tap & Pop": '#FFB5E8',
    "Learn": '#B5EAD7',
    "Puzzles": '#C7CEEA',
    "Roleplay": '#FFDAC1',
    "Creative": '#E2F0CB',
};

const CATEGORY_EMOJIS: Record<string, string> = {
    "Tap & Pop": "�",
    "Learn": "�",
    "Puzzles": "🧩",
    "Roleplay": "�",
    "Creative": "🎨",
};

export const HomeLanding: React.FC<{ onPick: (index: number) => void }> = ({ onPick }) => {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const stars = getStars();

    const categories = useMemo(() => {
        const set = new Set(GAMES.map(g => g.category));
        return Array.from(set);
    }, []);

    const filtered = useMemo(() => {
        return GAMES.filter(g => {
            const matchesSearch = !search || g.name.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = !activeCategory || g.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [search, activeCategory]);

    return (
        <div style={{
            padding: '20px',
            width: '100%',
            maxWidth: '900px',
            margin: '0 auto',
            minHeight: '100vh',
            boxSizing: 'border-box',
        }}>
            {/* Header with stars */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{
                    background: 'rgba(255,255,255,0.9)',
                    borderRadius: '20px',
                    padding: '4px 16px',
                    fontSize: '20px',
                    fontWeight: '900',
                    color: '#F38BA8',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                }}>
                    ⭐ {stars}
                </div>
            </div>

            <h1 style={{
                color: 'white',
                fontSize: '32px',
                fontWeight: '900',
                marginBottom: '20px',
                textAlign: 'center',
                textShadow: '0 4px 0 #FF9AA2, 0 6px 10px rgba(0,0,0,0.3)',
                letterSpacing: '1px',
            }}>
                What would you like to play? �
            </h1>

            {/* Search bar */}
            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                <input
                    type="text"
                    placeholder="� Search games..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        width: '100%',
                        maxWidth: '400px',
                        padding: '12px 20px',
                        fontSize: '18px',
                        border: '4px solid #FFB7B2',
                        borderRadius: '24px',
                        outline: 'none',
                        fontFamily: "'Nunito', sans-serif",
                        fontWeight: '700',
                        color: '#1E1E2E',
                        background: 'rgba(255,255,255,0.95)',
                        boxSizing: 'border-box',
                    }}
                />
            </div>

            {/* Category filter */}
            <div style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '24px',
                justifyContent: 'center',
                flexWrap: 'wrap',
            }}>
                <button
                    onClick={() => { sfx.play('click'); setActiveCategory(null); }}
                    className="glossy"
                    style={{
                        padding: '10px 20px',
                        borderRadius: '20px',
                        border: 'none',
                        background: activeCategory === null ? '#FF9AA2' : 'rgba(255,255,255,0.85)',
                        color: activeCategory === null ? 'white' : '#1E1E2E',
                        fontSize: '16px',
                        fontWeight: '900',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                    }}
                >
                    🎮 All
                </button>
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => { sfx.play('click'); setActiveCategory(cat); }}
                        className="glossy"
                        style={{
                            padding: '10px 20px',
                            borderRadius: '20px',
                            border: 'none',
                            background: activeCategory === cat ? CATEGORY_COLORS[cat] : 'rgba(255,255,255,0.85)',
                            color: '#1E1E2E',
                            fontSize: '16px',
                            fontWeight: '900',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            opacity: activeCategory === cat ? 1 : 0.7,
                        }}
                    >
                        {CATEGORY_EMOJIS[cat]} {cat}
                    </button>
                ))}
            </div>

            {/* Games grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                gap: '20px',
                paddingBottom: '40px',
            }}>
                {filtered.map((game) => {
                    const index = GAMES.indexOf(game);
                    return (
                        <div
                            key={game.name}
                            className="glossy"
                            onClick={() => {
                                sfx.play('click');
                                onPick(index);
                            }}
                            style={{
                                backgroundColor: CATEGORY_COLORS[game.category] || '#FFDAC1',
                                borderRadius: '24px',
                                minHeight: '140px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                fontSize: '16px',
                                fontWeight: '900',
                                color: '#1E1E2E',
                                boxShadow: '0 8px 15px rgba(0,0,0,0.1)',
                                userSelect: 'none',
                                textAlign: 'center',
                                padding: '16px',
                                transition: 'transform 0.1s ease-in-out',
                            }}
                            onPointerDown={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(0.95)'; }}
                            onPointerUp={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)'; }}
                            onPointerLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)'; }}
                        >
                            <span style={{ fontSize: '48px', marginBottom: '10px' }}>{game.emoji}</span>
                            {game.name}
                        </div>
                    );
                })}
            </div>

            {filtered.length === 0 && (
                <div style={{ textAlign: 'center', color: 'white', fontSize: '20px', marginTop: '40px' }}>
                    🔍 No games found. Try another search!
                </div>
            )}
        </div>
    );
};
