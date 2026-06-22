import React, { useState } from 'react';
import { sfx, tts } from '../engine';

interface KitchenRoleplayProps {
  onBack: () => void;
}

const ingredients = [
  { emoji: "\uD83C\uDF45", nameEn: "Tomato", nameHi: "Tamatar", color: "#F38BA8", factEn: "Tomatoes are rich in Vitamin C", factHi: "Lal tamatar Vitamin C se bharpoor" },
  { emoji: "\uD83E\uDDC5", nameEn: "Carrot", nameHi: "Gajar", color: "#FAB387", factEn: "Carrots are good for eyes", factHi: "Gajar aankhon ke liye achha" },
  { emoji: "\uD83E\uDD54", nameEn: "Potato", nameHi: "Aloo", color: "#F9E2AF", factEn: "Potatoes give energy", factHi: "Aloo se takat milti hai" },
  { emoji: "\uD83E\uDED8", nameEn: "Lentils", nameHi: "Dal", color: "#A6E3A1", factEn: "Lentils have protein", factHi: "Dal mein protein hota hai, takat ka khazana" },
  { emoji: "\uD83C\uDF3E", nameEn: "Rice", nameHi: "Chawal", color: "#CDD6F4", factEn: "Rice gives energy", factHi: "Chawal se energy milti hai" },
  { emoji: "\uD83E\uDED7", nameEn: "Oil", nameHi: "Tel", color: "#F9E2AF", factEn: "Oil makes food tasty", factHi: "Tel se pakwaan aur swadisht hota hai" }
];

