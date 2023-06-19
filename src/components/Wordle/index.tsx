import { useEffect, useState } from 'react';
import useWordle from '../../hooks/useWordle';

import Keypad from '../Keypad';
import Grid from '../Grid';
import Modal, { ModalSize } from '../Modal';

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
    if (isCorrect || turn > 5) {
      setShowModal(true);
    }
  }, [isCorrect, turn]);

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
            <h2>You Win!</h2>
            <p className="solution">{solution}</p>
            <p>You found the solution in {turn} guesses</p>
          </div>
        )}
        {!isCorrect && (
          <div>
            <h1>Nevermind</h1>
            <p className="solution">{solution}</p>
            <p>Better luck next time</p>
          </div>
        )}
      </Modal>
    </div>
  );
}

Wordle.displayName = 'Wordle';
