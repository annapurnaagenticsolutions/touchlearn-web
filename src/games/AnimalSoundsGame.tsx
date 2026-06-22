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
                style={{ fontSize: '24px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', marginBottom: '20px' }}
            >
                ← Back
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
