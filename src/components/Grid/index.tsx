/* eslint-disable react/no-array-index-key */
import { Color } from '../../types/wordle';

interface Letter {
  color: string;
  key: string;
}

interface RowProps {
  guess?: Letter[];
  currentGuess?: string;
}

const getRowClass = (color?: Color) => {
  switch (color) {
    case 'green':
      return 'bg-primary text-white';
    case 'gray':
      return 'bg-gray-500 text-white';
    case 'yellow':
      return 'bg-secondary text-white';
    default:
      return 'bg-gray-200 dark:bg-dark-gray-200';
  }
};

function Row({ guess, currentGuess }: RowProps) {
  if (guess) {
    return (
      <div className="row">
        {guess.map((letter, index) => (
          <div
            key={index}
            className={`w-20 h-20 m-1 flex justify-center items-center uppercase font-bold text-subtext rounded  ${getRowClass(
              letter.color as Color
            )}`}
          >
            {letter.key}
          </div>
        ))}
      </div>
    );
  }

  if (currentGuess) {
    const letters = currentGuess.split('');

    return (
      <div className="row">
        {letters.map((letter, index) => (
          <div
            key={index}
            className="w-20 h-20 m-1 flex justify-center items-center uppercase font-bold text-subtext rounded bg-gray-200 dark:bg-dark-gray-200"
          >
            {letter}
          </div>
        ))}
        {[...Array(5 - letters.length)].map((_, index) => (
          <div
            className="w-20 h-20 m-1 flex justify-center items-center uppercase font-bold text-subtext rounded bg-gray-200 dark:bg-dark-gray-200"
            key={index}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="row">
      {[...Array(5)].map((_, index) => (
        <div
          className="w-20 h-20 m-1 flex justify-center items-center uppercase font-bold text-subtext rounded bg-gray-200 dark:bg-dark-gray-200"
          key={index}
        />
      ))}
    </div>
  );
}

interface GridProps {
  guesses: Letter[][];
  currentGuess: string;
  turn: number;
}

const totalRows = 5;
export default function Grid({ guesses, currentGuess, turn }: GridProps) {
  return (
    <div className="mb-14">
      {[...Array(totalRows)].map((_, index) => {
        if (turn === index) {
          return <Row key={index} currentGuess={currentGuess} />;
        }
        if (index < turn) {
          return <Row key={index} guess={guesses[index]} />;
        }
        return <Row key={index} />;
      })}
    </div>
  );
}

Grid.displayName = 'Grid';
