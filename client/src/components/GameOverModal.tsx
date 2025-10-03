import { Trophy, Skull, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface GameOverModalProps {
  isWinner: boolean;
  finalLength: number;
  opponentLength: number;
  onPlayAgain: () => void;
  onBackToLobby: () => void;
}

export default function GameOverModal({
  isWinner,
  finalLength,
  opponentLength,
  onPlayAgain,
  onBackToLobby,
}: GameOverModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <Card className={`w-full max-w-md border-2 ${
        isWinner 
          ? 'border-game-player1 bg-game-player1/5' 
          : 'border-game-trap bg-game-trap/5'
      }`}>
        <CardContent className="pt-8 pb-6">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              {isWinner ? (
                <Trophy 
                  className="w-24 h-24 text-game-player1 animate-bounce" 
                  style={{ 
                    filter: 'drop-shadow(0 0 30px hsl(142 76% 45% / 0.6))',
                    animationDuration: '1s'
                  }} 
                />
              ) : (
                <Skull 
                  className="w-24 h-24 text-game-trap" 
                  style={{ 
                    filter: 'drop-shadow(0 0 20px hsl(355 85% 45% / 0.6))' 
                  }} 
                />
              )}
            </div>

            <div className="space-y-2">
              <h2 className={`text-4xl font-bold ${
                isWinner ? 'text-game-player1' : 'text-game-trap'
              }`} style={{
                fontFamily: 'Orbitron, monospace',
                textShadow: isWinner 
                  ? '0 0 20px hsl(142 76% 45% / 0.5)'
                  : '0 0 20px hsl(355 85% 45% / 0.5)'
              }}>
                {isWinner ? 'VICTORY!' : 'DEFEATED!'}
              </h2>
              <p className="text-muted-foreground text-lg">
                {isWinner 
                  ? 'You dominated the arena!' 
                  : 'Better luck next time!'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 py-6 px-8">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Your Length</p>
                <p className="text-3xl font-bold font-mono text-foreground">
                  {finalLength}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Opponent</p>
                <p className="text-3xl font-bold font-mono text-foreground">
                  {opponentLength}
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-border/50">
              <Button
                data-testid="button-play-again"
                onClick={() => {
                  console.log('Play again clicked');
                  onPlayAgain();
                }}
                className="w-full h-12 text-lg font-semibold"
                size="lg"
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                Play Again
              </Button>
              
              <Button
                data-testid="button-back-lobby"
                onClick={() => {
                  console.log('Back to lobby clicked');
                  onBackToLobby();
                }}
                variant="outline"
                className="w-full"
              >
                <Home className="mr-2 h-4 w-4" />
                Back to Lobby
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
