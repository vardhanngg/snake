import { useState } from 'react';
import GameOverModal from '../GameOverModal';
import { Button } from '@/components/ui/button';

export default function GameOverModalExample() {
  const [isWinner, setIsWinner] = useState(true);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="text-center mb-4">
        <Button onClick={() => setIsWinner(!isWinner)} data-testid="button-toggle-result">
          Toggle Win/Loss
        </Button>
      </div>
      
      <GameOverModal
        isWinner={isWinner}
        finalLength={isWinner ? 50 : 32}
        opponentLength={isWinner ? 32 : 50}
        onPlayAgain={() => console.log('Play again')}
        onBackToLobby={() => console.log('Back to lobby')}
      />
    </div>
  );
}
