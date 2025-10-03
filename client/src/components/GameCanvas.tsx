import { useEffect, useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

interface Snake {
  body: Position[];
  color: string;
}

interface GameCanvasProps {
  gridSize?: number;
  cellSize?: number;
  snake1: Snake;
  snake2: Snake;
  food: Position;
  powerUps: Position[];
  traps: Position[];
}

export default function GameCanvas({
  gridSize = 20,
  cellSize = 30,
  snake1,
  snake2,
  food,
  powerUps,
  traps,
}: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'hsl(220 10% 25% / 0.3)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= gridSize; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvas.height);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(canvas.width, i * cellSize);
      ctx.stroke();
    }

    traps.forEach(trap => {
      ctx.fillStyle = 'hsl(355 85% 45%)';
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'hsl(355 85% 45% / 0.6)';
      ctx.fillRect(trap.x * cellSize, trap.y * cellSize, cellSize, cellSize);
      ctx.shadowBlur = 0;
    });

    ctx.fillStyle = 'hsl(48 100% 50%)';
    ctx.shadowBlur = 20;
    ctx.shadowColor = 'hsl(48 100% 50% / 0.6)';
    ctx.fillRect(food.x * cellSize + 2, food.y * cellSize + 2, cellSize - 4, cellSize - 4);
    ctx.shadowBlur = 0;

    powerUps.forEach(pu => {
      ctx.fillStyle = 'hsl(200 90% 55%)';
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'hsl(200 90% 55% / 0.6)';
      ctx.fillRect(pu.x * cellSize + 2, pu.y * cellSize + 2, cellSize - 4, cellSize - 4);
      ctx.shadowBlur = 0;
    });

    const drawSnake = (snake: Snake) => {
      snake.body.forEach((seg, i) => {
        const alpha = 1 - (i / snake.body.length) * 0.3;
        ctx.fillStyle = snake.color.replace(')', ` / ${alpha})`);
        
        if (i === 0) {
          ctx.shadowBlur = 20;
          ctx.shadowColor = `${snake.color} / 0.8)`;
        } else {
          ctx.shadowBlur = 10;
        }
        
        ctx.fillRect(
          seg.x * cellSize + 2,
          seg.y * cellSize + 2,
          cellSize - 4,
          cellSize - 4
        );

        if (i === 0) {
          ctx.fillStyle = 'hsl(0 0% 100%)';
          ctx.shadowBlur = 5;
          ctx.shadowColor = 'hsl(0 0% 100% / 0.8)';
          ctx.fillRect(
            seg.x * cellSize + cellSize / 3,
            seg.y * cellSize + cellSize / 3,
            cellSize / 3,
            cellSize / 3
          );
        }
        
        ctx.shadowBlur = 0;
      });
    };

    drawSnake(snake1);
    drawSnake(snake2);
  }, [gridSize, cellSize, snake1, snake2, food, powerUps, traps]);

  return (
    <div className="flex items-center justify-center p-4 pt-28">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={gridSize * cellSize}
          height={gridSize * cellSize}
          className="border-2 rounded-md"
          style={{
            borderColor: 'hsl(142 76% 45% / 0.5)',
            boxShadow: '0 0 30px hsl(142 76% 45% / 0.3), inset 0 0 60px hsl(220 15% 8% / 0.5)',
            background: 'hsl(220 15% 8%)',
          }}
          data-testid="canvas-game"
        />
      </div>
    </div>
  );
}
