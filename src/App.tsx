import { useEffect, useState, useCallback, useRef } from 'react';
import useGameTimer from './hooks/useGameTimer';
import WORDS from './constants/words';

import Header from './components/Header';
import Wordle from './components/Wordle';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [solution, setSolution] = useState<string | null>(null);
  const lastWord = useRef(solution);

  const selectRandomWord = useCallback(() => {
    let newWord;
    do {
      const randomIndex = Math.floor(Math.random() * WORDS.length);
      newWord = WORDS[randomIndex];
    } while (newWord === lastWord.current);

    lastWord.current = newWord;
    setSolution(newWord);
  }, []);

  const { startTimer, countdown, resetTimer } = useGameTimer({
    initialCountdown: 300,
    onTimeEnd: selectRandomWord,
  });

  useEffect(() => {
    selectRandomWord();
  }, [selectRandomWord, startTimer]);

  useEffect(() => {
    const { body } = window.document;

    if (darkMode) {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(!darkMode);
  }, [darkMode]);

  return (
    <div className="flex flex-col items-center h-full w-full text-black bg-white-200 dark:bg-dark-200 dark:text-white">
      <div className="flex flex-col w-full px-4 md:max-w-2xl mt-20 md:p-0">
        <Header
          startTimer={startTimer}
          toggleDarkMode={toggleDarkMode}
          isDarkMode={darkMode}
          countdown={countdown}
        />
      </div>
      <div className="flex flex-col w-full px-4 md:max-w-2xl md:p-0">
        {solution && <Wordle resetTimer={resetTimer} solution={solution} />}
      </div>
    </div>
  );
}

export default App;
