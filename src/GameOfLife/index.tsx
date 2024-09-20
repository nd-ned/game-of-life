import React, {useState, useCallback, memo} from 'react';
import {View, Button, Text} from 'react-native';

import Cell from './Cell';

import styles from './styles';
import {Grid} from './types';

const GridSize = 20;
const IntervalDelay = 700;

const createEmptyGrid = (): Grid =>
  Array(GridSize)
    .fill(null)
    .map(() => Array(GridSize).fill(0));

const GameOfLife: React.FC = () => {
  const [grid, setGrid] = useState<Grid>(createEmptyGrid());
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const toggleCellState = useCallback(
    (row: number, col: number) => {
      if (!isPlaying) {
        setGrid(prevGrid => {
          const newGrid = [...prevGrid];
          newGrid[row][col] = newGrid[row][col] === 1 ? 0 : 1;

          return newGrid;
        });
      }
    },
    [isPlaying],
  );

  const computeNextGridState = (currentGrid: Grid): Grid => {
    const newGrid = currentGrid.map(arr => [...arr]);

    for (let row = 0; row < GridSize; row++) {
      for (let col = 0; col < GridSize; col++) {
        const isAlive = currentGrid[row][col] === 1;
        const neighbors = countLiveNeighbors(currentGrid, row, col);

        if (isAlive && (neighbors < 2 || neighbors > 3)) {
          newGrid[row][col] = 0;
        } else if (!isAlive && neighbors === 3) {
          newGrid[row][col] = 1;
        }
      }
    }

    return newGrid;
  };

  const countLiveNeighbors = (grid: Grid, row: number, col: number): number => {
    let liveNeighbors = 0;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;

        const newRow = row + i;
        const newCol = col + j;

        if (
          newRow >= 0 &&
          newRow < GridSize &&
          newCol >= 0 &&
          newCol < GridSize
        ) {
          liveNeighbors += grid[newRow][newCol];
        }
      }
    }

    return liveNeighbors;
  };

  const startGame = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      setIsPaused(false);

      const id = setInterval(() => {
        setGrid(prevGrid => computeNextGridState(prevGrid));
      }, IntervalDelay);

      setIntervalId(id);
    }
  };

  const resumeGame = () => {
    if (isPaused) {
      const id = setInterval(() => {
        setGrid(prevGrid => computeNextGridState(prevGrid));
      }, IntervalDelay);

      setIntervalId(id);
      setIsPaused(false);
    }
  };

  const pauseGame = () => {
    if (isPlaying && !isPaused) {
      if (intervalId) clearInterval(intervalId);

      setIsPaused(true);
    }
  };

  const stopGame = () => {
    if (intervalId) clearInterval(intervalId);

    setIsPlaying(false);
    setIsPaused(false);
    setGrid(createEmptyGrid());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game of Life</Text>
      <View style={styles.grid}>
        {grid.map((row, rowIdx) => (
          <View key={rowIdx} style={styles.row}>
            {row.map((cell, colIdx) => (
              <Cell
                key={colIdx}
                isAlive={cell === 1}
                onPress={() => toggleCellState(rowIdx, colIdx)}
                disabled={isPlaying}
              />
            ))}
          </View>
        ))}
      </View>

      <View style={styles.controls}>
        <Button
          title={isPlaying ? (isPaused ? 'Resume' : 'Pause') : 'Play'}
          onPress={isPlaying ? (isPaused ? resumeGame : pauseGame) : startGame}
        />
        <Button title="Stop" onPress={stopGame} />
      </View>
    </View>
  );
};

export default GameOfLife;
