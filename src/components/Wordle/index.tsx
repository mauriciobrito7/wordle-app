import { useEffect, useState } from 'react';
import useWordle from '../../hooks/useWordle';
import useStats from '../../hooks/useStats';

import Keypad from '../Keypad';
import Grid from '../Grid';
import Modal, { ModalSize } from '../Modal';

interface WordleProps {
  solution: string;
  resetTimer: () => void;
}

export default function Wordle({ solution, resetTimer }: WordleProps) {
  const {
    currentGuess,
    guesses,
    turn,
    isCorrect,
    usedKeys,
    handleKeyup,
    handleClick,
    restartGame,
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
  }, [isCorrect, turn, incrementGamesPlayed, incrementVictories, restartGame]);

  const handleCloseModal = () => {
    restartGame();
    resetTimer();
    setShowModal(false);
  };

  return (
    <div className="w-full">
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
      <Keypad usedKeys={usedKeys} handleClick={handleClick} />
      <Modal
        size={ModalSize.MEDIUM}
        isOpen={showModal}
        onClose={handleCloseModal}
      >
        {isCorrect && (
          <div>
            <h2 className="text-center text-lg mb-4 md:text-subtext">
              !Has ganado!
            </h2>
            <p className="leading-6	mb-4">{solution}</p>
            <p className="leading-6	mb-4">
              Has encontrado la solución en <strong>{turn}</strong> intentos
            </p>
          </div>
        )}
        {!isCorrect && (
          <div>
            <h2 className="text-center text-lg mb-4 md:text-subtext">
              No importa
            </h2>
            <p className="leading-6	mb-4">
              La palabra era: <strong>{solution}</strong>
            </p>
            <p className="leading-6	mb-8">Mejor suerte la próxima vez</p>
          </div>
        )}
        <div className="w-full flex justify-center">
          <button
            className="bg-primary text-white px-8 py-2 rounded-md uppercase font-bold tracking-wider"
            type="button"
            onClick={handleCloseModal}
          >
            Aceptar
          </button>
        </div>
      </Modal>
    </div>
  );
}

Wordle.displayName = 'Wordle';
