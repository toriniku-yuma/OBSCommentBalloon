import React, { useState, useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
};

type Rectangle = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const intersects = (rect1: Rectangle, rect2: Rectangle) => {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
};

function shuffle<T>(array: T[]) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const getNewSquares = (
  windowSize: [number, number],
  avoidBox: Rectangle,
  squareSize: number
) => {
  if (squareSize === 0) return [{ x: 0, y: 0, width: 0, height: 0 }];
  const newSquares: Rectangle[] = [];
  const numSquaresX = Math.ceil(windowSize[0] / squareSize);
  const numSquaresY = Math.ceil(windowSize[1] / squareSize);
  for (let i = 0; i < numSquaresX; i++) {
    for (let j = 0; j < numSquaresY; j++) {
      if (
        avoidBox.width <= 0 ||
        avoidBox.height <= 0 ||
        !intersects(avoidBox, {
          x: i * squareSize,
          y: j * squareSize,
          width: squareSize,
          height: squareSize,
        })
      ) {
        newSquares.push({
          x: i * squareSize,
          y: j * squareSize,
          width: squareSize,
          height: squareSize,
        });
      }
    }
  }
  return shuffle(newSquares);
};

//This component prepares an array of squares to fill the screen, shuffles them, and holds them as a State. However, do not place the squares in the avoid box.
//The methods of this component will select a square from the array and return a random position within that square.
//if the array is empty, it will be refilled and shuffled.

export const RandomGenContext = React.createContext<{
  getRandomPoint: () => Point;
}>({
  getRandomPoint: () => ({ x: 0, y: 0 }),
});

type Props = {
  avoidBox?: Rectangle;
  squareSize?: number;
  viewSize?: [number, number];
};

export const RandomGenProvider: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  avoidBox,
  squareSize,
  viewSize,
}) => {
  const [windowSize, setWindowSize] = useState<[number, number]>(
    viewSize || [
      document.documentElement.clientWidth,
      document.documentElement.clientHeight,
    ]
  );

  const squares = useRef<Rectangle[]>([]);
  if (squares.current.length === 0) {
    squares.current = getNewSquares(
      windowSize,
      avoidBox || { x: 0, y: 0, width: 0, height: 0 },
      squareSize || 300
    );
  }

  useEffect(() => {
    if (viewSize) return;
    const handleResize = () => {
      setWindowSize([
        document.documentElement.clientWidth,
        document.documentElement.clientHeight,
      ]);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    squares.current = getNewSquares(
      windowSize,
      avoidBox || { x: 0, y: 0, width: 0, height: 0 },
      squareSize || 300
    );
  }, [windowSize]);

  //this function will return a random point within a square
  //if the array is empty, it will be refilled and shuffled. React
  const getRandomPoint = () => {
    const square = squares.current.pop()!;
    const x = Math.random() * square.width + square.x;
    const y = Math.random() * square.height + square.y;
    return { x, y };
  };

  return (
    <RandomGenContext.Provider
      value={{
        getRandomPoint,
      }}
    >
      {children}
    </RandomGenContext.Provider>
  );
};
