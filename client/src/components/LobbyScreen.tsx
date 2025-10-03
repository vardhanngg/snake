import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Gamepad2, Zap } from "lucide-react";

interface LobbyScreenProps {
  onJoinRoom: (roomCode: string) => void;
}

export default function LobbyScreen({ onJoinRoom }: LobbyScreenProps) {
  const [roomCode, setRoomCode] = useState("");

  const handleJoin = () => {
    if (roomCode.trim()) {
      console.log('Joining room:', roomCode);
      onJoinRoom(roomCode.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleJoin();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card opacity-50" 
           style={{
             backgroundImage: `
               linear-gradient(90deg, hsl(220 10% 25% / 0.1) 1px, transparent 1px),
               linear-gradient(0deg, hsl(220 10% 25% / 0.1) 1px, transparent 1px)
             `,
             backgroundSize: '40px 40px'
           }}
      />
      
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <Gamepad2 className="w-16 h-16 text-game-player1" style={{ filter: 'drop-shadow(0 0 12px hsl(142 76% 45% / 0.5))' }} />
            <Zap className="w-12 h-12 text-game-food -ml-2" style={{ filter: 'drop-shadow(0 0 8px hsl(48 100% 50% / 0.5))' }} />
          </div>
          <h1 className="font-mono text-5xl font-bold mb-2 text-game-player1" style={{ 
            textShadow: '0 0 20px hsl(142 76% 45% / 0.5)',
            fontFamily: 'Orbitron, monospace'
          }}>
            SNAKE BATTLE
          </h1>
          <p className="text-muted-foreground text-lg">Head-to-head competitive chaos</p>
        </div>

        <Card className="backdrop-blur-sm bg-card/80 border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Join Battle Room</CardTitle>
            <CardDescription>
              Enter a room code to start playing with your opponent
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Input
                data-testid="input-room-code"
                type="text"
                placeholder="battle123"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                onKeyPress={handleKeyPress}
                className="text-lg h-12 text-center font-mono tracking-wider uppercase bg-background/50"
              />
              <p className="text-xs text-muted-foreground text-center">
                Share this code with your opponent to battle
              </p>
            </div>

            <Button 
              data-testid="button-join-room"
              onClick={handleJoin}
              disabled={!roomCode.trim()}
              className="w-full h-12 text-lg font-semibold"
              size="lg"
            >
              <Gamepad2 className="mr-2 h-5 w-5" />
              Join Room
            </Button>

            <div className="pt-4 border-t border-border/50">
              <h3 className="text-sm font-semibold mb-3 text-foreground">Quick Guide</h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <p className="font-semibold text-game-player1">Player 1</p>
                  <p className="text-muted-foreground">Arrow Keys</p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-game-player2">Player 2</p>
                  <p className="text-muted-foreground">W A S D</p>
                </div>
                <div className="col-span-2 space-y-1">
                  <p className="font-semibold text-foreground">Attack</p>
                  <p className="text-muted-foreground">Spacebar (when near opponent)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground space-y-2">
          <p>Reach <span className="font-mono font-semibold text-game-food">50 length</span> to win</p>
          <p className="text-xs">Collect <span className="text-game-powerup">power-ups</span> • Avoid <span className="text-game-trap">traps</span></p>
        </div>
      </div>
    </div>
  );
}
