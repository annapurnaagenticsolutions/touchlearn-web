import React, { useState, useEffect } from 'react';
import { sfx, tts } from '../engine';
import { BackButton } from '../components/BackButton';
import { triggerHaptic } from '../components/Celebration';

export const AnimalSoundsGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [activeAnimal, setActiveAnimal] = useState<string | null>(null);

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
        { name: "Sheep", emoji: "🐑", sound: "Baa baa!" },
        { name: "Horse", emoji: "🐴", sound: "Neigh!" },
        { name: "Chicken", emoji: "🐔", sound: "Cluck cluck!" },
        { name: "Frog", emoji: "🐸", sound: "Ribbit ribbit!" },
        { name: "Bee", emoji: "🐝", sound: "Buzz buzz!" },
        { name: "Owl", emoji: "🦉", sound: "Hoo hoo!" },
    ];

    const playAnimal = (animal: { name: string, sound: string }) => {
        sfx.play('magic');
        triggerHaptic(25);
        setActiveAnimal(animal.name);
        tts.speak(`The ${animal.name} says ${animal.sound}`, false);
        setTimeout(() => setActiveAnimal(null), 1200);
    };

    return (
        <div style={{ padding: '20px', width: '100%', height: '100%', overflowY: 'auto', boxSizing: 'border-box' }}>
            <BackButton onBack={onBack} />
            <h1 style={{ textAlign: 'center', color: '#F9E2AF', fontSize: '28px', fontWeight: '900', marginBottom: '20px' }}>
                🐮 Animal Sounds
            </h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '20px', padding: '10px', paddingBottom: '40px' }}>
                {animals.map(animal => {
                    const isActive = activeAnimal === animal.name;
                    return (
                        <div
                            key={animal.name}
                            onClick={() => playAnimal(animal)}
                            style={{
                                backgroundColor: isActive ? '#A6E3A1' : '#A6E3A1',
                                borderRadius: '24px',
                                aspectRatio: '1',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                boxShadow: isActive
                                    ? '0 0 20px rgba(166,227,161,0.8), 0 8px 16px rgba(0,0,0,0.2)'
                                    : '0 8px 16px rgba(0,0,0,0.15)',
                                userSelect: 'none',
                                transition: 'all 0.2s',
                                transform: isActive ? 'scale(1.08)' : 'scale(1)',
                                touchAction: 'manipulation',
                            }}
                        >
                            <span style={{ fontSize: '64px' }}>{animal.emoji}</span>
                            <span style={{ color: '#1E1E2E', fontWeight: '900', marginTop: '8px', fontSize: '16px' }}>{animal.name}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
