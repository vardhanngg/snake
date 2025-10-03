import { useState } from 'react';
import GameHUD from '../GameHUD';
import { Button } from '@/components/ui/button';

export default function GameHUDExample() {
  const [player1Length, setPlayer1Length] = useState(15);
  const [player2Length, setPlayer2Length] = useState(22);
  const [hasSpeedBoost, setHasSpeedBoost] = useState(false);

  return (
    <div className="min-h-screen bg-background p-8">
      <GameHUD
        player1Length={player1Length}
        player2Length={player2Length}
        playerRole="p1"
        hasSpeedBoost={hasSpeedBoost}
        winLength={50}
      />
      
      <div className="mt-32 flex gap-4 justify-center">
        <Button onClick={() => setPlayer1Length(prev => prev + 1)} data-testid="button-p1-grow">
          Grow P1
        </Button>
        <Button onClick={() => setPlayer2Length(prev => prev + 1)} data-testid="button-p2-grow">
          Grow P2
        </Button>
        <Button onClick={() => setHasSpeedBoost(!hasSpeedBoost)} data-testid="button-toggle-boost">
          Toggle Boost
        </Button>
      </div>
    </div>
  );
}
