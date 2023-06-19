import { useEffect } from 'react';
import useWordle from '../../hooks/useWordle';

import Keypad from '../Keypad';
import Grid from '../Grid';

interface WordleProps {
  solution: string;
}

export default function Wordle({ solution }: WordleProps) {
  const {
    currentGuess,
    guesses,
    turn,
    isCorrect,
    usedKeys,
    handleKeyup,
    handleClick,
  } = useWordle(solution);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup);

    if (isCorrect) {
      window.removeEventListener('keyup', handleKeyup);
    }
    if (turn > 5) {
      window.removeEventListener('keyup', handleKeyup);
    }

    return () => window.removeEventListener('keyup', handleKeyup);
  }, [handleKeyup, isCorrect, turn]);

  return (
    <div className="w-full">
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
      <Keypad usedKeys={usedKeys} handleClick={handleClick} />
    </div>
  );
}
