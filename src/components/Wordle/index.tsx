import { useEffect, useState } from 'react';
import useWordle from '../../hooks/useWordle';

import Keypad from '../Keypad';
import Grid from '../Grid';
import Modal, { ModalSize } from '../Modal';
import useStats from '../../hooks/useStats';

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
  const [showModal, setShowModal] = useState(false);
  const { incrementGamesPlayed, incrementVictories } = useStats();

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

  useEffect(() => {
    if (isCorrect || turn > 5 || (!isCorrect && turn === 5)) {
      setShowModal(true);
      incrementGamesPlayed();
      if (isCorrect) {
        incrementVictories();
      }
    }
  }, [isCorrect, turn, incrementGamesPlayed, incrementVictories]);

  return (
    <div className="w-full">
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
      <Keypad usedKeys={usedKeys} handleClick={handleClick} />
      <Modal
        size={ModalSize.MEDIUM}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        {isCorrect && (
          <div>
            <h2>!Has ganado!</h2>
            <p className="solution">{solution}</p>
            <p>Has encontrado la solución en {turn} intentos</p>
          </div>
        )}
        {!isCorrect && (
          <div>
            <h1>No importa</h1>
            <p className="solution">{solution}</p>
            <p>Mejor suerte la próxima vez</p>
          </div>
        )}
      </Modal>
    </div>
  );
}

Wordle.displayName = 'Wordle';
