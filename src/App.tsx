import { useState } from 'react';
import { HomeLanding } from './HomeLanding';
import { BubblePopGame } from './games/BubblePopGame';
import { AlphabetABCGame } from './games/AlphabetABCGame';
import { AnimalSoundsGame } from './games/AnimalSoundsGame';
import { MemoryMatchGame } from './games/MemoryMatchGame';
import { OddOneOutGame } from './games/OddOneOutGame';
import { ShadowMatchGame } from './games/ShadowMatchGame';
import { SpotDifferenceGame } from './games/SpotDifferenceGame';
import { PatternRepeatGame } from './games/PatternRepeatGame';
import { MazeRunnerGame } from './games/MazeRunnerGame';
import { SortingFunGame } from './games/SortingFunGame';
import { ConnectDotsGame } from './games/ConnectDotsGame';
import { JigsawPuzzleGame } from './games/JigsawPuzzleGame';
import { BalloonPopGame } from './games/BalloonPopGame';
import { DoctorRoleplay } from './games/DoctorRoleplay';
import { TeacherRoleplay } from './games/TeacherRoleplay';
import { KitchenRoleplay } from './games/KitchenRoleplay';
import { ZookeeperGame } from './games/ZookeeperGame';
import { FirefighterGame } from './games/FirefighterGame';
import { PainterGame } from './games/PainterGame';
import { MusicianGame } from './games/MusicianGame';
import { MascotDressUp } from './games/MascotDressUp';
import { MagicTricksGame } from './games/MagicTricksGame';
import { LullabyCornerGame } from './games/LullabyCornerGame';
import { BeachBuilderGame } from './games/BeachBuilderGame';
import { BirthdayCakeGame } from './games/BirthdayCakeGame';
import { ColorByNumberGame } from './games/ColorByNumberGame';
import { FishingPondGame } from './games/FishingPondGame';
import { GrowingPlantGame } from './games/GrowingPlantGame';
import { OppositesGame } from './games/OppositesGame';
import { PetCareGame } from './games/PetCareGame';
import { SeasonsGame } from './games/SeasonsGame';
import { TowerOfHanoiGame } from './games/TowerOfHanoiGame';
import { VehicleWorldGame } from './games/VehicleWorldGame';
import { WaterCycleGame } from './games/WaterCycleGame';
import { AstronautGame } from './games/AstronautGame';
import { BabyAnimalsGame } from './games/BabyAnimalsGame';
import { SlidingPuzzleGame } from './games/SlidingPuzzleGame';
import { BasicCategoriesGame } from './games/BasicCategoriesGame';
import { MathScienceGames } from './games/MathScienceGames';

function App() {
  const [currentGame, setCurrentGame] = useState<number>(-1);

  const renderGame = () => {
    switch (currentGame) {
      case 0: return <BubblePopGame onBack={() => setCurrentGame(-1)} />;
      case 1: return <AlphabetABCGame onBack={() => setCurrentGame(-1)} />;
      case 2: return <AnimalSoundsGame onBack={() => setCurrentGame(-1)} />;
      case 3: return <MemoryMatchGame onBack={() => setCurrentGame(-1)} />;
      case 4: return <OddOneOutGame onBack={() => setCurrentGame(-1)} />;
      case 5: return <ShadowMatchGame onBack={() => setCurrentGame(-1)} />;
      case 6: return <SpotDifferenceGame onBack={() => setCurrentGame(-1)} />;
      case 7: return <PatternRepeatGame onBack={() => setCurrentGame(-1)} />;
      case 8: return <MazeRunnerGame onBack={() => setCurrentGame(-1)} />;
      case 9: return <SortingFunGame onBack={() => setCurrentGame(-1)} />;
      case 10: return <ConnectDotsGame onBack={() => setCurrentGame(-1)} />;
      case 11: return <JigsawPuzzleGame onBack={() => setCurrentGame(-1)} />;
      case 12: return <BalloonPopGame onBack={() => setCurrentGame(-1)} />;
      case 13: return <DoctorRoleplay onBack={() => setCurrentGame(-1)} />;
      case 14: return <TeacherRoleplay onBack={() => setCurrentGame(-1)} />;
      case 15: return <KitchenRoleplay onBack={() => setCurrentGame(-1)} />;
      case 16: return <ZookeeperGame onBack={() => setCurrentGame(-1)} />;
      case 17: return <FirefighterGame onBack={() => setCurrentGame(-1)} />;
      case 18: return <PainterGame onBack={() => setCurrentGame(-1)} />;
      case 19: return <MusicianGame onBack={() => setCurrentGame(-1)} />;
      case 20: return <MascotDressUp onBack={() => setCurrentGame(-1)} />;
      case 21: return <MagicTricksGame onBack={() => setCurrentGame(-1)} />;
      case 22: return <LullabyCornerGame onBack={() => setCurrentGame(-1)} />;
      case 23: return <BeachBuilderGame onBack={() => setCurrentGame(-1)} />;
      case 24: return <BirthdayCakeGame onBack={() => setCurrentGame(-1)} />;
      case 25: return <ColorByNumberGame onBack={() => setCurrentGame(-1)} />;
      case 26: return <FishingPondGame onBack={() => setCurrentGame(-1)} />;
      case 27: return <GrowingPlantGame onBack={() => setCurrentGame(-1)} />;
      case 28: return <OppositesGame onBack={() => setCurrentGame(-1)} />;
      case 29: return <PetCareGame onBack={() => setCurrentGame(-1)} />;
      case 30: return <SeasonsGame onBack={() => setCurrentGame(-1)} />;
      case 31: return <TowerOfHanoiGame onBack={() => setCurrentGame(-1)} />;
      case 32: return <VehicleWorldGame onBack={() => setCurrentGame(-1)} />;
      case 33: return <WaterCycleGame onBack={() => setCurrentGame(-1)} />;
      case 34: return <AstronautGame onBack={() => setCurrentGame(-1)} />;
      case 35: return <BabyAnimalsGame onBack={() => setCurrentGame(-1)} />;
      case 36: return <SlidingPuzzleGame onBack={() => setCurrentGame(-1)} />;
      case 37: return <BasicCategoriesGame onBack={() => setCurrentGame(-1)} />;
      case 38: return <MathScienceGames onBack={() => setCurrentGame(-1)} />;
      default: return <HomeLanding onPick={setCurrentGame} />;
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      width: '100vw',
      maxWidth: '100%', /* Prevent horizontal scroll */
      fontFamily: "'Nunito', sans-serif",
      color: '#1E1E2E',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
        {renderGame()}
      </div>
    </div>
  );
}

export default App;
