import React, { useEffect } from 'react';
import { sfx, tts } from '../engine';

export const AnimalSoundsGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    
    useEffect(() => {
        tts.speak("Tap the animals to hear them!", false);
    }, []);

    const animals = [
        { name: "Dog", emoji: "🐶", sound: "Woof woof!" },
        { name: "Cat", emoji: "🐱", sound: "Meow meow!" },
        { name: "Cow", emoji: "🐮", sound: "Moo!" },
        { name: "Pig", emoji: "🐷", sound: "Oink oink!" },
        { name: "Duck", emoji: "🦆", sound: "Quack quack!" },
        { name: "Lion", emoji: "🦁", sound: "Roar!" },
    ];

    const playAnimal = (animal: { name: string, sound: string }) => {
        sfx.play('magic');
        tts.speak(`The ${animal.name} says ${animal.sound}`, false);
    };

    return (
        <div style={{ padding: '20px', width: '100%', height: '100%' }}>
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
            <h1 style={{ textAlign: 'center', color: '#F9E2AF' }}>Animal Sounds</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '20px', padding: '20px' }}>
                {animals.map(animal => (
                    <div
                        key={animal.name}
                        onClick={() => playAnimal(animal)}
                        style={{
                            backgroundColor: '#A6E3A1',
                            borderRadius: '24px',
                            aspectRatio: '1',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                            userSelect: 'none'
                        }}
                    >
                        <span style={{ fontSize: '64px' }}>{animal.emoji}</span>
                        <span style={{ color: '#11111B', fontWeight: 'bold', marginTop: '8px' }}>{animal.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
