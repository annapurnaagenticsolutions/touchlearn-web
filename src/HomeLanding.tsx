import React from 'react';
import { sfx } from './engine';

interface Props {
    onBack: () => void;
}

export const HomeLanding: React.FC<Props & { onPick: (index: number) => void }> = ({ onPick }) => {
    const featured = [
        "Bubble Pop", "Alphabet ABCs", "Animal Sounds", 
        "Memory Match", "Odd One Out", "Shadow Match",
        "Spot Difference", "Pattern Repeat", "Maze Runner",
        "Sorting Fun", "Connect Dots", "Jigsaw Puzzle", "Balloon Pop",
        "Doctor Roleplay", "Teacher Roleplay", "Kitchen Roleplay",
        "Zookeeper", "Firefighter", "Painter", "Musician",
        "Mascot Dress-Up", "Magic Tricks", "Lullaby Corner",
        "Beach Builder", "Birthday Cake", "Color By Number",
        "Fishing Pond", "Growing Plant", "Opposites",
        "Pet Care", "Seasons", "Tower Of Hanoi",
        "Vehicle World", "Water Cycle", "Astronaut",
        "Baby Animals", "Sliding Puzzle", "Basic Categories",
        "Math & Science"
    ];
    
    const emojis: { [key: string]: string } = {
        "Bubble Pop": "🫧", "Alphabet ABCs": "🔤", "Animal Sounds": "🐮",
        "Memory Match": "🃏", "Odd One Out": "🔍", "Shadow Match": "⬛",
        "Spot Difference": "🧐", "Pattern Repeat": "🎨", "Maze Runner": "🐾",
        "Sorting Fun": "🗂️", "Connect Dots": "🔢", "Jigsaw Puzzle": "🧩", "Balloon Pop": "🎈",
        "Doctor Roleplay": "🩺", "Teacher Roleplay": "🧑‍🏫", "Kitchen Roleplay": "🧑‍🍳",
        "Zookeeper": "🦁", "Firefighter": "🚒", "Painter": "🖌️", "Musician": "🎵",
        "Mascot Dress-Up": "👗", "Magic Tricks": "✨", "Lullaby Corner": "🌙",
        "Beach Builder": "🏖️", "Birthday Cake": "🎂", "Color By Number": "🖍️",
        "Fishing Pond": "🎣", "Growing Plant": "🌱", "Opposites": "☯️",
        "Pet Care": "🐕", "Seasons": "🌤️", "Tower Of Hanoi": "🏗️",
        "Vehicle World": "🚗", "Water Cycle": "💧", "Astronaut": "🚀",
        "Baby Animals": "🐥", "Sliding Puzzle": "🧩", "Basic Categories": "📚",
        "Math & Science": "🔢"
    };

    const colors = ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA'];

    return (
        <div style={{ padding: '20px', width: '100%', maxWidth: '800px', margin: '0 auto', minHeight: '100vh', boxSizing: 'border-box' }}>
            <h1 style={{ 
                color: 'white', 
                fontSize: '36px', 
                fontWeight: '900', 
                marginBottom: '24px', 
                textAlign: 'center', 
                textShadow: '0 4px 0 #FF9AA2, 0 6px 10px rgba(0,0,0,0.3)',
                letterSpacing: '1px'
            }}>
                What would you like to play today? 🎮
            </h1>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '20px', paddingBottom: '40px' }}>
                {featured.map((name, index) => (
                    <div 
                        key={name}
                        className="glossy"
                        onClick={() => {
                            sfx.play('click');
                            onPick(index);
                        }}
                        style={{
                            backgroundColor: colors[index % colors.length],
                            borderRadius: '24px',
                            height: '120px',
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
                            padding: '12px',
                            transition: 'transform 0.1s ease-in-out'
                        }}
                        onPointerDown={(e) => {
                            (e.currentTarget as HTMLDivElement).style.transform = 'scale(0.95)';
                        }}
                        onPointerUp={(e) => {
                            (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
                        }}
                        onPointerLeave={(e) => {
                            (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
                        }}
                    >
                        <span style={{ fontSize: '40px', marginBottom: '8px' }}>{emojis[name] || "🎮"}</span>
                        {name}
                    </div>
                ))}
            </div>
        </div>
    );
};
