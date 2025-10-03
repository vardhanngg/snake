import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, Gamepad2 } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <Gamepad2 className="w-24 h-24 mx-auto text-game-player1 opacity-50" />
        <div className="space-y-2">
          <h1 className="text-6xl font-bold font-mono text-game-trap">404</h1>
          <h2 className="text-2xl font-semibold">Game Not Found</h2>
          <p className="text-muted-foreground">
            Looks like this snake slithered away. Let's get you back to the arena.
          </p>
        </div>
        <Link href="/">
          <Button data-testid="button-home" size="lg">
            <Home className="mr-2 h-5 w-5" />
            Back to Battle
          </Button>
        </Link>
      </div>
    </div>
  );
}
