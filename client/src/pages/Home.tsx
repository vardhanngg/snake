import { useState, useEffect, useCallback } from "react";
import LobbyScreen from "@/components/LobbyScreen";
import WaitingRoom from "@/components/WaitingRoom";
import GameCanvas from "@/components/GameCanvas";
import GameHUD from "@/components/GameHUD";
import GameOverModal from "@/components/GameOverModal";

type GameState = 'lobby' | 'waiting' | 'playing' | 'gameOver';

interface Position {
  x: number;
  y: number;
}

export default function Home() {
  const [gameState, setGameState] = useState<GameState>('lobby');
  const [roomCode, setRoomCode] = useState('');
  const [playerRole] = useState<'p1' | 'p2'>('p1');
  
  const [snake1, setSnake1] = useState({
    body: [{ x: 5, y: 10 }, { x: 4, y: 10 }, { x: 3, y: 10 }],
    color: 'hsl(142 76% 45%',
    direction: { x: 1, y: 0 },
  });

  const [snake2, setSnake2] = useState({
    body: [{ x: 15, y: 10 }, { x: 16, y: 10 }, { x: 17, y: 10 }],
    color: 'hsl(0 84% 60%',
    direction: { x: -1, y: 0 },
  });

  const [food, setFood] = useState<Position>({ x: 10, y: 10 });
  const [powerUps, setPowerUps] = useState<Position[]>([]);
  const [traps] = useState<Position[]>([
    { x: 2, y: 2 },
    { x: 18, y: 18 },
    { x: 2, y: 18 },
    { x: 18, y: 2 },
  ]);

  const [hasSpeedBoost, setHasSpeedBoost] = useState(false);
  const [winner, setWinner] = useState<'p1' | 'p2' | null>(null);

  const WIN_LENGTH = 50;
  const GRID_SIZE = 20;

  const handleJoinRoom = (code: string) => {
    console.log('Joining room:', code);
    setRoomCode(code);
    setGameState('waiting');
    
    setTimeout(() => {
      console.log('Opponent joined! Starting game...');
      setGameState('playing');
    }, 2000);
  };

  const handleLeaveRoom = () => {
    console.log('Leaving room');
    setGameState('lobby');
    setRoomCode('');
  };

  const handlePlayAgain = () => {
    console.log('Starting new game');
    setSnake1({
      body: [{ x: 5, y: 10 }, { x: 4, y: 10 }, { x: 3, y: 10 }],
      color: 'hsl(142 76% 45%',
      direction: { x: 1, y: 0 },
    });
    setSnake2({
      body: [{ x: 15, y: 10 }, { x: 16, y: 10 }, { x: 17, y: 10 }],
      color: 'hsl(0 84% 60%',
      direction: { x: -1, y: 0 },
    });
    setFood({ x: 10, y: 10 });
    setPowerUps([]);
    setHasSpeedBoost(false);
    setWinner(null);
    setGameState('playing');
  };

  const handleBackToLobby = () => {
    console.log('Returning to lobby');
    setGameState('lobby');
    setRoomCode('');
    setWinner(null);
  };

  const moveSnake = useCallback((snake: typeof snake1, setSnake: typeof setSnake1) => {
    setSnake(prev => {
      const newHead = {
        x: (prev.body[0].x + prev.direction.x + GRID_SIZE) % GRID_SIZE,
        y: (prev.body[0].y + prev.direction.y + GRID_SIZE) % GRID_SIZE,
      };

      if (traps.some(trap => trap.x === newHead.x && trap.y === newHead.y)) {
        return prev;
      }

      const newBody = [newHead, ...prev.body];

      if (newHead.x === food.x && newHead.y === food.y) {
        setFood({
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE),
        });

        if (Math.random() < 0.3) {
          setPowerUps([{
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
          }]);
        }
      } else {
        newBody.pop();
      }

      setPowerUps(prev => prev.filter(pu => {
        if (pu.x === newHead.x && pu.y === newHead.y) {
          setHasSpeedBoost(true);
          setTimeout(() => setHasSpeedBoost(false), 2000);
          return false;
        }
        return true;
      }));

      return { ...prev, body: newBody };
    });
  }, [food, traps, GRID_SIZE]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const interval = setInterval(() => {
      moveSnake(snake1, setSnake1);
      moveSnake(snake2, setSnake2);

      if (snake1.body.length >= WIN_LENGTH) {
        setWinner('p1');
        setGameState('gameOver');
      } else if (snake2.body.length >= WIN_LENGTH) {
        setWinner('p2');
        setGameState('gameOver');
      }
    }, hasSpeedBoost ? 100 : 200);

    return () => clearInterval(interval);
  }, [gameState, hasSpeedBoost, moveSnake, snake1, snake2, WIN_LENGTH]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (playerRole === 'p1') {
        if (e.code === 'ArrowUp' && snake1.direction.y === 0) {
          setSnake1(prev => ({ ...prev, direction: { x: 0, y: -1 } }));
        } else if (e.code === 'ArrowDown' && snake1.direction.y === 0) {
          setSnake1(prev => ({ ...prev, direction: { x: 0, y: 1 } }));
        } else if (e.code === 'ArrowLeft' && snake1.direction.x === 0) {
          setSnake1(prev => ({ ...prev, direction: { x: -1, y: 0 } }));
        } else if (e.code === 'ArrowRight' && snake1.direction.x === 0) {
          setSnake1(prev => ({ ...prev, direction: { x: 1, y: 0 } }));
        } else if (e.code === 'Space') {
          e.preventDefault();
          console.log('Attack!');
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, playerRole, snake1.direction]);

  return (
    <div className="min-h-screen bg-background">
      {gameState === 'lobby' && (
        <LobbyScreen onJoinRoom={handleJoinRoom} />
      )}

      {gameState === 'waiting' && (
        <WaitingRoom roomCode={roomCode} onLeave={handleLeaveRoom} />
      )}

      {gameState === 'playing' && (
        <>
          <GameHUD
            player1Length={snake1.body.length}
            player2Length={snake2.body.length}
            playerRole={playerRole}
            hasSpeedBoost={hasSpeedBoost}
            winLength={WIN_LENGTH}
          />
          <GameCanvas
            gridSize={GRID_SIZE}
            cellSize={30}
            snake1={snake1}
            snake2={snake2}
            food={food}
            powerUps={powerUps}
            traps={traps}
          />
        </>
      )}

      {gameState === 'gameOver' && winner && (
        <GameOverModal
          isWinner={winner === playerRole}
          finalLength={playerRole === 'p1' ? snake1.body.length : snake2.body.length}
          opponentLength={playerRole === 'p1' ? snake2.body.length : snake1.body.length}
          onPlayAgain={handlePlayAgain}
          onBackToLobby={handleBackToLobby}
        />
      )}
    </div>
  );
}