export const KitchenRoleplay: React.FC<KitchenRoleplayProps> = ({ onBack }) => {
  const useHindi = false;
  const [potIngredients, setPotIngredients] = useState<string[]>([]);
  const [isCooked, setIsCooked] = useState(false);
  const [isServed, setIsServed] = useState(false);
  const [isEaten, setIsEaten] = useState(false);

  const handleCook = () => {
    setIsCooked(true);
    sfx.play('magic');
    tts.speak(useHindi ? "Pak raha hai! Khushboo aa rahi hai" : "Cooking! Smells good!", false);
  };

  const handleServe = () => {
    setIsServed(true);
    sfx.play('pop');
    tts.speak(useHindi ? "Khaana taiyaar! Serve karo" : "Food ready! Time to serve!", false);
  };

  const handleEat = () => {
    setIsEaten(true);
    sfx.play('correct');
    tts.speak(useHindi ? "Maza aa gaya! Swadisht" : "Yummy! Delicious!", false);
  };

  const handleCookAgain = () => {
    setPotIngredients([]);
    setIsCooked(false);
    setIsServed(false);
    setIsEaten(false);
    sfx.play('click');
  };

  const handleAddIngredient = (item: typeof ingredients[0]) => {
    if (!isCooked && !isServed && !isEaten && !potIngredients.includes(item.emoji)) {
      setPotIngredients(prev => [...prev, item.emoji]);
      sfx.play('click');
      const name = useHindi ? item.nameHi : item.nameEn;
      const fact = useHindi ? item.factHi : item.factEn;
      tts.speak(`${name}! ${fact}`, false);
    }
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', 
      width: '100%', minHeight: '100vh', backgroundColor: '#1E1E2E', 
      fontFamily: 'sans-serif', padding: '20px', boxSizing: 'border-box',
      position: 'relative'
    }}>
      {/* Back Button */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
        <button 
            onClick={() => { sfx.play('click'); onBack(); }}
            style={{
                fontSize: '20px', background: '#FF9AA2', border: '4px solid #FFB7B2', color: 'white', 
                cursor: 'pointer', fontWeight: '900', padding: '10px 20px', borderRadius: '20px',
                boxShadow: '0 6px 0 #FFB7B2', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', zIndex: 100
            }}
            className="glossy"
            onPointerDown={(e) => { e.currentTarget.style.transform = 'translateY(6px)'; e.currentTarget.style.boxShadow = '0 0 0 #FFB7B2'; }}
            onPointerUp={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 0 #FFB7B2'; }}
            onPointerLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 0 #FFB7B2'; }}
        >
            <span style={{ fontSize: '28px' }}>⬅️</span> Menu
        </button>
      </div>

      <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#FAB387', marginTop: '10px' }}>
        {useHindi ? "\uD83C\uDF73 Rasoi" : "\uD83C\uDF73 Kitchen"}
      </div>

      <div style={{ height: '16px' }} />

      {/* Main Container */}
      <div style={{
        width: '100%', maxWidth: '400px', height: '200px',
        backgroundColor: '#45475A', borderRadius: '20px',
        display: 'flex', justifyContent: 'center', alignItems: 'center'
      }}>
        {isEaten ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: '64px' }}>{"\uD83D\uDE0B"}</div>
            <div style={{ fontSize: '18px', color: '#A6E3A1' }}>{useHindi ? "Swadisht!" : "Yummy!"}</div>
          </div>
        ) : isServed ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: '72px' }}>{"\uD83C\uDF5B"}</div>
            <div style={{ fontSize: '16px', color: '#9399B2', marginTop: '8px' }}>{useHindi ? "Khaane ko tap karo!" : "Tap to eat!"}</div>
          </div>
        ) : isCooked ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: '72px' }}>{"\uD83C\uDF72"}</div>
            <div style={{ fontSize: '16px', color: '#9399B2', marginTop: '8px' }}>{useHindi ? "Parosne ko tap karo!" : "Tap to serve!"}</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: '64px' }}>{"\uD83E\uDED7"}</div>
            <div style={{ height: '8px' }} />
            {potIngredients.length === 0 ? (
              <div style={{ fontSize: '16px', color: '#9399B2' }}>{useHindi ? "Samaagri daalo!" : "Add ingredients!"}</div>
            ) : (
              <div style={{ display: 'flex', gap: '4px' }}>
                {potIngredients.map((emoji, idx) => (
                  <div key={idx} style={{ fontSize: '24px' }}>{emoji}</div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{ height: '12px' }} />

      {/* Buttons */}
      {isEaten ? (
        <button onClick={handleCookAgain} style={buttonStyle('#FAB387')}>
          {useHindi ? "Dobara Pakao \uD83C\uDF73" : "Cook Again \uD83C\uDF73"}
        </button>
      ) : isServed ? (
        <button onClick={handleEat} style={buttonStyle('#A6E3A1')}>
          {useHindi ? "Khao! \uD83E\uDD64" : "Eat! \uD83E\uDD64"}
        </button>
      ) : isCooked ? (
        <button onClick={handleServe} style={buttonStyle('#F9E2AF')}>
          {useHindi ? "Paroso \uD83C\uDF5B" : "Serve \uD83C\uDF5B"}
        </button>
      ) : potIngredients.length > 0 ? (
        <button onClick={handleCook} style={buttonStyle('#F38BA8')}>
          {useHindi ? "Pakao! \uD83D\uDD25" : "Cook! \uD83D\uDD25"}
        </button>
      ) : null}

      <div style={{ height: '12px' }} />

      {potIngredients.length > 0 && (
        <>
          <div style={{
            backgroundColor: '#313244', borderRadius: '8px', padding: '8px',
            width: '90%', maxWidth: '360px', textAlign: 'center',
            fontSize: '12px', color: '#F9E2AF'
          }}>
            {useHindi
              ? "\uD83D\uDCD6 Swasth pakwan! Dal = protein, Gajar = aankhen, Tamatar = Vitamin C"
              : "\uD83D\uDCD6 Healthy cooking! Dal = protein, Gajar = eyes, Tamatar = Vitamin C"}
          </div>
          <div style={{ height: '8px' }} />
        </>
      )}

      <div style={{ fontSize: '14px', color: '#9399B2', marginBottom: '8px' }}>
        {useHindi ? "Samaagri chuno aur daalo:" : "Tap ingredients to add:"}
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '400px' }}>
        {ingredients.map((item, idx) => {
          const isEnabled = !isCooked && !isServed && !isEaten;
          const isAdded = potIngredients.includes(item.emoji);
          return (
            <button
              key={idx}
              onClick={() => handleAddIngredient(item)}
              disabled={!isEnabled || isAdded}
              style={{
                width: '56px', height: '56px',
                backgroundColor: isEnabled && !isAdded ? `${item.color}33` : '#313244',
                borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center',
                border: 'none', cursor: isEnabled && !isAdded ? 'pointer' : 'not-allowed',
                opacity: isEnabled && !isAdded ? 1 : 0.5
              }}
            >
              <div style={{ fontSize: '28px' }}>{item.emoji}</div>
            </button>
          )
        })}
      </div>

    </div>
  );
};

const buttonStyle = (color: string) => ({
  padding: '10px 20px',
  fontSize: '16px',
  borderRadius: '8px',
  backgroundColor: 'transparent',
  color: color,
  border: `2px solid ${color}`,
  cursor: 'pointer',
  fontWeight: 'bold',
  minWidth: '120px'
});

export default KitchenRoleplay;
