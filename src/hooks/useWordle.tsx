/* eslint-disable no-console */
import { useEffect, useState, useCallback } from 'react';
import { Guess, KeyColor } from '../types/wordle';

const useWordle = (solution: string) => {
  const [turn, setTurn] = useState<number>(0);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [guesses, setGuesses] = useState<Guess[]>(Array(6).fill([]));
  const [history, setHistory] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [usedKeys, setUsedKeys] = useState<KeyColor>({});

  const restartGame = useCallback(() => {
    setTurn(0);
    setCurrentGuess('');
    setGuesses(Array(6).fill([]));
    setHistory([]);
    setIsCorrect(false);
    setUsedKeys({});
  }, []);

  useEffect(() => {
    restartGame();
  }, [restartGame, solution]);

  const formatGuess = (): Guess => {
    const solutionArray: (string | null)[] = [...solution];
    const formattedGuess: Guess = [...currentGuess].map((letter) => {
      return { key: letter, color: 'gray' };
    });

    formattedGuess.forEach((letter, i) => {
      if (solution[i] === letter.key) {
        formattedGuess[i].color = 'green';
        solutionArray[i] = null;
      }
    });

    formattedGuess.forEach((letter, index) => {
      if (solutionArray.includes(letter.key) && letter.color !== 'green') {
        formattedGuess[index].color = 'yellow';
        solutionArray[solutionArray.indexOf(letter.key)] = null;
      }
    });

    return formattedGuess;
  };

  const addNewGuess = (formattedGuess: Guess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }
    setGuesses((prevGuesses) => {
      const newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory((prevHistory) => [...prevHistory, currentGuess]);
    setTurn((prevTurn) => prevTurn + 1);
    setUsedKeys((prevUsedKeys) => {
      const newUsedKeys = { ...prevUsedKeys };
      formattedGuess.forEach((letter) => {
        const currentColor = newUsedKeys[letter.key];

        if (letter.color === 'green') {
          newUsedKeys[letter.key] = 'green';
          return;
        }
        if (letter.color === 'yellow' && currentColor !== 'green') {
          newUsedKeys[letter.key] = 'yellow';
          return;
        }
        if (letter.color === 'gray' && currentColor !== ('green' || 'yellow')) {
          newUsedKeys[letter.key] = 'gray';
        }
      });

      return newUsedKeys;
    });
    setCurrentGuess('');
  };

  const handleKeyup = ({ key }: { key: string }) => {
    if (key === 'Enter') {
      if (turn > 5) {
        console.log('you used all your guesses!');
        return;
      }
      if (history.includes(currentGuess)) {
        console.log('you already tried that word.');
        return;
      }
      if (currentGuess.length !== 5) {
        console.log('word must be 5 chars.');
        return;
      }
      const formatted = formatGuess();
      addNewGuess(formatted);
    }
    if (key === 'Backspace') {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }
    if (/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key);
      }
    }
  };

  const handleClick = (key: string) => {
    if (key === 'enter') {
      if (turn > 5) {
        console.log('you used all your guesses!');
        return;
      }
      if (history.includes(currentGuess)) {
        console.log('you already tried that word.');
        return;
      }
      if (currentGuess.length !== 5) {
        console.log('word must be 5 chars.');
        return;
      }
      const formatted = formatGuess();
      addNewGuess(formatted);
    } else if (key === 'delete') {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (/^[A-Za-zÑñ]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key);
      }
    }
  };

  return {
    turn,
    currentGuess,
    guesses,
    isCorrect,
    usedKeys,
    handleKeyup,
    handleClick,
    restartGame,
  };
};

export default useWordle;
