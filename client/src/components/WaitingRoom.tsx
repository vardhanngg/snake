import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, User, X } from "lucide-react";

interface WaitingRoomProps {
  roomCode: string;
  onLeave: () => void;
}

export default function WaitingRoom({ roomCode, onLeave }: WaitingRoomProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md backdrop-blur-sm bg-card/80 border-2 border-primary/20">
        <CardContent className="pt-8 pb-6">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <Loader2 className="w-16 h-16 text-game-player1 animate-spin" style={{ 
                filter: 'drop-shadow(0 0 12px hsl(142 76% 45% / 0.5))' 
              }} />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Waiting for Opponent</h2>
              <p className="text-muted-foreground">Room Code</p>
              <div className="inline-block px-6 py-3 bg-background/80 rounded-md border border-primary/30">
                <p className="font-mono text-2xl font-bold text-game-player1 tracking-wider">
                  {roomCode.toUpperCase()}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-8 py-4">
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full bg-game-player1/20 border-2 border-game-player1 flex items-center justify-center">
                  <User className="w-8 h-8 text-game-player1" />
                </div>
                <p className="text-sm font-medium text-game-player1">You</p>
              </div>

              <div className="text-4xl text-muted-foreground font-bold">VS</div>

              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full bg-muted/20 border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
                </div>
                <p className="text-sm text-muted-foreground">Waiting...</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Share the room code with your opponent to start the battle
            </p>

            <Button
              data-testid="button-leave-room"
              onClick={() => {
                console.log('Leaving room');
                onLeave();
              }}
              variant="outline"
              className="w-full"
            >
              <X className="mr-2 h-4 w-4" />
              Leave Room
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
