import { useState, useEffect } from 'react';
import GameCanvas from '../GameCanvas';

export default function GameCanvasExample() {
  const [snake1, setSnake1] = useState({
    body: [{ x: 5, y: 10 }, { x: 4, y: 10 }, { x: 3, y: 10 }],
    color: 'hsl(142 76% 45%',
  });

  const [snake2, setSnake2] = useState({
    body: [{ x: 15, y: 10 }, { x: 16, y: 10 }, { x: 17, y: 10 }],
    color: 'hsl(0 84% 60%',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSnake1(prev => {
        const newHead = { 
          x: (prev.body[0].x + 1) % 20, 
          y: prev.body[0].y 
        };
        return {
          ...prev,
          body: [newHead, ...prev.body.slice(0, -1)]
        };
      });

      setSnake2(prev => {
        const newHead = { 
          x: prev.body[0].x === 0 ? 19 : prev.body[0].x - 1, 
          y: prev.body[0].y 
        };
        return {
          ...prev,
          body: [newHead, ...prev.body.slice(0, -1)]
        };
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <GameCanvas
        gridSize={20}
        cellSize={30}
        snake1={snake1}
        snake2={snake2}
        food={{ x: 10, y: 10 }}
        powerUps={[{ x: 7, y: 15 }]}
        traps={[{ x: 2, y: 2 }, { x: 18, y: 18 }]}
      />
    </div>
  );
}
