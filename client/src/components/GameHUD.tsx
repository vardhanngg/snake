import { Zap, Skull, Trophy } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface GameHUDProps {
  player1Length: number;
  player2Length: number;
  playerRole: 'p1' | 'p2';
  hasSpeedBoost: boolean;
  winLength: number;
}

export default function GameHUD({ 
  player1Length, 
  player2Length, 
  playerRole,
  hasSpeedBoost,
  winLength = 50 
}: GameHUDProps) {
  const myLength = playerRole === 'p1' ? player1Length : player2Length;
  const opponentLength = playerRole === 'p1' ? player2Length : player1Length;
  const myProgress = (myLength / winLength) * 100;
  const opponentProgress = (opponentLength / winLength) * 100;

  return (
    <div className="absolute top-0 left-0 right-0 z-10 p-4">
      <div className="max-w-4xl mx-auto backdrop-blur-md bg-card/80 rounded-md border border-primary/20 p-4">
        <div className="flex items-center justify-between gap-6">
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-game-player1">
                {playerRole === 'p1' ? 'You' : 'Opponent'}
              </span>
              <span className="font-mono text-lg font-bold text-game-player1">
                {player1Length}
              </span>
            </div>
            <Progress 
              value={playerRole === 'p1' ? myProgress : opponentProgress} 
              className="h-2 bg-background/50"
              style={{
                '--progress-background': 'hsl(142 76% 45%)',
              } as React.CSSProperties}
            />
          </div>

          <div className="text-center min-w-[120px]">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Trophy className="w-5 h-5 text-game-food" />
              <span className="font-mono text-2xl font-bold text-game-food">
                {winLength}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">to win</p>
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-lg font-bold text-game-player2">
                {player2Length}
              </span>
              <span className="text-sm font-semibold text-game-player2">
                {playerRole === 'p2' ? 'You' : 'Opponent'}
              </span>
            </div>
            <Progress 
              value={playerRole === 'p2' ? myProgress : opponentProgress}
              className="h-2 bg-background/50"
              style={{
                '--progress-background': 'hsl(0 84% 60%)',
              } as React.CSSProperties}
            />
          </div>
        </div>

        {hasSpeedBoost && (
          <div className="mt-3 flex items-center justify-center gap-2 text-game-powerup animate-pulse">
            <Zap className="w-4 h-4 fill-current" />
            <span className="text-sm font-semibold">SPEED BOOST ACTIVE</span>
            <Zap className="w-4 h-4 fill-current" />
          </div>
        )}

        <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-center gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-game-food" />
            <span>Food</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-game-powerup" />
            <span>Speed Boost</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Skull className="w-3 h-3 text-game-trap" />
            <span>Traps</span>
          </div>
          <div className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded">SPACE</kbd>
            <span>Attack</span>
          </div>
        </div>
      </div>
    </div>
  );
}
