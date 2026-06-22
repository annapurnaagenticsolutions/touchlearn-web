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

    return (
        <div style={{ padding: '20px', width: '100%', maxWidth: '800px', margin: '0 auto', height: '100%', overflowY: 'auto' }}>
            <h1 style={{ color: '#F9E2AF', fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', textAlign: 'center' }}>
                What would you like to learn today?
            </h1>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '16px' }}>
                {featured.map((name, index) => (
                    <div 
                        key={name}
                        onClick={() => {
                            sfx.play('click');
                            onPick(index);
                        }}
                        style={{
                            backgroundColor: '#313244',
                            borderRadius: '16px',
                            height: '100px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            color: '#CDD6F4',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                            userSelect: 'none',
                            textAlign: 'center',
                            padding: '8px'
                        }}
                    >
                        <span style={{ fontSize: '32px', marginBottom: '8px' }}>{emojis[name] || "🎮"}</span>
                        {name}
                    </div>
                ))}
            </div>
            <div style={{ height: '40px' }} />
        </div>
    );
};
